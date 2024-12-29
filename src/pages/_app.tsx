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
        <ModalsProvider>
          <FavoritesProvider>
            <CartProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CartProvider>
          </FavoritesProvider>
        </ModalsProvider>
      </ClerkProvider>
    </CookiesProvider>
  );
};

export default api.withTRPC(MyApp);
