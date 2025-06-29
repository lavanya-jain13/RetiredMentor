import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      id: 1,
      name: "Ashi Patel",
      role: "Product Manager",
      company: "TechCorp",
      text: "Retired Mentor completely transformed my career. The mentorship I received helped me navigate complex challenges and accelerate my professional growth.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    },
    {
      id: 2,
      name: "Karan Shah",
      role: "Software Engineer",
      company: "InnovateSoft",
      text: "Finding a mentor in my field was nearly impossible until I discovered Retired Mentor. The platform connected me with industry experts who provided invaluable guidance.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    },
    {
      id: 3,
      name: "Neha Gupta",
      role: "Marketing Director",
      company: "BrandGrowth",
      text: "The quality of mentors on Retired Mentor is exceptional. I've been able to learn from leaders in my industry and apply their insights to my own work.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          "opacity-0 transform translate-y-8",
          inView && "animate-reveal"
        )}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Are <span className="text-primary">Saying</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover how Retired Mentor has helped professionals at all stages
            of their careers.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4 z-10">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-background shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-background border shadow-md">
            <div className="absolute top-6 left-8 text-primary/20">
              <Quote className="h-20 w-20" />
            </div>

            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full p-10 md:p-16">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/3 flex-shrink-0">
                        <div className="relative">
                          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
                            <Quote className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <blockquote>
                          <p className="text-lg md:text-xl italic mb-4">
                            {testimonial.text}
                          </p>
                          <footer>
                            <div className="font-semibold text-lg">
                              {testimonial.name}
                            </div>
                            <div className="text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          </footer>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4 z-10">
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-background shadow-md flex items-center justify-center text-foreground hover:bg-muted transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "bg-primary w-6"
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
