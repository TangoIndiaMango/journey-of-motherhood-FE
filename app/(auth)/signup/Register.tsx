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
import { registerUrl } from "@/services/utils/url";
import usePostRequest from "@/hooks/usePostRequests";
import AuthCarousel from "@/app/AuthCarousel";

const AuthLayout = () => {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const { data, postRequest, isLoading, error } = usePostRequest();

  const watchPassword = watch("password", "");
  const validateConfirmPassword = (value: string) => {
    if (value !== watchPassword) {
      return "Passwords do not match";
    }
  };

  const onSubmit = async (data: FormData) => {
    postRequest({ url: registerUrl, query: data });
  };

  if (error) console.log(error);
  if (data) router.replace("/login");

  return (
    <section className="flex flex-col h-screen md:flex-row-reverse">
      <AuthCarousel />

      <div className="px-10 py-10 md:py-20 relative bg-[var(--bgColor)] h-[80%] md:h-screen md:w-2/3 md:px-30 md:grid place-content-center ">
        <BsArrowLeftShort
          className="text-2xl absolute top-5 left-8 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="text-center flex flex-col items-center gap-4">
          <h3 className="text-[1.2rem] font-extrabold text-center mx-auto max-w-[35ch] my-5">
            Without anything called mother every living thing would have gone to
            extinction. Mothers birth each generation of mankind.
          </h3>

          {/* <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </p> */}

          {/* <>
            <span className="cursor-pointer border-[1px] border-gray-400 flex h-max items-center px-2 py-1 gap-3 w-fit rounded-2xl mt-2">
              <FcGoogle />
              <h6 className="text-[12px] font-bold">{"Sign up"} with Google</h6>
            </span>
            <p className="mb-2 md:mb-6">or</p>
          </> */}
        </div>
        <form
          className="flex flex-col gap-6  lg:w-[350px] my-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <div className="grid gap-4 ">
              <div className="inputContainer flex h-fit justify-between items-center relative w-full">
                <input
                  type="text"
                  className="w-full focus:outline-none"
                  {...register("first_name", { required: true })}
                  placeholder="First Name"
                />
              </div>
              <div className="inputContainer flex h-fit justify-between items-center relative w-full">
                <input
                  type="text"
                  className="w-full focus:outline-none"
                  {...register("last_name", { required: true })}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="grid gap-4 ">
              <div className="inputContainer flex h-fit justify-between items-center relative w-full">
                <select
                  id=""
                  {...register("gender", { required: true })}
                  className="w-full focus:outline-none "
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Others</option>
                </select>
              </div>

              <Input
                register={register}
                type="date"
                placeholder="date"
                name="date_of_birth"
                required
                error={errors.date_of_birth}
                requirements={{
                  required: true,
                  validate: validateDateOfBirth,
                }}
              />
            </div>
          </>

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

          <button
            type="submit"
            className="button disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={isLoading}
          >
            <>{isLoading ? "Loading..." : "Sign up"}</>
          </button>
          <div className="text-[12px] text-gray-600 flex justify-center w-4/5 mx-auto gap-4 h-full items-center">
            <p>{"Already"} have an account?</p>
            <Link href={"/login"} className="text-black font-bold">
              {"Log in"}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthLayout;
