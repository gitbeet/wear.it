import { FaChevronDown } from "react-icons/fa";

export type ExpandableWrapperHeaderProps = {
  onClick: () => void;
  expanded: boolean;
  headingClassName?: string;
  children?: React.ReactNode;
};

const ExpandableWrapperHeader = ({
  onClick,
  expanded,
  headingClassName,
  children,
}: ExpandableWrapperHeaderProps) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center justify-between rounded-md transition hover:bg-slate-200 active:opacity-50 ${headingClassName}`}
  >
    {children}
    <FaChevronDown
      onClick={() => void 0}
      className={`${expanded ? "rotate-180" : ""}  h-3.5 w-3.5 transition`}
    />
  </button>
);

export default ExpandableWrapperHeader;
