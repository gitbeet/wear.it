import React from "react";

const Icon = ({ icon }: { icon: JSX.Element }) => {
  return (
    <div
      role="button"
      className="hover-hover:hover:opacity-75 transition-opacity duration-150"
    >
      {icon}
    </div>
  );
};

export default Icon;
