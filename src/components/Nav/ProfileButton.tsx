import React, { useState } from "react";
import NavIcon from "./NavIcon";
import { IoPersonOutline } from "react-icons/io5";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

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

  const mobileButton = (
    <div className="block md:hidden" role="button">
      {!isSignedIn ? (
        <NavIcon
          icon={<IoPersonOutline className="h-5 w-5" />}
          link="/sign-in"
        />
      ) : (
        <NavIcon
          icon={<IoPersonOutline className="h-5 w-5" />}
          link="/profile"
        />
      )}
    </div>
  );

  const desktopButton = (
    <div className="relative hidden md:block">
      <div role="button">
        {!isSignedIn ? (
          <NavIcon
            icon={<IoPersonOutline className="h-5 w-5" />}
            link="/sign-in"
          />
        ) : (
          <>
            <div onClick={toggleIsOpen} className="flex items-center gap-0.5">
              <span className="hover-hover:hover:text-slate-800 w-fit text-sm font-semibold text-slate-500 transition-colors duration-150">
                Hi, {user.username}
              </span>
              <NavIcon icon={<IoPersonOutline className="h-5 w-5" />} />
            </div>
          </>
        )}
      </div>

      {isLoaded && isSignedIn && isOpen && (
        <div className="absolute right-0 w-max rounded-sm bg-white p-3 pr-12 shadow-md">
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
