import React from "react";
import Logo from "./Logo";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="relative h-96 bg-gray-200 ">
      <div className="padding-x mx-auto max-w-[1600px] py-8">
        <Logo />
        <div className="flex gap-3">
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500 transition-colors duration-150 hover:bg-gray-400"
          >
            <BsTwitter className="h-5 w-5 text-white" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500 transition-colors duration-150 hover:bg-gray-400"
          >
            <BsYoutube className="h-5 w-5 text-white" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500 transition-colors duration-150 hover:bg-gray-400"
          >
            <TiSocialInstagram className="h-5 w-5 text-white" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500 transition-colors duration-150 hover:bg-gray-400"
          >
            <FaFacebookF className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 h-8 w-full bg-gray-800"></div>
    </section>
  );
};

export default Footer;
