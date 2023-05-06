import { usePost } from "@/services/state/PostProvider";
import {
  getInitials,
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
  const { setPostValue } = usePost();

  return (
    <div
      className="card flex gap-2 border-b-[1px] border-l-gray-300 flex-col lg:flex-row cursor-pointer"
      onClick={() => {
        router.push(`/post/${item.id}`);
        setPostValue(item);
      }}
    >
      <div className="flex items-center  gap-4 lg:w-[85%] ">
        <div className="w-fit">
          <Avatar className="grid">
            {!item?.user
              ? "ANO"
              : getInitials(item?.user?.first_name, item?.user?.last_name)}
          </Avatar>
        </div>
        <div className="justify-self-start  w-[80%]">
          <h3 className="text-[var(--primaryColor)]">{item?.title}</h3>
          <p className="text-[10px]">{item?.description}</p>
        </div>
      </div>
      <div className="lg:w-[15%] text-xs   mt-2 lg:mt-0 lg:border-l-gray-300 lg:border-l-[1px] ">
        <div className="flex text-xs mt-2 px-5 mx-auto justify-between lg:grid gap-2 w-[80%] lg:w-full lg:px-6">
          <div className="flex gap-4 justify-between ">
            <span className="flex items-center flex-col">
              <BsEyeFill className="text-blue-500" />
              <p className="text-xs mt-1">
                {makeFriendly(Number(item?.views))}
              </p>
            </span>
            {/* <span className="flex items-center flex-col">
              <BsChat className="text-green-500" />
              <p className="text-xs mt-1">11.5k</p>
            </span> */}
          </div>
          <div className="flex  gap-2 w-full text-left justify-end">
            <h6 className="text-[8px]">{getRelativeTime(item?.created_at)}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumTopics;
