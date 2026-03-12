import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";

type ListItemProps = {
  email: string;
  name: string;
  lastname: string;
  dob: string;
  sex: string;
  from: string;
  role: string;

  onClick?: () => void;
};

const Maincarduser = ({
  email,
  name,
  lastname,
  dob,
  sex,
  from,
  role,
  onClick,
}: ListItemProps) => {
  return (
    <div
      role="button"
      onClick={() => onClick?.()}
      className={`
    group
    flex items-stretch justify-between
    w-6/12
    max-w-[500px]
    min-h-[45px]
    bg-white rounded-md
    shadow-md
    overflow-hidden
    cursor-pointer
    transition
    hover:shadow-lg
    select-none
  `}
    >
      {/* Green bar */}
      <div className="w-[10px] bg-green-700" />

      <div className="flex-1 px-4 py-4 text-sm md:text-lg font-medium text-gray-800 group-hover:text-green-600 space-y-2">
        <div className=" grid-cols-2 grid">
          <div>
            <div>{email}</div>
            <div>{name + " " + lastname}</div>
          </div>

          <div className="justify-self-center">
            <div>{from}</div>
            <div>{role}</div>
          </div>
        </div>
      </div>

      <div className="pr-4 text-gray-800 group-hover:text-green-600 place-self-center">
        <CaretRightOutlined />
      </div>
    </div>
  );
};

export default Maincarduser;
