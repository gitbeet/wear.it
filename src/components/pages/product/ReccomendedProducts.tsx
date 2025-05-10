import React from "react";
import ProductCardCarousel from "~/components/carousel/ProductCardCarousel";
import { ReccomendedProductsBreakPoints } from "~/utilities/swiperBreakPoints";
import { api } from "~/utils/api";

const ReccomendedProducts = () => {
  const { data, isLoading } = api.product.getAllSQL.useQuery({
    collectionId: undefined,
    color: undefined,
  });
  return (
    <section className="padding-x container-mine mx-auto">
      <h2 className="font-display text-2xl font-black">You might also like</h2>
      <div className="h-12"></div>
      <ProductCardCarousel
        autoplay={true}
        autoplayDelay={2500}
        infinite={true}
        paginationContainerId="product-page--reccomended__pagination-container"
        speed={600}
        data={data?.products}
        isLoading={isLoading}
        breakPoints={ReccomendedProductsBreakPoints}
      />
    </section>
  );
};

export default ReccomendedProducts;
