import { NextSeo } from "next-seo";
import Spacer from "~/components/ui/Spacer";
const OGImageUrl =
  "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const Contact = () => {
  return (
    <>
      <NextSeo
        title="Contact us"
        description="Contact us to get in touch with our team. Find our contact information and submit inquiries through our online form."
        additionalMetaTags={[
          {
            name: "keywords",
            content: "contact, reach us, inquiry, contact form, support",
          },
        ]}
        noindex={false}
        nofollow={false}
        canonical="https://t3-ecommerce-five.vercel.app/contact"
        openGraph={{
          url: "https://t3-ecommerce-five.vercel.app/contact",
          title: "Contact Us - Your Website Name",
          description:
            "Contact us to get in touch with our team. Find our contact information and submit inquiries through our online form.",
          site_name: "wear.it",
          images: [
            {
              url: OGImageUrl,
              width: 800,
              height: 600,
              alt: `Hero image for contact page`,
            },
          ],
        }}
        twitter={{
          handle: "@wear.it",
          site: "@wear.it",
          cardType: "summary_large_image",
        }}
      />
      <Spacer type="header" />
      <h1 className="text-center font-display text-5xl font-black">Contact</h1>
      <Spacer type="footer" />
    </>
  );
};

export default Contact;
