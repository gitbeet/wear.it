import { NextSeo } from "next-seo";
import Hero from "~/components/Pages/LandingPage/Hero";
import EventSlider from "~/components/Pages/LandingPage/EventSlider";
import MemberDeals from "~/components/Pages/LandingPage/MemberDeals";
import Trending from "~/components/Pages/LandingPage/Trending";
import Promotions from "~/components/Pages/LandingPage/Promotions";

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
