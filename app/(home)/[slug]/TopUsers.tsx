import React from "react";
import { BsArrowUp } from "react-icons/bs";

const TopUsers = ({ name = "Adenike M." }) => {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-2 items-center">
        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
        <h4 className="text-sm font-bold">{name}</h4>
      </div>
      <div className="flex gap-1 items-center text-gray-500">
        <h6 className="text-[10px]">11.2k</h6>
        <BsArrowUp className="text-sm text-blue-600 font-extrabold" />
      </div>
    </div>
  );
};

export default TopUsers;
