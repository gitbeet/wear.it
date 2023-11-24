import React from "react";

const Icon = ({ icon }: { icon: JSX.Element }) => {
  return (
    <div
      role="button"
      className="text-slate-50 transition-colors duration-150 hover:text-indigo-200"
    >
      {icon}
    </div>
  );
};

export default Icon;
