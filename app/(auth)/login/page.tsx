"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Signin from "./Signin";

const Login = () => {
  // const router = useRouter();
  // const accessToken =
  //   typeof window !== "undefined" &&
  //   window.localStorage.getItem("access_token");

  //check if the access token is valid then redirect to previous page
  // useEffect(() => {
  //   if (accessToken) {
  //     const prevPage =
  //       typeof window !== "undefined" &&
  //       window.localStorage.getItem("access_token");
  //     if (prevPage) router.replace(`${prevPage}`);
  //     else router.replace(`/`);
  //   }
  // }, [accessToken, router]);

  return <Signin />;
};

export default Login;
