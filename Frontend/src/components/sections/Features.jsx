import React from "react";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Calendar,
  MessageSquare,
  Search,
  Award,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FeatureCard = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "group bg-card rounded-xl p-6 border shadow-sm card-hover",
        "opacity-0 transform translate-y-8",
        inView && "animate-reveal"
      )}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Connect with Mentors",
      description:
        "Find and connect with experienced mentors in your field who can guide you on your journey.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Meetings",
      description:
        "Book one-on-one sessions with mentors at times that work for both of you.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Real-time Chat",
      description:
        "Communicate directly with mentors through our real-time messaging system.",
    },

    {
      icon: <Award className="h-6 w-6" />,
      title: "Verified Experts",
      description:
        "All mentors are verified professionals with expertise in their respective fields.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Platform",
      description:
        "Your data and communications are protected with enterprise-grade security.",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            "opacity-0 transform translate-y-8",
            inView && "animate-reveal"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary">Grow</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Our platform provides all the tools you need to connect with
            mentors, schedule meetings, and accelerate your personal and
            professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
