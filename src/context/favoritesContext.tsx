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
  const {
    data: favorites,
    isLoading: isGettingFavorites,
    isFetching,
  } = api.favorite.getByUserId.useQuery();

  const isFavorited = (color: ProductColor | null, productId: string) => {
    return (
      favorites?.findIndex(
        (fav) => fav.color === color && fav.productId === productId,
      ) !== -1
    );
  };

  return (
    <favoritesContext.Provider
      value={{ favorites, isGettingFavorites, isFetching, isFavorited }}
    >
      {children}
    </favoritesContext.Provider>
  );
};

export default FavoritesProvider;
