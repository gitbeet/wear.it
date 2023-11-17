import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "~/components/UI/Button";
import { BsEnvelope, BsKey, BsLock } from "react-icons/bs";

interface InputFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  type: "text" | "email" | "password" | "number";
  value: string;
  icon: JSX.Element;
  placeholder?: string;
}

export const InputField = ({
  onChange,
  label,
  name,
  type,
  value,
  icon,
  placeholder = "",
}: InputFieldProps) => {
  return (
    <div className="relative">
      <label
        className="absolute -top-3 left-14 z-10 bg-slate-50 px-4  text-slate-400"
        htmlFor="email"
      >
        {label}
      </label>
      <div className="absolute left-5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-slate-300">
        {icon}
      </div>
      <input
        placeholder={placeholder}
        className="h-16 w-full rounded-full  border border-slate-300 bg-slate-50 pl-[72px] focus:border-transparent focus:outline focus:outline-violet-200"
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        value={value}
      />
    </div>
  );
};

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // start the sign In process.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        await router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: unknown) {
      console.error("An error has occured (fix error message later)");
    }
  };

  return (
    <section>
      <div className="h-16"></div>

      <h1 className="text-center font-display text-6xl font-black">
        Welcome back
      </h1>
      <div className="h-24"></div>
      <form className="mx-auto max-w-[400px]">
        <InputField
          placeholder="johndoe@email.com"
          icon={<BsEnvelope className="h-8 w-8" />}
          value={emailAddress}
          label="Email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmailAddress(e.target.value)
          }
          type="email"
        />
        <div className="h-6"></div>
        <InputField
          placeholder="•••••••"
          icon={<BsKey className="h-8 w-8" />}
          value={password}
          label="Password"
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          type="password"
        />
        <div className="h-8"></div>
        <Button onClick={handleSubmit} text="Sign in" />
        <div className="h-4"></div>
        <div className="px-4">
          <Link
            className="font-semibold text-orange-400"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
          <br />
          <div className="h-1 "></div>
          <span className="font-light text-slate-800">Not a member yet?</span>
          <Link href="/sign-up" className="pl-1 font-bold text-violet-500">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
}
