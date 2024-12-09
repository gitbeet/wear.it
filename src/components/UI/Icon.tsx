const Icon = ({ icon }: { icon: JSX.Element }) => {
  return (
    <div
      role="button"
      className="transition-opacity duration-150 hover:opacity-75"
    >
      {icon}
    </div>
  );
};

export default Icon;
