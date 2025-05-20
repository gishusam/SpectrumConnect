import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // Uses context for auth state
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredUserType?: "user" | "therapist";
  redirectToLogin?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requiredUserType,
  redirectToLogin = true 
}: ProtectedRouteProps) => {
  const { isAuthenticated, userType } = useAuth(); // ✅ Pulls from context
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // ✅ Redirect to login if user is not authenticated
    if (!isAuthenticated) {
      if (redirectToLogin) {
        toast({
          title: "Authentication required",
          description: "Please log in to access this page",
          variant: "destructive",
        });
        navigate("/login");
      }
      return;
    }

    // ✅ Allow access to non-dashboard routes if no type required
    if (!requiredUserType && !window.location.pathname.includes("dashboard")) {
      return;
    }

    // ✅ Check for user type mismatch
    if (requiredUserType && userType !== requiredUserType) {
      toast({
        title: "Access denied",
        description: `This page is only accessible to ${requiredUserType}s`,
        variant: "destructive",
      });

      // ✅ Redirect based on user type
      if (userType === "user") {
        navigate("/user-dashboard");
      } else if (userType === "therapist") {
        navigate("/therapist-dashboard");
      }
    }
  }, [isAuthenticated, userType, requiredUserType, navigate, toast, redirectToLogin]);

  // ✅ Block rendering while unauthenticated or unauthorized
  if (!isAuthenticated || (requiredUserType && userType !== requiredUserType)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
