import React from "react";
import Logo from "./Logo";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <section className=" h-96 bg-gray-200  py-8">
      <div className="padding-x mx-auto flex max-w-[1600px] flex-wrap justify-between">
        <Logo />
        <nav className="space-y-2">
          <ul>
            <Link className="font-semibold" href="/">
              Home
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/products/men">
              Men
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/products/women">
              Women
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/products/kids">
              Kids
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/contact">
              Contact
            </Link>
          </ul>
        </nav>
        <div className="space-y-2">
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 transition-colors duration-150 hover:bg-gray-400"
          >
            <BsTwitter className="h-5 w-5 text-white" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 transition-colors duration-150 hover:bg-gray-400"
          >
            <BsYoutube className="h-5 w-5 text-white" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 transition-colors duration-150 hover:bg-gray-400"
          >
            <TiSocialInstagram className="h-5 w-5 text-white" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 transition-colors duration-150 hover:bg-gray-400"
          >
            <FaFacebookF className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
