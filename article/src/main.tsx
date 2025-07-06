import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GlobalContextWrapper from "host-app/GlobalContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalContextWrapper>
      <App />
    </GlobalContextWrapper>
  </StrictMode>
);
