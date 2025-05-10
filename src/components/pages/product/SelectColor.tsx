import { type ProductColor } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { colorOptions } from "~/maps";
import { type RouterOutputs } from "~/utils/api";

type Colors = NonNullable<
  RouterOutputs["product"]["getSingleProduct"]
>["colors"];
const SelectColor = ({
  colors,
  productId,
  selectedColor,
  setSelectedColor,
}: {
  color: string;
  colors: Colors;
  productId: string;
  selectedColor: ProductColor | null;
  setSelectedColor: React.Dispatch<React.SetStateAction<ProductColor | null>>;
}) => {
  const router = useRouter();

  async function handleColor(color: ProductColor) {
    await router.push(`/product/${productId}/${color}`, undefined, {
      shallow: false,
      scroll: true,
    });
  }

  const primaryColor = colors[0]?.color;
  useEffect(() => {
    if (!primaryColor) return;
    if (!router.query.slug?.[1]) {
      void router.push(`/product/${productId}/${primaryColor}`, undefined, {
        shallow: false,
        scroll: true,
      });
      return;
    }
    const isColorValid =
      colors.findIndex((color) => color.color === router.query.slug?.[1]) !==
      -1;
    if (!isColorValid) {
      void router.push(`/product/${productId}/${primaryColor}`, undefined, {
        shallow: false,
        scroll: true,
      });
      return;
    }
    setSelectedColor(router.query.slug[1] as ProductColor);
  }, [colors, router.query, primaryColor, router, productId]);
  return (
    <div>
      <p className="font-display text-2xl font-semibold">Colors</p>
      <div className="h-2"></div>
      <div className="flex gap-2">
        {colors.map((c, i) => {
          const tailwindColor = colorOptions.find(
            (option) => option.color === c.color,
          )?.colorClass;
          return (
            <button
              aria-label={`Select ${c.name} variant`}
              key={i}
              onClick={async () => {
                await handleColor(c.color);
              }}
              className={`h-8 w-8 rounded-full border-[2px] outline outline-2 ${tailwindColor} ${
                selectedColor === c.color
                  ? "border-slate-100 outline-indigo-300"
                  : "border-slate-200 outline-transparent  hover:outline-slate-400"
              } active:opacity-50`}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectColor;
