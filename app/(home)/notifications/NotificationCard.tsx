import { getRelativeTime } from "@/services/variables";
import { Avatar, Image } from "antd";
import React from "react";
import { INotification } from "./page";

const NotificationCard = ({ ...data }: INotification) => {
  return (
    <div className="relative card shadow-md border-l-4 border-l-[var(--primaryColor)] border-solid px-10 py-3 flex justify-between items-center">
      {/* <div className="absolute bottom-3 right-3 lg:static w-fit">
        <Avatar className="" size={"large"}>
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            className=""
            alt="avatar Image"
          />
        </Avatar>
      </div> */}
      <div className="flex flex-col gap-3 w-[100%] lg:w-[70%]">
        {/* <div className="flex gap-3 items-center lg:items-end">
          <h5 className="text-[16px] font-bold">Adebola Adeshida</h5>
          <p className="text-[12px] lg:text-[14px] text-gray-600 whitespace-nowrap">
            Reacted to your post
          </p>
        </div> */}
        <p className="text-[14px] ">{data.notification_type}</p>
        <div className="text-[12px] text-gray-600">
          {getRelativeTime(data.created_at)}
        </div>
      </div>
      {/* <Image
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        height={100}
        alt="notification Image"
        className="hidden lg:block"
      /> */}
    </div>
  );
};

export default NotificationCard;
