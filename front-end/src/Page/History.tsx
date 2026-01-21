import React from "react";
import ResultsBtn from "../Component/btns/ResultsBtn";

const History = () => {
  return (
    <div className="min-h-screen flex flex-col  items-center ">
      <div className="mt-32">
        <p className="text-3xl">ประวัติการคัดกรองโรค</p>
      </div>
      <div className="md:w-3/5 mx-auto min-h-96 gap-3 flex flex-col mt-6">
        <ResultsBtn
          timelabel="10:00"
          resultlabel="Result1"
          picref="..\public\484559610_1157118856425292_3226630206637606924_n_60b31a2dcd.jpg"
        />
        
      </div>
    </div>
  );
};

export default History;
