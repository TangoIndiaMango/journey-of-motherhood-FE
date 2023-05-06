"use client";

import { usePost } from "@/services/state/PostProvider";
import { makeFriendly } from "@/services/variables";
import { useRouter } from "next/navigation";
import React from "react";
import { BsEye } from "react-icons/bs";

const TrendingToday = ({ ...tr }) => {
  const router = useRouter();
  const { setPostValue } = usePost();
  return (
    <div
      className="flex justify-between items-center my-4 border-b-[1px] border-b-gray-200 pb-2 cursor-pointer"
      onClick={() => {
        router.push(`/post/${tr.id}`);
        setPostValue(tr);
      }}
    >
      <div className="flex items-center gap-3 text-[12px] font-bold">
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <h4 className="text-[12px] w-[30ch]">{tr.title}</h4>
      </div>
      <div className="flex items-center justify-between w-[50px] gap-2 text-[10px] text-gray-600">
        <BsEye />
        <h6>{makeFriendly(tr.views)}</h6>
      </div>
    </div>
  );
};

export default TrendingToday;
