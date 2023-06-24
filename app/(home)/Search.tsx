"use client";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/services/state/SearchProvider";
import { Toaster, toast } from "react-hot-toast";
import { useStore } from "@/services/state/zustand-store/store";

const SearchComponent = ({ setToggleSearchMobile }: any) => {
  const router = useRouter();
  const { setSearchValue } = useSearch();
  const setFromPinnedTopic = useStore((state) => state.setFromPinnedTopic);

  const onSearch = async (value: string) => {
    if (value?.length > 0) {
      setSearchValue(value);
      setFromPinnedTopic(false);
      router.push(`/post/search?q=${value}`);

      if (setToggleSearchMobile) {
        setToggleSearchMobile(false);
      }
      return;
    }
    if (value === "") {
      toast.error("Input a search value");
      return;
    }
  };

  return (
    <div className="w-[80%]">
      <Toaster />
      <Search placeholder="Search..." allowClear onSearch={onSearch} />
    </div>
  );
};

export default SearchComponent;
