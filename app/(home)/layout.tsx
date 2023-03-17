"use client";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelectedLayoutSegment } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import PinnedTopics from "./PinnedTopics";
import { useEffect, useState } from "react";
import Footer from "../Footer";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeSegment = useSelectedLayoutSegment();
  const [openMenu, setOpenMenu] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      width > 767 ? setOpenMenu(true) : setOpenMenu(false);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <>
      <header className="w-full bg-white h-[60px] flex items-center justify-between px-10">
        <div className="">logo</div>
        {/* <div className="">search</div> */}
        <div className="flex h-full items-center gap-4">
          <button className="w-[100px]">Log out</button>
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
        </div>
      </header>
      <section className="md:grid md:grid-cols-4 gap-4 xl:grid-cols-5">
        {openMenu && (
          <aside className=" flex flex-col absolute left-0 top-[60px] w-full h-[calc(100vh_-_60px)] z-100 bg-[var(--bgColor)] px-10 py-10 md:relative md:col-span-1 md:top-0">
            <nav className="flex flex-col gap-3 ">
              <Link
                href={"/"}
                className={`asideLink ${
                  activeSegment === null && "asideActive"
                }`}
              >
                <AiFillHome />
                <span className="text-[12px]">Home</span>
              </Link>
              <Link
                href={"/profile"}
                className={`asideLink ${
                  activeSegment === "profile" && "asideActive"
                }`}
              >
                <BsPersonFill />
                <span className="text-[12px]">Profile</span>
              </Link>
            </nav>
            <PinnedTopics />
            <div className="absolute left-10 bottom-10 flex items-center gap-3 md:hidden">
              <div className="w-10 h-10 rounded-full  border-[1px] grid place-content-center">
                A
              </div>
              <h5>Adeola Adeosun</h5>
            </div>
          </aside>
        )}
        <main className="col-span-3">{children}</main>
      </section>

      <Footer />
    </>
  );
}
