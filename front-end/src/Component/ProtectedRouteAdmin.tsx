import React, { useEffect, useState } from "react";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Pagepath } from "../Page";
import { PagepathAPI } from "../Router/Path";

type Props = {
  children: JSX.Element;
};

const ProtectedRouteAdmin = ({ children }: Props) => {
  const location = useLocation();
  const token = sessionStorage.getItem("Token");

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getRole = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(PagepathAPI.Profile, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setRole(data.user?.role ?? null);
    } catch (error) {
      console.error("Get role error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

 
  if (loading) return null; 


  if (role !== "admin") {
    return (
      <Navigate
        to={Pagepath.home}
        replace
        state={{ from: location }}
      />
    );
  }


  return children;
};

export default ProtectedRouteAdmin;
