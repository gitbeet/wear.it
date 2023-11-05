import Link from "next/link";
import React from "react";
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
      {isGettingCategories ? (
        <section
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={` ${
            show ? "" : "-translate-y-full"
          } absolute z-30 h-[500px] w-full bg-slate-100   transition-transform duration-[300] ease-in-out`}
        ></section>
      ) : !categories ? (
        <section
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={` ${
            show ? "" : "-translate-y-full"
          } absolute z-30 flex h-[500px] w-full   items-center justify-center bg-slate-100 transition-transform duration-[300] ease-in-out`}
        >
          <p className="text-center">
            Something Went Wrong. Please Refresh the page
          </p>
        </section>
      ) : (
        <section
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={` ${
            show ? "" : "-translate-y-full"
          } absolute z-30 w-full bg-slate-100   transition-transform duration-[300] ease-in-out`}
        >
          <div
            className={`${
              show ? "opacity-100" : "-translate-y-16 opacity-0"
            } flex justify-center gap-32 p-4  pb-12 transition-[transform,opacity] delay-150 duration-[450ms]`}
          >
            {categories.map((category) => (
              <div key={category.id}>
                {/* <Link href={`/${lowerCaseType}/${category.slug}`}> */}
                <p className="font-bold ">{category.name}</p>
                {/* </Link> */}
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
                        <li className="pb-2 text-gray-600 hover:underline">
                          {subcategory.name}
                        </li>
                      </Link>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      <div
        className={`${
          show ? "bg-gray-900/40 backdrop-blur" : "opacity-0"
        } pointer-events-none fixed inset-0 z-20  min-h-screen transition-all duration-500 `}
      ></div>
    </>
  );
};
export default MegaMenu;
