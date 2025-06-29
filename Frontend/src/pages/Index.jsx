import React from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { Hero } from "../components/sections/Hero";
import { Features } from "../components/sections/Features";
import { Testimonials } from "../components/sections/Testimonials";
import {
  ArrowRight,
  Brain,
  Compass,
  Globe,
  Lightbulb,
  Users,
} from "lucide-react";
import { CustomButton } from "../components/ui/custom-button";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const Index = () => {
  // Use intersection observer hooks for animations
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Domain categories
  const categories = [
    {
      icon: <Brain className="h-6 w-6" />,
      name: "Technology",
      count: 256,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      name: "Business",
      count: 189,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      name: "Design",
      count: 142,
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: <Compass className="h-6 w-6" />,
      name: "Marketing",
      count: 114,
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: <Users className="h-6 w-6" />,
      name: "Leadership",
      count: 93,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <MainLayout withPadding={false}>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Categories Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={categoriesRef}
            className={cn(
              "text-center max-w-3xl mx-auto mb-16",
              "opacity-0 transform translate-y-8",
              categoriesInView && "animate-reveal"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Expertise by{" "}
              <span className="text-primary">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Find mentors specializing in your area of interest from our
              diverse knowledge domains.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/mentors?category=${category.name.toLowerCase()}`}
                className={cn(
                  "flex flex-col items-center text-center p-6 rounded-xl border transition-all",
                  "hover:shadow-md hover:-translate-y-1 bg-card",
                  "opacity-0 transform translate-y-8",
                  categoriesInView && "animate-reveal"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn("p-3 rounded-lg mb-4", category.color)}>
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.count} Mentors
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div
          ref={ctaRef}
          className={cn(
            "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
            "opacity-0 transform translate-y-8",
            ctaInView && "animate-reveal"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of professionals who have accelerated their careers
            through mentorship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <CustomButton
                size="lg"
                className="bg-white text-primary hover:bg-white/90 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CustomButton>
            </Link>
            <Link to="/mentors">
              <CustomButton
                variant="outline"
                size="lg"
                className="border-white bg-red text-white hover:text-black hover:bg-white/30 backdrop-blur-md"
              >
                Browse Mentors
              </CustomButton>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
