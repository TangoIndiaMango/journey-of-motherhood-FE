"use client";
import ForumTopics from "@/app/(home)/ForumTopics";
import useGetRequest from "@/hooks/useGetRequest";
import { useTokenContext } from "@/services/state/TokenProvider";
import { getAllpostsUrl } from "@/services/utils/url";
import { Pagination, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AllPosts = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { data, isLoading, error } = useGetRequest({
    url: getAllpostsUrl,
  });

  const convertDate = (date: string) => {
    const a = new Date(date);
    return a.getTime();
  };

  const pageSize = 10;

  const startIndex = page * pageSize;
  const sortedData = data?.sort(
    (a: any, b: any) => convertDate(b.created_at) - convertDate(a.created_at)
  );

  const paginatedItems = sortedData?.slice(startIndex, startIndex + pageSize);

  const totalPages = Math.ceil(sortedData?.length / pageSize);

  if (error) {
    toast.error("an error occurred");
  }

  return (
    <>
      {isLoading ? (
        <div className="p-5">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col">
          <>
            {paginatedItems?.map((item: any) => (
              <ForumTopics key={item?.id} {...item} />
            ))}
          </>

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
        </div>
      )}
    </>
  );
};

export default AllPosts;
