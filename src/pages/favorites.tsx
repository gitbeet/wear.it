import React from "react";
import { api } from "~/utils/api";

const Favorites = () => {
  const ctx = api.useUtils();
  const { mutate, isLoading: isFaving } = api.favorite.favorite.useMutation({
    onSuccess: () => void ctx.invalidate(),
    onError: (error) => console.log(error),
  });
  const { data, isLoading } = api.favorite.getByUserId.useQuery();
  return (
    <section>
      <div>
        {data?.map((fav) => (
          <h1 key={fav.id}>
            {fav.product.name} - {fav.color}
          </h1>
        ))}
      </div>
    </section>
  );
};

export default Favorites;
