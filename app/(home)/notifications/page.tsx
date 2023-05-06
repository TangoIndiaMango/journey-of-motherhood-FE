"use client";

import React, { useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { useQuery } from "react-query";
import axios from "axios";
import { notificationUrl } from "@/services/utils/url";
import { Spin } from "antd";
import { Toaster, toast } from "react-hot-toast";
import useGetRequest from "@/hooks/useGetRequest";
import { useStore } from "@/services/state/zustand-store/store";

export interface INotification {
  created_at: string;
  id: number;
  notification_type: string;
  updated_at: string;
  user: number;
}

const NotigicationPage = () => {
  const { setNotificationsValue } = useStore();

  let token =
    typeof window !== "undefined" &&
    window.localStorage.getItem("access_token");

  const { data, isLoading, error } = useGetRequest({
    url: notificationUrl,
    useBearerToken: true,
    bearerToken: token as string,
  });

  useEffect(() => {
    if (data) {
      setNotificationsValue(data?.length);
    }
  }, [data?.length]);

  if (error) {
    toast.error("An error has occurred");
    return;
  }

  return (
    <section className="px-10">
      <Toaster />
      <div className="flex justify-between items-center my-10 w-full gap-3">
        <h4 className="text-xl font-bold">Notifications</h4>
        {/* <div className="py-2 px-8 bg-[var(--primaryColor)] text-white">
          Mark as read
        </div> */}
      </div>
      <div className="grid gap-2 mb-10 min-w-[200px]">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {data && data.length < 1
              ? "Opps! No Trending Topics Available"
              : data?.map((data: INotification) => {
                  return <NotificationCard {...data} key={data.id} />;
                })}
          </>
        )}
      </div>
    </section>
  );
};

export default NotigicationPage;
