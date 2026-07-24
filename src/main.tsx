import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { FaceProvider } from "./context/FaceContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <FaceProvider>
        <App />
      </FaceProvider>
    </AuthProvider>
  </StrictMode>,
);
