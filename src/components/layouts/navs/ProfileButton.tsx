import React, { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import NavIcon from "./NavIcon";

const ProfileButton = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await router.push("/");
    await signOut();
  };

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const ariaLabel = "Go to the profile page";

  const mobileButton = (
    <div className="block h-10 md:hidden" role="button">
      {!isSignedIn ? (
        <NavIcon
          aria-label={ariaLabel}
          as="link"
          icon={<IoPersonOutline className="h-5 w-5" />}
          href="/sign-in"
        />
      ) : (
        <NavIcon
          aria-label={ariaLabel}
          as="link"
          icon={<IoPersonOutline className="h-5 w-5" />}
          href="/profile"
        />
      )}
    </div>
  );

  const desktopButton = (
    <div className="relative hidden md:block">
      <div className="h-10">
        {!isSignedIn ? (
          <NavIcon
            aria-label={ariaLabel}
            as="link"
            icon={<IoPersonOutline className="h-5 w-5" />}
            href="/sign-in"
          />
        ) : (
          <div className="flex h-full items-center gap-1">
            <span className="w-fit text-sm font-semibold text-slate-500 ">
              Hi, {user.username}
            </span>
            <NavIcon
              aria-label={ariaLabel}
              as="button"
              onClick={toggleIsOpen}
              icon={<IoPersonOutline className="h-5 w-5" />}
            />
          </div>
        )}
      </div>

      {isLoaded && isSignedIn && isOpen && (
        <div className="absolute right-0  w-max rounded-sm bg-white p-3 pr-12 shadow-md">
          <p className="font-bold">Account</p>
          <div className="h-2"></div>
          <span onClick={handleSignOut} className="text-sm">
            Sign out
          </span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {mobileButton}
      {desktopButton}
    </>
  );
};

export default ProfileButton;
