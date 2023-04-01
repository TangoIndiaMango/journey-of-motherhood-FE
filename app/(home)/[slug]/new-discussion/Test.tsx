"use client";

import React from "react";
type Post = {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

type Comment = {
  id: number;
  postId: number;
  content: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
};

type Props = {
  posts: Post[];
};

const CommentSystem: React.FC<any> = ({ posts }: any) => {
  return (
    <div className="p-4">
      {posts &&
        posts.posts?.map((post: any) => (
          <div key={post.id} className="border rounded-md mb-4 p-4">
            <h2 className="text-lg font-medium">{post.title}</h2>
            <p className="mt-2 mb-4">{post.content}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-light">{post.createdAt}</span>
              <button className="text-blue-500 hover:underline">
                Like ({post.likes.length})
              </button>
            </div>
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="border rounded-md mb-4 p-4">
                <p className="mb-2">{comment.content}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-light">
                    {comment.createdAt}
                  </span>
                  <button className="text-blue-500 hover:underline">
                    Like ({comment.likes.length})
                  </button>
                </div>
                <div className="flex justify-end mb-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline ml-2">
                    Delete
                  </button>
                </div>
                {comment.replies && (
                  <div className="ml-4">
                    {comment.replies.map((reply: any) => (
                      <div
                        key={reply.id}
                        className="border rounded-md mb-4 p-4"
                      >
                        <p className="mb-2">{reply.content}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-light">
                            {reply.createdAt}
                          </span>
                          <button className="text-blue-500 hover:underline">
                            Like ({reply.likes.length})
                          </button>
                        </div>
                        <div className="flex justify-end mb-2">
                          <button className="text-blue-500 hover:underline">
                            Edit
                          </button>
                          <button className="text-red-500 hover:underline ml-2">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <form className="flex flex-col mb-4">
              <textarea
                className="border rounded-md p-2 mb-2"
                rows={3}
                placeholder="Leave a comment"
              ></textarea>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Submit
              </button>
            </form>
          </div>
        ))}
    </div>
  );
};

export default CommentSystem;
