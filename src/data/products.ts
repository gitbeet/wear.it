import type { Prisma } from "@prisma/client";
import cozyWoolenWinterHat from "./products/cozy-woolen-winter-hat";
import womensPurpleLeggings from "./products/womens-purple-leggings";
import casualWhiteTShirt from "./products/casual-white-t-shirt";
import womensOversizedPulloverHoodie from "./products/womens-oversized-pullover-hoodie";
import womensOversizedSweatshirt from "./products/womens-oversized-sweatshirt";
import mensWinterHoodie from "./products/mens-winter-hoodie";
import womensDenimJacket from "./products/womens-denim-jacket";

export type ProductType = Prisma.ProductCreateInput;

const DISTRIBUTION_DOMAIN = "https://d3qpa4ecx59jw0.cloudfront.net";

export const IMAGES_PATH = `${DISTRIBUTION_DOMAIN}/product-images`;

export const products: ProductType[] = [
  cozyWoolenWinterHat,
  womensPurpleLeggings,
  casualWhiteTShirt,
  womensOversizedPulloverHoodie,
  womensOversizedSweatshirt,
  mensWinterHoodie,
  womensDenimJacket,
];
