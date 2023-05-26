import React from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { getRelativeTime, makeFriendly } from "@/services/variables";
import { Avatar } from "antd";

const CommentReplies = ({ comment }: any) => {
  return (
    <div className="relative p-4 border-b-white border-b-[1px] min-h-fit">
      <span className="absolute left-3 top-4 flex flex-col gap-2 ">
        <Avatar>
          {comment?.user?.first_name.toUpperCase().charAt(0) +
            comment?.user?.last_name.toUpperCase().charAt(0)}
        </Avatar>
        {/* <div className="span flex flex-col gap-1 items-center justify-center">
          <BsArrowUp className="text-gray-600" />
          <h6 className="text-xs text-black font-bold">253</h6>
          <BsArrowDown className="text-red-500" />
        </div> */}
      </span>
      <div className="pl-10">
        <div className="flex justify-between items-start">
          <div className="flex item-center flex-col gap-2 md:flex-row md:gap-[20px]">
            <h5 className="text-xs font-bold flex items-center gap-2">
              <span className="text-xs">
                {comment?.user?.first_name.toUpperCase()}
              </span>
              <span className="text-xs">
                {comment?.user?.last_name.toUpperCase()}
              </span>
            </h5>
          </div>

          <h6 className="text-gray-600 text-[8px]">
            {getRelativeTime(comment?.created_at)}
          </h6>
        </div>

        <p className="text-[10px] my-3">{comment?.text}</p>

        {/* <div className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <h6 className="text-[10px] text-gray-500">Reply</h6>
            <h6 className="text-[10px] text-gray-500">Share</h6>
            <h6 className="text-[10px] text-gray-500">Report</h6>
          </span>
          <span className="flex items-center gap-6">
            <MdOutlineMoreHoriz className="text-gray-500" />
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default CommentReplies;
