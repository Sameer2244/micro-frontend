import React from "react";

export default function LoggedInWrapper({
  children,
  LoggedInComponent,
}: Readonly<{
  children: React.ReactNode;
  LoggedInComponent: React.ReactNode;
}>) {
  if (localStorage.getItem("loggedIn")) {
    return LoggedInComponent;
  } else {
    return children;
  }
}
