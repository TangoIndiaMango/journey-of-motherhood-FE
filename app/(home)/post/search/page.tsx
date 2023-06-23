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
import TopUserCard from "../TopUserCard";
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
  } = useQuery(
    ["searchResults", searchValue],
    async () => {
      setPage(0);
      const response = await axios.get(`${postsUrl}search/?q=${searchValue}`);
      return response.data;
    },
    { enabled: !!searchValue }
  );

  const pageSize = 10;

  const startIndex = page * pageSize;
  const paginatedItems = results?.slice(startIndex, startIndex + pageSize);

  const totalPages = Math.ceil(results?.length / pageSize);

  if (isError) {
    console.log(isError);
    return;
  }

  if (isLoading)
    return (
      <div className="grid place-content-center my-5">
        <Spin />
      </div>
    );

  if (!results || results.length < 1) {
    return (
      <section className="my-10 mx-5 lg:flex gap-8 lg:mx-0 lg:px-8  min-h-[400px]">
        <h2 className="text-sm">
          Sorry! no result for this topic, please try other topics
        </h2>
      </section>
    );
  }

  return (
    <section className="my-5 mx-5 flex flex-col lg:flex-row gap-8 lg:mx-0 lg:px-8 px-5  min-h-[400px]">
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
          <span className="text-xs">Start discussion</span>{" "}
          <BsPlus className="text-white text-xl " />
        </button>

        <div className="h-fit">
          <TopUserCard />
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
