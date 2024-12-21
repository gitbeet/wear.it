import type { Prisma } from "@prisma/client";
import cozyWoolenWinterHat from "./products/cozy-woolen-winter-hat";
import womensPurpleLeggings from "./products/womens-purple-leggings";
import casualWhiteTShirt from "./products/casual-white-t-shirt";
import womensOversizedPulloverHoodie from "./products/womens-oversized-pullover-hoodie";
import womensOversizedSweatshirt from "./products/womens-oversized-sweatshirt";
import mensWinterHoodie from "./products/mens-winter-hoodie";
import womensDenimJacket from "./products/womens-denim-jacket";

export type ProductType = Prisma.ProductCreateInput;

export const products: ProductType[] = [
  cozyWoolenWinterHat,
  womensPurpleLeggings,
  casualWhiteTShirt,
  womensOversizedPulloverHoodie,
  womensOversizedSweatshirt,
  mensWinterHoodie,
  womensDenimJacket,
];
