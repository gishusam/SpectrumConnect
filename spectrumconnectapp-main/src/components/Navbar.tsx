import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userType, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // These navigation links are always visible regardless of authentication
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Therapists", href: "/therapists" },
    { name: "Community", href: "/community" },
    { name: "Appointments", href: "/appointments" },
  ];

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (userType === "therapist") {
      navigate("/therapist-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isAuthenticated && (href === "/therapists" || href === "/community" || href === "/appointments")) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-spectrum-purple-dark">
              <span className="text-white font-bold">SC</span>
            </div>
            <span className="text-xl font-semibold text-spectrum-purple-dark">SpectrumConnect</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, item.href)}
            >
              {item.name}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to={userType === "therapist" ? "/therapist-dashboard" : "/user-dashboard"}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {isAuthenticated ? (
            <>
              <Button variant="outline" asChild className="focus-ring">
                <Link to="/account">My Account</Link>
              </Button>
              <Button className="focus-ring" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild className="focus-ring">
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="focus-ring">
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
      
      <div className={cn(
        "lg:hidden fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transform transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between">
          <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-spectrum-purple-dark">
                <span className="text-white font-bold">SC</span>
              </div>
              <span className="text-xl font-semibold text-spectrum-purple-dark">SpectrumConnect</span>
            </div>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavLinkClick(e, item.href);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated && (
                <Link
                  to={userType === "therapist" ? "/therapist-dashboard" : "/user-dashboard"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
            <div className="py-6 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 w-full text-left"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
