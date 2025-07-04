import React from "react";
import { Link } from "react-router-dom";

export default function LinkComponent({ path }: Readonly<{ path: string }>) {
  return <Link to={`/${path}`}>To {path}</Link>;
}
