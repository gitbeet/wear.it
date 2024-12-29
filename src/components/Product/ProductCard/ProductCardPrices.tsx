import React from "react";
import ProductCardPrice from "./ProductCardPrice";

type ProductCardPricesProps = {
  price: number;
  discount?: {
    discountPercent: number;
    priceAfterDiscount: number;
  };
};

const ProductCardPrices = ({ price, discount }: ProductCardPricesProps) => {
  return (
    <div className="absolute bottom-4 left-4 z-[2] transition-transform duration-300 group-hover:-translate-y-1.5">
      {discount ? (
        <>
          <ProductCardPrice type="discount" amount={discount.discountPercent} />
          <div className="h-1.5"></div>
          <div className="flex items-center gap-2">
            <ProductCardPrice type="beforeDiscount" amount={price} />
            <ProductCardPrice
              type="afterDiscount"
              amount={discount.priceAfterDiscount}
            />
          </div>
        </>
      ) : (
        <ProductCardPrice type="normal" amount={price} />
      )}
    </div>
  );
};

export default ProductCardPrices;
