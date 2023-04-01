"use client";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  type,
  passwordTrigger,
  placeholder,
  register,
  name,
  requirements,
  style,
  error,
}: any) => {
  const [passwordType, setPasswordType] = useState("password");
  return (
    <div className="grid items-start">
      <div className="inputContainer flex h-fit justify-between items-center relative w-full">
        <input
          type={passwordTrigger ? passwordType : type}
          id={name}
          placeholder={placeholder}
          className={`w-full outline-none ${style}`}
          {...register(name, requirements)}
        />

        {passwordTrigger && (
          <>
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
          </>
        )}
      </div>

      {error && <div className="text-red-500 text-[10px]">{error.message}</div>}
    </div>
  );
};

export default Input;
