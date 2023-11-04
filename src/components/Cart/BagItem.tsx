import type { ProductColor, ProductSize } from "@prisma/client";
import { BsHeart, BsTrash } from "react-icons/bs";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../loading";
import { formatCurrency } from "~/utilities/formatCurrency";
import Image from "next/image";
import { useShoppingBagContext } from "~/context/shoppingBagContext";
import { type ChangeEvent } from "react";
import Link from "next/link";

interface Props {
  id: string;
  quantity: number;
  size: ProductSize;
  color: ProductColor;
  index: number;
}

const BagItem = ({ id, color, quantity, size, index }: Props) => {
  const { modifyBagItem, removeFromBag } = useShoppingBagContext();
  const { data: productData, isLoading: isGettingProductData } =
    api.product.getSingleProduct.useQuery({ id });
  if (isGettingProductData) return <LoadingSpinner />;
  if (!productData) return <h1>Something went wrong.</h1>;
  const { name, category, sizes, discount, price, images } = productData;
  const quantityArray = [...Array(10).keys()];
  const priceAfterDiscount = formatCurrency(
    (discount?.discountPercent && discount.active
      ? price - (price * discount?.discountPercent) / 100
      : price) * quantity,
  );
  const thumbnail = images.find((image) => image.color === color)?.imageURL;
  return (
    <div className="flex w-full border-b border-gray-300 py-6">
      <Image
        width={196}
        height={196}
        src={thumbnail ?? ""}
        alt="Product thumbnail"
      />
      <div className="flex w-full flex-col justify-between">
        {/* TOP */}
        <div>
          <div className="flex justify-between">
            <div>
              <Link href={`/product/${id}`}>
                <p className=" font-semibold">{name}</p>
              </Link>
              <p className="text-gray-600">{category.name}</p>
            </div>
            <p className="font-bold">{priceAfterDiscount}</p>
          </div>
          <div className="h-2"></div>
          <div className="text-gray-600">
            Color: <span className="text-gray-500">{color}</span>
          </div>
        </div>
        {/* BOTTOM */}
        <div>
          {/* SIZE & QTY */}
          <div className="flex gap-12">
            <div className="flex gap-2 text-gray-600">
              <p>Sizes</p>
              <select
                className="bg-gray-200 pl-4"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  modifyBagItem(index, {
                    color,
                    id,
                    quantity,
                    size: e.target.value as ProductSize,
                  })
                }
                value={size}
              >
                {sizes.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 text-gray-600">
              <p>Quantity</p>
              <select
                className="bg-gray-200 pl-4"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  modifyBagItem(index, {
                    color,
                    id,
                    quantity: parseInt(e.target.value),
                    size,
                  })
                }
                value={quantity}
              >
                {quantityArray.map((num) => (
                  <option key={num}>{num + 1}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-4"></div>
          {/* BTNS */}
          <div className="flex gap-8">
            <div
              role="button"
              className="flex items-center gap-2 text-gray-600 transition-colors duration-150 hover:text-gray-800"
            >
              <BsHeart className="h-5 w-5" />
              <span>Add to Favorites</span>
            </div>
            <div
              onClick={() => removeFromBag(index)}
              role="button"
              className="flex items-center gap-2 text-gray-600 transition-colors duration-150 hover:text-gray-800"
            >
              <BsTrash className="h-5 w-5" />
              <span className="pl-2">Remove</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
