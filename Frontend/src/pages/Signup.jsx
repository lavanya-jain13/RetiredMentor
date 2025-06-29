// import React, { useState } from "react";
// import { MainLayout } from "../components/layouts/MainLayout";
// import { AuthForm } from "../components/auth/AuthForm";
// import { useToast } from "@/components/ui/use-toast";
// // import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Signup = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   // const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSignup = (data) => {
//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);

//       // For demo purposes, any signup will succeed
//       // Create user object with submitted data
//       const userData = {
//         id: Math.floor(Math.random() * 1000) + 1,
//         name: data.name || data.email.split("@")[0],
//         email: data.email,
//         userType: "Regular User",
//       };

//       // Log user in after signup
//       login(userData);

//       toast({
//         title: "Account created",
//         description:
//           "Welcome to retired! Your account has been created successfully.",
//       });

//       // Redirect to dashboard
//       // navigate("/dashboard");
//     }, 1500);
//   };

//   return (
//     <MainLayout>
//       <div className="flex min-h-[80vh] items-center justify-center py-12">
//         <div className="grid w-full max-w-md space-y-8 bg-card p-8 shadow-sm border rounded-xl animate-scale-in">
//           <div className="flex flex-col space-y-2 text-center">
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Create an account
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Enter your details to create your Retired Mentor account
//             </p>
//           </div>

//           <AuthForm
//             type="signup"
//             onSubmit={handleSignup}
//             isLoading={isLoading}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import { MainLayout } from "../components/layouts/MainLayout";
// import { AuthForm } from "../components/auth/AuthForm";
// import { useToast } from "@/components/ui/use-toast";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSignup = (data) => {
//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);

//       // For demo purposes, any signup will succeed
//       toast({
//         title: "Account created",
//         description:
//           "Welcome to WisdomWave! Your account has been created successfully.",
//       });

//       // Redirect to dashboard
//       navigate("/dashboard");
//     }, 1500);
//   };

//   return (
//     <MainLayout>
//       <div className="flex min-h-[80vh] items-center justify-center py-12">
//         <div className="grid w-full max-w-md space-y-8 bg-card p-8 shadow-sm border rounded-xl animate-scale-in">
//           <div className="flex flex-col space-y-2 text-center">
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Create an account
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Enter your details to create your Retired Mentor account
//             </p>
//           </div>

//           <AuthForm
//             type="signup"
//             onSubmit={handleSignup}
//             isLoading={isLoading}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { AuthForm } from "../components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("regular"); // Default user type
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    setIsLoading(true);

    // Prepare request payload
    const userData =
      userType === "regular"
        ? { name: data.name, email: data.email, password: data.password }
        : {
            name: data.name,
            email: data.email,
            password: data.password,
            expertise: data.expertise,
            experience: data.experience,
            description: data.description,
          };

    // Define API endpoint
    const apiUrl =
      userType === "regular"
        ? "http://localhost:8080/api/regular-users/register"
        : "http://localhost:8080/api/retired-users/register";

    try {
      // Make API request
      const response = await axios.post(apiUrl, userData);

      if (response.status === 200) {
        toast({
          title: "Account Created",
          description: "Welcome to RetireMentor! Your account has been created successfully.",
        });

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.response?.data?.message || "Error registering user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center py-12">
        <div className="grid w-full max-w-md space-y-8 bg-card p-8 shadow-sm border rounded-xl animate-scale-in">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your RetireMentor account.
            </p>
          </div>

          {/* User Type Selection */}
          <select
            className="border p-2 rounded w-full"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="regular">Regular User</option>
            <option value="retired">Retired User</option>
          </select>

          {/* Registration Form */}
          <AuthForm
            type="signup"
            onSubmit={handleSignup}
            isLoading={isLoading}
            userType={userType}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
