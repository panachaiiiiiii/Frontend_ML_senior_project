import React, { useRef, useState } from "react";
import Btn from "../btns/Btn";

const Inspectmobile = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div>
      {/* Title */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      <h1 className="text-[36px] sm:text-[52px] text-center   font-bold text-green-800">คัดกรองโรค</h1>

      <div className="flex flex-col items-center j">
        {/* Content */}
        <div className="flex flex-col items-center text-center gap-6 text-lg">
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
          <Btn text="อัปโหลดรูปภาพ" onClick={() => fileRef.current?.click()} />

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
  );
};

export default Inspectmobile;
