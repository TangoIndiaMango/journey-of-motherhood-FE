"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill, BsX } from "react-icons/bs";
import PinnedTopics from "./PinnedTopics";
import { useUser } from "@/services/state/useUser";
import Avatar from "antd/es/avatar/avatar";

interface Iprops {
  setOpenMenu: () => boolean;
}

const Sidebar = ({ setOpenMenu, openMenu }: any) => {
  const activeSegment = useSelectedLayoutSegment();
  const closeMenu = () => setOpenMenu(false);
  const { user } = useUser();
  return (
    <aside
      className={`flex flex-col fixed left-0 top-0 w-full h-[calc(100vh)] z-10 bg-[var(--bgColor)] px-10 py-10 lg:w-1/5 lg:sticky lg:top-10 lg:min-h-[100vh_-_60px]`}
    >
      <BsX
        className="text-red-500 absolute right-10 top-10 text-3xl cursor-pointer md:hidden"
        onClick={() => setOpenMenu(false)}
      />
      <nav className="flex flex-col gap-3 ">
        <Link
          href={"/"}
          className={`asideLink ${activeSegment === null && "asideActive"}`}
          onClick={closeMenu}
        >
          <AiFillHome />
          <span className="text-[12px]">Home</span>
        </Link>
        <Link
          href={"/profile"}
          className={`asideLink ${
            activeSegment === "profile" && "asideActive"
          }`}
          onClick={closeMenu}
        >
          <BsPersonFill />
          <span className="text-[12px]">Profile</span>
        </Link>
      </nav>
      <PinnedTopics closeMenu={closeMenu} />
      {/* {user && (
        <div className="absolute left-10 bottom-16 flex items-center gap-3 md:hidden">
          <Avatar>{user.first_name?.charAt(0)}</Avatar>
          <h5>
            {user.first_name} {user?.last_name}
          </h5>
        </div>
      )} */}
    </aside>
  );
};

export default Sidebar;
