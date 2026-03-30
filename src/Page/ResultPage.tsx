import RTabbtn from "../Component/btns/ResultsBtn";
import { useLocation } from "react-router-dom";

// 1. ปรับ Type ให้ตรงกับ State ที่ส่งมา
type PredictionState = {
  model_name: string;
  result: { [key: string]: number };
  file: File | string;
};

const ResultPage = () => {
  const location = useLocation();
  
  // ดึงค่าตามโครงสร้างที่ navigate ส่งมา
  const { model_name, result, file } = (location.state as PredictionState) || {};

  // ตรวจสอบกรณีไม่มีข้อมูล (ป้องกันหน้าขาว)
  if (!result) {
    return <div className="p-10 text-center text-red-500 font-bold">ไม่พบข้อมูลผลการวิเคราะห์</div>;
  }

  // จัดการรูปภาพ
  const imageUrl =
    typeof file === "string"
      ? file
      : file instanceof File
      ? URL.createObjectURL(file)
      : "/no-image.png";

  return (
    <div className="min-h-screen flex flex-col items-center  pb-20 ">
      
      {/* Header - ปรับให้กว้างเต็มที่บนมือถือ */}
      <div className="w-full pt-10 sm:pt-20   text-center ">
        <h1 className="text-4xl sm:text-3xl font-bold ">ผลการคัดกรองโรค</h1>
        <p className="text-emerald-800 text-sm mt-1">วิเคราะห์ด้วย AI Model: {model_name}</p>
      </div>

      <div className="w-full max-w-2xl px-4 sm:px-0">
        
        {/* ส่วนแสดงรูปภาพ - ปรับให้ใหญ่เต็มหน้าจอมือถือ */}
        <div className="mt-6 w-full aspect-square sm:w-96 sm:h-96 border-4 border-white rounded-[2rem] overflow-hidden mx-auto shadow-2xl">
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt="result-preview"
          />
        </div>

        {/* ส่วนแสดงผลลัพธ์ (Tabs) */}
        <div className="w-full mt-8 space-y-3">
          <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
            ความน่าจะเป็นของแต่ละโรค
          </p>
          
          {Object.entries(result)
            .sort((a, b) => b[1] - a[1]) // เรียงลำดับจาก % มากไปน้อย
            .map(([label, value], index) => (
              <div key={index} className="w-full transform transition hover:scale-[1.02]">
                <RTabbtn
                  label={`${label}`} 
                  // สมมติว่า Tabbtn รับ value หรือต้องการแสดง % ต่อท้ายชื่อ
                  value={`${value}%`} 
                  isWinner={index === 0} // โรคที่โอกาสสูงสุด
                />
              </div>
            ))}
        </div>

        {/* คำแนะนำเพิ่มเติม */}
        <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
           <p className="text-blue-800 text-sm leading-relaxed text-center">
             💡 <b>คำแนะนำ:</b> ผลลัพธ์ที่มีเปอร์เซ็นต์สูงสุดแสดงถึงความเป็นไปได้มากที่สุดตามฐานข้อมูลของ AI กรุณาพบแพทย์เพื่อรับการตรวจวินิจฉัยอย่างละเอียด
           </p>
        </div>

      </div>
    </div>
  );
};

export default ResultPage;