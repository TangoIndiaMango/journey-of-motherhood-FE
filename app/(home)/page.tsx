import React from "react";
import { MdShowChart } from "react-icons/md";
import ForumTopics from "./ForumTopics";
import TrendingToday from "./TrendingToday";
import NewPosts from "./NewPosts";

const Home = () => {
  return (
    <section className="m-10 md:grid grid-cols-3 gap-4 md:mx-0 md:px-5 ">
      <div className="md:col-span-2">
        <div className="grid gap-2">
          <div className="card grid gap-4 ">
            <div className="w-44">
              <button>Announcement</button>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              velit?
            </p>
          </div>
          <div className="mt-10">
            <h4 className="font-bold my-2">Forum Topics</h4>
            <ForumTopics />
            <ForumTopics />
            <ForumTopics />
            <ForumTopics />
            <ForumTopics />
          </div>
        </div>
      </div>
      <div className="col-span-1 md:grid gap-4 h-fit hidden ">
        <div className="card ">
          <div className="flex items-center justify-between text-sm mb-5">
            <h4 className="font-bold">Trending Today</h4>
            <MdShowChart className="text-blue-500 text-xl" />
          </div>
          <TrendingToday />
          <TrendingToday />
          <TrendingToday />
          <TrendingToday />
          <TrendingToday />
        </div>
        <div className="card">
          <h4 className="font-bold text-sm mb-5">New Posts</h4>
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
          <NewPosts />
        </div>
      </div>
    </section>
  );
};

export default Home;
