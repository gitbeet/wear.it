import React from "react";
import NavIcon from "./NavIcon";
import { BsHeart } from "react-icons/bs";
import { useFavoritesContext } from "~/context/favoritesContext";

const FavoritesNavIcon = () => {
  const { favorites, isGettingFavorites } = useFavoritesContext();
  const totalFavorites = favorites?.length;
  return (
    <NavIcon
      icon={<BsHeart className=" h-5 w-5" />}
      link="/favorites"
      loading={isGettingFavorites}
      number={totalFavorites ?? 0}
      color="bg-pink-400"
    />
  );
};

export default FavoritesNavIcon;
