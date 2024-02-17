import Link from "next/link";
import React from "react";
import { useModalsContext } from "~/context/modalsContext";
import { api } from "~/utils/api";

interface Props {
  type: "men" | "women" | null;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const MegaMenu = ({ type = null, show, setShow }: Props) => {
  const { data: categories, isLoading: isGettingCategories } =
    api.category.getAll.useQuery();
  const lowerCaseType = type?.toLowerCase() ?? "men";
  return (
    <>
      {isGettingCategories && show ? (
        <section
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={` ${
            show ? "" : "-translate-y-full"
          }hidden absolute  z-30 h-[500px] w-full bg-slate-50 transition-transform   duration-[300] ease-in-out lg:block`}
        ></section>
      ) : !categories && show ? (
        <section
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={` ${
            show ? "" : "-translate-y-full"
          }hidden absolute z-30 h-[500px]  w-full items-center   justify-center bg-slate-50 transition-transform duration-[300] ease-in-out lg:flex`}
        >
          <p className="text-center">
            Something Went Wrong. Please Refresh the page
          </p>
        </section>
      ) : (
        categories && (
          <section
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className={` ${
              show ? "" : "-translate-y-full"
            } absolute z-30 hidden w-full bg-slate-50 transition-transform   duration-[300] ease-in-out lg:block`}
          >
            <div
              className={`${
                show ? "opacity-100" : "-translate-y-16 opacity-0"
              } flex justify-center gap-32 p-4  pb-12 transition-[transform,opacity] delay-150 duration-[450ms]`}
            >
              {categories.map((category) => (
                <aside key={category.id}>
                  <Link href={`/products/${lowerCaseType}/${category.slug}`}>
                    <p className="hover-hover:hover:underline  font-bold">
                      {category.name}
                    </p>
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
                          key={subcategory.id}
                          href={`/products/${lowerCaseType}/${subcategory.slug}`}
                        >
                          <li className="hover-hover:hover:underline pb-2 text-slate-600">
                            {subcategory.name}
                          </li>
                        </Link>
                      ))}
                  </ul>
                </aside>
              ))}
            </div>
          </section>
        )
      )}
      <div
        className={`${
          show ? "bg-slate-900/40 backdrop-blur" : "opacity-0"
        } pointer-events-none fixed inset-0 z-20  min-h-screen transition-all duration-500 `}
      ></div>
    </>
  );
};
export default MegaMenu;
