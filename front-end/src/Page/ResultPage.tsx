import React from "react";
import Tabbtn from "../Component/btns/Tabbtn";
import { useLocation } from "react-router-dom";

type PredictionResult = {
  data: { [key: string]: number };
  file?: File;
};

const ResultPage = () => {
  const location = useLocation();
  const { data, file } = location.state as PredictionResult;

  const imageUrl =
  typeof file === "string"
    ? file
    : file
    ? URL.createObjectURL(file)
    : "/no-image.png";

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="mt-6">
        <p className="text-3xl">ผลการคัดกรองโรค</p>
      </div>

      <div className="mt-2">
        <div className="sm:w-80 sm:h-80 border-3 border-green-800 rounded-xl overflow-hidden mx-auto">
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt="result"
          />
        </div>

        <div className="flex flex-col items-center mt-4 gap-3">
          {Object.entries(data)
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