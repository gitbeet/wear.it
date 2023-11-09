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
};

const FavoritesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    data: favorites,
    isLoading: isGettingFavorites,
    isFetching,
  } = api.favorite.getByUserId.useQuery();

  return (
    <favoritesContext.Provider
      value={{ favorites, isGettingFavorites, isFetching }}
    >
      {children}
    </favoritesContext.Provider>
  );
};

export default FavoritesProvider;
