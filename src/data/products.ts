import type { Prisma } from "@prisma/client";
import casualWhiteTShirt from "./products/men/casual-white-t-shirt";
import mensWinterHoodie from "./products/men/winter-hoodie";
import cozyWoolenWinterHat from "./products/women/cozy-woolen-winter-hat";
import womensPurpleLeggings from "./products/women/purple-leggings";
import womensOversizedPulloverHoodie from "./products/women/oversized-pullover-hoodie";
import womensOversizedSweatshirt from "./products/women/oversized-sweatshirt";
import womensDenimJacket from "./products/women/denim-top";
import womensStylishAutmnWindbreaker from "./products/women/stylish-autmn-windbreaker";
import womensWoolSweater from "./products/women/wool-sweater";
import thermaFitGloves from "./products/women/therma-fit-gloves";
import womensWoolHatAndScarf from "./products/women/wool-hat-and-scarf";
import longSleeveTshirt from "./products/women/long-sleeve-tshirt";

export type ProductType = Prisma.ProductCreateInput;

export const products: ProductType[] = [
  casualWhiteTShirt,
  mensWinterHoodie,
  // women
  cozyWoolenWinterHat,
  womensPurpleLeggings,
  womensDenimJacket,
  thermaFitGloves,
  womensOversizedSweatshirt,
  womensWoolHatAndScarf,
  womensOversizedPulloverHoodie,
  longSleeveTshirt,
  womensStylishAutmnWindbreaker,
  womensWoolSweater,
];
