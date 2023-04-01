"use client";

import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import AuthCarousel from "./AuthCarousel";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import { loginUrl, registerUrl } from "../services/utils/url";

import { FormData } from "@/services/constants/types";
import { passwordPattern } from "@/services/variables";
import axios from "axios";

const AuthLayout = ({ loginApp = false, signup = false, password = false }) => {
  const router = useRouter();
  const signPassword = signup || password;

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const watchPassword = watch("password", "");
  const validateConfirmPassword = (value: string) => {
    if (value !== watchPassword) {
      return "Passwords do not match";
    }
  };

  const onSubmit = async (data: FormData) => {};

  return (
    <section className="flex flex-col h-screen md:flex-row-reverse">
      <AuthCarousel />

      <div className="px-10 py-10 md:py-20 relative bg-[var(--bgColor)] h-3/4 md:h-screen md:w-2/3 md:px-30 md:grid place-content-center ">
        <BsArrowLeftShort
          className="text-2xl absolute top-5 left-8 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="text-center flex flex-col items-center gap-4">
          <h3 className="text-xl font-extrabold">Reset password</h3>

          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            illo!
          </p>
          {password ? (
            <div className="my-4"></div>
          ) : (
            <>
              <span className="cursor-pointer border-[1px] border-gray-400 flex h-max items-center px-2 py-1 gap-3 w-fit rounded-2xl mt-2">
                <FcGoogle />
                <h6 className="text-[12px] font-bold">
                  {loginApp && "Log in"} {signup && "Sign up"} with Google
                </h6>
              </span>
              <p className="mb-2 md:mb-6">or</p>
            </>
          )}
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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

            <Input
              register={register}
              passwordTrigger={true}
              watch={watch}
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              required
              error={errors.confirm_password}
              requirements={{
                required: true,
                validate: validateConfirmPassword,
              }}
            />
          </div>

          <button type="submit" className="button">
            <>{password && "Reset Password"}</>
          </button>
          <div className="text-[12px] text-gray-600 flex justify-center w-4/5 mx-auto gap-4 h-full items-center">
            <p>{"Already"} have an account?</p>
            <Link
              href={loginApp ? "/signup" : "/login"}
              className="text-black font-bold"
            >
              {"Log in"}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthLayout;
