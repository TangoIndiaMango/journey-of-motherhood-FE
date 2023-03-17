import React from "react";
import { BsChat, BsEyeFill } from "react-icons/bs";

const ForumTopics = () => {
  return (
    <div className="card flex gap-2 border-b-[1px] border-l-gray-300 flex-col lg:flex-row">
      <div className="flex items-center justify-between gap-4 ">
        <div className="w-11">
          <div className="w-10 h-10 rounded-full bg-black"></div>
        </div>
        <div className="">
          <h3 className="text-[var(--primaryColor)]">Divorce and Breakups</h3>
          <p className="text-[10px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id,
            laudantium.
          </p>
        </div>
        <div className="flex gap-2 ">
          <span className="">
            <BsEyeFill className="text-blue-500" />
            <p className="text-xs mt-1">56.7k</p>
          </span>
          <span className="">
            <BsChat className="text-green-500" />
            <p className="text-xs mt-1">11.5k</p>
          </span>
        </div>
      </div>
      <div className="lg:w-1/3 text-xs pl-11 lg:pl-0 mt-2 lg:mt-0">
        <h4 className=" pl-2 font-bold">Recent Post</h4>
        <div className="flex text-xs mt-2 px-2 lg:grid gap-2 w-full lg:border-l-[1px] lg:border-l-gray-300">
          <h3 className="text-[var(--primaryColor)] text-[9px] w-full">
            Lorem, ipsum dolor.
          </h3>
          <div className="flex items-center gap-2 w-full text-right">
            <h6 className="text-[7px]">12 mins ago</h6>
            <div className="w-5 h-5 rounded-full bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumTopics;
