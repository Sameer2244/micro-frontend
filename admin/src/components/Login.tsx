import React, { useEffect, useState } from "react";
import { useGlobalState } from "host-app/GlobalContext";
import { validateForm } from "../utils/validation";
import Link from "host-app/Link";
import { customNavigate } from "host-app/useNavigate";

export default function Login() {
  const { users, loginUserHandler } = useGlobalState();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    loginError: "",
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
    const user = users.find((user: unknown) => {
      return (
        (user as { name: string }).name === form.username &&
        (user as { password: string }).password === form.password
      );
    });
    if (user === undefined) {
      setErrors({
        ...errors,
        loginError: "User not found",
      });
      return;
    }
    navigate("/");
    loginUserHandler(user.id);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-10 py-10 px-5 flex-col bg-[#E5E0D8] items-stretch w-[30rem] m-auto border border-[#D9A299] rounded-2xl"
    >
      <h2>Sign in to your account</h2>
      <input
        className="p-2 border border-[#D9A299] bg-white rounded-[.25rem]"
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
        className="p-2 border border-[#D9A299] bg-white rounded-[.25rem]"
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
      <button
        type="submit"
        className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]"
      >
        Login
      </button>
      {errors.loginError}
      <div className="flex justify-between">
        <Link path={"register"}>
          <span className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]">
            To register
          </span>
        </Link>
        <Link>
          <span className="bg-[#FAF7F3] inline-block mx-4 py-2 px-4 rounded-[4px]">
            To Dashboard
          </span>
        </Link>
      </div>
    </form>
  );
}
