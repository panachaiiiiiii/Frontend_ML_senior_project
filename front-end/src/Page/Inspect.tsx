import { useEffect, useRef, useState } from "react";
import Btn from "../Component/btns/Btn";
import { PagepathAPI } from "../Router/Path";
import { useNavigate } from "react-router-dom";
import { Pagepath } from ".";
import loading_state from "../Component/Loading/loading";
import { message } from "antd";
import Cropper from "react-easy-crop";

type PredictResponse = {
  model: string;
  result: { [key: string]: number };
};

type ModelItem = {
  name: string;
  enabled: boolean;
};

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

  // 🔥 crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const navigate = useNavigate();

  // 🔥 crop → file
  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<File> => {
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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        resolve(new File([blob], "cropped.jpg", { type: "image/jpeg" }));
      }, "image/jpeg");
    });
  };

  const onclick = async () => {
    if (!preview || !croppedAreaPixels) {
      message.error("กรุณา crop รูปก่อน");
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data: PredictResponse = await response.json();

      navigate(Pagepath.resultpage, {
        state: {
          model_name: data.model,
          result: data.result,
          file: croppedFile,
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error("เกิดข้อผิดพลาด");
      }
    } finally {
      setLoading(false);
    }
  };

  const getmodel = async () => {
    try {
      const res = await fetch(PagepathAPI.Model);
      const data = await res.json();

      const enabledModels = data.models
        .filter((m: ModelItem) => m.enabled)
        .map((m: ModelItem) => m.name);

      setModels(enabledModels);

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

      {/* hidden input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreview(url);

            // reset crop
            setCroppedPreview(null);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
          }
        }}
      />

      <div className="flex flex-col mt-8 items-center justify-center">
        <h1 className="text-[42px] md:text-[52px] font-bold text-green-800">
          คัดกรองโรค
        </h1>

        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">

          {/* 🔥 crop mode */}
          {preview && !croppedPreview && (
            <>
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-green-600">
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedPixels) =>
                    setCroppedAreaPixels(croppedPixels)
                  }
                  zoomWithScroll={true}
                  minZoom={1}
                  maxZoom={3}
                  objectFit="cover"
                  showGrid={true}
                />
              </div>

              {/* zoom slider */}
              <div className="w-full px-2">
                <p className="text-sm text-gray-600 mb-1">ปรับขนาดภาพ</p>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <Btn
                text="ยืนยัน Crop"
                onClick={async () => {
                  if (!preview || !croppedAreaPixels) return;
                  const file = await getCroppedImg(preview, croppedAreaPixels);
                  setCroppedPreview(URL.createObjectURL(file));
                }}
              />
            </>
          )}

          {/* 🔥 preview */}
          {croppedPreview && (
            <>
              <img
                src={croppedPreview}
                className="w-full aspect-square object-cover rounded-xl border-2 border-green-600"
              />

              <div className="flex gap-2">
                <Btn text="แก้ไขใหม่" onClick={() => setCroppedPreview(null)} />
                <Btn text="ส่งตรวจ" onClick={onclick} />
              </div>
            </>
          )}

          {/* model */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border border-green-600 p-2 rounded-lg w-full"
          >
            {models.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          {/* upload */}
          <Btn text="อัปโหลดรูปภาพ" onClick={() => fileRef.current?.click()} />
        </div>
      </div>
    </div>
  );
};

export default Inspect;