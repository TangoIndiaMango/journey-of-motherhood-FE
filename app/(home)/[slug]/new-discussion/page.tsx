"use client";

import React, { useState } from "react";
import { StartDiscussion } from "../../StartDiscussion";
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
import { BiInfoCircle } from "react-icons/bi";
import CommentsComment from "./CommentsComment";
import { postData } from "../../../../services/constants/post";

const NewDiscusion = () => {
  const [startDiscussion, setStartDiscussion] = useState(false);

  return (
    <section className="min-h-screen ">
      <div className="">
        {startDiscussion ? (
          <div className="p-6">
            {" "}
            <StartDiscussion setStartDiscussion={setStartDiscussion} />
          </div>
        ) : (
          <div className="md:flex items-start gap-2 ">
            <div className="md:flex flex-col">
              {postData.posts?.map((post: any) => {
                return (
                  <div className="p-6  card m-4" key={post.id}>
                    <div className="relative">
                      <span className="absolute left-0 top-0 flex flex-col gap-1 ">
                        <BsArrowUp className="text-gray-600" />
                        <h6 className="text-xs text-black font-bold">253</h6>
                        <BsArrowDown className="text-red-500" />
                      </span>
                      <div className="pl-10">
                        <div className="flex justify-between items-start">
                          <div className="flex item-center flex-col gap-2 md:flex-row md:gap-[20px]">
                            <h5 className="text-sm font-bold">{post.title}</h5>
                            <button className="w-fit text-[8px] px-4 py-1">
                              QUESTION
                            </button>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-black"></div>
                        </div>

                        <p className="text-xs my-3">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facere asperiores consequuntur blanditiis quas
                          repudiandae facilis nobis dolore, eius earum, debitis
                          aperiam mollitia, alias ducimus possimus! Sint,
                          perferendis. Placeat, repellendus neque!
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-2">
                            <span className="px-2  p-1 shadow-sm">
                              <BsHandThumbsUpFill className="text-yellow-400 " />
                            </span>
                            <h6 className="text-[10px]">2.3k</h6>
                          </span>
                          <span className="flex items-center gap-6">
                            <span className="flex item-center gap-2">
                              <BiInfoCircle />
                              <h6 className="text-[10px]">Report</h6>{" "}
                            </span>
                            <BsPinAngle />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] my-4 bg-gray-300"></div>

                    {/* comment comments */}
                    <div className=" m-2 bg-gray-100 p-2">
                      {post.comments.map((comment: any) => (
                        <CommentsComment comment={comment} key={comment.id} />
                      ))}
                    </div>
                    <div className="flex items-start justify-between my-4 mx-4 gap-2">
                      <span className="w-8 h-8 rounded-full bg-black block"></span>

                      <div className="full justify-self-start">
                        <input
                          type="text"
                          className="bg-gray-100 py-1  rounded-sm w-fit"
                        />
                      </div>
                      <div className="full">
                        <button className="text-[8px] w-[80px] py-1">
                          Add a comment
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-6 ">
              <button
                className="text-xs flex items-center justify-center"
                onClick={() => setStartDiscussion(true)}
              >
                <BsPlus /> Start discussion
              </button>
              <div className="mt-3 mb-10 card">
                <h6 className="text-xs">Stats</h6>
                <div className="flex justify-between items-center my-4 px-10 lg:gap-8">
                  <span className="grid gap-1">
                    <BsChat className="text-green-600 text-xl" />
                    <h5 className="text-[10px]">109</h5>
                  </span>
                  <span className="grid gap-1">
                    <BsEye className="text-blue-600 text-xl" />
                    <h5 className="text-[10px]">12.4k</h5>
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
              </div>
              <div className="card">
                <h6 className="text-xs font-bold">Related Question</h6>
                <RelatedQuestion />
                <RelatedQuestion />
                <RelatedQuestion />
                <RelatedQuestion />
                <RelatedQuestion />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewDiscusion;

const RelatedQuestion = () => {
  return (
    <div className="">
      <p className="text-[10px] text-[var(--primaryColor)] my-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, maxime!
      </p>
      <div className="flex justify-start gap-4 items-center ">
        <h5 className="text-[10px]">Added by</h5>
        <div className="w-5 h-5 rounded-full bg-black"></div>
        <h5 className="text-[10px]">Adenike M.</h5>
        <h5 className="text-[10px] text-gray-600">50 answers</h5>
      </div>
    </div>
  );
};
