import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

const ratingRouter = createTRPCRouter({
  // getByProductId:publicProcedure.input(z.object({productId:z.string()})).query(async ({ctx,input}) => {
  //     const {productId} = input
  //     const {db} = ctx
  //     const rating =
  // })
});
