import Image from "next/image";
import Link from "next/link";
import bannerJackets from "../../../../public/assets/banner-jackets.jpg";
import bannerSneakers from "../../../../public/assets/banner-sneakers.jpg";
import bannerTShirts from "../../../../public/assets/banner-tshirts.jpg";

const promotionsClass = "shadow-color  rounded-md lg:rounded-xl";

const Promotions = () => (
  <section className="padding-x padding-section container-mine mx-auto grid w-full gap-4 md:grid-cols-2">
    <Link href="/products/women/tshirts-tops" className="aspect-square w-full">
      <Image
        sizes="(max-width: 1024px) 100vw, 792px"
        src={bannerTShirts}
        alt="Up to -60% on womens t-shirts"
        className={promotionsClass}
        placeholder="blur"
      />
    </Link>

    <div>
      <Link
        href="/products/women/jackets?priceFrom=0&priceTo=65"
        className="w-full"
      >
        <Image
          sizes="(max-width: 768px) 100vw, 792px"
          width={800}
          height={392}
          src={bannerJackets}
          alt="Browse jackets under 65%"
          className={promotionsClass}
          placeholder="blur"
        />
      </Link>

      <div className="h-4"></div>
      <Link href="/products/women/sneakers?priceFrom=39" className="w-full">
        <Image
          sizes="(max-width: 768px) 100vw, 792px"
          width={800}
          height={392}
          src={bannerSneakers}
          alt="Browse seakers from 39$"
          className={promotionsClass}
          placeholder="blur"
        />
      </Link>
    </div>
  </section>
);

export default Promotions;
