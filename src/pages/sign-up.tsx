import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "~/components/UI/Button";
import FormField from "~/components/FormField";
import {
  BsDashCircle,
  BsEnvelope,
  BsFillCheckCircleFill,
  BsKey,
  BsPerson,
  BsXCircleFill,
} from "react-icons/bs";

export type SignUpValidationType = z.infer<typeof signUpValidationSchema>;

const signUpValidationSchema = z
  .object({
    username: z.string().min(1, { message: "Username required" }),
    emailAddress: z.string().min(1, { message: "Email required" }).email(),
    password: z
      .string()
      .min(1, { message: "Password required" })
      .min(8, { message: "Password too short" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Password confirmation required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpValidationType>({
    resolver: zodResolver(signUpValidationSchema),
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  // start the sign up process.
  const onSubmit: SubmitHandler<SignUpValidationType> = async (data) => {
    const { emailAddress, password, username } = data;
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        void router.push("/");
      }
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = password === confirmPassword;

  const confirmPasswordIcon =
    !password?.length && !confirmPassword?.length ? (
      <BsDashCircle className="h-8 w-8 " />
    ) : passwordsMatch ? (
      <BsFillCheckCircleFill className="h-8 w-8 text-teal-500" />
    ) : (
      <BsXCircleFill className="h-8 w-8 text-red-500" />
    );

  return (
    <section className="padding-x">
      <div className="h-16"></div>
      <h1 className="text-center font-display text-6xl font-black">
        Become a member
      </h1>
      <div className="h-16"></div>
      {!pendingVerification && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[400px]"
        >
          <div className="h-8"></div>
          <FormField
            error={errors.username?.message}
            label="Username"
            name="username"
            placeholder="johndoe123"
            register={register("username")}
            type="text"
            icon={<BsPerson className="h-8 w-8" />}
          />
          <div className="h-8"></div>
          <FormField
            error={errors.emailAddress?.message}
            label="Email"
            name="emailAddress"
            placeholder="johndoe123@email.com"
            register={register("emailAddress")}
            type="text"
            icon={<BsEnvelope className="h-8 w-8" />}
          />
          <div className="h-8"></div>
          <FormField
            error={errors.password?.message}
            label="Password"
            name="password"
            placeholder="•••••••••••"
            register={register("password")}
            type="password"
            icon={<BsKey className="h-8 w-8" />}
          />
          <div className="h-8"></div>
          <FormField
            error={errors.confirmPassword?.message}
            label="Confirm Password"
            name="confirmPassword"
            placeholder="•••••••••••"
            register={register("confirmPassword")}
            type="password"
            icon={confirmPasswordIcon}
          />
          <div className="h-12"></div>

          <Button onClick={() => void 0} text="Sign up" />
          <div className="h-4"></div>
          <p className="px-4">
            Already have an account?{" "}
            <Link
              className="pl-1 font-bold text-indigo-500 underline"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}
      {pendingVerification && (
        <div>
          <form>
            <input
              value={code}
              placeholder="Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={onPressVerify}>Verify Email</button>
          </form>
        </div>
      )}
    </section>
  );
}
