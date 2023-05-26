"use client";

import React, { useState } from "react";
import { Avatar, Button, Modal } from "antd";
import { PostData, usePost } from "@/services/state/PostProvider";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { baseUrl, postsUrl } from "@/services/utils/url";
import { useUser } from "@/services/state/useUser";
import { Toaster, toast } from "react-hot-toast";

const ProfileModal: React.FC = ({ ...post }: PostData) => {
  const { user } = useUser();
  const { setPostValue } = usePost();
  const [triggerPostGetter, setTriggerPostGetter] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = post?.user;

  const accessToken =
    typeof window !== "undefined" &&
    window.localStorage.getItem("access_token");

  const { isLoading: postLoading } = useQuery(
    ["postsById", post?.id],
    async () => {
      const response = await axios.get(`${postsUrl}${post?.id}`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setPostValue(data);
        setTriggerPostGetter(false);
      },
      onError: () => {
        console.log("Error getting post data");
        setTriggerPostGetter(false);
        return;
      },
      enabled: !!triggerPostGetter,
    }
  );

  const { mutate: follow, isLoading } = useMutation(
    async () =>
      await axios.post(
        `${baseUrl}/follow/${user?.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      ),
    {
      onSuccess: () => {
        toast.success("Followed successfully");
        setTriggerPostGetter(true);
        // setComment("");
        // queryClient.invalidateQueries("commentsResults");
      },

      onError: () => {
        console.log("error occured while following ");
        return;
      },
    }
  );

  const showModal = () => {
    if (!user) {
      toast.error("Opps! Only logged in users can view author's profile");
      return;
    }
    if (post?.is_anonymous || !data) {
      toast.error("Opps! You cannot view profile of anonymous author");
      return;
    }

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Toaster />
      <div
        className="w-full  flex justify-end gap-5 items-center cursor-pointer"
        onClick={showModal}
      >
        <Avatar>
          {post.is_anonymous ? (
            "ANO"
          ) : data ? (
            <>
              {data?.first_name.toUpperCase().charAt(0) +
                data?.last_name.toUpperCase().charAt(0)}
            </>
          ) : (
            <>ANO</>
          )}
        </Avatar>

        {/* <button className="px-1 py-1 w-[70px]">Follow</button> */}
      </div>

      <Modal
        title={
          <h2 className="text-xl text-[var(--primaryColor)]">
            Post Author Profile
          </h2>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="flex justify-center">
            <button className="w-fit px-5 py-2" onClick={() => follow()}>
              {isLoading ? "Following..." : "Follow"}
            </button>
          </div>
        }
        // className="w-fit"
      >
        <section className="p-10 ">
          {postLoading && <span className="py-2">...</span>}
          <div className="text-center flex items-center w-full mt-2 flex-col gap-4 ">
            <div className="w-28 h-28 rounded-full bg-gray-300 grid place-content-center text-2xl">
              {data?.first_name.toUpperCase().charAt(0) +
                data?.last_name.toUpperCase().charAt(0)}
            </div>
            <h4 className="text-[14px] text-black flex gap-1 flex-wrap font-bold ">
              <span>{data?.first_name.toUpperCase()}</span>
              <span>{data?.last_name.toUpperCase()}</span>
            </h4>
            <div className="flex gap-4">
              <div className="px-4 flex text-[14px] gap-2 font-bold flex-col border-r-[1px] border-r-gray-300">
                <h6 className="font-normal">{data?.post_count}</h6>
                <h6>Posts</h6>
              </div>
              <div className="px-4 flex text-[14px] gap-2 font-bold flex-col border-r-[1px] border-r-gray-300">
                <h6 className="font-normal">{data?.followers_count}</h6>
                <h6>Followers</h6>
              </div>
              <div className="px-4 flex text-[14px] gap-2 font-bold flex-col ">
                <h6 className="font-normal">{data?.following_count}</h6>
                <h6>Following</h6>
              </div>
            </div>
            <div className="my-4 ">
              <h3 className="text-[16px] font-bold">ABOUT</h3>
              {data?.about_me && (
                <p className="text-[13px] my-2">{data?.about_me}</p>
              )}
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default ProfileModal;
