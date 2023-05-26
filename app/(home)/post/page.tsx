"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Post = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return <div>Not Available, Going back to Home Page</div>;
};

export default Post;
