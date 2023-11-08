import { productRouter } from "~/server/api/routers/product";
import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "./routers/categories";
import { cartRouter } from "./routers/cart";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  category: categoryRouter,
  cart: cartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
