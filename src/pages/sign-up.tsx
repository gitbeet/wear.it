import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { InputField } from "./sign-in";
import { BsEnvelope, BsKey, BsPerson } from "react-icons/bs";
import Button from "~/components/UI/Button";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  // start the sign up process.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <section className="padding-x">
      <div className="h-16"></div>
      <h1 className="text-center font-display text-6xl font-black">
        Become a member
      </h1>
      <div className="h-24"></div>
      {!pendingVerification && (
        <form className="mx-auto max-w-[400px]">
          <InputField
            placeholder="johndoe123"
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            name="username"
            type="text"
            value={username}
            icon={<BsPerson className="h-8 w-8" />}
          />
          <div className="h-6"></div>
          <InputField
            placeholder="johndoe@email.com"
            onChange={(e) => setEmailAddress(e.target.value)}
            label="Email"
            name="email"
            type="email"
            value={emailAddress}
            icon={<BsEnvelope className="h-8 w-8" />}
          />
          <div className="h-6"></div>
          <InputField
            placeholder="•••••••"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            name="password"
            type="password"
            value={password}
            icon={<BsKey className="h-8 w-8" />}
          />
          <div className="h-8"></div>

          <Button onClick={handleSubmit} text="Sign up" />
          <div className="h-4"></div>
          <p className="px-4">
            Already have an account?{" "}
            <Link className="pl-1 font-bold text-indigo-500" href="/sign-in">
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
