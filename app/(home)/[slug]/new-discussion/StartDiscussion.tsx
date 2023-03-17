"use client";
import React, { useState } from "react";

export const StartDiscussion = ({ setStartDiscussion }: any) => {
  const [data, setData] = useState(false);
  return (
    <form>
      <div className="w-full">
        <input
          type="text"
          placeholder="Add a title"
          className="w-full px-4 py-2 text-xs"
        />
        <h6 className="text-xs my-4 text-gray-500 text-right">0/12</h6>
      </div>
      <div className="card h-56 my-4"></div>
      <div className="">
        <h5 className="text-sm font-bold">
          Tags{" "}
          <span className="text-xs text-gray-500">
            ( Separate tags with commas)
          </span>
        </h5>
        <div className="my-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Add tags"
              className="w-min-[150px] px-2 py-2 text-xs"
            />
            <select name="" id="" className="w-full px-2 py-2 text-xs">
              <option value="">Select a top</option>
              <option value="divorve">Divorce</option>
              <option value="breastfeeding">Breastfeeding</option>
            </select>
          </div>
          <div className="hidden md:block">
            <button
              className="text-xs p-2 px-4 rounded-none"
              onClick={() => setStartDiscussion(false)}
            >
              Publish post
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h5 className="text-sm font-bold my-2">Featured image</h5>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Add tags"
              className=" px-2 py-2 text-xs w-min-[150px]"
            />

            <div className="flex items-center text-xs gap-2">
              <label htmlFor="anonymous" className="text-xs">
                Post Anonymousely
              </label>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 dark:bg-neutral-600 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 dark:after:bg-neutral-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary dark:checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary dark:checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                type="checkbox"
                role="switch"
                id="flexSwitchChecked"
                checked={data}
                onChange={() => setData((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button className="text-xs p-2 px-4 rounded-none">Publish post</button>
      </div>
    </form>
  );
};
