
import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";

type ListItemProps = {
  label: string;
  active?: boolean;
  muted?: boolean;
};
const Tabbtn = ({ label, muted }: ListItemProps) => {
  return (
    <div
    tabIndex={0}
      className={`
        group
        flex items-center justify-between
         w-5/12 h-[45px] md:w-[359px] md:h-[64px]
        bg-white rounded-md
        shadow-md
        overflow-hidden
        cursor-pointer
        transition
        hover:shadow-lg 

      `}
    >
      {/* Green left bar */}
      <div className="w-[8px] h-full bg-green-700" />

      {/* Content */}
      <div className="flex-1 px-4 ">
        <span
          className={`
            text-sm md:text-lg font-medium 
            ${muted ? "text-gray-400" : "text-gray-800 group-hover:text-green-600 group-focus:text-green-800"}
          `}
        >
          {label}
        </span>
      </div>

      {/* Right arrow */}
      <div className="pr-4 text-gray-800 group-hover:text-green-600 group-focus:text-green-800">
        <CaretRightOutlined />
      </div>
    </div>
  )
}

export default Tabbtn
