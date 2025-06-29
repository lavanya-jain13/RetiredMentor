// components/LoadingSpinner.tsx
// import React from "react";
// import "./LoadingSpinner.css"; // Global CSS for animations

import React from "react";
import { cn } from "@/lib/utils";
import { Progress } from "./progress";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = () => {
  const sphereCount = 4;

  return (
    <div className="pl relative h-screen w-full overflow-hidden  from-[#041749] via-[#062779] to-[#041749] perspective-800 preserve-3d">
      {/* Grid Background */}
      <div className="pl-grid absolute left-1/2 top-1/2 h-[34em] w-[34em] -translate-x-1/2 -translate-y-1/2 rotate-x-90 translate-z-[-4em]" />

      {/* Spheres */}
      {[...Array(sphereCount)].map((_, index) => (
        <React.Fragment key={index}>
          <div
            className="pl-sphere absolute left-1/2 top-1/2 z-10 h-8 w-8 animate-move-sphere rounded-full"
            style={{
              animationDelay: `${index * 0.1}s`,
              left: `calc(50% - ${
                (2 + 1) * (sphereCount - index - sphereCount / 2) - 0.5
              }rem)`,
            }}
          />
          <span
            className="pl-shadow absolute left-1/2 top-1/2 z-0 h-8 w-8 animate-move-sphere-shadow rounded-full"
            style={{
              animationDelay: `${index * 0.1}s`,
              left: `calc(50% - ${
                (2 + 1) * (sphereCount - index - sphereCount / 2) - 0.5
              }rem)`,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export { LoadingSpinner };
