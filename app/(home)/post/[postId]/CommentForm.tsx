"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { postsUrl } from "@/services/utils/url";

import { Toaster, toast } from "react-hot-toast";
import { useUser } from "@/services/state/useUser";
import { useRouter } from "next/navigation";

type Comment = {
  text: string;
};

type CommentFormProps = {
  postId: string;
};

const accessToken =
  typeof window !== "undefined" && window.localStorage.getItem("access_token");

const CommentForm = ({ postId }: CommentFormProps): JSX.Element => {
  const router = useRouter();
  const { user } = useUser();
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (newComment) =>
      axios.post(`${postsUrl}${postId}/comment/`, newComment, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      onSuccess: () => {
        toast.success("Comment submitted successfully");
        setComment("");
        queryClient.invalidateQueries("commentsResults");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Opps! only logged in users can comment");
      router.push("/login");
      return;
    }

    if (comment.trim() === "") {
      toast.error("Please enter a comment ");
      return;
    }

    mutate({ text: comment } as any);
  };

  if (isError) {
    console.log("Opps! an error occurred, Please try again");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="full flex gap-6 justify-self-start items-end  w-full"
    >
      <input
        type="text"
        className="bg-gray-100 py-[5px] rounded-md lg:w-[80%] outline-none px-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isLoading}
      />

      <div className="full">
        <button
          className="text-[10px] w-[80px] py-[5px] bg-[var(--primaryColor)]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : " Add a comment"}
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default CommentForm;
