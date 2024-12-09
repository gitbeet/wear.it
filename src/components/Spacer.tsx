type SpacerType = "section" | "header" | "footer";

const Spacer = ({ type }: { type: SpacerType }) => {
  const heightClass =
    type === "section"
      ? "h-8 md:h-16"
      : type === "header"
      ? "h-8 md:h-24"
      : type === "footer"
      ? "h-12 md:h-24"
      : "";
  return <div className={`${heightClass} pointer-events-none invisible`}></div>;
};

export default Spacer;
