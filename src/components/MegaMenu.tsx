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
  if (isGettingCategories) return <span>Loading...</span>;
  if (!categories) return <span>Something went wrong.</span>;
  const lowerCaseType = type?.toLowerCase() ?? "men";
  return (
    <section
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={` ${show ? "visible" : "invisible"} flex gap-32 border p-4`}
    >
      {categories?.map((category) => (
        <div key={category.id}>
          <Link href={`/${lowerCaseType}/${category.slug}`}>
            <p className="font-bold">{category.name}</p>
          </Link>
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
                  href={`/${lowerCaseType}/${subcategory.slug}`}
                >
                  <li className="text-slate-300">{subcategory.name}</li>
                </Link>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
export default MegaMenu;
