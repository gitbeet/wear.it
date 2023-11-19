import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "~/components/UI/Button";
import { BsEnvelope, BsKey } from "react-icons/bs";
import FormField from "~/components/FormField";

export type SignInValidationType = z.infer<typeof signInValidationSchema>;

const signInValidationSchema = z.object({
  emailAddress: z.string().min(1, { message: "Email required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValidationType>({
    resolver: zodResolver(signInValidationSchema),
  });

  // start the sign In process.
  const onSubmit: SubmitHandler<SignInValidationType> = async (data) => {
    const { emailAddress, password } = data;
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
    <section className="padding-x">
      <div className="h-16"></div>
      <h1 className="text-center font-display text-6xl font-black">
        Welcome back
      </h1>
      <div className="h-24"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[400px]">
        <FormField
          placeholder="johndoe@email.com"
          icon={<BsEnvelope className="h-8 w-8" />}
          label="Email"
          type="text"
          name="emailAddress"
          register={register("emailAddress")}
          error={errors.emailAddress?.message}
        />
        <div className="h-8"></div>
        <FormField
          placeholder="•••••••"
          icon={<BsKey className="h-8 w-8" />}
          label="Password"
          name="password"
          type="password"
          register={register("password")}
          error={errors.password?.message}
        />
        <div className="h-12"></div>
        <Button text="Sign in" onClick={() => void 0} />
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
          <Link
            href="/sign-up"
            className="pl-1 font-bold text-indigo-500 underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
}
