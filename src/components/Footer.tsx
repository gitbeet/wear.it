import React from "react";
import Logo from "./Logo";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="  bg-gradient-to-br from-violet-500  to-indigo-600  pt-12 text-slate-50">
      <div className="padding-x mx-auto flex max-w-[1600px] flex-wrap justify-between pb-20">
        <Logo light />
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
        <nav className="space-y-2">
          <ul>
            <Link className="font-semibold" href="/">
              About us
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/">
              Privacy policy
            </Link>
          </ul>
        </nav>
        <nav className="space-y-2">
          <ul>
            <Link className="font-semibold" href="/sign-up">
              Become a member
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/sign-in">
              Sign in
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/cart">
              Your bag
            </Link>
          </ul>
          <ul>
            <Link className="font-semibold" href="/favorites">
              Wishlist
            </Link>
          </ul>
        </nav>
        <div className="space-y-2">
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 transition-colors duration-150 hover:bg-slate-200"
          >
            <BsTwitter className="h-5 w-5 text-violet-500" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 transition-colors duration-150 hover:bg-slate-200"
          >
            <BsYoutube className="h-5 w-5 text-violet-500" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 transition-colors duration-150 hover:bg-slate-200"
          >
            <TiSocialInstagram className="h-5 w-5 text-violet-500" />
          </div>
          <div
            role="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 transition-colors duration-150 hover:bg-slate-200"
          >
            <FaFacebookF className="h-5 w-5 text-violet-500" />
          </div>
        </div>
      </div>
      <div className="   py-2 ">
        <p className="text-center text-sm font-light text-slate-50">
          Logo 2023©. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
