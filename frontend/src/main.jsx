import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { TradeProvider } from "./context/tradeContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TradeProvider>
        <App />
        <Toaster />
      </TradeProvider>
    </AuthProvider>
    {/* <AuthProvider>
        <App />
        <Toaster />
    </AuthProvider> */}
  </StrictMode>,
);
