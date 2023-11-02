import { chevronIcon, filtersIcon } from "public/assets/icons";
import { useState } from "react";
import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import Products from "~/components/Products";

const ProductsPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  return (
    <main>
      <section className="flex justify-end gap-8 pt-16  ">
        <div
          onClick={() => setShowFilters((prev) => !prev)}
          role="button"
          className="flex items-center gap-2 font-semibold text-gray-800"
        >
          <span>{showFilters ? "Hide" : "Show"} Filters</span>
          {filtersIcon}
        </div>
        <div role="listbox" className="relative">
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <span>Sort by</span>
            {chevronIcon}
          </div>
        </div>
      </section>
      <section className=" flex gap-4 pt-8">
        <div
          className={`${
            showFilters ? "" : "-ml-64"
          }  k h-screen w-64 transition-all duration-500`}
        >
          <SizeFilter />
          <ColorFilter />
        </div>
        <section className="grid w-full grow grid-cols-4 content-start  gap-2 ">
          <Products />
        </section>
      </section>
    </main>
  );
};

export default ProductsPage;
