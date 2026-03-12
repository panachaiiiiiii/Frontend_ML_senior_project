import { useEffect } from "react";
import { PagepathAPI } from "../Router/Path";
import { Pagepath } from ".";
import { useNavigate } from "react-router-dom";

const GetselfHistory = () => {
  const navigate = useNavigate();

  const gethistorydata = async () => {
    const token = sessionStorage.getItem("Token");

    const response = await fetch(PagepathAPI.History, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    navigate(Pagepath.history, {
      state: {
        data: data.data,
      },
    });
  };

  useEffect(() => {
    gethistorydata();
  }, []);

  return <div>Loading...</div>;
};

export default GetselfHistory