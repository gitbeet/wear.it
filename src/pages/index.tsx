import { NextSeo } from "next-seo";
import Hero from "~/components/pages/landing-page/Hero";
import EventSlider from "~/components/pages/landing-page/EventSlider";
import MemberDeals from "~/components/pages/landing-page/MemberDeals";
import Trending from "~/components/pages/landing-page/Trending";
import Promotions from "~/components/pages/landing-page/Promotions";
import { type GetServerSidePropsContext } from "next";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import SuperJSON from "superjson";
import { db } from "~/server/db";
import { api } from "~/utils/api";

export default function Home() {
  const { data, isLoading } = api.product.getAllSQL.useQuery({ pageSize: 5 });
  console.log(data?.products);

  return (
    <>
      <NextSeo
        title="Home"
        additionalMetaTags={[
          {
            name: "keywords",
            content: "wear.it",
          },
        ]}
        noindex={false}
        nofollow={false}
        canonical="/"
      />
      <section>
        <Hero />
        {isLoading && <h1 className="text-5xl font-black">LOADING...</h1>}
        <EventSlider products={data?.products} />
        <MemberDeals />
        <Trending products={data?.products} />
        <Promotions />
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      db,
      guestUserId: undefined,
      userId: null,
    },
    transformer: SuperJSON,
  });

  await helpers.product.getAllSQL.prefetch({ pageSize: 5 });
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};
