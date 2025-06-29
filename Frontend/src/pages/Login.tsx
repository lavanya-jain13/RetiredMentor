// import React, { useState } from "react";
// import { MainLayout } from "../components/layouts/MainLayout";
// import { AuthForm } from "../components/auth/AuthForm";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();
//   const { login } = useAuth();

//   const handleLogin = (data) => {
//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);

//       // For demo purposes, any login will succeed
//       toast({
//         title: "Login successful",
//         description: "Welcome back to retired mentro!",
//       });

//       // Create user object with mock data
//       const userData = {
//         id: 1,
//         name: "John Doe",
//         email: data.email,
//         userType: "Regular User",
//       };

//       // Redirect to dashboard
//       // navigate("/dashboard");
//       // Call login function from AuthContext
//       login(userData);
//     }, 1500);
//   };

//   const handleGoogleLogin = (token: string) => {
//     setIsLoading(true);

//     // Here you would normally send the token to your backend for verification
//     console.log("Google access token:", token);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);

//       toast({
//         title: "Google login successful",
//         description: "Welcome back to Retired mentor!",
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
//               Welcome back
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               Enter your email to sign in to your account
//             </p>
//           </div>

//           <AuthForm
//             type="login"
//             onSubmit={handleLogin}
//             onGoogleLogin={handleGoogleLogin}
//             isLoading={isLoading}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { AuthForm } from "../components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("regular"); // Default to Regular User
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsLoading(true);
    const { email, password } = data;

    const apiUrl =
      userType === "regular"
        ? "http://localhost:8080/api/regular-users/login"
        : "http://localhost:8080/api/retired-users/login";

    try {
      const response = await axios.post(apiUrl, { email, password }, { withCredentials: true });
      const userData = response.data;

      // Store user type and session token
      localStorage.setItem("userType", userType);
      sessionStorage.setItem("token", userData.token);

      toast({
        title: "Login successful",
        description: "Welcome back to RetireMentor!",
      });

      await login(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid credentials",
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
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Select your user type and enter your credentials</p>
          </div>

          {/* Dropdown for selecting user type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="regular">Regular User</option>
              <option value="retired">Retired User</option>
            </select>
          </div>

          {/* Login Form */}
          <AuthForm
            type="login"
            onSubmit={handleLogin}
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
