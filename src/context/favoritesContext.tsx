import { useUser } from "@clerk/nextjs";
import { type ProductColor } from "@prisma/client";
import { createContext, useContext, useState, useEffect } from "react";
import { type RouterOutputs, api } from "~/utils/api";

const favoritesContext = createContext<BagContextType | null>(null);

export const useFavoritesContext = () => {
  const context = useContext(favoritesContext);
  if (!context) {
    throw new Error("No Shopping Bag context found.");
  }
  return context;
};

type BagContextType = {
  favorites: RouterOutputs["favorite"]["getByUserId"] | undefined;
  isGettingFavorites: boolean;
  isFetching: boolean;
  isFavorited: (color: ProductColor | null, productId: string) => boolean;
};

const FavoritesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isSignedIn } = useUser();
  const {
    data: favorites,
    isLoading: isGettingFavorites,
    isFetching,
    refetch,
  } = api.favorite.getByUserId.useQuery();
  const isFavorited = (color: ProductColor | null, productId: string) => {
    if (!favorites) return false;
    return (
      favorites?.findIndex(
        (fav) => fav.color === color && fav.productId === productId,
      ) !== -1
    );
  };

  useEffect(() => {
    void refetch();
  }, [isSignedIn]);

  return (
    <favoritesContext.Provider
      value={{ favorites, isGettingFavorites, isFetching, isFavorited }}
    >
      {children}
    </favoritesContext.Provider>
  );
};

export default FavoritesProvider;
