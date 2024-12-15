import { useState } from "react";
import ExpandableFilterWrapperHeader from "./ExpandableFilterWrapperHeader";

const ExpandableFilterWrapper = ({
  heading,
  children,
  wrapperClassName,
}: {
  heading: string;
  children?: React.ReactNode;
  wrapperClassName?: string;
}) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpanded = () => setExpanded((prev) => !prev);
  return (
    <article
      className={`px-4 py-8 ${
        expanded ? "pb-12" : ""
      } pl-0 ${wrapperClassName}`}
    >
      <ExpandableFilterWrapperHeader
        expanded={expanded}
        heading={heading}
        onClick={toggleExpanded}
      />
      {expanded && <div className="h-8"></div>}
      <div className={expanded ? "" : "hidden"}> {children}</div>
    </article>
  );
};

export default ExpandableFilterWrapper;
