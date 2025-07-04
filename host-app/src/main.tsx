import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GlobalContextWrapper from "./context/GlobalContext.tsx";
const Login = lazy(() => {
  return import("admin/Login");
});
const Register = lazy(() => {
  return import("admin/Register");
});
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/login"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Login className="flex flex-col border my-5 gap-5" />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <Register className="flex flex-col border my-5 gap-5" />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalContextWrapper>
  </StrictMode>
);
