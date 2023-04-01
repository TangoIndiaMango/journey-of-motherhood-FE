import useGetRequest from "@/hooks/useGetRequest";
import { useUser } from "@/services/state/useUser";
import Avatar from "antd/es/avatar/avatar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SearchComponent from "./(home)/Search";
import { Badge, Image, Spin } from "antd";
import { BsBell, BsSearch } from "react-icons/bs";

interface Iprops {
  setOpenMenu: (a: boolean) => void;
  openMenu: boolean;
}

const Header = ({ setOpenMenu, openMenu }: Iprops) => {
  const router = useRouter();
  const { user: data } = useUser();

  const [toggleSearchMobile, setToggleSearchMobile] = useState(false);

  return (
    <header className="w-full bg-white h-[60px] flex items-center justify-between px-10 relative">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          {openMenu ? (
            <FiX
              className="text-2xl cursor-pointer text-red-500"
              onClick={() => setOpenMenu(false)}
            />
          ) : (
            <FiMenu
              className="text-2xl cursor-pointer "
              onClick={() => setOpenMenu(true)}
            />
          )}
        </div>
        <Image alt="logo" src="./logoJM.png" width={150} />
      </div>
      <div className="w-[50%] hidden lg:flex">
        <SearchComponent />
      </div>

      <div
        className={` transition ease-linear lg:hidden  ${
          toggleSearchMobile
            ? "absolute h-[60px] bg-white top-0 left-[0] w-screen z-50 flex items-center justify-center "
            : "hidden"
        }`}
      >
        <SearchComponent setToggleSearchMobile={setToggleSearchMobile} />
      </div>

      <div className="flex h-full items-center gap-4">
        <BsSearch
          className="text-gray-600 text-lg lg:hidden"
          onClick={() => setToggleSearchMobile(true)}
        />
        <div className="flex items-center gap-2 ">
          <Avatar size={"small"}>
            {data?.first_name?.toUpperCase().charAt(0)}
          </Avatar>

          <Badge count={5} size="small">
            <BsBell
              className=" text-gray-600 text-xl"
              onClick={() => router.push("/notifications")}
            />
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
