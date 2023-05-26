"use client";

import { Avatar } from "antd";
import React from "react";
import { BsChat, BsEye } from "react-icons/bs";
import HashTagComponent from "../HashTags";
import { getRelativeTime, makeFriendly } from "@/services/variables";
import { useRouter } from "next/navigation";
import { usePost } from "@/services/state/PostProvider";

const SlugContent = ({ item }: any) => {
  const router = useRouter();
  const { setPostValue } = usePost();
  return (
    <div
      className="card flex justify-between border-b-[1px] border-b-gray-300 cursor-pointer gap-2 "
      onClick={() => {
        router.push(`/post/${item.id}`);
        setPostValue(item);
      }}
    >
      <div className="flex gap-2">
        <div className="w-fit">
          <Avatar>
            {item?.user
              ? String(
                  item?.user?.first_name?.charAt(0) +
                    item?.user?.last_name?.charAt(0)
                ).toUpperCase()
              : "ANO"}
          </Avatar>
        </div>
        <div className="">
          <h4 className="text-sm font-bold min-w-[150px]">{item?.title}</h4>
          <h5 className="text-gray-500 text-[10px]">
            by{" "}
            {item?.user
              ? item?.user?.first_name + " " + item?.user?.last_name
              : "ANO"}
          </h5>
          <div className="flex gap-1 text-gray-500 my-2 flex-col lg:flex-row lg:gap-2">
            <div className="flex items-center h-fit gap-1">
              <BsEye /> <span className="text-[10px]">Views</span>{" "}
              <span className="text-[11px]">{makeFriendly(item?.views)}</span>
            </div>
            {/* <div className="flex items-center gap-1 ">
              <BsChat /> <span className="text-[10px]">Comments</span>{" "}
              <span className="text-[11px]">121,197</span>
            </div> */}
          </div>
          <div className="flex gap-2 item-center mt-2 w-[100%]">
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
