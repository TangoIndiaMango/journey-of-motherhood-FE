"use client";

import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthCarousel from "./AuthCarousel";
import { useState } from "react";
const AuthLayout = ({ login = false, signup = false, password = false }) => {
  const signPassword = signup || password;
  const [passwordType, setPasswordType] = useState("password");

  return (
    <section className="flex flex-col h-screen md:flex-row-reverse">
      <AuthCarousel />
      <div className="px-14 py-20 relative bg-[var(--bgColor)] h-2/3 md:h-screen md:w-2/3 md:px-30 md:grid place-content-center">
        <BsArrowLeftShort className="text-2xl absolute top-12 left-8" />
        <div className="text-center flex flex-col items-center gap-4">
          {password ? (
            <h3 className="text-xl font-extrabold">Reset password</h3>
          ) : (
            <h3 className="text-xl font-extrabold">
              Welcome {login && "Back"}!
            </h3>
          )}

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            illo!
          </p>
          {password ? (
            <div className="my-4"></div>
          ) : (
            <>
              <span className="cursor-pointer border-[1px] border-gray-400 flex h-max items-center px-2 py-1 gap-3 w-fit rounded-2xl my-4">
                <FcGoogle />
                <h6 className="text-[12px] font-bold">
                  {login && "Log in"} {signup && "Sign up"} with Google
                </h6>
              </span>
              <p className="mb-6">or</p>
            </>
          )}
        </div>
        <form className="flex flex-col gap-6">
          {login && (
            <div className="inputContainer">
              <input
                type="text"
                placeholder="Email"
                className="w-full outline-none"
              />
            </div>
          )}
          <div className="inputContainer flex h-full justify-between items-center">
            <input
              type={passwordType}
              name=""
              id=""
              placeholder="Password"
              className="w-full outline-none"
            />
            {passwordType == "name" ? (
              <FiEye
                className="text-gray-600"
                onClick={() => setPasswordType("password")}
              />
            ) : (
              <FiEyeOff
                className="text-gray-600"
                onClick={() => setPasswordType("name")}
              />
            )}
          </div>
          {signPassword && (
            <div className="inputContainer flex h-full justify-between items-center">
              <input
                type={passwordType}
                name=""
                id=""
                placeholder="Confirm password"
                className="w-full outline-none"
              />
              {passwordType == "name" ? (
                <FiEye
                  className="text-gray-600"
                  onClick={() => setPasswordType("password")}
                />
              ) : (
                <FiEyeOff
                  className="text-gray-600"
                  onClick={() => setPasswordType("name")}
                />
              )}
            </div>
          )}
          {login && (
            <div className="text-[12px] text-gray-600 flex h-full justify-between items-center my-2">
              <span className=" flex h-full items-center  gap-3">
                <input
                  type="checkbox"
                  name=""
                  id="remember"
                  className=" border-gray-100 accent-[var(--primaryColor)] cursor-pointer "
                />{" "}
                <label htmlFor="remember">Remember for 30 days</label>
              </span>
              <Link href={"/reset-password"} className="underline">
                Forget password
              </Link>
            </div>
          )}
          <button>
            {login && "Log in"} {signup && "Sign up"}{" "}
            {password && "Reset Password"}
          </button>
          <div className="text-[12px] text-gray-600 flex justify-center w-4/5 mx-auto gap-4 h-full items-center">
            <p>
              {login && "Don't"} {signup && "Already"} have an account?
            </p>
            <a
              href={login ? "/signup" : "/login"}
              className="text-black font-bold"
            >
              {!login && "Log in"} {!signPassword && "Sign up"}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthLayout;
