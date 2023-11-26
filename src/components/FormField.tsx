import React, { useEffect, useRef } from "react";
import { type UseFormRegister } from "react-hook-form";
import { type SignInValidationType } from "~/pages/sign-in";
import { type SignUpValidationType } from "~/pages/sign-up";
import { type ClientDataValidationType } from "./CheckoutForm";

interface Props {
  register: ReturnType<
    UseFormRegister<
      SignUpValidationType | SignInValidationType | ClientDataValidationType
    >
  >;
  label: string;
  name:
    | keyof SignUpValidationType
    | keyof SignInValidationType
    | keyof ClientDataValidationType;
  type: string;
  placeholder: string;
  error: string | undefined;
  icon?: JSX.Element;
  fancy?: boolean;
  required?: boolean;
  autoFocus?: boolean;
}

const FormField = ({
  label,
  name,
  type,
  placeholder = "",
  register,
  error,
  icon,
  fancy = false,
  required = false,
  autoFocus = false,
}: Props) => {
  useEffect(() => {
    if (!autoFocus) return;
    const inputElement = document.getElementById(name);
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  return fancy ? (
    <div className="relative grow">
      <label
        className={`${
          error ? "text-pink-500" : "text-slate-600"
        } absolute -top-0 left-12 z-10 -translate-y-1/2 rounded-full bg-slate-50  px-4  `}
        htmlFor={name}
      >
        {label}
        {required && <span className="pl-1 text-pink-500">*</span>}
      </label>
      {error && (
        <p className="absolute bottom-0 right-12 translate-y-1/2 rounded-full bg-slate-50 px-2 text-sm font-bold text-red-500">
          {error}
        </p>
      )}
      <div className="absolute left-5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-indigo-300">
        {icon}
      </div>
      <input
        className={`${
          error ? "border-red-500" : " border-slate-300 focus:border-indigo-400"
        } h-14 w-full rounded-full border bg-slate-50 pl-[72px] outline-none placeholder:text-slate-300 `}
        placeholder={placeholder}
        id={name}
        type={type}
        {...register}
      />
    </div>
  ) : (
    <div className="relative grow">
      <label
        className={`${
          error ? "text-red-500" : "text-slate-900"
        }   relative -top-2 font-bold `}
        htmlFor={name}
      >
        {label}
        {required && <span className="pl-0.5 text-red-500">*</span>}
      </label>
      {error && (
        <p className="absolute -top-2 right-0  rounded-full  text-sm font-bold text-red-500">
          {error}
        </p>
      )}
      <input
        autoFocus={autoFocus}
        className={`${
          error ? "border-red-500" : " border-slate-200 focus:border-indigo-400"
        } h-10 w-full rounded-sm border bg-slate-100 px-4 outline-none placeholder:text-slate-400 `}
        placeholder={placeholder}
        id={name}
        type={type}
        {...register}
      />
    </div>
  );
};

export default FormField;
