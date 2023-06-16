"use client";

import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormData } from "@/services/constants/types";
import { emailPattern, passwordPattern } from "@/services/variables";
import axios from "axios";
import { loginUrl } from "@/services/utils/url";
import AuthCarousel from "../../AuthCarousel";
import Input from "@/components/Input";
import { Toaster, toast } from "react-hot-toast";
import { Spin } from "antd";
import { useUser } from "@/services/state/useUser";

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(loginUrl, {
        email: data?.email,
        password: data?.password,
      });

      if (response.data) {
        toast.success("Login Successful!");
        setUser(response.data.user);
        typeof window !== "undefined" &&
          window.localStorage.setItem(
            "access_token",
            response.data.access_token
          );
        typeof window !== "undefined" &&
          window.localStorage.setItem(
            "refresh_token",
            response.data.refresh_token
          );
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed, Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBox ? setDisableBtn(false) : setDisableBtn(true);
  }, [checkBox]);

  return (
    <section className="flex flex-col h-screen md:flex-row-reverse">
      <AuthCarousel />
      <Toaster />
      <div className="px-10 py-10 md:py-20 relative bg-[var(--bgColor)] h-3/4 md:h-screen md:w-2/3 md:px-30 md:grid place-content-center ">
        <BsArrowLeftShort
          className="text-2xl absolute top-5 left-8 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="text-center flex flex-col items-center gap-4">
          <h3 className="text-[1.2rem] font-extrabold text-center mx-auto max-w-[35ch] my-5">
            Without anything called mother every living thing would have gone to
            extinction. Mothers birth each generation of mankind.
          </h3>

          {/* <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            illo!
          </p> */}

          {/* <>
            <span className="cursor-pointer border-[1px] border-gray-400 flex h-max items-center px-2 py-1 gap-3 w-fit rounded-2xl mt-2">
              <FcGoogle />
              <h6 className="text-[12px] font-bold">Log in with Google</h6>
            </span>
            <p className="mb-2 md:mb-6">or</p>
          </> */}
        </div>
        <form
          className="flex flex-col gap-6 my-4 lg:w-[350px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* signup form  starts*/}

          <div className="grid gap-4 ">
            <Input
              register={register}
              type="email"
              placeholder="Email"
              name="email"
              required
              error={errors.email}
              requirements={{
                required: true,
                pattern: {
                  value: emailPattern,
                  message: "Please enter a valid Email",
                },
              }}
            />
          </div>

          <div className="grid gap-4 ">
            <Input
              register={register}
              passwordTrigger={true}
              type="password"
              placeholder="Password"
              name="password"
              required
              error={errors.password}
              requirements={{
                required: true,
                pattern: {
                  value: passwordPattern,
                  message:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
                },
              }}
            />
          </div>

          {/* <div className="text-[12px] text-gray-600 flex h-full justify-between items-center my-2 ">
            <span className=" flex h-full items-center gap-3">
              <input
                type="checkbox"
                name=""
                id="remember"
                checked={checkBox}
                onChange={() => setCheckBox(!checkBox)}
                className=" border-gray-100 accent-[var(--primaryColor)] cursor-pointer "
              />{" "}
              <label htmlFor="remember">Remember for 30 days</label>
            </span>
            <Link href={"/reset-password"} className="underline">
              Forget password
            </Link>
          </div> */}

          <div className="space-y-2">
            <Link href={"/reset-password"} className="underline">
              Forget password
            </Link>
            <button
              type="submit"
              className="button disabled:cursor-not-allowed disabled:bg-gray-500"
              disabled={loading}
            >
              <>{loading ? "Loading..." : "Log in"}</>
            </button>
          </div>

          <div className="text-[12px] text-gray-600 flex justify-center w-4/5 mx-auto gap-4 h-full items-center">
            <p>{"Don't"} have an account?</p>
            <a href={"/signup"} className="text-black font-bold">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signin;
