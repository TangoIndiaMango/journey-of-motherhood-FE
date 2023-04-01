import {
  getRelativeTime,
  intlFormat,
  makeFriendly,
} from "@/services/variables";
import { Avatar } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { BsChat, BsEyeFill } from "react-icons/bs";

const ForumTopics = ({ ...item }) => {
  const router = useRouter();
  return (
    <div
      className="card flex gap-2 border-b-[1px] border-l-gray-300 flex-col lg:flex-row"
      onClick={() => router.push(`/post/${item.id}`)}
    >
      <div className="flex items-center justify-between gap-4 lg:w-[73%] ">
        <div className="w-11">
          <Avatar className="grid place-content-center">
            {item?.author?.first_name?.charAt(0)}
          </Avatar>
        </div>
        <div className="justify-self-start  w-[80%]">
          <h3 className="text-[var(--primaryColor)]">{item?.title}</h3>
          <p className="text-[10px]">{item?.description}</p>
        </div>
        <div className="flex gap-2 ">
          <span className="">
            <BsEyeFill className="text-blue-500" />
            <p className="text-xs mt-1">{makeFriendly(Number(item?.views))}</p>
          </span>
          <span className="">
            <BsChat className="text-green-500" />
            <p className="text-xs mt-1">11.5k</p>
          </span>
        </div>
      </div>
      <div className="lg:w-[23%] text-xs pl-11 lg:pl-3 mt-2 lg:mt-0 lg:border-l-gray-300 lg:border-l-[1px] lg:ml-3">
        <h4 className=" pl-2 font-bold">Recent Post</h4>
        <div className="flex text-xs mt-2 px-2 lg:grid gap-2 w-full  items-center">
          <h3 className="text-[var(--primaryColor)] text-[9px] w-full">
            Lorem, ipsum dolor.
          </h3>
          <div className="flex items-center gap-2 w-full text-left">
            <h6 className="text-[7px]">{getRelativeTime(item?.created_at)}</h6>
            <Avatar className="w-6 h-6"></Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumTopics;
