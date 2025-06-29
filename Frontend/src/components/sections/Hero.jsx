import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { CustomButton } from "../ui/custom-button";
import { Link } from "react-router-dom";
import RotatingText from "../RotatingText";
import CountUp from "../CountUp";

export const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();

      // Calculate x and y position within the element (0 to 1)
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      // Calculate movement amount (px)
      const moveX = (x - 0.5) * 20;
      const moveY = (y - 0.5) * 20;

      // Apply parallax effect to background
      heroRef.current.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;

      // Apply subtle movement to hero content
      const content = heroRef.current.querySelector(".hero-content");
      if (content) {
        content.style.transform = `translate(${moveX * 0.1}px, ${
          moveY * 0.1
        }px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-[90vh] flex items-center relative overflow-hidden pt-16"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(15, 86, 179, 0.05) 0%, rgba(255, 255, 255, 0) 70%)",
        backgroundSize: "120% 120%",
        backgroundPosition: "center",
        transition: "background-position 0.2s ease-out",
      }}
    >
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -right-[10%] top-[15%] h-[300px] w-[300px] rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute -left-[5%] top-[45%] h-[250px] w-[250px] rounded-full bg-accent blur-[80px]" />
      </div>

      <div className="container py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hero-content transition-transform duration-200 ease-out max-w-4xl">
          <span className="inline-block px-3 py-1 bg-accent rounded-full text-sm font-medium text-primary mb-6 animate-fade-in">
            Connect with experienced mentors
          </span>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 opacity-0 animate-reveal-1">
            Share Knowledge.
            <br />
            <span className="text-primary">
              Gain{" "}
              <span className="inline-block">
                <RotatingText
                  texts={[
                    "Wisdom.",
                    "Growth.",
                    "Success.",
                    "Confidence.",
                    "Expertise.",
                  ]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-2xl mb-8 opacity-0 animate-reveal-2">
            Connect with industry experts for personalized guidance, mentorship,
            and knowledge sharing in a supportive community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-reveal-3">
            <Link to="/signup">
              <CustomButton size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CustomButton>
            </Link>
            <Link to="/mentors">
              <CustomButton variant="outline" size="lg">
                Browse Mentors
              </CustomButton>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 opacity-0 animate-reveal-4">
            <div className="text-center">
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary">
                <CountUp
                  from={0}
                  to={1000}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                +
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Expert Mentors
              </div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary">
                <CountUp
                  from={0}
                  to={24}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                /
                <CountUp
                  from={0}
                  to={7}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Support Access
              </div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary">
                <CountUp
                  from={0}
                  to={50}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                k+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-3xl sm:text-4xl text-primary">
                <CountUp
                  from={0}
                  to={98}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                %
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
    </div>
  );
};
