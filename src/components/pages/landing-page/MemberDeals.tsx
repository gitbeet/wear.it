import Image from "next/image";
import Link from "next/link";
import Button from "~/components/ui/Button";
import image from "../../../../public/assets/member-deals.jpg";

const MemberDeals = () => (
  <section className="shadow-color relative flex flex-col items-center justify-center gap-8  py-28 lg:py-40">
    <div className="padding-x z-20 space-y-4">
      <p className="text-center font-display text-5xl font-black text-white">
        BECOME A MEMBER <br /> AND SAVE UP TO 70%
      </p>
      <p className="text-center text-xl font-light text-slate-100">
        Embark on a Shopping Adventure: Unlock Exclusive Deals and{" "}
        <b>Save up to 70%</b> on a Diverse Range of Products.
      </p>
    </div>
    <Link href="/sign-up" className="z-20">
      <Button
        ghost
        light
        onClick={() => void 0}
        text="Register Now"
        width="FIT"
      />
    </Link>
    <div className="absolute inset-0  bg-slate-700" />
    <Image
      fill
      sizes="100vw"
      src={image}
      alt="Hero section image"
      placeholder="blur"
      className="z-0 scale-x-[-1] object-cover opacity-30"
    />
  </section>
);

export default MemberDeals;
