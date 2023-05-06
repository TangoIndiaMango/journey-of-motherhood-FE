"use client";

import { BsArrowUp, BsPlus } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SlugContent from "../../SlugContent";
import TopUsers from "../../TopUsers";
import { useEffect, useState } from "react";
import useGetRequest from "@/hooks/useGetRequest";
import { getTopUsersUrl, postsUrl } from "@/services/utils/url";
import { Spin } from "antd";
import { Toaster, toast } from "react-hot-toast";
// import { useSearch } from "@/services/state/SearchProvider";
import { useQuery } from "react-query";
import axios from "axios";
const data = [
  "Help",
  "About",
  "Blog",
  "Topics",
  "Top topics",
  "Terms",
  "Advertise",
  "Press",
  "Privacy policy",
];

export interface ITopUser {
  date_of_birth: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
}

const SearchPost = () => {
  const [page, setPage] = useState(0);
  // const { searchValue } = useSearch();
  const router = useRouter();
  const searchQuery = useSearchParams();
  const searchValue = searchQuery.get("q");
  // console.log(searchQuery.get("q"));

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery(["searchResults", searchValue], async () => {
    if (searchValue) {
      const response = await axios.get(`${postsUrl}search/?q=${searchValue}`);
      return response.data;
    }
  });

  const {
    data: topUsersData,
    isLoading: topUsersLoading,
    isError: topUsersError,
  } = useQuery(["topUsersResult"], async () => {
    const response = await axios.get(getTopUsersUrl);
    return response?.data as ITopUser[];
  });

  if (topUsersError) console.log(topUsersError);
  const pageSize = 10;

  const startIndex = page * pageSize;
  const paginatedItems = results?.slice(startIndex, startIndex + pageSize);

  const totalPages = Math.ceil(results?.length / pageSize);

  // if (topUsersError || isError) {
  //   console.log(topUsersError || isError);
  //   toast.error("an error occurred");
  //   return;
  // }

  if (isLoading)
    return (
      <div className="grid place-content-center my-5">
        <Spin />
      </div>
    );

  if (!results || results.length < 1) {
    return (
      <section className="my-10 mx-5 lg:flex gap-8 lg:mx-0 lg:px-8 ">
        <h2 className="text-sm">
          Sorry! no result for this topic, please try other topics
        </h2>
      </section>
    );
  }

  return (
    <section className="my-5 mx-5 flex flex-col lg:flex-row gap-8 lg:mx-0 lg:px-8 ">
      <Toaster />
      <div className="w-full lg:w-3/4">
        <>
          {paginatedItems?.map((item: any) => (
            <SlugContent key={item?.id} item={item} />
          ))}
          {totalPages > 1 && (
            <div className="flex my-4 items-center justify-center gap-3">
              <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="disabled:bg-gray-600 w-fit h-fit px-2 py-1"
              >
                Previous
              </button>
              <div className="px-10 py-3">{page}</div>
              <button
                disabled={page === totalPages - 1}
                onClick={() => setPage(page + 1)}
                className="disabled:bg-gray-600 w-fit h-fit px-2 py-1"
              >
                Next
              </button>
            </div>
          )}
        </>
      </div>
      <div className="w-full lg:w-1/4 grid gap-4 h-fit  ">
        <button
          className="flex items-center gap-2 justify-center  px-4"
          onClick={() => router.push("/post/new-discussion")}
        >
          <BsPlus className="text-white text-xl " />
          <span className="text-xs">Start a discussion</span>
        </button>

        <div className="card">
          <h4 className="font-bold text-sm mb-5">Top Users</h4>
          <div className="pb-4">
            {topUsersLoading ? (
              <Spin />
            ) : (
              <>
                {topUsersData && topUsersData.length < 1
                  ? "Opps! No Trending Topics Available"
                  : topUsersData?.map((topUser: ITopUser) => {
                      return <TopUsers key={topUser.id} {...topUser} />;
                    })}
              </>
            )}
          </div>
          {/* <div className="border-t-[1px] border-gray-400">
            <TopUsers />
          </div> */}
        </div>
        {/* <div className="card grid grid-cols-2 gap-4 ">
          {data.map((d: string, i: number) => (
            <Link
              href={d}
              key={d}
              className={`text-[10px] text-gray-500 ${
                i % 2 == 1 && "justify-self-end"
              }`}
            >
              {d}
            </Link>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default SearchPost;
