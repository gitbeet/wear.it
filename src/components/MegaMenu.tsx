import React from "react";
import { api } from "~/utils/api";

interface Props {
  type: "men" | "women" | null;
}

const MegaMenu = ({ type = null }: Props) => {
  const { data: categories, isLoading: isGettingCategories } =
    api.category.getAll.useQuery();
  if (isGettingCategories) return <span>Loading...</span>;
  if (!categories) return <span>Something went wrong.</span>;
  const lowerCaseType = type?.toLowerCase() ?? "men";
  return (
    <section className="flex gap-32">
      {categories?.map((category) => (
        <div key={category.id}>
          <p className="font-bold">{category.name}</p>
          <ul>
            {category.children
              .filter((subcategory) =>
                subcategory.types.some((type) =>
                  type.toLowerCase().includes(lowerCaseType),
                ),
              )
              .map((subcategory) => (
                <li className="text-slate-300" key={subcategory.id}>
                  {subcategory.name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
export default MegaMenu;
