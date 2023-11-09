import type { ProductSize } from "@prisma/client";
import { BsHeart, BsTrash } from "react-icons/bs";
import { type RouterOutputs, api } from "~/utils/api";
import { formatCurrency } from "~/utilities/formatCurrency";
import Image from "next/image";
import { type ChangeEvent } from "react";
import Link from "next/link";

interface Props {
  cartItem: RouterOutputs["cart"]["getByUserId"]["cartItems"][number];
  modal?: boolean;
}

const BagItem = ({ cartItem, modal = false }: Props) => {
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
  // const { data: productData, isLoading: isGettingProductData } =
  //   api.product.getSingleProduct.useQuery({ id: });
  const {
    name,
    category,
    sizes,
    discount,
    price,
    images,
    id: productId,
  } = cartItem.product;
  const { color, id, quantity, size } = cartItem;
  const quantityArray = [...Array(10).keys()];
  const priceBeforeDiscount = formatCurrency(price);
  const priceAfterDiscount = formatCurrency(
    (discount?.discountPercent && discount.active
      ? price - (price * discount?.discountPercent) / 100
      : price) * cartItem.quantity,
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
                href={`/product/${productId}/${color}`}
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
                    disabled={isModifying}
                    className="bg-gray-200 pl-4"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      modify({
                        id,
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
                    disabled={isModifying}
                    className="bg-gray-200 pl-4"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      modify({
                        id,
                        quantity: parseInt(e.target.value),
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
              <button
                disabled={false}
                role="button"
                className="flex items-center gap-2 text-gray-600 transition-colors duration-150 hover:text-gray-800"
              >
                <BsHeart className="h-5 w-5" />
                <span>Add to Favorites</span>
              </button>

              <button
                disabled={isRemoving}
                onClick={() => remove({ id })}
                className="flex items-center gap-2 text-gray-600 transition-colors duration-150 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <BsTrash className="h-5 w-5" />
                <span className="pl-2">Remove (trpc)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BagItem;
