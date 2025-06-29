import React from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import {
  Users,
  BookOpen,
  Target,
  Award,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { CustomButton } from "../components/ui/custom-button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import DecryptedText from "../components/DecryptedText";

const About = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // In a real app, you would send this data to your backend
  //   console.log("Contact form submitted:", formData);

  //   // Show success message
  //   toast.success("Message sent successfully! We'll get back to you soon.");

  //   // Reset form
  //   setFormData({
  //     name: "",
  //     email: "",
  //     subject: "",
  //     message: "",
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("access_key", "3d9e1cdb-8d22-49df-b62c-a38b49c4a776");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await res.json();

      if (result.success) {
        console.log("Success", result);
        toast.success("Message sent successfully! We'll get back to you soon.");

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <MainLayout className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-16 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            <DecryptedText
              text="Our Mission"
              animateOn="view"
              revealDirection="center"
            />
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connecting retired professionals with those seeking wisdom and
            guidance
          </p>
          <div className="flex justify-center">
            <CustomButton
              onClick={() => navigate("/mentors")}
              size="lg"
              className="mr-4"
            >
              Find a Mentor
            </CustomButton>
            <CustomButton
              onClick={() => navigate("/signup")}
              variant="outline"
              size="lg"
            >
              Become a Mentor
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4 text-muted-foreground">
                Retired Mentor was founded in 2023 with a simple belief:
                retirement shouldn't mean the end of sharing knowledge and
                experience.
              </p>
              <p className="mb-4 text-muted-foreground">
                Our platform connects retired professionals with individuals
                seeking guidance, creating meaningful relationships that bridge
                generations and industries.
              </p>
              <p className="text-muted-foreground">
                What started as a small community has grown into a global
                network of mentors and mentees, all committed to the exchange of
                wisdom and growth.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-8 rounded-xl shadow-sm">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-full mr-4">
                    <BookOpen size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Knowledge Transfer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Facilitating the sharing of decades of professional
                      experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-full mr-4">
                    <Users size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Community Building
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Creating connections that span generations and backgrounds
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/20 p-3 rounded-full mr-4">
                    <Target size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Purposeful Retirement
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Helping retirees continue making meaningful contributions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Our Team
          </h2>

          <div className="grid py-12 grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mohan",
                role: "Founder & CEO",
                bio: "Former HR executive with 30 years of experience in talent development",
                image:
                  "https://cdnb.artstation.com/p/assets/images/images/069/377/453/large/retratosanime-298.jpg?1699988235",
              },
              {
                name: "Somil",
                role: "CTO",
                bio: "Retired software architect with expertise in building platforms that connect people",
                image:
                  "https://cdnb.artstation.com/p/assets/images/images/069/406/783/large/retratosanime-300.jpg?1700057116",
              },
              {
                name: "Ansh",
                role: "CTO",
                bio: "Retired software architect with expertise in building platforms that connect people",
                image:
                  "https://cdna.artstation.com/p/assets/images/images/069/536/086/large/retratosanime-306.jpg?1700398555",
              },
              {
                name: "Lavanya",
                role: "CTO",
                bio: "Retired software architect with expertise in building platforms that connect people",
                image:
                  "https://cdna.artstation.com/p/assets/images/images/069/520/006/large/retratosanime-304.jpg?1700341886",
              },
              {
                name: "Harshita",
                role: "Community Director",
                bio: "Specialized in building mentor programs for Fortune 500 companies for 25 years",
                image:
                  "https://cdnb.artstation.com/p/assets/images/images/069/480/577/large/retratosanime-303.jpg?1700233960",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-lg rounded-lg bg-white text-center p-6 transition-transform hover:scale-105"
              >
                {/* Circular Image */}
                <div className="flex justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
                  />
                </div>

                {/* Text Content */}
                <CardContent className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-11 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            {[
              {
                icon: <Award className="w-10 h-10 text-primary" />,
                title: "Excellence",
                description:
                  "We strive for excellence in every mentor match and interaction on our platform.",
              },
              {
                icon: <Users className="w-10 h-10 text-primary" />,
                title: "Inclusivity",
                description:
                  "We believe in creating opportunities for people of all backgrounds and experiences.",
              },
              {
                icon: <Target className="w-10 h-10 text-primary" />,
                title: "Purpose-Driven",
                description:
                  "Everything we do is focused on creating meaningful impact and connections.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-background shadow-sm"
              >
                <div className="mx-auto mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 py-20 text-center">
            Contact Us
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      23, Sir M. Visvesvaraya Marg, Vallabh Nagar, Indore,
                      Madhya Pradesh 452003
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-muted-foreground">+91 6266536741</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      info@retiredmentor.com
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <p className="text-muted-foreground mb-2">
                <del> Monday - Friday: 9:00 AM - 6:00 PM PST</del>
              </p>
              <p className="text-muted-foreground mb-2 ">
                <del>Saturday - Sunday: Closed</del> <br /> All Time Closed 🥱.
              </p>
            </div>

            <div>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                action="https://api.web3forms.com/submit"
                method="POST"
              >
                <input
                  type="hidden"
                  name="access_key"
                  value=" 2fc6774d-61cc-488f-b465-3951a62add6d "
                />

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    rows={5}
                    required
                  />
                </div>

                <CustomButton type="submit" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
