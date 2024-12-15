import { forwardRef } from "react";

type ListItemProps = { onClick: () => void; selected: boolean; text: string };

const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(
  ({ onClick, selected, text }, ref) => (
    <button
      tabIndex={-1}
      ref={ref}
      onClick={onClick}
      role="listitem"
      className={`${
        selected ? "text-slate-900" : "text-slate-500"
      } cursor-pointer text-left hover:text-slate-400`}
    >
      {text}
    </button>
  ),
);

ListItem.displayName = "ListItem";

export default ListItem;
