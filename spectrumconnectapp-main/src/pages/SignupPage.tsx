
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, UserRound } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { signup, login } from "@/services /authApi";
import axios from "axios";


const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [userType, setUserType] = useState("user"); // "user" or "therapist"
  const { toast } = useToast();
  const navigate = useNavigate();

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (  !name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    
    try {
      // Call signup API from authService.ts
      await signup(name ,email, password, userType);

      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });

      // Auto-login after successful signup
      try {
        await login(email, password,userType);

        // Redirect based on user type
        if (userType === "therapist") {
          navigate("/therapist-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } catch (loginError: any) {
        // If auto-login fails, redirect to login page
        toast({
          title: "Account Created",
          description: "Please log in with your new credentials",
        });
        navigate("/login");
      }
    } catch (error: any) {
      // Handle signup error
      const errorMessage = error.message || "Unable to create account. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <Card className="w-full max-w-md shadow-lg border-spectrum-purple-light">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-spectrum-purple-dark">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Join SpectrumConnect to access specialized support and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label className="text-base mb-2 block">I want to sign up as:</Label>
            <ToggleGroup 
              type="single" 
              className="justify-center border rounded-md p-1"
              value={userType}
              onValueChange={(value) => {
                if (value) setUserType(value);
              }}
            >
              <ToggleGroupItem 
                value="user" 
                className="flex-1 data-[state=on]:bg-spectrum-purple-light data-[state=on]:text-white"
              >
                <User className="mr-2 h-4 w-4" />
                User
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="therapist"
                className="flex-1 data-[state=on]:bg-spectrum-purple-light data-[state=on]:text-white"
              >
                <UserRound className="mr-2 h-4 w-4" />
                Therapist
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus-ring"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-ring"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus-ring pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="focus-ring pr-10"
                />
              </div>
            </div>

            {userType === "therapist" && (
              <div className="space-y-2 bg-gray-50 p-3 rounded-md">
                <Label htmlFor="credentials">Professional Credentials</Label>
                <Input
                  id="credentials"
                  placeholder="License number, certification, etc."
                  className="focus-ring"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your credentials will be verified by our team before your account is activated
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} 
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-spectrum-purple hover:text-spectrum-purple-dark underline underline-offset-4"
                >
                  terms of service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-spectrum-purple hover:text-spectrum-purple-dark underline underline-offset-4"
                >
                  privacy policy
                </Link>
              </label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : `Sign up as ${userType === "user" ? "User" : "Therapist"}`}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-spectrum-purple hover:text-spectrum-purple-dark underline underline-offset-4"
            >
              Log in
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative flex items-center w-full">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" className="w-full focus-ring">
              Google
            </Button>
            <Button variant="outline" className="w-full focus-ring">
              Apple
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
