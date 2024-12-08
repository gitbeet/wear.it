// import Cors from "micro-cors";
import Stripe from "stripe";

import { PrismaClient } from "@prisma/client";
import { buffer } from "stream/consumers";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  // apiVersion: "2022-11-15",
});

// const cors = Cors({
//   allowMethods: ["POST", "HEAD"],
// });

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.STRIPE_WEBHOOK_KEY ?? "";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Trying...");
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;
    if (!sig) throw new Error("No signature");
    const event = stripe.webhooks.constructEvent(buf.toString(), sig, secret);
    if (event.type === "payment_intent.succeeded") {
      console.log("Payment intend has succeeded");
      if (!event.data.object.metadata?.userId) throw new Error("No userId");
      const userId = event.data.object.metadata.userId;
      const session = await prisma.shoppingSession.findUnique({
        where: {
          userId,
        },
        include: {
          cartItems: {
            select: {
              color: true,
              productId: true,
              quantity: true,
              size: true,
            },
          },
        },
      });

      console.log("Session fetched:", session);

      if (!session) {
        throw new Error("Session for given identifier not found");
      }
      console.log("Starting transaction...");
      await prisma.$transaction([
        prisma.orderDetails.create({
          data: {
            userId,
            total: session.total,
            orderItems: {
              createMany: {
                data: session.cartItems.map(
                  ({ productId, color, quantity, size }) => ({
                    productId,
                    quantity,
                    color,
                    size,
                  }),
                ),
              },
            },
          },
        }),
        prisma.shoppingSession.delete({
          where: {
            userId,
          },
        }),
      ]);
      console.log("Transaction completed.");
    }
    res.status(200).send("Success");
  } catch (error) {
    res.status(400).send(`Webhook Error`);
    return;
  }
}
