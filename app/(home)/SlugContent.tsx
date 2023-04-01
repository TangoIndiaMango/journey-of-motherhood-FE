"use client";

import { Avatar } from "antd";
import React from "react";
import { BsChat, BsEye } from "react-icons/bs";
import HashTagComponent from "../HashTags";
import { getRelativeTime, makeFriendly } from "@/services/variables";
import { useRouter } from "next/navigation";

const SlugContent = ({ item }: any) => {
  const router = useRouter();
  return (
    <div
      className="card flex justify-between border-b-[1px] border-b-gray-300 cursor-pointer gap-2"
      onClick={() => router.push(`/post/${item?.id}`)}
    >
      <div className="flex gap-2">
        <div className="w-fit">
          <Avatar>{item?.author?.first_name?.charAt(0)}</Avatar>
        </div>
        <div className="">
          <h4 className="text-sm font-bold">{item?.title}</h4>
          <h5 className="text-gray-500 text-[10px]">
            by {item?.author?.first_name} {""} {item?.author?.last_name}
          </h5>
          <div className="flex gap-4 text-gray-500 my-2">
            <div className="flex items-center ">
              <BsEye /> <span className="text-[10px]">Views</span>{" "}
              <span className="text-[10px]">{makeFriendly(item?.views)}</span>
            </div>
            <div className="flex items-center gap-2 ">
              <BsChat /> <span className="text-[10px]">Comments</span>{" "}
              <span className="text-[10px]">121,197</span>
            </div>
          </div>
          <div className="flex gap-2 item-center mt-4 w-[90%]">
            <HashTagComponent tags={item?.tags} />
          </div>
        </div>
      </div>

      <div className="text-[11px] text-gray-500 flex gap-2 self-center w-fit ">
        <h5 className="w-full whitespace-nowrap">
          {getRelativeTime(item?.created_at)}
        </h5>
      </div>
    </div>
  );
};

export default SlugContent;
