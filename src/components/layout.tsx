import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import { PromosBanner } from "./PromosBanner";
import { bannerPromos } from "./promosData";
import MobileMenu from "./MobileMenu";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>wear.it</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={` bg-slate-50 font-body text-slate-800`}>
        <MobileMenu />
        <PromosBanner promos={bannerPromos} />
        <Nav />
        <section className="mx-auto min-h-[500px]  max-w-[1600px] grow">
          {children}
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
