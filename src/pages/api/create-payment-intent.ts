/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  // apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const guestUserId = req.cookies["session-id"];
  const sesh = getAuth(req);
  const { userId: authedUserId } = sesh;

  const userId = authedUserId ?? guestUserId ?? undefined;
  if (!userId) {
    throw new Error("No user/guest user identifier found");
  }

  const { data } = await req.body;
  const { amount } = data;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      metadata: { userId },
    }) ;

    res.status(200).json({ secret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: "Could not get the client secret" });
  }
}
