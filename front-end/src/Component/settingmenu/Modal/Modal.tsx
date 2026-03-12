import { PagepathAPI } from "../../../Router/Path";

type ModalProps = {
  open: boolean;
  keys: string;
  onClose: () => void;
  value: string;
  setValue: (v: string) => void;
  label: string;
  onSuccess: () => void; // ✅ เพิ่ม
};
const Token = sessionStorage.getItem("Token");
const UpdateUserProfile = async (labels: string, value: string) => {
  try {
    const res = await fetch(PagepathAPI.Profile, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({
        [labels]: value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "เกิดข้อผิดพลาด");
      return false;
    }

    alert("บันทึกสำเร็จ");
    return true;
  } catch (err) {
    console.error(err);
    alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    return false;
  }
};

const Modal = ({
  keys,
  value,
  setValue,
  open,
  onClose,
  label,
  onSuccess,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="w-[360px] rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <label className="text-sm text-gray-700">{label}</label>

        {/* 🔹 Gender */}
        {label === "เพศ" ? (
          <select
            className="mt-4 mb-4 h-10 w-full rounded-md border border-gray-400 px-3"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <option value="">เลือกเพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </select>
        ) : (
          /* 🔹 Text / Date */
          <input
            className="mt-4 mb-4 h-10 w-full rounded-md border border-gray-400 px-3
                     focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            type={label === "วันเกิด" ? "date" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        <div className="mt-4 flex justify-evenly">
          <button
            className="h-10 w-1/3 rounded-md bg-green-600 text-white hover:bg-green-700"
            onClick={async () => {
              const success = await UpdateUserProfile(keys, value);
              if (success) {
                onSuccess(); // 🔥 ดึงข้อมูลใหม่จาก parent
                onClose();
              }
            }}
          >
            ยืนยัน
          </button>

          <button
            className="h-10 w-1/3 rounded-md bg-gray-300 text-white hover:bg-gray-400"
            onClick={() => onClose()}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
