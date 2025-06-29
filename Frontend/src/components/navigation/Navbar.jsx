// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { CustomButton } from "../ui/custom-button";
// export const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   // Handle scroll events
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);
//   const navLinks = [
//     {
//       title: "Home",
//       path: "/",
//     },
//     {
//       title: "Mentors",
//       path: "/retired-mentors",
//     },
//     {
//       title: "Dashboard",
//       path: "/dashboard",
//     },
//     {
//       title: "About Us",
//       path: "/about",
//     },
//   ];
//   const isActive = (path) => {
//     if (path === "/" && location.pathname === "/") return true;
//     if (path !== "/" && location.pathname.startsWith(path)) return true;
//     return false;
//   };
//   return (
//     <header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
//         isScrolled
//           ? "bg-background/80 backdrop-blur-md shadow-sm border-border/50"
//           : "bg-transparent border-transparent"
//       )}
//     >
//       <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center space-x-2"
//             aria-label="Retired Mentor"
//           >
//             <div className="relative flex items-center">
//               <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center shadow-sm">
//                 <span className="font-display text-white font-bold text-lg">
//                   RM
//                 </span>
//               </div>
//               <span className="ml-2 text-xl font-display font-semibold tracking-tight">
//                 Retired Mentor
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={cn("nav-link", isActive(link.path) && "active")}
//               >
//                 {link.title}
//               </Link>
//             ))}
//           </nav>

//           {/* Auth buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link to="/login">
//               <CustomButton variant="outline" size="sm">
//                 Sign In
//               </CustomButton>
//             </Link>
//             <Link to="/signup">
//               <CustomButton size="sm">Get Started</CustomButton>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden rounded-md p-2 inline-flex items-center justify-center transition-colors hover:bg-muted"
//             aria-expanded={isMobileMenuOpen}
//           >
//             <span className="sr-only">Open main menu</span>
//             {isMobileMenuOpen ? (
//               <X className="block h-6 w-6" aria-hidden="true" />
//             ) : (
//               <Menu className="block h-6 w-6" aria-hidden="true" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu, show/hide based on menu state */}
//       <div
//         className={cn(
//           "md:hidden transition-all duration-300 overflow-hidden",
//           isMobileMenuOpen ? "max-h-[400px] border-t" : "max-h-0"
//         )}
//       >
//         <div className="px-4 pt-2 pb-3 space-y-1 bg-background">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={cn(
//                 "block px-3 py-3 rounded-md text-base",
//                 isActive(link.path)
//                   ? "text-primary font-medium"
//                   : "text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
//               )}
//             >
//               {link.title}
//             </Link>
//           ))}
//           <div className="pt-2 pb-1 flex flex-col space-y-2">
//             <Link to="/login" className="w-full">
//               <CustomButton variant="outline" size="sm" className="w-full">
//                 Sign In
//               </CustomButton>
//             </Link>
//             <Link to="/signup" className="w-full">
//               <CustomButton size="sm" className="w-full">
//                 Get Started
//               </CustomButton>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomButton } from "../ui/custom-button";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation links change based on authentication status
  const navLinks = isAuthenticated
    ? [
        { title: "Home", path: "/" },
        { title: "Mentors", path: "/retired-mentors" },
        { title: "Dashboard", path: "/dashboard" },
        { title: "About Us", path: "/about" },
      ]
    : [
        { title: "Home", path: "/" },
        { title: "About Us", path: "/about" },
      ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-border/50"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="RetiredMentor"
          >
            <div className="relative flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center shadow-sm">
                <span className="font-display text-white font-bold text-lg">
                  RM
                </span>
              </div>
              <span className="ml-2 text-xl font-display font-semibold tracking-tight">
                Retired Mentor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn("nav-link", isActive(link.path) && "active")}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Auth buttons or Logout button based on auth status */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <CustomButton
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </CustomButton>
            ) : (
              <>
                <Link to="/login">
                  <CustomButton variant="outline" size="sm">
                    Sign In
                  </CustomButton>
                </Link>
                <Link to="/signup">
                  <CustomButton size="sm">Get Started</CustomButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-md p-2 inline-flex items-center justify-center transition-colors hover:bg-muted"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] border-t" : "max-h-0"
        )}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-background">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block px-3 py-3 rounded-md text-base",
                isActive(link.path)
                  ? "text-primary font-medium"
                  : "text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
              )}
            >
              {link.title}
            </Link>
          ))}

          {/* Mobile auth buttons or logout button */}
          <div className="pt-2 pb-1 flex flex-col space-y-2">
            {isAuthenticated ? (
              <CustomButton
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </CustomButton>
            ) : (
              <>
                <Link to="/login" className="w-full">
                  <CustomButton variant="outline" size="sm" className="w-full">
                    Sign In
                  </CustomButton>
                </Link>
                <Link to="/signup" className="w-full">
                  <CustomButton size="sm" className="w-full">
                    Get Started
                  </CustomButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
