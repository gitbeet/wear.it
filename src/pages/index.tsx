import { api } from "~/utils/api";
import { db } from "~/server/db";
import { NextSeo } from "next-seo";
import { appRouter } from "~/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import SuperJSON from "superjson";
import Hero from "~/components/pages/landing-page/Hero";
import EventSlider from "~/components/pages/landing-page/EventSlider";
import MemberDeals from "~/components/pages/landing-page/MemberDeals";
import Trending from "~/components/pages/landing-page/Trending";
import Promotions from "~/components/pages/landing-page/Promotions";

export default function Home() {
  const { data } = api.product.getAllSQL.useQuery({ pageSize: 7 });

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

  await helpers.product.getAllSQL.prefetch({ pageSize: 7 });
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
};
