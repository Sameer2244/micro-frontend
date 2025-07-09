import React from "react";
import { Link } from "react-router-dom";

export default function LinkComponent({
  path = "",
  children,
}: Readonly<{ path?: string; children: React.ReactNode }>) {
  return <Link to={`/${path}`}>{children}</Link>;
}
