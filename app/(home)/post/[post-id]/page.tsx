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

const PostDetail = () => {
  const { postValue: post } = usePost();
  const segments = useSelectedLayoutSegments();
  const router = useRouter();

  const { user } = useUser();

  const {
    data: commentsResult,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery(["commentsResults", post?.id], async () => {
    if (post?.id) {
      const response = await axios.get(`${postsUrl}comment/${post?.id}`);
      return response.data;
    }
  });

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
        <div className="md:flex items-start gap-2 ">
          <div className="md:flex flex-col  lg:w-[60%]">
            <div className="p-6  card my-4  " key={post?.id}>
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
                      <h5 className="text-sm font-bold">{post?.title}</h5>
                    </div>

                    <div className="w-full  flex justify-end">
                      <Avatar>
                        {post.author ? (
                          <>
                            {post?.author?.first_name.toUpperCase().charAt(0) +
                              post?.author?.last_name.toUpperCase().charAt(0)}
                          </>
                        ) : (
                          <>ANO</>
                        )}
                      </Avatar>
                    </div>
                  </div>

                  <p className="text-xs my-3">{post?.description}</p>

                  <div className="flex justify-between items-center">
                    {/* <span className="flex items-center gap-2">
                      <span className="px-2  p-1 shadow-sm">
                        <BsHandThumbsUpFill className="text-yellow-400 " />
                      </span>
                      <h6 className="text-[10px]">2.3k</h6>
                    </span> */}
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
              {user && (
                <div className="flex items-start justify-between my-4 mx-4 gap-2">
                  <Avatar>
                    {user?.first_name.toUpperCase().charAt(0) +
                      user?.last_name.toUpperCase().charAt(0)}
                  </Avatar>

                  <CommentForm postId={post?.id} />
                </div>
              )}
            </div>
          </div>
          <div className="p-6 ">
            <button
              className="text-xs flex items-center justify-center  px-8 w-full"
              onClick={() => router.push("/post/new-discussion")}
            >
              <BsPlus /> Start discussion
            </button>
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
      </div>
    </section>
  );
};

export default PostDetail;
