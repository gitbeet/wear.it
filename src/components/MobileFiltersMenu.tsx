import { useModalsContext } from "~/context/modalsContext";
import ColorFilter from "./Filters/ColorFilter";
import SizeFilter from "./Filters/SizeFilter";
import PriceSlider from "./Filters/PriceSlider/PriceSlider";
import SortByFilterMobile from "./Filters/SortByFilterMobile";

export const RadioButtonOption = ({
  label,
  id,
  checked,
  onChange,
  loading = true,
}: {
  label: string;
  id: string;
  checked: boolean;
  onChange: () => void;
  loading: boolean;
}) => {
  return (
    <li
      className={`${
        loading && "pointer-events-none opacity-50"
      } ms-2 flex items-center`}
      key={id}
    >
      <input
        checked={checked}
        onChange={onChange}
        id={id}
        type="radio"
        value=""
        name="default-radio"
        className="h-4 w-4 border-gray-300 bg-gray-100  accent-indigo-500 "
      />
      <label
        htmlFor={id}
        className={` ${
          checked ? "text-slate-800" : "text-slate-500"
        } ms-2 text-sm  font-semibold`}
      >
        {label}
      </label>
    </li>
  );
};

export const CheckboxOption = ({
  label,
  id,
  checked,
  onChange,
}: {
  label: string;
  id: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <li className="ml-2 flex gap-1">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}> {label}</label>
    </li>
  );
};

const MobileFiltersMenu = ({
  min,
  max,
  loading,
}: {
  min: number | undefined;
  max: number | undefined;
  loading: boolean;
}) => {
  const { setShowMobileFiltersMenu, showMobileFiltersMenu } =
    useModalsContext();

  return (
    <div
      className={`${
        showMobileFiltersMenu ? "translate-y-0" : "translate-y-full"
      } fixed inset-0 z-[100] h-screen overflow-auto bg-white p-6 transition-transform duration-500`}
    >
      <p
        className="text-md cursor-pointer text-right font-semibold"
        onClick={() => setShowMobileFiltersMenu(false)}
      >
        Close
      </p>
      <p className="text-md font-semibold">Filter</p>
      <div className="h-4"></div>
      <SortByFilterMobile loading={loading} />
      <PriceSlider loading={loading} min={min} max={max} />
      <SizeFilter loading={loading} />
      <ColorFilter loading={loading} />
      <div className="h-4"></div>
    </div>
  );
};

export default MobileFiltersMenu;
