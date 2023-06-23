"use client";

import { postData } from "@/services/constants/post";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import { BiInfoCircle } from "react-icons/bi";
import {
  BsArrowDown,
  BsArrowUp,
  BsChat,
  BsEye,
  BsHandThumbsUpFill,
  BsPinAngle,
  BsPinAngleFill,
  BsPlus,
} from "react-icons/bs";
import { RelatedQuestion } from "./RelatedQuestions";
import CommentReplies from "./CommentReplies";
import { usePost } from "@/services/state/PostProvider";
import { Avatar, Spin } from "antd";
import { useQuery } from "react-query";
import axios from "axios";
import { postsUrl } from "@/services/utils/url";
import { makeFriendly } from "@/services/variables";
import CommentForm from "./CommentForm";
import { useUser } from "@/services/state/useUser";
import { useEffect, useState } from "react";
import usePostRequest from "@/hooks/usePostRequests";
import { toast } from "react-hot-toast";
import useGetRequest from "@/hooks/useGetRequest";
import ProfileModal from "./ProfileModal";
import TopUserCard from "../TopUserCard";

const reactionsTypes = [
  // { type: "Insightful", emoji: <p>&#128076;</p> },
  // { type: "Support", emoji: <p>&#129309;</p> },
  // { type: "Surprise", emoji: <p>&#128562;</p> },
  // { type: "Sad", emoji: <p>&#x1F61E;</p> },
  // { type: "Love", emoji: <p>&#128525;</p> },
  // { type: "Anger", emoji: <p>&#x1F620;</p> },
  { type: "Like", emoji: <p>&#128077;</p> },
];

const PostDetail = ({ params }: any) => {
  const [openReactions, setOpenReactions] = useState(false);
  const [isReacted, setIsReacted] = useState(false);
  const { setPostValue } = usePost();

  // const segments = useSelectedLayoutSegments();
  const router = useRouter();

  const { user } = useUser();

  let token =
    typeof window !== "undefined" &&
    window.localStorage.getItem("access_token");

  const {
    data: reactionPostData,
    isLoading: isLoadingReactionPost,
    error: isReactionPostError,
    postRequest,
  } = usePostRequest();

  const {
    data: reactionData,
    isLoading,
    error,
  } = useGetRequest({
    url: `${postsUrl}reaction/${params?.postId}/`,
    useBearerToken: true,
    bearerToken: token as string,
  });

  const handlePostNotification = (type: string) => {
    if (
      (reactionData[0]?.reaction_type && user?.id === reactionData[0]?.user) ||
      isReacted
    ) {
      toast.error("You have already reacted");
      return;
    }
    postRequest({
      url: `${postsUrl}${params?.postId}/reaction/`,
      query: {
        post: params?.postId,
        reaction_type: type,
        user: user?.id,
      },
      useBearerToken: true,
      bearerToken: token as string,
    });
    setIsReacted(true);
    toast.success("Reaction sent");
  };

  if (error) toast.error("An error has occurred");
  if (isReactionPostError) {
    toast.error("An error has occurred");
  }

  const {
    data: commentsResult,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery(["commentsResults", params?.postId], async () => {
    if (!params?.postId) {
      return;
    }
    const response = await axios.get(`${postsUrl}comment/${params?.postId}/`);
    return response.data;
  });

  const { isLoading: postLoading, data: post } = useQuery(
    ["postsById", params?.postId],
    async () => {
      const response = await axios.get(`${postsUrl}${params?.postId}/`);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setPostValue(data);
      },
      onError: () => {
        console.log("Error getting post data");
        return;
      },
    }
  );

  useEffect(() => {
    setIsReacted(false);
  }, []);

  if (commentsLoading)
    return (
      <div className="grid place-content-center my-5 min-h-[50vh]">
        <Spin />
      </div>
    );

  if (commentsError)
    return <div className="min-h-[50vh] my-5">Opps! Error loading results</div>;

  if (!post)
    return <div className="min-h-[50vh] my-5">Sorry! Post not found</div>;

  const checkPostsStatus = post.views || post.views !== 0;

  return (
    <section className="min-h-screen ">
      <div className="pt-5 ">
        {postLoading ? (
          <Spin />
        ) : (
          <>
            <div className="md:flex items-start gap-2 min-h-[400px]">
              <div className="md:flex flex-col  lg:w-[60%]">
                <div className="p-6  card mb-4  " key={post?.id}>
                  <div className="relative ">
                    {checkPostsStatus && (
                      <span className="absolute left-0 top-0 flex flex-col gap-1 items-center">
                        <BsArrowUp className="text-gray-600" />
                        <h6 className="text-xs text-black font-bold">
                          {makeFriendly(post?.views)}
                        </h6>
                        <BsArrowDown className="text-red-500" />
                      </span>
                    )}
                    <div className="pl-10">
                      <div className="flex justify-between items-start w-full">
                        <div className="flex item-center flex-col gap-2 md:flex-row md:gap-[20px] w-full">
                          <h5 className="text-sm font-bold flex ">
                            <span className="capitalize">{post?.title}</span>
                          </h5>
                        </div>

                        <ProfileModal {...post} />
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post?.description,
                        }}
                        className="text-xs my-1 capitalize"
                      />

                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          {!openReactions ? (
                            <BsHandThumbsUpFill
                              className="text-yellow-400 "
                              onClick={() => setOpenReactions(true)}
                            />
                          ) : (
                            reactionsTypes.map((r) => (
                              <span
                                className="px-2  p-1 shadow-sm text-lg"
                                key={r.type}
                                onClick={() => {
                                  if (!user) {
                                    router.push("/login");
                                    toast.error(
                                      "Only logged in users can react"
                                    );
                                    return;
                                  }
                                  handlePostNotification(r.type.toLowerCase());
                                  setOpenReactions(false);
                                }}
                              >
                                {/* <BsHandThumbsUpFill className="text-yellow-400 " /> */}
                                {r.emoji}
                              </span>
                            ))
                          )}

                          <h6 className="text-[10px]">{isLoading && "..."}</h6>
                        </span>
                        {/* <span className="flex items-center gap-6">
                      <span className="flex item-center gap-2">
                        <BiInfoCircle />
                        <h6 className="text-[10px]">Report</h6>{" "}
                      </span>
                      <BsPinAngle />
                    </span> */}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] my-4 bg-gray-300"></div>

                  {/* comment comments */}
                  <div className=" m-2 bg-gray-100 p-2 h-fit">
                    {commentsResult?.length > 0 && commentsResult
                      ? commentsResult?.map((comment: any) => (
                          <CommentReplies comment={comment} key={comment.id} />
                        ))
                      : "Opps! No comments found"}
                  </div>

                  <div className="flex items-start justify-between my-4 mx-4 gap-2 w-full">
                    <Avatar>
                      {user
                        ? user?.first_name.toUpperCase().charAt(0) +
                          user?.last_name.toUpperCase().charAt(0)
                        : "ANO"}
                    </Avatar>

                    <CommentForm postId={post?.id} />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col  lg:w-[40%] gap-4 px-5">
                <button
                  className="text-xs flex items-center justify-center  px-8 w-full"
                  onClick={() => router.replace("/post/new-discussion")}
                >
                  Start discussion <BsPlus />
                </button>

                <div className="hidden lg:block">
                  <TopUserCard />
                </div>

                {/* <div className="mt-3 mb-10 card">
              <h6 className="text-xs">Stats</h6>
              <div className="flex justify-between items-center my-4 px-10 lg:gap-8">
                <span className="grid gap-1">
                  <BsChat className="text-green-600 text-xl" />
                  <h5 className="text-[10px]">
                    {makeFriendly(commentsResult?.length)}
                  </h5>
                </span>
                <span className="grid gap-1">
                  <BsEye className="text-blue-600 text-xl" />
                  <h5 className="text-[10px]">{makeFriendly(post?.views)}</h5>
                </span>
                <span className="grid gap-1">
                  <BsArrowDown className="text-red-600 text-xl" />
                  <h5 className="text-[10px]">253</h5>
                </span>
                <span className="grid gap-1">
                  <BsPinAngleFill className="text-green-600 text-xl" />
                  <h5 className="text-[10px]">4</h5>
                </span>
              </div>
            </div> */}
                {/* <div className="card">
              <h6 className="text-xs font-bold">Related Question</h6>
              <RelatedQuestion />
              <RelatedQuestion />
              <RelatedQuestion />
              <RelatedQuestion />
              <RelatedQuestion />
            </div> */}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PostDetail;
