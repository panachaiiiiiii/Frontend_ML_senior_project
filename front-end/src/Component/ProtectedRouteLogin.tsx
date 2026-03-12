import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Pagepath } from "../Page";

type Props = {
  children: JSX.Element;
};


const ProtectedRouteLogin = ({ children }: Props) => {
  const token = sessionStorage.getItem("Token");
  const location = useLocation();
  
  if (token && location.pathname === Pagepath.login) {
    return <Navigate to={Pagepath.home} replace />;
  }
    if (token && location.pathname === Pagepath.register) {
    return <Navigate to={Pagepath.home} replace />;
  }
  
  return children;
};

export default ProtectedRouteLogin;
