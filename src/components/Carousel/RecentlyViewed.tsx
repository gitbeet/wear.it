import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "~/utils/api";
import ProductCardCarousel from "./ProductCardCarousel";
import { ReccomendedProductsBreakPoints } from "~/utilities/swiperBreakPoints";

export const RecentlyViewed = () => {
  const { isSignedIn } = useUser();
  const { data, isLoading, refetch } = api.history.getByUserId.useQuery();

  useEffect(() => {
    void refetch();
  }, [isSignedIn, refetch]);

  return (
    <>
      <div className="padding-section">
        <h2 className="font-display text-2xl font-black">Recently viewed</h2>
        <div className="h-6 md:h-12"></div>
        <ProductCardCarousel
          autoplay={false}
          autoplayDelay={0}
          infinite={true}
          paginationContainerId="product-page--reccomended__pagination-container"
          speed={600}
          data={data?.items.map((item) => item.product)}
          isLoading={isLoading}
          breakPoints={ReccomendedProductsBreakPoints}
        />
      </div>
    </>
  );
};

export default RecentlyViewed;
