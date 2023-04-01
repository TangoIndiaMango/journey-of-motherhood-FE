"use client";

import { BsArrowUp, BsPlus } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SlugContent from "../../SlugContent";
import TopUsers from "../../TopUsers";
import { useState } from "react";
import useGetRequest from "@/hooks/useGetRequest";
import { postsUrl } from "@/services/utils/url";
import { Spin } from "antd";
import { toast } from "react-hot-toast";
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

export default function SearchPost({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState(0);
  const router = useRouter();

  const pathname = usePathname();

  const searchParam = useSearchParams();

  const {
    data: searchData,
    isLoading,
    error,
  } = useGetRequest({
    url: `${postsUrl}search/?q=${localStorage.getItem("search_query")}`,
    useBearerToken: true,
    bearerToken: localStorage.getItem("access_token") as string,
  });

  const pageSize = 10;

  const startIndex = page * pageSize;
  const paginatedItems = searchData?.slice(startIndex, startIndex + pageSize);

  const totalPages = Math.ceil(searchData?.length / pageSize);

  if (isLoading)
    return (
      <div className="grid place-content-center my-5">
        <Spin />
      </div>
    );

  if (error) return <>Sorry an error occured</>;

  return (
    <section className="my-5 mx-5 lg:flex gap-8 lg:mx-0 lg:px-8 ">
      <div className="lg:w-3/4">
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
      <div className="lg:w-1/4 lg:grid gap-8 h-fit hidden ">
        <button
          className="flex items-center gap-2 justify-center  px-4"
          onClick={() => router.push("/post/new-discussion")}
        >
          <BsPlus className="text-white text-xl" />
          <span className="text-xs">Start a discussion</span>
        </button>

        <div className="card">
          <h4 className="font-bold text-sm mb-5">Top Users</h4>
          <div className="pb-4">
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
          </div>
          <div className="border-t-[1px] border-gray-400">
            <TopUsers name="You" />
          </div>
        </div>
        <div className="card grid grid-cols-2 gap-4 ">
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
        </div>
      </div>
    </section>
  );
}
