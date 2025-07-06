import React, { useEffect, useState } from "react";
import { useGlobalState } from "host-app/GlobalContext";
import { validateForm } from "../utils/validation";
import Link from "host-app/Link";
import { customNavigate } from "host-app/useNavigate";

export default function Login({ className }: Readonly<{ className?: string }>) {
  const { users, addUser, loginUserHandler } = useGlobalState();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    registerError: "",
  });
  const navigate = customNavigate();
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/");
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.username || errors.password) return;
    const registerError = users.some((user: unknown) => {
      return (user as { name: string }).name === form.username;
    });
    if (registerError) {
      setErrors({
        ...errors,
        registerError: "User already exists",
      });
      return;
    }
    navigate("/");
    const newUser = {
      id: `${Date.now()}`,
      name: form.username,
      password: form.password,
      articles: [],
    };
    addUser(newUser);
    loginUserHandler(newUser.id);
  };
  return (
    <>
      <form onSubmit={onSubmit} className={className}>
        <input
          value={form.username}
          placeholder="enter your username"
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
            if (validateForm("username", e.target.value)) {
              setErrors({
                ...errors,
                username: "",
              });
            } else {
              setErrors({
                ...errors,
                username: "Username must be at least 5 characters",
              });
            }
          }}
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          value={form.password}
          placeholder="enter your password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            if (validateForm("password", e.target.value)) {
              setErrors({
                ...errors,
                password: "",
              });
            } else {
              setErrors({
                ...errors,
                password: "Password must be at least 8 characters",
              });
            }
          }}
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          value={form.confirmPassword}
          placeholder="enter your password"
          onChange={(e) => {
            setForm({ ...form, confirmPassword: e.target.value });
            if (
              validateForm("confirmPassword", e.target.value, form.password)
            ) {
              setErrors({
                ...errors,
                confirmPassword: "",
              });
            } else {
              setErrors({
                ...errors,
                confirmPassword: "Password do not match",
              });
            }
          }}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Register</button>
        {errors.registerError}
      </form>
      <Link path="login" />
    </>
  );
}
