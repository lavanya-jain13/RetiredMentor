import React, { useEffect } from "react";
import { Navbar } from "../navigation/Navbar";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const MainLayout = ({ children, className, withPadding = true }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main
        className={cn(
          "flex-grow w-full",
          withPadding && "px-4 pt-6 pb-16 sm:px-6 md:px-8 lg:px-10",
          className
        )}
      >
        <div className="animate-fade-in w-full">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
