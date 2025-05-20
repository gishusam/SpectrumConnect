import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createTherapistProfile } from "@/services /therapistservices";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AccountSetupFormData {
  name: string;
  specialization: string;
  experience: string;
  contact: string;
  bio: string;
}

export const TherapistAccountSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<AccountSetupFormData>({
    defaultValues: {
      name: "",
      specialization: "",
      experience: "",
      contact: "",
      bio: "",
    },
  });

  const onSubmit = async (data: AccountSetupFormData) => {
    setIsSubmitting(true);
    try {
      await createTherapistProfile({
        name: data.name,
        specialization: data.specialization,
        experience: Number(data.experience), 
        contact: data.contact,
        bio: data.bio,
      });
      
      toast({
        title: "Profile created successfully",
        description: "Your therapist profile has been set up.",
        variant: "default",
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Error creating profile",
        description: "There was a problem setting up your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-spectrum-blue-light w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-spectrum-purple-dark">
          Complete Your Therapist Profile
        </CardTitle>
        <CardDescription>
          Set up your professional profile to start accepting appointments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Jane Smith" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your name will appear to patients
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input placeholder="ASD Specialist, Child Psychology, etc." {...field} />
                  </FormControl>
                  <FormDescription>
                    Your primary area of expertise
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="10+ years in clinical practice" {...field} />
                  </FormControl>
                  <FormDescription>
                    Briefly describe your professional experience
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    How patients or the platform can contact you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your approach to therapy and experience with autism spectrum disorders..." 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This will be visible on your public profile
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating Profile..." : "Complete Profile Setup"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <div className="flex items-center text-sm text-gray-600">
          <AlertCircle className="h-4 w-4 mr-2 text-gray-400" />
          <span>You must complete your profile to start accepting appointments</span>
        </div>
      </CardFooter>
    </Card>
  );
};
