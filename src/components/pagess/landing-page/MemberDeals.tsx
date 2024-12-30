import Image from "next/image";
import Link from "next/link";
import Button from "~/components/uis/Button";
import image from "../../../../public/assets/member-deals.jpg";

const MemberDeals = () => (
  <section className="shadow-color relative flex flex-col items-center justify-center gap-8 bg-slate-800 py-12 text-slate-50 shadow-lg md:py-24 lg:py-32">
    <div className="z-10 space-y-4">
      <p className="text-center font-display text-5xl font-black">
        BECOME A MEMBER <br /> AND SAVE UP TO 70%
      </p>
      <p className="text-center text-xl">
        Embark on a Shopping Adventure: Unlock Exclusive Deals and Save up to
        70% on a Diverse Range of Products.
      </p>
    </div>
    <Link href="/sign-up" className="z-10">
      <Button
        onClick={() => void 0}
        text="Register Now"
        width="FIT"
        ghost
        light
      />
    </Link>
    <Image
      fill
      sizes="100vw"
      objectFit="cover"
      src={image}
      alt="Hero section image"
      placeholder="blur"
      className="z-0 scale-x-[-1] opacity-30"
    />
  </section>
);

export default MemberDeals;
