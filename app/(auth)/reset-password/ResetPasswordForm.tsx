"use client";

import Link from "next/link";
import { BsArrowLeftShort } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormData } from "@/services/constants/types";
import {
  emailPattern,
  passwordPattern,
  validateDateOfBirth,
} from "@/services/variables";
import Input from "@/components/Input";
import { registerUrl, resetPasswordUrl } from "@/services/utils/url";
import usePostRequest from "@/hooks/usePostRequests";
import AuthCarousel from "@/app/AuthCarousel";
import { useState } from "react";
import { Card } from "antd";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [response, setResponse] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const { data, postRequest, isLoading, error } = usePostRequest();

  const onSubmit = async (data: FormData) => {
    const updatedData = {
      email: data.email,
      base_url: typeof window !== "undefined" && window.location.origin,
    };
    postRequest({ url: resetPasswordUrl, query: updatedData });
  };

  if (error) console.log(error);

  return (
    <section className="flex flex-col h-screen md:flex-row-reverse">
      <AuthCarousel />

      <div className="px-10 py-10 md:py-20 relative bg-[var(--bgColor)] h-[80%] md:h-screen md:w-2/3 md:px-30 md:grid place-content-center ">
        <BsArrowLeftShort
          className="text-2xl absolute top-5 left-8 cursor-pointer"
          onClick={() => router.push("/")}
        />
        {data ? (
          <div className="h-[100px] px-10 absolute inset-0 m-auto">
            <Card className="max-w-[250px] mx-auto">
              <h2 className="text-green-500">
                A reset password link has been sent to your{" "}
                <a
                  href="https://mail.google.com/"
                  className="text-[var(--primaryColor)] cursor-pointer hover:underline hover:text-[var(--primaryColor)] hover:opacity-70 transition"
                >
                  Email
                </a>
              </h2>
            </Card>
          </div>
        ) : (
          <>
            <div className="text-center flex flex-col items-center gap-4">
              <h3 className="text-[1.2rem] font-extrabold text-center mx-auto max-w-[35ch] my-5">
                Reset Password
              </h3>
            </div>
            <form
              className="flex flex-col gap-6  lg:w-[350px] my-4"
              onSubmit={handleSubmit(onSubmit)}
            >
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

              <button
                type="submit"
                className="button disabled:cursor-not-allowed disabled:bg-gray-500"
                disabled={isLoading}
              >
                <>{isLoading ? "Loading..." : "Reset Password"}</>
              </button>
              <div className="text-[12px] text-gray-600 flex justify-center w-4/5 mx-auto gap-4 h-full items-center">
                <p>{"Already"} have an account?</p>
                <Link href={"/login"} className="text-black font-bold">
                  {"Log in"}
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default ResetPasswordForm;
