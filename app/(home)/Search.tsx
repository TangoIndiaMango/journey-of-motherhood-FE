"use client";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchComponent = ({ setToggleSearchMobile }: any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = async (value: string) => {
    setSearchQuery(value);
    typeof window !== "undefined" &&
      window.localStorage.setItem("search_query", searchQuery);
    router.push(`/post/search?q=${value}`);

    if (setToggleSearchMobile) {
      setToggleSearchMobile(false);
    }
  };

  return (
    <div className="w-[80%]">
      <Search placeholder="input search text" allowClear onSearch={onSearch} />
    </div>
  );
};

export default SearchComponent;
