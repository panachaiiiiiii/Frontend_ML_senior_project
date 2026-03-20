import { useEffect } from "react";
import { PagepathAPI } from "../Router/Path";
import { Pagepath } from ".";
import { useNavigate } from "react-router-dom";

const GetselfHistory = () => {
  const navigate = useNavigate();

  const gethistorydata = async () => {
    const token = sessionStorage.getItem("Token");

    if (!token) {
      alert("กรุณา login ใหม่");
      return;
    }

    try {
      const response = await fetch(PagepathAPI.History, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 กัน 401
      if (response.status === 401) {
        alert("Token หมดอายุ กรุณา login ใหม่");
        sessionStorage.removeItem("Token");
        navigate(Pagepath.login);
        return;
      }

      const data = await response.json();

      if (data?.data) {
        navigate(Pagepath.history, {
          state: {
            data: data.data,
          },
        });
      } else {
        alert("ไม่พบข้อมูลประวัติ");
        navigate(Pagepath.home)
      }
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
      navigate(Pagepath.home)
    }
  };

  useEffect(() => {
    gethistorydata();
  }, []);

  return <div>Loading...</div>;
};

export default GetselfHistory;