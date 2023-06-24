"use client";

import { topics } from "@/services/constants/data";
import { useStore } from "@/services/state/zustand-store/store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";

const PinnedTopics = ({ closeMenu }: any) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const pathname = searchParam.get("q");
  const [collapseTopics, setCollapseTopics] = useState(true);

  const setFromPinnedTopic = useStore((state) => state.setFromPinnedTopic);

  const navItems = topics.map((d) => {
    return (
      <Link
        href={`/post/search?q=${d.abbr.toLowerCase()}`}
        key={d.id}
        className={`asideLink my-1 text-[10px] lg:text-[12px] leading-tight lg:leading-relaxed ${
          pathname == String(d.abbr.toLowerCase()) && "asideActive"
        }`}
        onClick={() => {
          closeMenu();
          setFromPinnedTopic(true);
        }}
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
    <div className="my-3 lg:py-5 ">
      <div className="flex items-center gap-2  lg:gap-4 mb-2 text-[12px] font-bold lg:w-[140px]">
        <h5 className="lg:my-4">Forum Topics ({topics.length})</h5>
        {collapseTopics ? (
          <RxCaretDown
            className="text-2xl cursor-pointer"
            onClick={() => setCollapseTopics(false)}
          />
        ) : (
          <RxCaretUp
            className="text-2xl cursor-pointer"
            onClick={() => setCollapseTopics(true)}
          />
        )}
      </div>
      <nav
        className={`${collapseTopics ? "hidden" : "block"} transition`}
        onClick={() => setCollapseTopics(false)}
      >
        {navItems}
      </nav>
    </div>
  );
};

export default PinnedTopics;
