import React from "react";
import ResultsBtn from "../Component/btns/ResultsBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagepath } from ".";

type Prediction = Record<string, number>;

type HistoryItem = {
  prediction: Prediction;
  created_at: string;
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
    <div className="min-h-screen flex flex-col items-center">
      <div className="mt-32">
        <p className="text-3xl">ประวัติการคัดกรองโรค</p>
      </div>

      <div className="md:w-3/5 mx-auto min-h-96 gap-3 flex flex-col mt-6">
        {Object.entries(history.data).map(([id, value]) => {
          const [name, percent] = Object.entries(value.prediction).reduce(
            (a, b) => (a[1] > b[1] ? a : b),
          );

          const date = new Date(value.created_at);

          const formattedTime = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date
            .getFullYear()
            .toString()
            .slice(-2)} (${date.getHours().toString().padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")})`;

          return (
            <ResultsBtn
              key={id}
              timelabel={formattedTime}
              resultlabel={`${name} : ${percent}%`}
              picref="/484559610_1157118856425292_3226630206637606924_n_60b31a2dcd.jpg"
              onClick={() =>
                navigate(Pagepath.resultpage, {
                  state: {
                    data: value.prediction,
                    file: "/484559610_1157118856425292_3226630206637606924_n_60b31a2dcd.jpg",
                  },
                })
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default History;
