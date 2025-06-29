// import React, { useState } from "react";
// import { MainLayout } from "@/components/layouts/MainLayout";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { LogOut, Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { MentorCard } from "../components/mentors/MentorCard";
// import { Signup } from "./Signup";

// // Mock data for retired mentors
// const mockRetiredMentors = [
//   {
//     id: 1,
//     name: "Dr. Rakesh Sharma",
//     expertise: "Aerospace Engineering",
//     experience: "35 years at ISRO",
//     description:
//       "Former scientist with expertise in satellite communications and space technology.",
//   },
//   {
//     id: 2,
//     name: "Prof. Meera Patel",
//     expertise: "Computer Science",
//     experience: "28 years at IIT Delhi",
//     description:
//       "Specialized in artificial intelligence and machine learning algorithms.",
//   },
//   {
//     id: 3,
//     name: "Rajiv Kapoor",
//     expertise: "Finance",
//     experience: "40 years at State Bank of India",
//     description: "Expert in banking regulations and financial risk management.",
//   },
// ];

// // Mock user data
// const mockUser = {
//   name: "Lavanya",
//   email: "lava@gmail.com",
//   userType: "Regular User",
// };

// const RetiredMentors = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<typeof mockRetiredMentors>(
//     []
//   );
//   const [hasSearched, setHasSearched] = useState(false);
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     // Simple search logic - filter mentors by expertise (case insensitive)
//     const results = mockRetiredMentors.filter(
//       (mentor) =>
//         mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     setSearchResults(results);
//     setHasSearched(true);

//     if (results.length === 0) {
//       toast.info("No mentors found for your search criteria.");
//     } else {
//       toast.success(`Found ${results.length} retired mentors.`);
//     }
//   };

//   const handleLogout = () => {
//     // Perform logout logic here
//     toast.success("Successfully logged out!");
//     // Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto py-20 px-4 space-y-8">
//         {/* User info card */}
//         <Card className="mb-8 shadow-md">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-2xl md:text-3xl">
//               Welcome, {mockUser.name}!
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <p className="text-lg">Email: {mockUser.email}</p>
//             <p className="text-lg">User Type: {mockUser.userType}</p>
//           </CardContent>
//         </Card>

//         {/* Search section */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-4">Find Retired Mentors</h2>
//           <div className="flex gap-2">
//             <Input
//               placeholder="Search expertise..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1"
//               onKeyPress={(e) => {
//                 if (e.key === "Enter") handleSearch();
//               }}
//             />
//             <Button onClick={handleSearch}>
//               <Search className="h-4 w-4 mr-2" />
//               Search
//             </Button>
//           </div>
//         </div>

//         {/* Search results */}
//         <div className="mb-8">
//           {hasSearched && searchResults.length === 0 ? (
//             <div className="text-center py-10 text-muted-foreground">
//               No results found
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {searchResults.map((mentor) => (
//                 <MentorCard key={mentor.id} mentor={mentor} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Logout button */}
//         <div className="flex justify-center mb-6">
//           <Button
//             variant="default"
//             size="lg"
//             className="w-full"
//             onClick={handleLogout}
//           >
//             <LogOut className="h-4 w-4 mr-2" />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default RetiredMentors;

import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MentorCard } from "../components/mentors/MentorCard";
import axios from "axios";

const RetiredMentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details
    axios
      .get("http://localhost:8080/api/retired-users", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/retired-users/search?expertise=${searchQuery}`
      );
      setSearchResults(response.data);
      setHasSearched(true);

      if (response.data.length === 0) {
        toast.info("No mentors found for your search criteria.");
      } else {
        toast.success(`Found ${response.data.length} retired mentors.`);
      }
    } catch (error) {
      console.error("Error searching mentors:", error);
      toast.error("Failed to fetch mentors. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:/api8080/logout", {}, { withCredentials: true });
      toast.success("Successfully logged out!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-20 px-4 space-y-8">
        {/* User info card */}
        {user && (
          <Card className="mb-8 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl md:text-3xl">
                Welcome, {user.name}!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg">Email: {user.email}</p>
              <p className="text-lg">User Type: {user.userType}</p>
            </CardContent>
          </Card>
        )}

        {/* Search section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Find Retired Mentors</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Search results */}
        <div className="mb-8">
          {hasSearched && searchResults.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default RetiredMentors;
