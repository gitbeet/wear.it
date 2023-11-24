import React from "react";
import Logo from "./Logo";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import {
  facebookIcon,
  instagramIcon,
  tiktokIcon,
  twitterIcon,
} from "public/assets/icons";
import Icon from "./UI/Icon";
import FooterLink from "./UI/FooterLink";

const Footer = () => {
  return (
    <section className=" border-t bg-slate-100   pt-12 text-slate-900">
      <div className="padding-x mx-auto flex max-w-[1600px] flex-wrap justify-between pb-20">
        <Logo />
        <nav className="space-y-3">
          <FooterLink link="/" linkText="Home" />
          <FooterLink link="/men" linkText="Men" />
          <FooterLink link="/women" linkText="Women" />
          <FooterLink link="/kids" linkText="Kids" />
          <FooterLink link="/contact" linkText="Contact" />
        </nav>
        <nav className="space-y-3">
          <FooterLink link="/" linkText="About us" />
          <FooterLink link="/" linkText="Privacy policy" />
        </nav>
        <nav className="space-y-3">
          <FooterLink link="/sign-up" linkText="Become a member" />
          <FooterLink link="/sign-in" linkText="Sign in" />
          <FooterLink link="/cart" linkText="Your Bag" />
          <FooterLink link="/favorites" linkText="Wishlist" />
        </nav>
        <div className="flex flex-col items-center gap-6">
          <p className="font-display text-lg font-semibold">Follow us</p>
          <div className="space-y-3 text-slate-800">
            <Icon icon={tiktokIcon} />
            <Icon icon={twitterIcon} />
            <Icon icon={instagramIcon} />
            <Icon icon={facebookIcon} />
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
