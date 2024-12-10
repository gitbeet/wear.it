import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { buffer } from "stream/consumers";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.STRIPE_WEBHOOK_KEY;

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!secret) throw new Error("No webhook key");
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;
    if (!sig) throw new Error("No stripe signature");
    const event = stripe.webhooks.constructEvent(buf.toString(), sig, secret);
    if (event.type === "payment_intent.succeeded") {
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
      if (!session) {
        throw new Error("Session for given identifier not found");
      }
      try {
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
      } catch (prismaTransactionError) {
        let errorMessage = "Database transaction failed: ";
        if (prismaTransactionError instanceof Error) {
          console.error(
            "Database transaction error: ",
            prismaTransactionError.message,
          );
          errorMessage += prismaTransactionError.message;
        } else {
          console.error("Database transaction error: ", prismaTransactionError);
          errorMessage += "Unknown error";
        }
        throw new Error(errorMessage);
      }
    }
    res.status(200).send("The operation was successful");
  } catch (error) {
    const errorResponse = { error: "Webhook processing failed", message: "" };
    if (error instanceof Error) {
      console.error("Webhook handler error: ", error.message);
      errorResponse.message = error.message;
    } else {
      console.error("Unexpected error type: ", error);
      errorResponse.message = "An unknown error has occured";
    }
    res.status(400).send(errorResponse);
  }
}
