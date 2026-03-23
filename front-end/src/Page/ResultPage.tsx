
import Tabbtn from "../Component/btns/Tabbtn";
import { useLocation } from "react-router-dom";

type PredictionResult = {
  result: { [key: string]: number };
  file?: File | string;
};

const ResultPage = () => {
  const location = useLocation();
  const { result, file } = location.state as PredictionResult;
  console.log(result)
  const imageUrl =
  typeof file === "string"
    ? file
    : file
    ? URL.createObjectURL(file)
    : "/no-image.png";

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="mt-6">
        
        <p className="text-xl sm:text-3xl">ผลการคัดกรองโรค จากโมเดล {result.model}</p>
        
        
      </div>

      <div className="mt-2">
        <div className="w-3/6 sm:w-80 sm:h-80 border-3 border-green-800 rounded-xl overflow-hidden mx-auto">
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt="result"
          />
        </div>

        <div className="w-3/6 sm:w-full mx-auto flex flex-col items-center mt-4 gap-3">
          {Object.entries(result.result)
            .sort((a, b) => b[1] - a[1])
            .map(([label, value], index) => (
              <Tabbtn key={index} label={`${label} ${value}%`} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;