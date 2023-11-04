import { chevronIcon, filtersIcon } from "public/assets/icons";
import { useState } from "react";
import ColorFilter from "~/components/Filters/ColorFilter";
import SizeFilter from "~/components/Filters/SizeFilter";
import SortSelectMenu from "~/components/Filters/SortSelectMenu";
import ToggleFilters from "~/components/Filters/ToggleFilters";
import Products from "~/components/Products";

const ProductsPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [showSort, setShowSort] = useState(false);
  return (
    <main>
      <section className="flex justify-end gap-8 pt-16  ">
        <ToggleFilters
          setShowFilters={setShowFilters}
          showFilters={showFilters}
        />
        <SortSelectMenu showSort={showSort} setShowSort={setShowSort} />
      </section>
      <section className=" flex gap-4 overflow-hidden pt-8">
        <div
          className={`${
            showFilters ? "" : "-ml-64"
          }  k h-screen w-64 transition-all duration-500`}
        >
          <SizeFilter />
          <ColorFilter />
        </div>
        <div className="grid w-full grow grid-cols-3 content-start  gap-2  ">
          <Products />
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
