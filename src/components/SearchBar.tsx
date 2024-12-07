import { FiSearch } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import NavIcon from "./Nav/NavIcon";

const SearchBar = ({
  onFocus,
  input,
  handleSearch,
  handleCloseButton,
  mobile = false,
}: {
  input: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseButton: () => void;
  onFocus: () => void;
  mobile: boolean;
}) => {
  return (
    <div
      className={`${
        mobile ? "flex md:hidden" : "hidden md:flex"
      } group relative h-10 grow items-center justify-end`}
    >
      <FiSearch className="relative left-8  h-6  w-6 shrink-0   text-indigo-300 transition-all duration-300 " />
      {/* Using both the focus: and the input lenght */}
      <input
        onFocus={onFocus}
        value={input}
        onChange={handleSearch}
        className={` ${mobile ? "min-w-full" : "w-40"}  ${
          input.length > 0 && !mobile ? "w-full" : "w-40"
        } peer h-full rounded-full border border-indigo-100 bg-white px-10 outline outline-transparent transition-all duration-300 focus:w-full focus:border-transparent focus:outline-indigo-300`}
      />

      <div
        className={` ${
          input.length > 0 ? "opacity-100" : "pointer-events-none opacity-0"
        } absolute right-1 h-8 w-8 cursor-pointer transition-all`}
      >
        <NavIcon
          as="button"
          size={24}
          icon={
            <VscChromeClose
              className="h-full w-full p-1"
              onClick={handleCloseButton}
            />
          }
        />
      </div>
    </div>
  );
};

export default SearchBar;
