import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Layout from "~/components/layout";
import { ClerkProvider } from "@clerk/nextjs";
import CartProvider from "~/context/cartContext";
import FavoritesProvider from "~/context/favoritesContext";
import ModalsProvider from "~/context/modalsContext";
import { CookiesProvider } from "react-cookie";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ClerkProvider>
        <FavoritesProvider>
          <CartProvider>
            <ModalsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ModalsProvider>
          </CartProvider>
        </FavoritesProvider>
      </ClerkProvider>
    </CookiesProvider>
  );
};

export default api.withTRPC(MyApp);
