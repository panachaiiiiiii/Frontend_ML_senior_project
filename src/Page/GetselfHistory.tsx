import { useEffect } from "react";
import { PagepathAPI } from "../Router/Path";
import { Pagepath } from ".";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const GetselfHistory = () => {
  const navigate = useNavigate();

  const gethistorydata = async () => {
    const token = sessionStorage.getItem("Token");

    if (!token) {
      message.error("กรุณา login ใหม่");

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
        message.error("Token หมดอายุ กรุณา login ใหม่");
        sessionStorage.removeItem("Token");
        navigate(Pagepath.login);
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data?.data) {
        navigate(Pagepath.history, {
          state: {
            data: data.data,
          },
        });
      } else {
        // alert("ไม่พบข้อมูลประวัติ");
        message.error("ไม่พบข้อมูลประวัติ");
        navigate(Pagepath.home);
        return;
      }
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
      navigate(Pagepath.home);
    }
  };

  useEffect(() => {
    gethistorydata();
  }, []);

  return <div>Loading...</div>;
};

export default GetselfHistory;
