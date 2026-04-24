import React from "react";
import CompletedModel from "../Component/CompletedModel/CompletedModel";
import SliderCard from "../Component/SliderCard/SliderCard";
import {  useNavigate } from "react-router-dom";
import { Pagepath } from ".";

const Home = () => {
  const navigator = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      
      {/* --- Section 1: Hero Banner แบบเต็มหน้าจอ (Full Screen) --- */}
      <div 
        className="w-full h-screen relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('/skin-rash.jpg')",
          backgroundAttachment: 'fixed' // ทำให้รูปนิ่งเวลาเลื่อน (Parallax effect) ดูพรีเมียมขึ้น
        }}
      >
        <div className="text-center px-6 z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-2xl mb-4 tracking-tight">
            SKIN <span className="text-green-400">AI</span>
          </h1>
          <p className="text-lg md:text-2xl text-white opacity-90 mb-8 max-w-lg drop-shadow-md font-light">
            นวัตกรรมวิเคราะห์โรคผิวหนังเบื้องต้น แม่นยำ รวดเร็ว ให้คุณดูแลตัวเองได้ง่ายกว่าที่เคย
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigator(Pagepath.inspect)}
              className="bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-12 rounded-full transition-all shadow-2xl active:scale-95 transform hover:scale-105"
            >
              เริ่มตรวจอาการตอนนี้
            </button>
          </div>

          {/* ลูกศรชี้ลง บอกให้รู้ว่าเลื่อนลงไปดูข้างล่างได้ */}
          <div className="absolute bottom-10 animate-bounce text-white opacity-70 hidden md:block">
            <p className="text-sm mb-2">เลื่อนดูข้อมูลเพิ่มเติม</p>
            <div className="w-1 h-10 bg-white mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* --- Section 2: เนื้อหาด้านล่าง (จะแสดงเมื่อเลื่อนลงมา) --- */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* หัวข้อข่าวสาร */}
        <div className="flex items-center mb-4 border-l-8 border-green-600 pl-4">
          <h2 className="text-2xl md:text-4xl font-black text-gray-800 uppercase tracking-tighter">
            Update <span className="text-green-600 text-lg md:text-xl font-normal block md:inline md:ml-2 italic">ข่าวสารสุขภาพ</span>
          </h2>
        </div>

        {/* ส่วน Slider Card */}
        <div className="mb-10 ">
          <SliderCard />
        </div>

        {/* --- Section 3: Feature Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="group bg-green-400 p-3 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all border border-green-600 flex flex-col items-center text-center">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📸</div>
            <h3 className="text-xl font-bold mb-2">ถ่ายภาพ</h3>
            <p className="text-gray-500">ถ่ายรูปบริเวณที่กังวล ให้เห็นรอยโรคชัดเจน</p>
          </div>
          
          <div className="group bg-green-400 p-3 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all border border-green-600 flex flex-col items-center text-center">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
            <h3 className="text-xl font-bold mb-2">วิเคราะห์</h3>
            <p className="text-gray-500">ระบบ AI เปรียบเทียบกับฐานข้อมูลนับหมื่นเคส</p>
          </div>
        </div>

        {/* --- Section 4: Bottom Action --- */}
        <div className=" text-center shadow-2xl mb-10 md:mb-0">

          <p className=" text-green-800 text-xs opacity-70">
            * คำเตือน: ระบบ AI เป็นเพียงผู้ช่วยวิเคราะห์เบื้องต้นเท่านั้น
          </p>
        </div>
      </div>

      <CompletedModel
        open={open}
        onClose={() => setOpen(false)}
        label="ระบบกำลังเข้าสู่โหมดการถ่ายภาพ"
      />
    </div>
  );
};

export default Home;