import {createContext,useContext,ReactNode,useState,useEffect,} from "react";
import {getUserType,isAuthenticated,logout as apiLogout,getUserProfile,} from "@/services /authApi";

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  userType?: "user" | "therapist";
  bio?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userType: "user" | "therapist" | null;
  userProfile: UserProfile | null;
  token: string | null;
  logout: () => void;
  updateUserProfile: (profile: UserProfile) => void;
  refreshAuthState: () => Promise<void>; 
  user: UserProfile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    userType: "user" | "therapist" | null;
    userProfile: UserProfile | null;
    token: string | null;
  }>({
    isAuthenticated: false,
    userType: null,
    userProfile: null,
    token: null,
  });

  // Shared logic to refresh authentication state
  const refreshAuthState = async () => {
    const authenticated = isAuthenticated();
    const userType = getUserType();
    const token = localStorage.getItem("accessToken");

    let profile = null;

    if (authenticated && token) {
      try {
        profile = await getUserProfile();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    setAuthState({
      isAuthenticated: authenticated,
      userType,
      userProfile: profile,
      token,
    });
  };

  // Run once on mount
  useEffect(() => {
    refreshAuthState();
  }, []);

  const handleLogout = () => {
    apiLogout(); // call service logout
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("userType");
    localStorage.removeItem("user_profile");

    setAuthState({
      isAuthenticated: false,
      userType: null,
      userProfile: null,
      token: null,
    });
  };

  const updateUserProfile = (profile: UserProfile) => {
    setAuthState(prev => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        ...profile,
      },
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userType: authState.userType,
        userProfile: authState.userProfile,
        token: authState.token,
        logout: handleLogout,
        updateUserProfile,
        refreshAuthState,
        user: authState.userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
