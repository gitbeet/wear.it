import { type CategoryType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { useModalsContext } from "~/context/modalsContext";
import { api } from "~/utils/api";

interface Props {
  type: CategoryType | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const MegaMenu = ({ type = null, show }: Props) => {
  const { setShowMegaMenu } = useModalsContext();
  const { data: categories, isLoading: isGettingCategories } =
    api.category.getAll.useQuery();
  const lowerCaseType = type?.toLowerCase() ?? "";

  const openMegaMenu = (type: CategoryType) => {
    setShowMegaMenu((prev) =>
      prev.map((e) =>
        e.type === type ? { ...e, show: true } : { ...e, show: false },
      ),
    );
  };

  const hideMegamenu = () => {
    setShowMegaMenu((prev) => prev.map((e) => ({ ...e, show: false })));
  };
  return (
    <>
      <>
        {isGettingCategories && show ? (
          <section
            onMouseOver={() => openMegaMenu(type ?? "MEN")}
            onMouseLeave={hideMegamenu}
            className={` ${
              show ? "" : "-translate-y-full"
            }hidden absolute  z-30 h-[500px] w-full bg-slate-50 transition-transform   duration-[300] ease-in-out lg:block`}
          ></section>
        ) : !categories && show ? (
          <section
            onMouseOver={() => openMegaMenu(type ?? "MEN")}
            onMouseLeave={hideMegamenu}
            className={` ${
              show ? "" : "-translate-y-full"
            }hidden absolute z-30 h-[500px]  w-full items-center   justify-center bg-slate-50 transition-transform duration-[300] ease-in-out lg:flex`}
          >
            <p className="text-center">
              Something Went Wrong. Please Refresh the page
            </p>
          </section>
        ) : (
          categories &&
          show && (
            <section
              onMouseOver={() => openMegaMenu(type ?? "MEN")}
              onMouseLeave={hideMegamenu}
              className={` ${
                show ? "opacity-100" : "pointer-events-none opacity-0"
              } fixed left-0 top-full z-30 hidden w-screen  bg-slate-50  transition-transform duration-[300] ease-in-out lg:block`}
            >
              <div
                className={`${
                  show ? "opacity-100" : "opacity-0"
                } flex justify-center gap-32 p-4  pb-12 transition-[transform,opacity] delay-150 duration-[450ms]`}
              >
                {categories.map((category) => (
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
          )
        )}
      </>
      <div
        className={`${
          show ? "bg-slate-900/10 backdrop-blur" : "opacity-0"
        } pointer-events-none fixed inset-0 bottom-0 left-0 right-0 top-full z-20  h-screen w-screen transition-all duration-500 `}
      />
    </>
  );
};
export default MegaMenu;
