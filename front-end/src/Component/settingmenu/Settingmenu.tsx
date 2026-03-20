import { useEffect, useState } from "react";
import { PagepathAPI } from "../../Router/Path";
import Tabbtn from "../btns/Tabbtn";
import Modal from "./Modal/Modal";

const Settingmenu = () => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [fieldKey, setFieldKey] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  const token = sessionStorage.getItem("Token");
    const GetUserProfile = async () => {
      if (!token) {
        alert("กรุณา login ใหม่");
        return;
      }

      try {
        const res = await fetch(PagepathAPI.Profile, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 400) {
          alert(data.detail || "ไม่พบผู้ใช้");
          return;
        }

        if (data.status === 202) {
          setEmail(data.user.email);
          setFirstName(data.user.first_name);
          setLastName(data.user.last_name);
          setBirthday(data.user.birthday);
          setGender(data.user.sex);
        }
      } catch (err) {
        console.error(err);
        alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
      }
    };
  useEffect(() => {
    const runfun =()=>{ GetUserProfile()}
    runfun();
  
  }, [token]);

  const fields = [
    { label: "ชื่อจริง", key: "first_name", value: firstName },
    { label: "นามสกุล", key: "last_name", value: lastName },
    { label: "วันเกิด", key: "birthday", value: birthday },
    { label: "เพศ", key: "sex", value: gender },
  ];

  const openModal = (label: string, key: string, value: string) => {
    setLabel(label);
    setFieldKey(key);
    setValue(value || "-");
    setOpen(true);
  };

  return (
    <div className="w-2/3 rounded-2xl border border-black bg-white p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Tabbtn label={email || "-"} muted />
        </div>

        {fields.map((field) => (
          <Tabbtn
            key={field.key}
            label={field.label}
            onClick={() => openModal(field.label, field.key, field.value)}
          />
        ))}
      </div>

      <Modal
        keys={fieldKey}
        open={open}
        label={label}
        value={value}
        setValue={setValue}
        onClose={() => setOpen(false)}
        onSuccess={GetUserProfile}
      />
    </div>
  );
};

export default Settingmenu;
