import Logo from "../../misc/Logo";
import {
  facebookIcon,
  instagramIcon,
  tiktokIcon,
  twitterIcon,
} from "public/assets/icons";
import FooterColumn, { type FooterColumnType } from "./FooterColumn";
import Spacer from "../../ui/Spacer";
import FooterIcon from "./FooterIcon";

const navigationFooterColumn: FooterColumnType = {
  footerHeader: "Navigation",
  footerItems: [
    { link: "/", text: "Home" },
    { link: "products/men", text: "Men" },
    { link: "products/women", text: "Women" },
    { link: "products/kids", text: "Kids" },
    { link: "/sign-up", text: "Become a member" },
    { link: "/sign-in", text: "Sign in" },
    { link: "/cart", text: "Your Bag" },
    { link: "/favorites", text: "Wishlist" },
  ],
};

const aboutUsColumn: FooterColumnType = {
  footerHeader: (
    <>
      {" "}
      About<span className="font-black text-indigo-400"> wear.it</span>
    </>
  ),
  footerItems: [
    { link: "/", text: "About us" },
    { link: "/", text: "Privacy policy" },
    { link: "/", text: "News" },
    { link: "/", text: "Careers" },
    { link: "/", text: "Purpose" },
    { link: "/", text: "Sustainability" },
    { link: "/", text: "Contact us" },
  ],
};

const promotionsAndDiscountsFooterColumn: FooterColumnType = {
  footerHeader: "Promotions & discounts ",
  footerItems: [
    { link: "/", text: "Student" },
    { link: "/", text: "Military" },
    { link: "/", text: "Teacher" },
    { link: "/", text: "Birthday" },
  ],
};

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <Spacer type="footer" />
      <footer
        id="footer"
        className="w-full border-indigo-100 bg-slate-100  pt-12 text-slate-900"
      >
        <div className="padding-x mx-auto flex max-w-[1720px] flex-col justify-start gap-8 pb-12 xs:flex-row xs:flex-wrap md:pb-20">
          <div className="relative -top-2 grow">
            <Logo />
          </div>
          <FooterColumn
            footerHeader={navigationFooterColumn.footerHeader}
            footerItems={navigationFooterColumn.footerItems}
          />
          <FooterColumn
            footerHeader={aboutUsColumn.footerHeader}
            footerItems={aboutUsColumn.footerItems}
          />
          <FooterColumn
            footerHeader={promotionsAndDiscountsFooterColumn.footerHeader}
            footerItems={promotionsAndDiscountsFooterColumn.footerItems}
          />
          <div className="flex grow flex-col  gap-6">
            <p className="font-display font-bold text-slate-600">Follow us</p>
            <div className="md:gap-0text-slate-800 flex gap-3 md:block md:space-y-3">
              <FooterIcon
                aria-label="Tik tok page"
                as="link"
                href="/#footer"
                icon={tiktokIcon}
                className="h-10"
              />
              <FooterIcon
                aria-label="Twitter page"
                as="link"
                href="/#footer"
                icon={twitterIcon}
                className="h-10"
              />
              <FooterIcon
                aria-label="Instagram page"
                as="link"
                href="/#footer"
                icon={instagramIcon}
                className="h-10"
              />
              <FooterIcon
                aria-label="Facebook page"
                as="link"
                href="/#footer"
                icon={facebookIcon}
                className="h-10"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-700 py-2">
          <p className="text-center text-sm font-light text-slate-50">
            <b className="font-display font-black">wear.it</b> {currentYear}©
            All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
