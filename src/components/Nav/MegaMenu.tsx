import { type CategoryType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { useModalsContext } from "~/context/modalsContext";
import { api } from "~/utils/api";
import LoadingPage from "../loading";
import { useRouter } from "next/router";
import Backdrop from "../UI/Backdrop";

interface Props {
  type: CategoryType | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const MegaMenu = ({ type = null, show }: Props) => {
  const { data: categories, isLoading: isGettingCategories } =
    api.category.getAll.useQuery();
  const router = useRouter();
  const { openMegaMenu, hideMegamenu } = useModalsContext();
  const lowerCaseType = type?.toLowerCase() ?? "";

  const containerClassName = ` ${
    show ? "opacity-100" : "pointer-events-none opacity-0"
  } fixed left-0 top-full z-30 hidden w-screen  bg-slate-50  transition-transform duration-[300] ease-in-out lg:block`;

  const loadingJsx = (
    <section
      onMouseOver={() => openMegaMenu(type ?? "MEN")}
      onMouseLeave={hideMegamenu}
      className={`${containerClassName} h-64`}
    >
      <LoadingPage />
    </section>
  );

  const errorJsx = (
    <section
      onMouseOver={() => openMegaMenu(type ?? "MEN")}
      onMouseLeave={hideMegamenu}
      className={`${containerClassName} grid h-64 place-content-center`}
    >
      <p className="text-center">
        <b>Something Went Wrong.</b>
        <br /> Click{" "}
        <span
          className="font-bold text-blue-500"
          onClick={() => router.reload()}
        >
          here
        </span>{" "}
        to refresh the page
      </p>
    </section>
  );

  const megaMenuJsx = (
    <section
      onMouseOver={() => openMegaMenu(type ?? "MEN")}
      onMouseLeave={hideMegamenu}
      className={containerClassName}
    >
      <div
        className={`${
          show ? "opacity-100" : "opacity-0"
        } flex justify-center gap-32 p-4  pb-12 transition-[transform,opacity] delay-150 duration-[450ms]`}
      >
        {categories?.map((category) => (
          <aside key={category.id}>
            <Link
              onClick={hideMegamenu}
              className="font-bold hover:underline "
              href={`/products/${lowerCaseType}/${category.slug}`}
            >
              {category.name}
            </Link>
            <div className="h-4"></div>
            <ul>
              {category.children
                .filter((subcategory) =>
                  subcategory.types.some((type) =>
                    type.toLowerCase().includes(lowerCaseType),
                  ),
                )
                .map((subcategory) => (
                  <Link
                    onClick={hideMegamenu}
                    className="block pb-2 text-slate-600 hover:underline"
                    key={subcategory.id}
                    href={`/products/${lowerCaseType}/${subcategory.slug}`}
                  >
                    <li>{subcategory.name}</li>
                  </Link>
                ))}
            </ul>
          </aside>
        ))}
      </div>
    </section>
  );

  return (
    <>
      {isGettingCategories && show
        ? loadingJsx
        : !categories && show
        ? errorJsx
        : categories && show && megaMenuJsx}
      <Backdrop show={show} zIndex={20} className="!top-full" />
    </>
  );
};
export default MegaMenu;
