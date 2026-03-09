import React from "react";

const loading_state = (label:string) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl flex flex-col items-center gap-4 shadow-xl">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-800 font-semibold text-lg">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default loading_state;
