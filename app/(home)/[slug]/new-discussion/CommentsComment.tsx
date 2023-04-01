import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const CommentsComment = ({ comment }: any) => {
  return (
    <div className="relative p-4">
      <span className="absolute left-3 top-4 flex flex-col gap-2 ">
        <span className="w-8 h-8 rounded-full bg-black block"></span>
        <div className="span flex flex-col gap-1 items-center">
          <BsArrowUp className="text-gray-600" />
          <h6 className="text-xs text-black font-bold">253</h6>
          <BsArrowDown className="text-red-500" />
        </div>
      </span>
      <div className="pl-10">
        <div className="flex justify-between items-start">
          <div className="flex item-center flex-col gap-2 md:flex-row md:gap-[20px]">
            <h5 className="text-xs font-bold">Sikemi Adedamola</h5>
          </div>

          <h6 className="text-gray-600 text-[8px]">15hr ago</h6>
        </div>

        <p className="text-[10px] my-3">{comment?.content}</p>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <h6 className="text-[10px] text-gray-500">Reply</h6>
            <h6 className="text-[10px] text-gray-500">Share</h6>
            <h6 className="text-[10px] text-gray-500">Report</h6>
          </span>
          <span className="flex items-center gap-6">
            <MdOutlineMoreHoriz className="text-gray-500" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentsComment;
