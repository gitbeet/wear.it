import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/UI/Button";
import LoadingPage from "~/components/UI/LoadingElements";

const Profile = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (typeof window !== "undefined" && !isSignedIn && isLoaded) {
    void router.push("/sign-in");
  }

  const handleSignOut = async () => {
    await router.push("/");
    await signOut();
  };

  if (!isLoaded) return <LoadingPage />;
  return (
    <div className="padding-x padding-y flex w-full flex-col items-center justify-center gap-8 py-12">
      <h1 className="font-display text-4xl font-black">Profile Page</h1>
      <p>
        Hi, <span className="text-indigo-500">{user?.username}</span>
      </p>
      <Button text="Sign out" onClick={handleSignOut} width="FIT" size="SM" />
    </div>
  );
};

export default Profile;
