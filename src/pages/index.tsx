import { NextSeo } from "next-seo";
import Hero from "~/components/pages/landing-page/Hero";
import EventSlider from "~/components/pages/landing-page/EventSlider";
import MemberDeals from "~/components/pages/landing-page/MemberDeals";
import Trending from "~/components/pages/landing-page/Trending";
import Promotions from "~/components/pages/landing-page/Promotions";

export default function Home() {
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
        <EventSlider />
        <MemberDeals />
        <Trending />
        <Promotions />
      </section>
    </>
  );
}
