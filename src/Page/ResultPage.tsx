import { Pagepath } from ".";
import RTabbtn from "../Component/btns/ResultsBtn";
import { useLocation, Navigate } from "react-router-dom";

type PredictionState = {
  model_name: string;
  result: { [key: string]: number };
  file: string;
};

const ResultPage = () => {
  const location = useLocation();

  let state = location.state as PredictionState;

  if (!state) {
    const saved = localStorage.getItem("prediction");
    if (saved) {
      state = JSON.parse(saved);
    }
  }

  if (!state || !state.result) {
    return <Navigate to={Pagepath.home} replace />;
  }

  const { model_name, result, file } = state;

  return (
    <div className="min-h-screen flex flex-col items-center pb-20">
      
      <div className="w-full pt-10 sm:pt-20 text-center">
        <h1 className="text-4xl font-bold">ผลการคัดกรองโรค</h1>
        <p className="text-emerald-800 text-sm mt-1">
          วิเคราะห์ด้วย AI Model: {model_name}
        </p>
      </div>

      <div className="w-full max-w-2xl px-4">

        <div className="mt-6 w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
          <img
            className="h-full w-full object-cover"
            src={file}
            alt="result-preview"
          />
        </div>

        <div className="w-full mt-8 space-y-3">
          <p className="text-center text-gray-400 text-xs font-bold mb-4">
            ความน่าจะเป็นของแต่ละโรค
          </p>

          {Object.entries(result)
            .sort((a, b) => b[1] - a[1])
            .map(([label, value], index) => (
              <RTabbtn
                key={index}
                label={label}
                value={`${value}%`}
                isWinner={index === 0}
              />
            ))}
        </div>

        <div className="mt-10 p-6 bg-blue-50 rounded-2xl">
          <p className="text-blue-800 text-sm text-center">
            💡 ควรพบแพทย์เพื่อยืนยันผล
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResultPage;