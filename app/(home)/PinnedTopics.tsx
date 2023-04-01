"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { RxCaretDown } from "react-icons/rx";

const data = [
  { id: 1, title: "Divorce and ...", value: 21, color: "red" },
  { id: 2, title: "Occupation and ...", value: 20, color: "green" },
  { id: 3, title: "Pregnancy and ...", value: 10, color: "yellow" },
  { id: 4, title: "Single Parent ...", value: 222, color: "blue" },
  { id: 5, title: "Intimacy", value: 20, color: "orange" },
];

const PinnedTopics = ({ closeMenu }: any) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const pathname = usePathname();

  const navItems = data.map((d) => {
    return (
      <Link
        // href={d.title.replace(/ /g, "")}
        href="/post/[post-id]"
        as={`/post/${d.id}`}
        key={d.id}
        className={`asideLink my-2 text-[12px] ${
          pathname == "/post/" + String(d.id) && "asideActive"
        }`}
        onClick={closeMenu}
      >
        <span
          className={`w-2 h-2 rounded-full `}
          style={{ backgroundColor: d.color }}
        />
        <h5>{d.title}</h5>
      </Link>
    );
  });
  return (
    <div className="my-20 ">
      <div className="flex items-center gap-2 mb-4 text-[13px] font-bold lg:w-[140px]">
        <h5 className="">Pinned topics (5)</h5>
        <RxCaretDown className="text-2xl" />
      </div>
      <nav>{navItems}</nav>
    </div>
  );
};

export default PinnedTopics;
