import React, { useRef, useState } from "react";
import Btn from "../Component/btns/Btn";

const Inspect = () => {
      const fileRef = useRef<HTMLInputElement>(null);
      const [preview, setPreview] = useState<string | null>(null)
  return (
    <div>
 <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
          }
        }}
      />
      <div className="hidden md:flex flex-col mt-8  items-center justify-center">
        {/* Title */}

        <h1 className="text-[52px]  font-bold text-green-800">
          คัดกรองโรค
        </h1>

        <div className="flex flex-col">

          {/* Content */}
          
          <div className=" flex flex-col items-center text-center gap-6 text-lg">
            {preview ?<img
                  src={preview}
                  alt="preview"
                  className="w-full h-96 rounded-xl object-cover border-2 border-green-600"
                />:"No image selected"}
            {/* Upload button */}
            <div className="flex gap-4">
            <Btn
              text="อัปโหลดรูปภาพ"
              onClick={() => {
  console.log(fileRef.current);
  fileRef.current?.click();
}}
            />
              <div className={preview?"block":"hidden"}>
              <Btn text="ยืนยัน" onClick={()=>{}} />
              </div>
            </div>
            {/* Example images */}
            <div className="flex gap-4 mt-2 ">
              {["/ex1.jpg", "/ex1.jpg", "/ex1.jpg"].map((src, i) => (
                <div key={i} className="border-2 border-green-600 rounded-lg overflow-hidden"> 
                <img
                  
                  src={src}
                  alt={`example-${i}`}
                  className="w-20 h-20 rounded-lg object-cover   "
                /></div>
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
