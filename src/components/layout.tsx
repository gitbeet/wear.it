import Nav from "./Nav/Nav";
import Footer from "./Footer";
import { PromosBanner } from "./Nav/PromosBanner";
import { bannerPromos } from "../data/promosData";
import MobileMenu from "./MobileMenu/MobileMenu";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import Logo from "./Logo";
import GoToTopButton from "./GoToTopButton";
import MobileFiltersMenu from "./MobileFiltersMenu";
const OGImageUrl =
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { asPath } = useRouter();
  const isCheckoutPage = asPath === "/checkout";
  return (
    <>
      <DefaultSeo
        titleTemplate="%s - wear.it"
        title="Welcome"
        description={`"Elevate your style with wear.it . Explore on-trend fashion for men and women. Shop high-quality clothing online for a look that's uniquely yours. Unbeatable style, unbeatable prices."`}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://t3-ecommerce-five.vercel.app/",
          siteName: "SiteName",
          description: `"Elevate your style with wear.it . Explore on-trend fashion for men and women. Shop high-quality clothing online for a look that's uniquely yours. Unbeatable style, unbeatable prices."`,
          images: [
            {
              url: OGImageUrl,
              width: 800,
              height: 600,
              alt: "Hero image",
            },
          ],
        }}
        twitter={{
          handle: "@wear.it",
          site: "@wear.it",
          cardType: "summary_large_image",
        }}
      />
      <main
        className={`flex min-h-screen flex-col items-stretch justify-between font-body text-slate-800`}
      >
        <MobileMenu />
        {!isCheckoutPage && <Nav />}
        {!isCheckoutPage && <PromosBanner promos={bannerPromos} />}
        {isCheckoutPage && (
          <div className="relative z-50  bg-slate-50 shadow-lg shadow-indigo-600/5">
            <div className="padding-x mx-auto max-w-[1200px] py-4">
              <Logo />
            </div>
          </div>
        )}
        <section className="mx-auto flex min-h-full w-[min(100%,1720px)] grow flex-col items-stretch justify-between">
          {children}
        </section>
        {asPath !== "/checkout" && <Footer />}
        <GoToTopButton />
      </main>
    </>
  );
};

export default Layout;
