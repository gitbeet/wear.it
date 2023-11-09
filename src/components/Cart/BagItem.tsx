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
  modal?: boolean;
  product: {
    id: string;
  };
}

const BagItem = ({
  id,
  color,
  quantity,
  size,
  index,
  product,
  modal = false,
}: Props) => {
  const ctx = api.useUtils();
  const { mutate: modify, isLoading: isModifying } =
    api.cart.modifyItem.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });

  const { mutate: remove, isLoading: isRemoving } =
    api.cart.removeItem.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
      },
    });
  const { modifyBagItem, removeFromBag } = useShoppingBagContext();
  const { data: productData, isLoading: isGettingProductData } =
    api.product.getSingleProduct.useQuery({ id: product.id });
  if (isGettingProductData) return <LoadingSpinner />;
  if (!productData) return <h1>Something went wrong.</h1>;
  const { name, category, sizes, discount, price, images } = productData;
  const quantityArray = [...Array(10).keys()];
  const priceBeforeDiscount = formatCurrency(price);
  const priceAfterDiscount = formatCurrency(
    (discount?.discountPercent && discount.active
      ? price - (price * discount?.discountPercent) / 100
      : price) * quantity,
  );
  const thumbnail = images.find((image) => image.color === color)?.imageURL;
  return (
    <div
      className={`${
        !modal ? " border-b border-gray-300" : ""
      } flex w-full gap-4 py-6`}
    >
      <Image
        width={modal ? 128 : 196}
        height={modal ? 128 : 196}
        src={thumbnail ?? ""}
        alt="Product thumbnail"
        className="bg-slate-200"
      />
      <div className="flex w-full flex-col justify-between">
        {/* TOP */}
        <div>
          <div className="flex justify-between gap-4">
            <div>
              <Link
                className="font-semibold"
                href={`/product/${product.id}/${color}`}
              >
                <p className={`${modal ? "max-w-[320px]" : ""} line-clamp-1`}>
                  {name}
                </p>
              </Link>
              <p className="text-gray-600">{category.name}</p>
            </div>
            {!modal && <p className="font-bold">{priceAfterDiscount}</p>}
          </div>
          <div className="h-2"></div>
          <div className="text-gray-600">
            Color: <span className="text-gray-500">{color}</span>
          </div>
        </div>
        {/* BOTTOM */}
        <div>
          {/* SIZE & QTY */}
          {modal && (
            <div className="flex gap-2 text-gray-600">
              <p>Size</p>
              <span>{size}</span>
            </div>
          )}
          {modal && (
            <p>
              <span className="font-bold">{priceAfterDiscount}</span>{" "}
              <span className="pl-2 text-gray-500 line-through">
                {priceBeforeDiscount}
              </span>
            </p>
          )}

          {!modal && (
            <>
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
                        discount,
                        price,
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
                        discount,
                        price,
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
            </>
          )}
          {/* BTNS */}
          {!modal && (
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
              <div
                onClick={() => remove({ id })}
                role="button"
                className="flex items-center gap-2 text-gray-600 transition-colors duration-150 hover:text-gray-800"
              >
                <BsTrash className="h-5 w-5" />
                <span className="pl-2">Remove (trpc)</span>
              </div>
              <button onClick={() => modify({ id, quantity: 7 })}>
                Set quantity
              </button>
              <button onClick={() => modify({ id, size: "S" })}>
                Set size
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BagItem;
