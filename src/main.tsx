import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "../pages/auth/AuthContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId="900654604916-io28lnaen96nuudm7pa2nh9s2nacsac7.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  // </StrictMode>,
);
