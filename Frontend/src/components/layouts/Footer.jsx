import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-secondary/50 to-muted border-t">
      <div className="container max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-hero flex items-center justify-center shadow-sm">
                <span className="font-display text-white font-bold text-lg">
                  RM
                </span>
              </div>
              <span className="ml-2 text-lg font-display font-semibold tracking-tight">
                Retired Mentor
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting experienced professionals with those seeking guidance
              and knowledge transfer across generations.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-foreground/80" />
              </a>
              <a
                href="https://www.x.com/"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-foreground/80" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohan-chouksey/"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-foreground/80" />
              </a>
              <a
                href="https://www.instagram.com/reel/DHPxU_8CWBT/?utm_source=ig_web_copy_link"
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-foreground/80" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/mentors"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@retiredmentor.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start"
                >
                  <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>info@retiredmentor.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+11234567890"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start"
                >
                  <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>+91 6266536741</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start"
                >
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    23, Sir M. Visvesvaraya Marg, Vallabh Nagar, Indore, Madhya
                    Pradesh 452003
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-6 px-4 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} RetiredMentor. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with ❤️ for retired mentors
          </p>
        </div>
      </div>
    </footer>
  );
};
