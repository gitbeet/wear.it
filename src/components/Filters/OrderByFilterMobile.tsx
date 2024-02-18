import React from "react";
import { RadioButtonOption } from "../MobileFiltersMenu";
import { useSortItems } from "~/hooks/useSortItems";

const OrderByFilterMobile = ({ loading }: { loading: boolean }) => {
  const { handleChangeSort, sortQueryArray } = useSortItems();

  return (
    <menu>
      <p className="text-md font-semibold">Order By</p>
      <div className="h-2"></div>
      <ul>
        <RadioButtonOption
          loading={loading}
          label="Newest"
          id="newest"
          checked={sortQueryArray[0] === "newest"}
          onChange={() => handleChangeSort("newest")}
        />
        <div className="h-1"></div>
        <RadioButtonOption
          loading={loading}
          label="Price: High-Low"
          id="high-to-low"
          checked={sortQueryArray[0] === "high-to-low"}
          onChange={() => handleChangeSort("high-to-low")}
        />
        <div className="h-1"></div>
        <RadioButtonOption
          loading={loading}
          label="Price: Low-High"
          id="low-to-high"
          checked={sortQueryArray[0] === "low-to-high"}
          onChange={() => handleChangeSort("low-to-high")}
        />
      </ul>
    </menu>
  );
};

export default OrderByFilterMobile;
