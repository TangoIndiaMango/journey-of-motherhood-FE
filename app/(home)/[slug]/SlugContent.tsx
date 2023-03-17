import React from "react";
import { BsChat, BsEye } from "react-icons/bs";

const HashTag = ({ word = "alimony", color = "tomato" }) => (
  <div
    className="flex items-center text-[8px] text-[black] font-bold p-1 w-fit"
    style={{ background: color }}
  >
    # {word}{" "}
  </div>
);

const SlugContent = () => {
  return (
    <div className="card flex justify-between border-b-[1px] border-b-gray-300">
      <div className="flex gap-2">
        <div className="w-fit">
          <div className="w-8 h-8 rounded-full bg-gray-400"></div>
        </div>
        <div className="">
          <h4 className="text-sm font-bold">Lorem ipsum dolor sit ?</h4>
          <h5 className="text-gray-500 text-[10px]">by Kemi Alade</h5>
          <div className="flex gap-4 text-gray-500 my-2">
            <div className="flex items-center gap-2 ">
              <BsEye /> <span className="text-[10px]">Views</span>{" "}
              <span className="text-[10px]">121,197</span>
            </div>
            <div className="flex items-center gap-2 ">
              <BsChat /> <span className="text-[10px]">Comments</span>{" "}
              <span className="text-[10px]">121,197</span>
            </div>
          </div>
          <div className="flex gap-2 item-center mt-4">
            <HashTag />
            <HashTag word="aspiration" color="yellow" />
            <HashTag word="children" color="gray" />
          </div>
        </div>
      </div>

      <div className="text-[11px] text-gray-500 flex gap-2 self-center">
        <h5>23d</h5>
        <h6>ago</h6>
      </div>
    </div>
  );
};

export default SlugContent;
