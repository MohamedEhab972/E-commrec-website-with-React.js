import React from "react";
import Login from "../Login/Login";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
    // return <Login></Login>;
  }
}
