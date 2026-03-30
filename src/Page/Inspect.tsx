import { useEffect, useRef, useState } from "react";
import { PagepathAPI } from "../Router/Path";
import { useNavigate } from "react-router-dom";
import { Pagepath } from ".";
import loading_state from "../Component/Loading/loading";
import { message } from "antd";
import Cropper from "react-easy-crop";
import { 
  CloudUploadOutlined, 
  ScissorOutlined, 
  SendOutlined, 
  RedoOutlined 
} from "@ant-design/icons";

// --- Types ---
type PredictResponse = {
  model_name: string;
  result: { [key: string]: number };
};

type ModelItem = {
  name: string;
  enabled: boolean;
};

interface ModelApiResponse {
  models: ModelItem[];
}

type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const Inspect = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const navigate = useNavigate();

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<File> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx?.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(new File([blob], "cropped.jpg", { type: "image/jpeg" }));
      }, "image/jpeg");
    });
  };

  const handlePredict = async () => {
    if (!preview || !croppedAreaPixels) {
      message.error("กรุณาตรวจสอบรูปภาพอีกครั้ง");
      return;
    }
    const token = sessionStorage.getItem("Token");
    try {
      setLoading(true);
      const croppedFile = await getCroppedImg(preview, croppedAreaPixels);
      const formData = new FormData();
      formData.append("file", croppedFile);
      formData.append("model_name", model);

      const response = await fetch(PagepathAPI.Predict, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("การส่งข้อมูลล้มเหลว");
      const data: PredictResponse = await response.json();

      navigate(Pagepath.resultpage, {
        state: { model_name: data.model_name, result: data.result.result, file: croppedFile },
      });
    } catch (err) {
      message.error(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getmodel = async () => {
      try {
        setLoading(true)
        const res = await fetch(PagepathAPI.Model);
        const data: ModelApiResponse = await res.json();
        const enabledModels = data.models
          .filter((m: ModelItem) => m.enabled)
          .map((m: ModelItem) => m.name);
          
        setModels(enabledModels);
        if (enabledModels.length > 0) setModel(enabledModels[0]);
        setLoading(false)
      } catch (err) {
        console.error(err);
        message.error("โหลดข้อมูลโมเดลไม่สำเร็จ");
      }
    };
    getmodel();
  }, []);

  return (
    // ปรับลด Padding ของ Container หลักบนมือถือให้เป็น 0
    <div className="min-h-full sm:pt-4 sm:pb-2 sm:px-2">
      {loading && loading_state("ระบบกำลังประมวลผลด้วย AI...")}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
            setCroppedPreview(null);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
          }
        }}
      />

      {/* 
        ปรับปรุงจุดนี้: 
        - บนมือถือ (default): w-full (เต็มจอ), rounded-none (ไม่มีมุมโค้ง), border-none, shadow-none 
        - บนคอม (sm:): max-w-2xl, mx-auto, rounded-3xl, shadow-2xl, border
      */}
      <div className=" mb-0 sm:mb-0 sm:mt-14 w-full sm:max-w-2xl sm:mx-auto bg-white/95 backdrop-blur-sm sm:rounded-3xl sm:shadow-2xl overflow-hidden sm:border border-gray-100 min-h-screen sm:min-h-0">
        
        {/* Header - บนมือถือให้พื้นหลังเข้มและเต็มขอบ */}
        <div className="bg-green-600 p-1  sm:p-4 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-black mb-3">เริ่มการคัดกรอง</h1>
          <p className="opacity-90 font-light text-sm md:text-lg px-2">อัปโหลดภาพถ่ายผิวหนังเพื่อให้ AI วิเคราะห์</p>
        </div>

        <div className="p-4 md:p-10 flex flex-col gap-4">
          
          {/* 1. Model Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">เลือกโหมดการวิเคราะห์</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-gray-100 border-none p-4 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition text-lg font-medium"
            >
              {models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* 2. Content Area */}
          {!preview ? (
            <div 
              onClick={() => fileRef.current?.click()}
              className="border-4 border-dashed border-gray-200 rounded-[2rem] py-20 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all group"
            >
              <div className="bg-green-100 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-sm">
                <CloudUploadOutlined className="text-5xl text-green-600" />
              </div>
              <p className="text-xl font-black text-gray-700">แตะเพื่ออัปโหลดรูปภาพ</p>
              <p className="text-sm text-gray-400 mt-2">รองรับไฟล์ JPG และ PNG</p>
            </div>
          ) : !croppedPreview ? (
            <div className="space-y-8">
              {/* Cropper Box - ใหญ่เต็มพื้นที่หน้าจอมือถือ */}
              <div className="relative w-full aspect-square sm:max-h-[500px] rounded-[2rem] overflow-hidden shadow-2xl bg-black border-4 border-white">
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                  showGrid={true}
                />
              </div>
              
              {/* Zoom Control - ปรับให้ขนาดใหญ่ขึ้นสำหรับนิ้วมือ */}
              <div className="bg-gray-100 p-6 rounded-2xl">
                <div className="flex justify-between text-xs text-gray-500 mb-4 font-bold uppercase">
                  <span>ขยายภาพ (Zoom)</span>
                  <span className="text-green-600">{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                   onClick={() => setPreview(null)}
                   className="flex-1 py-5 px-6 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 active:bg-gray-100 flex items-center justify-center gap-2 order-2 sm:order-1 text-lg"
                >
                  <RedoOutlined /> เปลี่ยนรูป
                </button>
                <button 
                   onClick={async () => {
                     if (preview && croppedAreaPixels) {
                       const file = await getCroppedImg(preview, croppedAreaPixels);
                       setCroppedPreview(URL.createObjectURL(file));
                     }
                   }}
                   className="flex-1 py-5 px-6 rounded-2xl bg-green-600 text-white font-bold shadow-xl active:bg-green-700 flex items-center justify-center gap-2 order-1 sm:order-2 text-lg"
                >
                  <ScissorOutlined /> ยืนยันรูปภาพนี้
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-center">
              <div className="relative inline-block w-full">
                <img
                  src={croppedPreview}
                  className="w-full aspect-square object-cover rounded-[2rem] border-8 border-green-50 shadow-2xl"
                  alt="Cropped Preview"
                />
                <div className="absolute -top-4 -right-4 bg-green-600 text-white p-4 rounded-full shadow-lg border-4 border-white">
                   <ScissorOutlined className="text-xl" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setCroppedPreview(null)}
                  className="flex-1 py-5 px-6 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold active:bg-gray-100 transition order-2 sm:order-1 text-lg"
                >
                  แก้ไขรูปภาพ
                </button>
                <button 
                  onClick={handlePredict}
                  className="flex-1 py-5 px-6 rounded-2xl bg-green-600 text-white font-black text-xl shadow-2xl active:bg-green-800 flex items-center justify-center gap-3 transition transform active:scale-95 order-1 sm:order-2"
                >
                  <SendOutlined /> ส่งวิเคราะห์ทันที
                </button>
              </div>
            </div>
          )}

          {/* Footer Warning */}
          <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl flex gap-4 mt-4">
             <span className="text-yellow-600 text-2xl">⚠️</span>
             <p className="text-xs md:text-sm text-yellow-800 leading-relaxed">
                <b>ข้อควรระวัง:</b> กรุณาใช้ภาพที่มีแสงสว่างชัดเจน ไม่เบลอ เพื่อความแม่นยำสูงสุด <b>ผลลัพธ์จากระบบ AI เป็นเพียงการประเมินเบื้องต้นเท่านั้น</b> ไม่สามารถทดแทนการวินิจฉัยจากแพทย์ได้
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspect;