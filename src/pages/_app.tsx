import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Layout from "~/components/layout";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ShoppingBagProvider from "~/context/shoppingBagContext";
import FavoritesProvider from "~/context/favoritesContext";
import ModalsProvider from "~/context/modalsContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <FavoritesProvider>
        <ShoppingBagProvider>
          <ModalsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </ShoppingBagProvider>
      </FavoritesProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
