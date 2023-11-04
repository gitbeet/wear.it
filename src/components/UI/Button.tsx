interface Props {
  text: string;
  onClick: () => void;
  ghost?: boolean;
  icon?: JSX.Element;
}

const Button = ({ text, onClick, icon, ghost = false }: Props) => {
  return (
    <button
      className={`${
        ghost
          ? "border-gray-400 bg-transparent text-gray-800 hover:border-gray-800"
          : "border-transparent bg-gray-800 text-slate-100 hover:bg-gray-600"
      } flex w-full  items-center justify-center rounded-full border px-4 py-4 font-semibold transition-all duration-100`}
      onClick={onClick}
    >
      {icon} <span className={icon ? "pl-2" : ""}>{text}</span>
    </button>
  );
};

export default Button;
