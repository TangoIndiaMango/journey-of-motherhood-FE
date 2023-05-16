"use client";

import useGetRequest from "@/hooks/useGetRequest";
import usePutRequest from "@/hooks/usePutRequest";
import { useTokenContext } from "@/services/state/TokenProvider";
import { useUser } from "@/services/state/useUser";
import { profileUrl } from "@/services/utils/url";
import { Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const AuthorProfile = () => {
  const router = useRouter();

  let data = {
    first_name: "John",
    last_name: "Doe",
    email: "",
    followers_count: 0,
    about_me: "",
    following_count: "",
    post_count: "",
  };

  return (
    <section className="p-10 ">
      <div className="text-center flex items-center w-full mt-4 lg:mt-0 flex-col gap-3 lg:w-1/2 lg:px-8 lg:border-r-[1px] lg:border-r-gray-600">
        <div className="w-28 h-28 rounded-full bg-gray-300 grid place-content-center text-2xl">
          {data?.first_name.toUpperCase().charAt(0) +
            data?.last_name.toUpperCase().charAt(0)}
        </div>
        <h4 className="text-[14px] text-black flex gap-1 flex-wrap font-bold lg:mt-3 lg:mb-12">
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
        <div className="my-4 lg:my-20">
          <h3 className="text-[16px] font-bold">ABOUT</h3>
          {data?.about_me && (
            <p className="text-[13px] my-3">{data?.about_me}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorProfile;
