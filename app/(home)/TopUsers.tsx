import React from "react";
import { BsArrowUp } from "react-icons/bs";
import { ITopUser } from "./post/search/page";

const checkGender = (gender: string) => {
  if (gender === "F") return "bg-green-500";
  else if (gender === "M") return "bg-blue-500";
  else return "bg-slate-500";
};

const TopUsers = ({ ...topUser }: ITopUser) => {
  return (
    <div className="flex justify-between items-center my-4  min-h-[400px]">
      <div className="flex gap-2 items-center">
        <div
          className={`w-4 h-4 rounded-full ${checkGender(topUser.gender)}`}
        ></div>
        <h4 className="text-sm font-bold">
          {topUser.first_name} {""} {topUser.last_name.charAt(0).toUpperCase()}
        </h4>
      </div>
      {/* <div className="flex gap-1 items-center text-gray-500">
        <h6 className="text-[10px]">11.2k</h6>
        <BsArrowUp className="text-sm text-blue-600 font-extrabold" />
      </div> */}
    </div>
  );
};

export default TopUsers;
