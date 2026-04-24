import { useNavigate } from "react-router-dom";
import { Pagepath } from "../../Page";

interface TabbtnProps {
  label: string;
  value?: string;     // เพิ่มสิ่งนี้
  isWinner?: boolean; // เพิ่มสิ่งนี้
  timelabel?:string;
}

const RTabbtn = ({ label, value, isWinner }: TabbtnProps) => {
  
const navigate = useNavigate(); 
  return (
    <div
      className={`
        flex justify-between items-center 
        w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer
        ${isWinner 
          ? "bg-emerald-50 border-emerald-500 shadow-lg scale-[1.02]" 
          : "bg-white border-gray-100 text-gray-600 shadow-sm"
        }
      `}
      onClick={()=>{console.log(label)
        navigate(Pagepath.Precancer, {
        state: {  result: label, },
      });}}
    >
      <div className="flex flex-col">
        <span className={`text-sm font-bold uppercase tracking-tight ${isWinner ? "text-emerald-500" : "text-gray-400"}`}>
          {isWinner ? "ตรวจพบความเสี่ยงสูงสุด" : "ความเป็นไปได้รอง"}
        </span>
        <span className={`text-lg md:text-xl font-black ${isWinner ? "text-emerald-900" : "text-gray-700"}`}>
          {label}
        </span>
      </div>
      
      <div className="text-right">
        <span className={`text-2xl font-black ${isWinner ? "text-emerald-600" : "text-gray-400"}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default RTabbtn;