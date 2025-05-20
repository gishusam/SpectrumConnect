import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Calendar, ArrowLeft } from "lucide-react";
import { getTherapistById, getAllTherapists } from "@/services /therapistservices";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const TherapistProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const {
    data: therapist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["therapist", id],
    queryFn: () => getTherapistById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load therapist profile. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading therapist profile...</p>
        </div>
      </div>
    );
  }

  if (!therapist && !isLoading) {
    return (
      <div className="container py-8">
        <Link to="/therapists" className="flex items-center text-spectrum-purple-dark mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Therapists
        </Link>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Therapist Not Found</h2>
              <p className="text-gray-600 mb-6">
                The therapist profile you are looking for could not be found.
              </p>
              <Button asChild>
                <Link to="/therapists">View All Therapists</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <Link to="/therapists" className="flex items-center text-spectrum-purple-dark mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Therapists
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <Avatar className="h-24 w-24 border-2 border-spectrum-purple-light">
                <AvatarImage src={therapist?.image} alt={therapist?.name} />
                <AvatarFallback>{therapist?.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold mb-1">{therapist?.name}</CardTitle>
                <p className="text-lg text-gray-600 mb-2">{therapist?.specialty}</p>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{therapist?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-spectrum-blue-light text-spectrum-blue-dark rounded-full px-3 py-1 text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{therapist?.rating}</span>
                    <span className="text-xs text-gray-600">({therapist?.reviews} reviews)</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {therapist?.availability}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-600">
                  Dr. {therapist?.name} is a specialized therapist with {therapist?.experience} of 
                  experience working with individuals on the autism spectrum and related neurodevelopmental 
                  conditions. Their approach is patient-centered and evidence-based, focusing on building 
                  practical skills and emotional resilience.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {therapist?.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-spectrum-purple-light/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Education & Experience</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {therapist?.experience} of clinical experience</li>
                  <li>• Specialized training in neurodevelopmental disorders</li>
                  <li>• Ph.D. in Clinical Psychology (assumed for demonstration)</li>
                  <li>• Board-certified in Behavioral Therapy (assumed for demonstration)</li>
                </ul>
              </div>

              {therapist?.contact && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <p className="text-gray-600">{therapist.contact}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Booking Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Book a Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Session Types</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Initial Consultation</p>
                      <p className="text-sm text-gray-600">45 minutes</p>
                    </div>
                    <p className="font-semibold">$120</p>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">Regular Session</p>
                      <p className="text-sm text-gray-600">60 minutes</p>
                    </div>
                    <p className="font-semibold">$150</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock className="h-4 w-4" />
                <span>Available times vary by day</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Next available: Tomorrow</span>
              </div>
              
              <Button className="w-full" asChild>
                <Link to="/appointments">Schedule Appointment</Link>
              </Button>
              
              <Button variant="outline" className="w-full">
                Contact Therapist
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TherapistProfilePage;
