import { useLocation } from "react-router-dom";

type Result ={
  title: string;
  sub_title: string;
  ex: {head:string,content:string}[]
  how: string[];
}
const theresult: Result[] = [
  {
    title: "โรคผิวหนังระยะก่อนเป็นมะเร็ง",
    sub_title:
      "คือภาวะที่ยังไม่ใช่มะเร็ง แต่มีโอกาสพัฒนาไปเป็นมะเร็งผิวหนังในอนาคต โดยเฉพาะจากแสง UV",
    ex: [
      {
        head: "Actinic keratosis",
        content:
          "เกิดจากแดดสะสม ลักษณะเป็นผื่นหยาบ สีแดง/น้ำตาล คล้ายกระดาษทราย พบบริเวณหน้า ศีรษะ หู หลังมือ",
      },
      {
        head: "Leukoplakia",
        content:
          "ปื้นขาวในปาก ลิ้น หรือริมฝีปาก เกี่ยวข้องกับการระคายเคืองเรื้อรัง เช่น สูบบุหรี่",
      },
    ],
    how: [
      "DNA ถูกทำลายจากรังสี UV",
      "เกิดการกลายพันธุ์ของเซลล์",
      "เซลล์ผิดปกติแต่ยังไม่ลุกลาม",
    ],
  },

  {
    title: "เนื้องอกผิวหนังชนิดไม่ร้ายแรง",
    sub_title:
      "เป็นก้อนหรือรอยโรคที่ไม่ใช่มะเร็ง ไม่ลุกลาม และไม่แพร่กระจาย ส่วนใหญ่ไม่อันตราย",
    ex: [
      {
        head: "Melanocytic nevus (ไฝ)",
        content: "ก้อนเม็ดสี พบบ่อย สีน้ำตาลหรือดำ ขอบชัด",
      },
      {
        head: "Seborrheic keratosis",
        content: "ผิวหนา สีคล้ำ ลักษณะเหมือนแปะอยู่บนผิว พบในผู้สูงอายุ",
      },
      {
        head: "Lipoma",
        content: "ก้อนไขมันใต้ผิวหนัง นิ่ม เคลื่อนได้ ไม่เจ็บ",
      },
    ],
    how: [
      "ไม่ลุกลาม (non-invasive)",
      "ไม่แพร่กระจาย (non-metastasis)",
      "มักโตช้าหรือคงที่",
    ],
  },

  {
    title: "กลุ่มโรคมะเร็งผิวหนัง",
    sub_title:
      "เป็นโรคที่เซลล์ผิวหนังเจริญเติบโตผิดปกติ สามารถลุกลามและแพร่กระจายได้",
    ex: [
      {
        head: "Basal cell carcinoma (BCC)",
        content: "พบบ่อย โตช้า ลักษณะเป็นก้อนใส ขอบมันวาว",
      },
      {
        head: "Squamous cell carcinoma (SCC)",
        content: "ก้อนแข็ง ผิวขรุขระ อาจลุกลามได้",
      },
      {
        head: "Melanoma",
        content: "รุนแรงที่สุด สีไม่สม่ำเสมอ ขอบไม่เรียบ โตเร็ว",
      },
    ],
    how: [
      "DNA เสียหายจากรังสี UV",
      "เซลล์แบ่งตัวผิดปกติ",
      "ลุกลามและแพร่กระจาย (metastasis)",
    ],
  },
];
type PredictionState = {
  result: string;
};
const Precancer = () => {
  const location = useLocation();
  const { result } = (location.state as PredictionState) || {};
  const data = theresult.find((item) => item.title === result);

  if (!data) {
    return <div className="p-10">ไม่พบข้อมูล</div>;
  }

  return (
    <div className="min-h-screen w-full mx-auto pb-20 md:pb-32">
      <div className="pt-14 md:pt-24 px-4 md:px-6 max-w-4xl mx-auto">

        <div className="bg-green-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 mb-4">
            {data.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-6">
            {data.sub_title}
          </p>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
            ตัวอย่างสำคัญ
          </h2>

          <ul className="space-y-4">
            {data.ex.map((item, index) => (
              <li key={index} className="bg-white/60 rounded-xl p-4">
                <p className="font-semibold">{item.head}</p>
                <p className="text-gray-600">{item.content}</p>
              </li>
            ))}
          </ul>

          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-8 mb-3">
            กลไกการเกิด
          </h2>

          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {data.how.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Precancer;