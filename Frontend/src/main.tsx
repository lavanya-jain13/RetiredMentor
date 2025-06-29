// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);

// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// <GoogleOAuthProvider clientId="167642311484-s78ecqkmmp36mbp8levtttbap41emg5u.apps.googleusercontent.com">
//   createRoot(document.getElementById("root")!).render(
//   <App />
//   );
// </GoogleOAuthProvider>;

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";
import { authConfig } from "./config/authConfig";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove this in production and use real loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <GoogleOAuthProvider clientId={authConfig.googleClientId}>
          <App />
        </GoogleOAuthProvider>
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
