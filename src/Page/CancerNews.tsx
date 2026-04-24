import React from "react";

type NewsItem = {
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
};

const newsList: NewsItem[] = [
  {
    title: "ยาใหม่รักษามะเร็งผิวหนังให้ผลลัพธ์ดี",
    summary:
      "การทดลองทางคลินิกพบว่ายาใหม่ช่วยเพิ่มอัตราการรอดชีวิตของผู้ป่วยมะเร็งผิวหนังชนิด Melanoma",
    source: "Reuters",
    date: "เม.ย. 2026",
    url: "https://www.reuters.com/business/healthcare-pharmaceuticals/ideaya-eye-cancer-drug-meets-main-goal-mid-to-late-stage-trial-2026-04-13/",
  },
  {
    title: "FDA ยังไม่อนุมัติยารักษามะเร็งผิวหนังบางชนิด",
    summary:
      "องค์การอาหารและยา (FDA) ปฏิเสธการอนุมัติยา เนื่องจากข้อมูลยังไม่เพียงพอ",
    source: "Reuters",
    date: "เม.ย. 2026",
    url: "https://www.reuters.com/legal/litigation/us-fda-declines-approve-replimunes-drug-advanced-skin-cancer-2026-04-10/",
  },
  {
    title: "จำนวนผู้ป่วย Melanoma เพิ่มขึ้นทั่วโลก",
    summary:
      "รายงานล่าสุดระบุว่าผู้ป่วยมะเร็งผิวหนังเพิ่มขึ้นอย่างต่อเนื่องจากรังสี UV",
    source: "Health Report",
    date: "2026",
    url: "https://www.allure.com/story/invasive-melanoma-skin-cancer-rates-rising",
  },
  {
    title: "พฤติกรรมตากแดดเพิ่มความเสี่ยงมะเร็งผิวหนัง",
    summary:
      "ผู้เชี่ยวชาญเตือนว่าการไม่ป้องกันแสงแดดเป็นปัจจัยเสี่ยงสำคัญ",
    source: "Medical News",
    date: "2026",
    url: "https://nypost.com/2026/01/23/health/black-tumor-cancer-diagnoses-predicted-to-increase-by-11/",
  },
  {
    title: "นาโนเทคโนโลยีช่วยรักษามะเร็งผิวหนัง",
    summary:
      "นักวิจัยพัฒนาอนุภาคทองคำเพื่อทำลายเซลล์มะเร็งได้แม่นยำขึ้น",
    source: "Science Research",
    date: "2026",
    url: "https://timesofindia.indiatimes.com/city/hyderabad/iit-hs-gold-coated-nanoparticles-offer-dual-strike-on-skin-cancer/articleshow/126709602.cms",
  },
];

const SkinCancerNews: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-2">
        🧴 ข่าวมะเร็งผิวหนังล่าสุด 2026
      </h1>
      <p className="text-center text-gray-600 mb-8">
        อัปเดตข่าวเกี่ยวกับ Melanoma งานวิจัย และแนวโน้มผู้ป่วย
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {newsList.map((news, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
            <p className="text-gray-600 mb-4">{news.summary}</p>

            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>{news.source}</span>
              <span>{news.date}</span>
            </div>

            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              อ่านต่อ →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinCancerNews;