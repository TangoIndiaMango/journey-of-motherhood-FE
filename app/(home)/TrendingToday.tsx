import React from "react";
import { BsEye } from "react-icons/bs";

const TrendingToday = () => {
  return (
    <div className="flex justify-between items-center my-4 ">
      <div className="flex items-center gap-2 text-[12px] font-bold">
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <h4>Divorce</h4>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-gray-600">
        <BsEye />
        <h6>11.5k</h6>
      </div>
    </div>
  );
};

export default TrendingToday;
