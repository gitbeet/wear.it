import Head from "next/head";
import ModalsProvider from "~/context/modalsContext";
import ShoppingBagProvider from "~/context/shoppingBagContext";
import Nav from "./Nav";
// import { Lato, Inter, Montserrat, Open_Sans } from "next/font/google";
import Footer from "./Footer";
import FavoritesProvider from "~/context/favoritesContext";

// const inter = Open_Sans({
//   subsets: ["latin"],
//   weight: ["300", "400", "700"],
// });

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <FavoritesProvider>
      <ShoppingBagProvider>
        <ModalsProvider>
          <>
            <Head>
              <title>e.fashion</title>
              <meta name="description" content="Generated by create-t3-app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
              className={`font-body min-h-[100dvh] bg-gray-50 text-gray-800`}
            >
              <Nav />
              <section className="mx-auto min-h-[100dvh] max-w-[1600px] ">
                {children}
              </section>
              <Footer />
            </main>
          </>
        </ModalsProvider>
      </ShoppingBagProvider>
    </FavoritesProvider>
  );
};

export default Layout;
