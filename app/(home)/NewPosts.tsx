"use client";

import { usePost } from "@/services/state/PostProvider";
import { getRelativeTime } from "@/services/variables";
import { Avatar } from "antd";
import { useRouter } from "next/navigation";

const NewPosts = ({ ...newPost }) => {
  const router = useRouter();
  const { setPostValue } = usePost();

  return (
    <>
      <div
        className="border-b-[1px] border-b-gray-200 pb-2 cursor-pointer "
        onClick={() => {
          router.push(`/post/${newPost?.id}`);
          setPostValue(newPost);
        }}
      >
        <div className="flex gap-1 items-center my-2 ">
          <div className="w-full 0">
            <div className="flex items-center justify-between">
              <h4 className="text-[12px] font-bold">{newPost?.title}</h4>
              <h6 className="text-[10px] text-gray-600">
                {getRelativeTime(newPost?.created_at)}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPosts;
