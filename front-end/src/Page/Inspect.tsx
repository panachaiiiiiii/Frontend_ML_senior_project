import { useEffect, useRef, useState } from "react";
import Btn from "../Component/btns/Btn";
import { PagepathAPI } from "../Router/Path";
import { useNavigate } from "react-router-dom";
import { Pagepath } from ".";
import loading_state from "../Component/Loading/loading";
import { message } from "antd";

// ✅ type response (ยังคงของคุณไว้)
type PredictResponse = {
  model: string;
  result: { [key: string]: number };
};

type ModelItem = {
  name: string;
  enabled: boolean;
};

const Inspect = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState<string>(""); // 👈 default จาก array
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onclick = async () => {
    if (!file) {
      alert("กรุณาเลือกรูปก่อน");
      return;
    }

    const token = sessionStorage.getItem("Token");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("model_name", model);

      const response = await fetch(PagepathAPI.Predict, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data: PredictResponse = await response.json();

      const result = data.result;
      const model_name = data.model;
      

      navigate(Pagepath.resultpage, {
        state: {
          model_name,
          result,
          file,
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        alert(err.message); // 👈 เพิ่มตรงนี้
      } else {
        alert("เกิดข้อผิดพลาด");
      }
    } finally {
      setLoading(false);
    }
  };

  const getmodel = async () => {
    try {
      const res = await fetch(PagepathAPI.Model);
      const data = await res.json();

      // 👉 เอาเฉพาะ enabled = true
      const enabledModels = data.models
        .filter((m: ModelItem) => m.enabled)
        .map((m: ModelItem) => m.name);

      setModels(enabledModels);

      // set default
      if (enabledModels.length > 0) {
        setModel(enabledModels[0]);
      }
    } catch (err) {
      console.error(err);
      message.error("โหลดข้อมูลไม่สำเร็จ");
    }
  };

  useEffect(() => {
    getmodel();
  }, []);
  return (
    <div>
      {loading && loading_state("กำลังคัดกรองโรค")}

      {/* hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setFile(selectedFile);
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);
          }
        }}
      />

      <div className="flex flex-col mt-8 items-center justify-center">
        {/* Title */}
        <h1 className="text-[52px] font-bold text-green-800">คัดกรองโรค</h1>

        <div className="flex flex-col items-center text-center gap-6 text-lg">
          {/* preview */}
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-96 rounded-xl object-cover border-2 border-green-600"
            />
          ) : (
            "No image selected"
          )}

          {/* 🔥 select model */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-green-700 font-semibold">เลือกโมเดล</label>

            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="border border-green-600 p-2 rounded-lg"
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <p className="text-sm text-gray-500">Model ที่เลือก: {model}</p>
          </div>

          {/* buttons */}
          <div className="flex gap-4">
            <Btn
              text="อัปโหลดรูปภาพ"
              onClick={() => fileRef.current?.click()}
            />

            {preview && <Btn text="ยืนยัน" onClick={onclick} />}
          </div>

          {/* example images */}
          <div className="flex gap-4 mt-2">
            {["/ex1.jpg", "/ex1.jpg", "/ex1.jpg"].map((src, i) => (
              <div
                key={i}
                className="border-2 border-green-600 rounded-lg overflow-hidden"
              >
                <img
                  src={src}
                  alt={`example-${i}`}
                  className="w-20 h-20 object-cover"
                />
              </div>
            ))}
          </div>

          <p className="text-green-600 text-lg">รูปตัวอย่างการถ่าย</p>
        </div>
      </div>

      {/* mobile */}
      {/* <div className="md:hidden text-center mt-10">
        mobile version coming soon
      </div> */}
    </div>
  );
};

export default Inspect;
