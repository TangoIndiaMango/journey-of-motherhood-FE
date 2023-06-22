"use client";

import React, { useEffect } from "react";
import { MdShowChart } from "react-icons/md";
import TrendingToday from "./TrendingToday";
import NewPosts from "./NewPosts";
import {
  getNewPostsUrl,
  getQuotesUrl,
  getTrendingPostsUrl,
  notificationUrl,
} from "@/services/utils/url";
import { Spin } from "antd";
import AllPosts from "@/components/AllPosts";
import QuoteSlider from "./Quotes";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "react-query";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface Quote {
  id: number;
  author: string;
  description: string;
}

interface Trending {
  id: number;
  title: string;
  views: number;
}

interface INewPosts {
  created_at: string;
  id: number;
  title: string;
}

const Home = () => {
  const router = useRouter();
  const {
    data: quoteData,
    isLoading: quoteLoading,
    isError: quoteError,
  } = useQuery(["quotesResult"], async () => {
    const response = await axios.get(getQuotesUrl);
    return response.data as Quote[];
  });

  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useQuery(["trendingResult"], async () => {
    const response = await axios.get(getTrendingPostsUrl);
    return response?.data;
  });

  const {
    data: newPostsData,
    isLoading: newPostsLoading,
    isError: newPostsError,
  } = useQuery(["newPostsResult"], async () => {
    const response = await axios.get(getNewPostsUrl);
    return response?.data;
  });

  if (quoteError || trendingError || newPostsError) {
    console.log(quoteError || trendingError || newPostsError);
    toast.error("an error occurred");
    return;
  }

  if (newPostsError && trendingError)
    return (
      <section className="m-10 lg:flex gap-8 lg:mx-0 lg:px-8 min-h-[350px]">
        <h2 className="text-red-500 text-xl w-[35ch]">
          Opps! an error as occured while loading this page, Please try again
          Later
        </h2>
      </section>
    );

  return (
    <section className="m-10 lg:flex gap-8 lg:mx-0 lg:px-8 min-h-[350px]">
      <div className="lg:w-3/4">
        <div className="grid gap-2">
          <div className="">
            <button
              className="w-full px-12 py-2 bg-[var(--primaryColor)] transition-opacity text-white lg:w-fit flex items-center justify-center gap-3 cursor-pointer hover:opacity-90"
              onClick={() => router.replace("/post/new-discussion")}
            >
              <span>New Discussion</span>

              <AiOutlinePlus className="font-extrabold text-xl" />
            </button>
          </div>
          <div className="card grid gap-4 shadow-md mt-5">
            <div className="w-44">
              <div className="font-bold">{" Quotes"}</div>
            </div>
            <>
              {quoteLoading ? (
                <Spin />
              ) : (
                <>
                  {quoteData && quoteData.length < 1 ? (
                    "Opps! No Quotes"
                  ) : (
                    <p className="text-sm">
                      <QuoteSlider {...quoteData} />
                    </p>
                  )}
                </>
              )}
            </>
          </div>
          <div className="mt-8 card">
            <h4 className="font-bold my-2">Forum Title</h4>
            <AllPosts />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:w-[40%] lg:grid gap-8 h-fit">
        <div className="card ">
          <div className="flex items-center justify-between text-sm mb-5">
            <h4 className="font-bold">Trending </h4>
            <MdShowChart className="text-blue-500 text-xl" />
          </div>
          {trendingLoading ? (
            <Spin />
          ) : (
            <>
              {trendingData && trendingData.length < 1
                ? "Opps! No Trending Topics Available"
                : trendingData.map((tr: Trending) => {
                    return <TrendingToday key={tr.id} {...tr} />;
                  })}
            </>
          )}
        </div>
        <div className="card">
          <h4 className="font-bold text-sm mb-5">New Posts</h4>
          {newPostsLoading ? (
            <Spin />
          ) : (
            <>
              {newPostsData && newPostsData.length < 1
                ? "Opps! No Trending Topics Available"
                : newPostsData.map((newPost: INewPosts) => {
                    return <NewPosts key={newPost.id} {...newPost} />;
                  })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
