"use client";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "./Sidebar";
import UserProvider from "@/services/state/useUser";
import { TokenProvider } from "@/services/state/TokenProvider";
import "../globals.css";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [width, setWidth] = useState(0);
  const router = useRouter();

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
    <html lang="en">
      <body className="bg-[var(--bgColor)] relative">
        <UserProvider>
          <TokenProvider>
            <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <section className="flex gap-4">
              <div className="hidden lg:block">
                <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
              </div>
              {openMenu && (
                <div className="lg:hidden block">
                  <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
                </div>
              )}
              <main className="lg:w-4/5 mx-auto">{children}</main>
            </section>

            <Footer />
          </TokenProvider>
        </UserProvider>
      </body>
    </html>
  );
}
