import useGetRequest from "@/hooks/useGetRequest";
import { useUser } from "@/services/state/useUser";
import Avatar from "antd/es/avatar/avatar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SearchComponent from "./(home)/Search";
import { Badge, Spin } from "antd";
import { BsBell, BsSearch } from "react-icons/bs";
import { clearLocalStorage, removeToken } from "@/services/variables";
import Image from "next/image";
import { useStore } from "@/services/state/zustand-store/store";
import { notificationUrl } from "@/services/utils/url";
import { Toaster, toast } from "react-hot-toast";
import usePostRequest from "@/hooks/usePostRequests";
import { INotification } from "./(home)/notifications/page";

interface Iprops {
  setOpenMenu: (a: boolean) => void;
  openMenu: boolean;
}

const Header = ({ setOpenMenu, openMenu }: Iprops) => {
  const router = useRouter();
  const { user } = useUser();
  let token =
    typeof window !== "undefined" &&
    window.localStorage.getItem("access_token");

  const {
    isLoading: isLoadingNotificationPost,
    error: isNotificationPostError,
    postRequest,
  } = usePostRequest();

  const [toggleSearchMobile, setToggleSearchMobile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const {
    setNotificationsValue,
    notificationsValue,
    setNotificationData,
    notificationData,
  } = useStore();

  const { data, isLoading, error } = useGetRequest({
    url: notificationUrl,
    useBearerToken: true,
    bearerToken: token as string,
  });

  const handlePostNotification = () => {
    if (notificationsValue < 1) return;
    postRequest({
      url: notificationUrl + "mark-as-read/",
      query: {},
      useBearerToken: true,
      bearerToken: token as string,
    });
    toast.success("Notification marked as read");
  };

  useEffect(() => {
    if (data) {
      const unreadNotification = data?.filter(
        (d: INotification) => d?.read == false
      );
      setNotificationsValue(unreadNotification?.length);
      setNotificationData(data);
      return;
    }
  }, [data?.length, notificationsValue]);

  if (error) {
    console.log(error);
    toast.error("an error occurred ");
  }

  if (isNotificationPostError) {
    console.log(`An error occurred notification`);
  }

  return (
    <header className="w-full bg-white h-[80px] ">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-10 relative">
        {" "}
        <Toaster />
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
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
          <Image
            alt="logo"
            src="/bg-logo.png"
            width={"300"}
            height={"300"}
            className="h-[80px] w-fit object-contain cursor-pointer "
            onClick={() => router.push("/")}
          />
        </div>
        <div className="w-[50%] hidden lg:flex">
          <SearchComponent />
        </div>
        <div
          className={` transition ease-linear lg:hidden  ${
            toggleSearchMobile
              ? "absolute h-[80px] bg-white top-0 left-[0] w-screen z-50 flex items-center justify-center "
              : "hidden"
          }`}
        >
          <SearchComponent setToggleSearchMobile={setToggleSearchMobile} />
        </div>
        {user ? (
          <div className="flex h-full items-center gap-4">
            <BsSearch
              className="text-gray-600 text-lg lg:hidden"
              onClick={() => setToggleSearchMobile(true)}
            />
            <div className="flex items-center gap-2 ">
              <div className="relative cursor-pointer">
                <Avatar
                  size={"small"}
                  onClick={() => {
                    setOpenLogout((prev: boolean) => !prev);
                  }}
                >
                  {user?.first_name?.toUpperCase().charAt(0) +
                    "" +
                    user?.last_name?.toUpperCase().charAt(0)}
                </Avatar>
                {openLogout && (
                  <span
                    className="bg-gray-200 absolute -bottom-6 text-[10px] left-1/2 -translate-x-1/2 px-2 py-1"
                    onClick={() => {
                      clearLocalStorage();
                      router.push("/login");
                      setOpenLogout(false);
                    }}
                  >
                    logout
                  </span>
                )}
              </div>

              <Badge
                count={notificationsValue}
                size="small"
                className=" animate-pulse"
              >
                {isLoading || isLoadingNotificationPost ? (
                  <Spin />
                ) : (
                  <BsBell
                    className=" text-gray-600 text-xl"
                    onClick={() => {
                      router.push("/notifications");
                      handlePostNotification();
                      // setNotificationsValue(0);
                    }}
                  />
                )}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center gap-2">
            <button
              className="px-4 py-1 bg-white text-black hover:text-white"
              onClick={() => router.push("/signup")}
            >
              Signup
            </button>
            <button className="px-4 py-1" onClick={() => router.push("/login")}>
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
