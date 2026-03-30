
import { useLocation, useNavigate } from "react-router-dom";
import { Pagepath } from ".";
import { CaretRightOutlined, ClockCircleOutlined, ExperimentOutlined } from "@ant-design/icons";


type HistoryItem = {
  prediction: {
    model: string;
    result: { [key: string]: number };
  };
  created_at: string;
  image_url?: string;
};

type HistoryState = {
  data: Record<string, HistoryItem>;
};

const History = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const history = location.state as HistoryState;

  console.log(history);

  return (
    <div className="min-h-screen w-full md:w-1/3 mx-auto pb-32">
      
      {/* Header Section: ปรับ Padding ให้เหมาะกับมือถือ */}
      <div className="pt-16 md:pt-24 mb-6 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
          ประวัติการคัดกรอง
        </h1>
        <p className="text-gray-500 text-sm">รายการวิเคราะห์ผิวหนังย้อนหลังของคุณ</p>
      </div>

      {/* List Container */}
      <div className="flex flex-col w-full px-2 md:px-0">
        {Object.keys(history.data).length === 0 ? (
          <div className="py-40 text-center text-gray-400 font-medium">
            <p>ไม่พบประวัติการใช้งาน</p>
          </div>
        ) : (
          Object.entries(history.data)
            .sort((a, b) => new Date(b[1].created_at).getTime() - new Date(a[1].created_at).getTime())
            .map(([id, value]) => {
              const { model, result } = value.prediction;
              const [name, percent] = Object.entries(result).reduce((a, b) => (a[1] > b[1] ? a : b));
              
              const date = new Date(value.created_at);
              const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
              const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

              return (
                <div
                  key={id}
                  onClick={() => navigate(Pagepath.resultpage, { 
                    state: { model_name: model, result, file: value.image_url || "/default.jpg" } 
                  })}
                  className="
                    relative flex items-center bg-white 
                    border-b border-gray-100 p-4 md:p-5 
                    active:bg-gray-50 
                    /* บนมือถือขอบจะไม่มนมากเพื่อให้ดูเต็มจอ บนคอมให้เป็น Card */
                    md:mx-6 md:rounded-2xl md:mb-4 md:border-none md:shadow-sm 
                    group cursor-pointer transition-all
                  "
                >
                  {/* Image Preview: ปรับขนาดให้เล็กลงนิดนึงบนมือถือเพื่อเพิ่มพื้นที่ข้อความ */}
                  <div className="w-14 h-14 md:w-40 md:h-28 rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-inner">
                    <img 
                      src={value.image_url || "/484559610_1157118856425292_3226630206637606924_n_60b31a2dcd.jpg"} 
                      alt="history" 
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>

                  {/* Information Detail */}
                  <div className="flex-1 ml-4 md:ml-5 overflow-hidden">
                    <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1">
                      <span className="flex items-center text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <ClockCircleOutlined className="mr-1" />
                        {formattedDate} • {formattedTime}
                      </span>
                      <span className="flex items-center bg-emerald-50 text-emerald-600 text-[8px] md:text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase border border-emerald-100">
                        <ExperimentOutlined className="mr-1" />
                        {model}
                      </span>
                    </div>
                    
                    <h3 className="text-base md:text-lg font-extrabold text-gray-800 leading-tight truncate">
                      {name}
                    </h3>
                    
                    <div className="flex items-center mt-1.5">
                      <div className="h-1.5 md:h-2 w-full max-w-[80px] md:max-w-[120px] bg-gray-100 rounded-full overflow-hidden mr-2 md:mr-3">
                        <div 
                          className="h-full bg-emerald-500 rounded-full shadow-green-900" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs md:text-sm font-black text-emerald-600">{percent}%</span>
                    </div>
                  </div>

                  {/* Navigation Arrow */}
                  <div className="ml-2 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                    <CaretRightOutlined className="text-base md:text-lg" />
                  </div>

                  {/* Accent Line (Desktop Only) */}
                  <div className="absolute left-0 top-0 h-full bottom-1/4 w-1 bg-emerald-500 rounded-r-full hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

export default History;
