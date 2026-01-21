import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";

type ListItemProps = {
  timelabel: string;
  onClick?: () => void;
  resultlabel: string;
  picref: string;
  muted?: boolean;
};

const ResultsBtn = ({
  timelabel,
  resultlabel,
  picref,
  muted,
  onClick,
}: ListItemProps) => {
  return (
    <div
      role="button"
      tabIndex={muted ? -1 : 0}
      onClick={() => {
        if (!muted) {
          onClick?.();
        }
      }}
      className={`
        group
        flex items-center justify-between
        w-full
        h-[65px] md:h-[120px]
        bg-white rounded-md
        shadow-md
        overflow-hidden
        ${muted ? "cursor-default" : "cursor-pointer"}
        transition
        hover:shadow-lg
        select-none
      `}
    >
      {/* Green bar */}
      <div className="w-[8px] md:w-[20px] h-full bg-green-700" />

      <div className="flex-1 px-4">
        <div className="flex flex-row items-center gap-4">
        <div className="w-1/4 h-[55px] md:h-[100px] border-2 border-black rounded-xl overflow-hidden">
            <img className="h-full w-96 object-cover " src={picref} alt="s" />
        </div>
          
          <div className="flex flex-col">
            <span className={`text-sm md:text-lg font-medium text-green-600`}>
              {timelabel}
            </span>
            <span className={`text-xs md:text-sm font-medium `}>
              {resultlabel}
            </span>
          </div>
        </div>
      </div>

      {!muted && (
        <div className="pr-4 text-gray-800 group-hover:text-green-600">
          <CaretRightOutlined />
        </div>
      )}
    </div>
  );
};

export default ResultsBtn;
