import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/login");
    }
  }, []);
  return children;
}
