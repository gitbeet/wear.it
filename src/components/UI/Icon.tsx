import React from "react";

const Icon = ({ icon }: { icon: JSX.Element }) => {
  return (
    <div role="button" className="transition-colors duration-150">
      {icon}
    </div>
  );
};

export default Icon;
