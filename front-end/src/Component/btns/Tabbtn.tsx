import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";

type ListItemProps = {
  label: string;
  onClick?: () => void;
  muted?: boolean;
};

const Tabbtn = ({ label, muted, onClick }: ListItemProps) => {
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
        h-[45px] md:h-[64px]
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
      <div className="w-[8px] h-full bg-green-700" />

      <div className="flex-1 px-4">
        <span
          className={`text-sm md:text-lg font-medium
            ${muted
              ? "text-gray-400"
              : "text-gray-800 group-hover:text-green-600"}
          `}
        >
          {String(label)}
        </span>
      </div>

      {!muted && (
        <div className="pr-4 text-gray-800 group-hover:text-green-600">
          <CaretRightOutlined />
        </div>
      )}
    </div>
  );
};

export default Tabbtn;
