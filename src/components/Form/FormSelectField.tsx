import { type UseFormRegister } from "react-hook-form";
import { type SignInValidationType } from "~/pages/sign-in";
import { type SignUpValidationType } from "~/pages/sign-up";
import { type ClientDataValidationType } from "../pages/checkout/CheckoutForm";

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
  error: string | undefined;
  required?: boolean;
  data: Array<string> | undefined;
  //   value: string | undefined;
}

const FormSelectField = ({
  label,
  name,
  register,
  error,
  data,
  required = false,
}: Props) => {
  return (
    <div className="relative w-[min(100%,256px)]">
      <label
        className={`${
          error ? "text-red-500" : "text-slate-800"
        }   relative -top-1 `}
        htmlFor="email"
      >
        {label}
        {required && <span className="pl-1 text-red-500">*</span>}
      </label>
      {error && (
        <p className="absolute -top-1 right-0  rounded-full  text-sm text-red-500">
          {error}
        </p>
      )}

      <select
        // value={value}
        className={`${
          error ? "border-red-500" : " border-slate-200 focus:border-indigo-400"
        } h-12 w-full rounded-sm border bg-white px-4 outline-none placeholder:text-slate-400 `}
        id={name}
        {...register}
      >
        {data?.map((item, i) => <option key={i}>{item}</option>)}
      </select>
    </div>
  );
};

export default FormSelectField;
