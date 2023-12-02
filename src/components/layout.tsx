import Nav from "./Nav";
import Footer from "./Footer";
import { PromosBanner } from "./PromosBanner";
import { bannerPromos } from "../data/promosData";
import MobileMenu from "./MobileMenu";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import Logo from "./Logo";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { asPath } = useRouter();
  const isCheckoutPage = asPath === "/checkout";
  return (
    <>
      <DefaultSeo
        titleTemplate="%s | wear.it"
        title="Welcome"
        description={`"Elevate your style with wear.it . Explore on-trend fashion for men and women. Shop high-quality clothing online for a look that's uniquely yours. Unbeatable style, unbeatable prices."`}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://www.url.ie/",
          siteName: "SiteName",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <main className={` bg-slate-50 font-body text-slate-800`}>
        <MobileMenu />
        {!isCheckoutPage && <PromosBanner promos={bannerPromos} />}
        {!isCheckoutPage && <Nav />}
        {isCheckoutPage && (
          <div className="relative z-50  bg-slate-50 shadow-lg shadow-indigo-600/5">
            <div className="padding-x mx-auto max-w-[1200px] py-4">
              <Logo />
            </div>
          </div>
        )}
        <section className="mx-auto min-h-[500px]  max-w-[1600px] grow">
          {children}
        </section>
        {asPath !== "/checkout" && <Footer />}
      </main>
    </>
  );
};

export default Layout;
