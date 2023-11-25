import React from "react";
import Logo from "./Logo";
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
    <section className="w-full border-indigo-100 bg-slate-100  pt-12 text-slate-900">
      <div className="padding-x mx-auto flex max-w-[1600px] flex-wrap justify-start gap-8 pb-20">
        <div className="relative -top-2 grow">
          <Logo />
        </div>
        <ul className="grow space-y-3">
          <p className="font-display font-bold text-slate-600">Navigation</p>
          <FooterLink link="/" linkText="Home" />
          <FooterLink link="products/men" linkText="Men" />
          <FooterLink link="products/women" linkText="Women" />
          <FooterLink link="products/kids" linkText="Kids" />
          <FooterLink link="/sign-up" linkText="Become a member" />
          <FooterLink link="/sign-in" linkText="Sign in" />
          <FooterLink link="/cart" linkText="Your Bag" />
          <FooterLink link="/favorites" linkText="Wishlist" />
        </ul>
        <ul className="grow space-y-3">
          <p className="font-display font-bold text-slate-600">
            About<span className="font-black text-indigo-400"> wear.it</span>
          </p>
          <FooterLink link="/" linkText="About us" />
          <FooterLink link="/" linkText="Privacy policy" />
          <FooterLink link="/" linkText="News" />
          <FooterLink link="/" linkText="Careers" />
          <FooterLink link="/" linkText="Purpose" />
          <FooterLink link="/" linkText="Sustainability" />
          <FooterLink link="/contact" linkText="Contact us" />
        </ul>
        <ul className="grow space-y-3">
          <p className="font-display font-bold text-slate-600">
            Promotions & discounts
          </p>
          <FooterLink link="/" linkText="Student" />
          <FooterLink link="/" linkText="Military" />
          <FooterLink link="/" linkText="Teacher" />
          <FooterLink link="/" linkText="Birthday" />
        </ul>
        <div className="flex grow flex-col  gap-6">
          <p className="font-display font-bold text-slate-600">Follow us</p>
          <div className="space-y-3 text-slate-800">
            <Icon icon={tiktokIcon} />
            <Icon icon={twitterIcon} />
            <Icon icon={instagramIcon} />
            <Icon icon={facebookIcon} />
          </div>
        </div>
      </div>
      <div className="gradient-main-r py-2">
        <p className="text-center text-sm font-light text-slate-50">
          <b className="font-display font-black">wear.it</b> 2023© All rights
          reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
