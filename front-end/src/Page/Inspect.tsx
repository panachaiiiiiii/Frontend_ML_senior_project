import React, { useRef, useState } from "react";
import Btn from "../Component/btns/Btn";
import { PagepathAPI } from "../Router/Path";
import { useNavigate } from "react-router-dom";
import { Pagepath } from ".";
import loading_state from "../Component/Loading/loading";

const Inspect = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onclick = async () => {
    if (!file) {
      alert("กรุณาเลือกรูปก่อน");
      return;
    }
    const token = sessionStorage.getItem("Token");
    try {
      setLoading(true); // ✅ เริ่มโหลด

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(PagepathAPI.Predict, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      console.log("Result:", data);
      navigate(Pagepath.resultpage, { state: { data: data, file: file } });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    } finally {
      setLoading(false); // ✅ หยุดโหลดไม่ว่าจะ error หรือสำเร็จ
    }
  };
  return (
    <div>
      {loading && loading_state("กำลังคัดกรองโรค")}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setFile(selectedFile); // ✅ เก็บ file จริง
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);
          }
        }}
      />
      <div className="hidden md:flex flex-col mt-8  items-center justify-center">
        {/* Title */}

        <h1 className="text-[52px]  font-bold text-green-800">คัดกรองโรค</h1>

        <div className="flex flex-col">
          {/* Content */}

          <div className=" flex flex-col items-center text-center gap-6 text-lg">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-96 rounded-xl object-cover border-2 border-green-600"
              />
            ) : (
              "No image selected"
            )}
            {/* Upload button */}
            <div className="flex gap-4">
              <Btn
                text="อัปโหลดรูปภาพ"
                onClick={() => {
                  console.log(fileRef.current);
                  fileRef.current?.click();
                }}
              />
              <div className={preview ? "block" : "hidden"}>
                <Btn text="ยืนยัน" onClick={onclick} />
              </div>
            </div>
            {/* Example images */}
            <div className="flex gap-4 mt-2 ">
              {["/ex1.jpg", "/ex1.jpg", "/ex1.jpg"].map((src, i) => (
                <div
                  key={i}
                  className="border-2 border-green-600 rounded-lg overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`example-${i}`}
                    className="w-20 h-20 rounded-lg object-cover   "
                  />
                </div>
              ))}
            </div>

            {/* Caption */}
            <p className="text-green-600 text-lg">รูปตัวอย่างการถ่าย</p>
          </div>
        </div>
      </div>
      <div className="md:hidden">mobile</div>
    </div>
  );
};

export default Inspect;
