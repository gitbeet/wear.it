import React from "react";
import { type UseFormRegister } from "react-hook-form";
import { type SignUpValidationType } from "~/pages/sign-up";

interface Props {
  register: UseFormRegister<SignUpValidationType>;
  label: string;
  name: keyof SignUpValidationType;
  type: string;
  placeholder: string;
  error: string | undefined;
}

const FormField = ({
  label,
  name,
  type,
  placeholder = "",
  register,
  error,
}: Props) => {
  return (
    <div className="relative">
      <label
        className={`${
          error ? "text-red-500" : "text-slate-600"
        } absolute -top-0 left-12 z-10 -translate-y-1/2 rounded-full bg-slate-50  px-4  `}
        htmlFor="email"
      >
        {label}
      </label>
      {error && (
        <p className="absolute bottom-0 right-12 translate-y-1/2 rounded-full bg-slate-50 px-2 text-sm font-bold text-red-500">
          {error}
        </p>
      )}
      <input
        className={`${
          error ? "border-red-500" : " border-slate-300 focus:border-indigo-400"
        } h-14 w-full rounded-full border bg-slate-50 pl-[72px] outline-none placeholder:text-slate-300 `}
        placeholder={placeholder}
        id={name}
        type={type}
        {...register(name)}
      />
    </div>
  );
};

export default FormField;
