import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";

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
      console.error("error", err.errors[0].message);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmailAddress(e.target.value)}
            id="email"
            name="email"
            type="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
          />
        </div>
        <button onClick={handleSubmit}>Sign In</button>
        <Link href="/forgot-password">Forgot Password</Link>
      </form>
    </div>
  );
}
