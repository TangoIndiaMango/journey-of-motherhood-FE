"use client";

import { getTopUsersUrl } from "@/services/utils/url";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ITopUser } from "./search/page";
import { Spin } from "antd";
import TopUsers from "../TopUsers";

const TopUserCard = () => {
  const {
    data: topUsersData,
    isLoading: topUsersLoading,
    isError: topUsersError,
  } = useQuery(["topUsersResult"], async () => {
    const response = await axios.get(getTopUsersUrl);
    return response?.data as ITopUser[];
  });

  if (topUsersError) console.log(topUsersError);
  return (
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
    </div>
  );
};

export default TopUserCard;
