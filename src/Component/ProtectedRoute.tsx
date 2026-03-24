import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Pagepath } from "../Page";

type Props = {
  children: JSX.Element;
};


const ProtectedRoute = ({ children }: Props) => {
  const token = sessionStorage.getItem("Token");
  const location = useLocation();

  if (!token ) {
    return <Navigate to={Pagepath.login} replace />;
  }
  console.log(location.pathname)
  if (token && location.pathname === Pagepath.login) {
    return <Navigate to={Pagepath.home} replace />;
  }
    if (token && location.pathname === Pagepath.register) {
    return <Navigate to={Pagepath.home} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
