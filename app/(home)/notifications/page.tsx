"use client";

import React from "react";
import NotificationCard from "./NotificationCard";

const NotigicationPage = () => {
  return (
    <section className="px-10">
      <div className="flex justify-between items-center my-10">
        <h4 className="text-xl font-bold">Notifications</h4>
        <div className="py-2 px-8 bg-[var(--primaryColor)] text-white">
          Mark as read
        </div>
      </div>
      <div className="grid gap-2 mb-10">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </section>
  );
};

export default NotigicationPage;
