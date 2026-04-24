
type NewsItem = {
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
};

const newsList: NewsItem[] = [

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
];
export default function SliderCard() {




  return (
<div className="mb-10  from-blue-100 via-white to-blue-100 p-6 rounded-3xl overflow-x-scroll">


  <div className="flex overflow-x-auto space-x-4 pb-2">
    {newsList.map((news, index) => (
      <div
        key={index}
        className="min-w-[320px] rounded-2xl shadow p-5 bg-green-200"
      >
        <h3 className="font-semibold text-lg mb-2">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {news.summary}
        </p>

        <div className="flex justify-between text-xs text-gray-400 mb-3">
          <span>{news.source}</span>
          <span>{news.date}</span>
        </div>

        <a
          href={news.url}
          target="_blank"
          className="block text-center bg-green-600 text-white py-2 rounded-xl"
        >
          อ่านต่อ →
        </a>
      </div>
    ))}
  </div>
</div>

  );
}
