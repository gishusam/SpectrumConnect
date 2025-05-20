import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, UserRound } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { login } from "@/services /authApi";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("user"); // "user" or "therapist"
  const { toast } = useToast();
  const { refreshAuthState } = useAuth(); 
  const navigate = useNavigate(); 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // API call
    try {
      // Use the login function from authService
      await login(email, password, userType);
      await refreshAuthState();

      toast({
        title: "Success",
        description: "You have successfully logged in",
      });

      // Redirect based on user type
      if (userType === "therapist") {
        navigate("/therapist-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.detail ||
          "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <Card className="w-full max-w-md shadow-lg border-spectrum-blue-light">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-spectrum-purple-dark">
            Log in to SpectrumConnect
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
          
          <div className="mt-4">
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
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-spectrum-purple hover:text-spectrum-purple-dark underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : `Log in as ${userType === "user" ? "User" : "Therapist"}`}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-spectrum-purple hover:text-spectrum-purple-dark underline underline-offset-4"
            >
              Sign up
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

export default LoginPage;
