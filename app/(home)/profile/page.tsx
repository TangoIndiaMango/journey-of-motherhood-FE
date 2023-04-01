"use client";

import useGetRequest from "@/hooks/useGetRequest";
import usePutRequest from "@/hooks/usePutRequest";
import { useTokenContext } from "@/services/state/TokenProvider";
import { useUser } from "@/services/state/useUser";
import { profileUrl } from "@/services/utils/url";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  followers_count?: number;
  about_me: string;
  following_count?: number;
  post_count?: number;
}

const Profile = () => {
  const { user, setUser } = useUser();
  const { putRequest, isLoading, error, data: response } = usePutRequest();

  const [allowEdit, setAllowEdit] = useState(true);

  const [data, setData] = useState<ProfileData>({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    about_me: user?.about_me || "",
  });

  const onChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let token =
    typeof window !== "undefined" &&
    window.localStorage.getItem("access_token");

  const onSubmit = (e: any) => {
    e.preventDefault();
    putRequest({
      useBearerToken: true,
      bearerToken: token as string,
      url: profileUrl + "edit/",
      query: {
        ...data,
      },
    });
  };

  useEffect(() => {
    setAllowEdit(true);
  }, []);

  if (isLoading) {
    return (
      <div className="p-10">
        <Spin />
      </div>
    );
  }

  if (error) {
    console.log(error);
    toast.error("Opps! an error occurred");
  }

  if (response) {
    toast.success("Profile updated successfully!");
  }

  return (
    <section className="p-10 lg:flex  gap-4 lg:pt-20 lg:gap-10">
      <div className="text-center flex items-center w-full mt-4 lg:mt-0 flex-col gap-3 lg:w-1/2 lg:px-8 lg:border-r-[1px] lg:border-r-gray-600">
        <div className="w-28 h-28 rounded-full bg-black"></div>
        <h4 className="text-[14px] text-black font-bold lg:mt-3 lg:mb-12">
          {data?.first_name.toUpperCase()}
        </h4>
        <div className="flex gap-4">
          <div className="px-4 flex text-[14px] gap-2 font-bold flex-col border-r-[1px] border-r-gray-300">
            <h6 className="font-normal">{user?.post_count}</h6>
            <h6>Posts</h6>
          </div>
          <div className="px-4 flex text-[14px] gap-2 font-bold flex-col border-r-[1px] border-r-gray-300">
            <h6 className="font-normal">{user?.followers_count}</h6>
            <h6>Followers</h6>
          </div>
          <div className="px-4 flex text-[14px] gap-2 font-bold flex-col ">
            <h6 className="font-normal">{user?.following_count}</h6>
            <h6>Following</h6>
          </div>
        </div>
        <div className="my-4 lg:my-20">
          <h3 className="text-[16px] font-bold">ABOUT</h3>
          {data?.about_me && (
            <p className="text-[13px] my-3">{data?.about_me}</p>
          )}
        </div>
      </div>

      <div className="lg:w-1/2">
        <h3 className="text-[16px] font-bold">BASIC INFO</h3>
        <form className="" onSubmit={onSubmit}>
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className="text-[12px] font-bold">First Name</label>
            <input
              type="text"
              name="first_name"
              onChange={onChange}
              className={`px-2 py-2 text-[12px] disabled:bg-gray-200 disabled:cursor-not-allowed`}
              value={data?.first_name}
              disabled={allowEdit}
            />
          </div>
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className=" text-[12px] font-bold">Last Name</label>
            <input
              type="text"
              name="last_name"
              className={`px-2 py-2 text-[12px] disabled:bg-gray-200 disabled:cursor-not-allowed`}
              value={data?.last_name}
              onChange={onChange}
              disabled={allowEdit}
            />
          </div>
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className="text-[12px] font-bold">Email</label>
            <input
              type="email"
              name="email"
              className={`px-2 py-2 text-[12px] disabled:bg-gray-200 disabled:cursor-not-allowed`}
              value={data?.email}
              onChange={onChange}
              disabled={allowEdit}
            />
          </div>
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className="text-[12px] font-bold">About</label>
            <textarea
              name="about_me"
              className={`px-2 py-2 text-[12px] disabled:bg-gray-200 disabled:cursor-not-allowed`}
              cols={30}
              rows={5}
              value={data?.about_me}
              onChange={onChange}
              disabled={allowEdit}
              style={{ resize: "none" }}
            ></textarea>
          </div>

          <div className="grid gap-2 my-4 lg:gap-4">
            <div className="flex justify-between items-center my-2">
              <label className="text-[12px] font-bold">Security</label>
              <button
                type="button"
                className="w-fit text-[12px] px-10 py-1 bg-[var(--primaryColor)]"
                onClick={() => setAllowEdit(!allowEdit)}
              >
                {allowEdit ? "Enable" : "Disable"} Editing
              </button>
            </div>
          </div>

          <div className="flex gap-4 justify-between">
            <button
              type="button"
              className=" w-fit text-[12px] px-10 py-1 bg-white border-[1px] border-[var(--primaryColor)] text-black"
            >
              CANCEL
            </button>
            <button
              className="w-fit text-[12px] px-10 py-1 bg-[var(--primaryColor)]"
              type="submit"
            >
              SAVE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
