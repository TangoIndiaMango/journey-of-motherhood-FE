"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Signin from "./Signin";

const Login = () => {
  const router = useRouter();
  const accessToken = localStorage.getItem("access_token");

  //check if the access token is valid then redirect to previous page
  useEffect(() => {
    if (accessToken) {
      const prevPage = localStorage.getItem("previous_page");
      if (prevPage) router.replace(`${prevPage}`);
      else router.replace(`/`);
    }
  }, [accessToken, router]);

  return <Signin />;
};

export default Login;
