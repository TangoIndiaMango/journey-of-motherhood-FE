"use client";

import React, { useEffect } from "react";
import { MdShowChart } from "react-icons/md";
import ForumTopics from "./ForumTopics";
import TrendingToday from "./TrendingToday";
import NewPosts from "./NewPosts";
import { useRouter } from "next/navigation";
import useGetRequest from "@/hooks/useGetRequest";
import { getQuotesUrl } from "@/services/utils/url";
import { Spin, notification } from "antd";
import AllPosts from "@/components/AllPosts";
import { useTokenContext } from "@/services/state/TokenProvider";
import QuoteSlider from "./Quotes";
import { toast } from "react-hot-toast";
import useGetUser from "@/hooks/useGetUser";
import { useUser } from "@/services/state/useUser";

interface Quote {
  id: number;
  author: string;
  description: string;
}

const Home = () => {
  const router = useRouter();
  // const { accessToken } = useTokenContext();
  const accessToken = localStorage.getItem("access_token");

  const { isLoading, error, data } = useGetUser({ accessToken });

  const { setUser } = useUser();

  useEffect(() => {
    if (accessToken === null || accessToken === undefined) {
      localStorage.setItem("previous_page", "/");
      router.replace("/login");
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (data) setUser(data);
  }, [data?.first_name]);

  const {
    data: quoteData,
    isLoading: quoteLoading,
    error: quoteError,
  } = useGetRequest<Quote[]>({
    url: getQuotesUrl,
    useBearerToken: true,
    bearerToken: accessToken,
  });

  if (quoteError || error) {
    console.log(quoteError || error);
    toast.error("an error occurred");
  }

  return (
    <section className="m-10 lg:flex gap-8 lg:mx-0 lg:px-8 ">
      <div className="lg:w-3/4">
        <div className="grid gap-2">
          <div className="card grid gap-4 ">
            <div className="w-44">
              <div className="px-12 py-2 bg-[var(--primaryColor)] rounded-md text-white">
                {" Quotes"}
              </div>
            </div>
            <>
              {quoteLoading || isLoading ? (
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
          <div className="mt-8">
            <h4 className="font-bold my-2">Forum Topics</h4>
            <AllPosts />
          </div>
        </div>
      </div>
      <div className="lg:w-1/4 lg:grid gap-8 h-fit hidden ">
        <div className="card ">
          <div className="flex items-center justify-between text-sm mb-5">
            <h4 className="font-bold">Trending Today</h4>
            <MdShowChart className="text-blue-500 text-xl" />
          </div>

          <TrendingToday />
          <TrendingToday />
          <TrendingToday />
          <TrendingToday />
          <TrendingToday />
        </div>
        <div className="card">
          <h4 className="font-bold text-sm mb-5">New Posts</h4>
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
        </div>
      </div>
    </section>
  );
};

export default Home;
