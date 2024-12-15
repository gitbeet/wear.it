import { useState } from "react";
import ExpandableWrapperHeader from "./ExpandableWrapperHeader";

const ExpandableProductSectionWrapper = ({
  children,
  headerChildren,
}: {
  children?: React.ReactNode;
  headerChildren?: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState(true);
  const toggleExpanded = () => setExpanded((prev) => !prev);
  return (
    <article>
      <ExpandableWrapperHeader
        onClick={toggleExpanded}
        expanded={expanded}
        headingClassName="p-4"
      >
        {headerChildren}
      </ExpandableWrapperHeader>
      <div className={expanded ? "" : "hidden"}>{children}</div>
    </article>
  );
};

export default ExpandableProductSectionWrapper;
