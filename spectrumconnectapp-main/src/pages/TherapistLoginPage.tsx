
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User } from "lucide-react";

const TherapistLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      // In a real app, we would redirect to therapist dashboard after successful login
      window.location.href = "/therapist-dashboard";
    }, 1500);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-8">
      <Card className="w-full max-w-md shadow-lg border-spectrum-blue-light">
        <CardHeader className="space-y-1">
          <div className="mx-auto bg-spectrum-purple-light p-3 rounded-full">
            <User className="h-10 w-10 text-spectrum-purple-dark" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-spectrum-purple-dark mt-4">
            Therapist Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your therapist credentials to access your dashboard
          </CardDescription>
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
            <Button type="submit" className="w-full bg-spectrum-purple-dark hover:bg-spectrum-purple" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in as Therapist"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Not a registered therapist?{" "}
            <Link to="/contact" className="text-spectrum-purple hover:text-spectrum-purple-dark underline underline-offset-4">
              Contact us
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TherapistLoginPage;
