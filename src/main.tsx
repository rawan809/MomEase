import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";
import "./i18n.js";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { ChildProvider } from "@/contexts/ChildContext";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <LanguageProvider>
    <AuthProvider>
      <GoogleOAuthProvider clientId="900654604916-io28lnaen96nuudm7pa2nh9s2nacsac7.apps.googleusercontent.com">
        <ChildProvider>
          <App />
        </ChildProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </LanguageProvider>,
  // </StrictMode>,
);
