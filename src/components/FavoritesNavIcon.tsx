import NavIconWithNumber from "./Nav/NavIconWithNumber";
import { BsHeart } from "react-icons/bs";
import { useFavoritesContext } from "~/context/favoritesContext";

const FavoritesNavIcon = () => {
  const { favorites, isGettingFavorites } = useFavoritesContext();
  const totalFavorites = favorites?.length;
  return (
    <NavIconWithNumber
      as="link"
      icon={<BsHeart className=" h-5 w-5" />}
      href="/favorites"
      loading={isGettingFavorites}
      number={totalFavorites ?? 0}
      color="bg-pink-400"
    />
  );
};

export default FavoritesNavIcon;
