import React from "react";

const Profile = () => {
  return (
    <section className="p-10 lg:grid grid-cols-3 gap-4 lg:pt-40 lg:gap-10">
      <div className="text-center flex items-center w-full mt-4 flex-col gap-6 lg:col-span-1 lg:gap-14 lg:px-8 lg:border-r-[1px] lg:border-r-gray-600">
        <div className="w-28 h-28 rounded-full bg-black"></div>
        <h4 className="text-sm text-black font-bold">Beatrice Etim</h4>
        <div className="flex gap-4">
          <div className="px-4 flex text-xs gap-2 font-bold flex-col border-r-[1px] border-r-gray-300">
            <h6>26</h6>
            <h6>Posts</h6>
          </div>
          <div className="px-4 flex text-xs gap-2 font-bold flex-col border-r-[1px] border-r-gray-300">
            <h6>15K</h6>
            <h6>Followers</h6>
          </div>
          <div className="px-4 flex text-xs gap-2 font-bold flex-col ">
            <h6>13</h6>
            <h6>Following</h6>
          </div>
        </div>
        <div className="my-4 lg:my-20">
          <h3 className="text-[13px] font-bold">About</h3>
          <p className="text-[12px] my-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            nesciunt cupiditate asperiores incidunt sapiente laborum consectetur
            quaerat esse accusantium delectus.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-sm font-bold">BASIC INFO</h2>
        <form className="">
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className="text-[11px]">First Name</label>
            <input type="text" name="" id="" />
          </div>
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className="text-[11px]">Last Name</label>
            <input type="text" name="" id="" />
          </div>
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className="text-[11px]">Email</label>
            <input type="email" name="" id="" />
          </div>
          <div className="grid gap-2 my-4 lg:gap-4">
            <label className="text-[11px]">About</label>
            <textarea name="" id="" cols={30} rows={5}></textarea>
          </div>

          <div className="grid gap-2 my-4 lg:gap-4">
            <div className="flex justify-between items-center my-2">
              <label className="text-[11px]">Security</label>
              <button className="w-fit text-[11px] px-5 py-1">EDIT</button>
            </div>
            <input type="password" name="" id="" />
          </div>

          <div className="flex gap-4 justify-end">
            <button className=" w-fit text-[11px] px-5  bg-white border-[1px] border-[var(--primaryColor)] text-black">
              CANCEL
            </button>
            <button className="w-fit text-[11px] px-5 ">SAVE</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
