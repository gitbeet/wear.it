interface Props {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ghost?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  icon,
  ghost = false,
  disabled = false,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`${
        ghost
          ? "border-gray-500 bg-transparent text-gray-800 hover:border-gray-800"
          : "border-transparent bg-gray-800 text-slate-100 hover:bg-gray-600"
      } flex w-full min-w-fit items-center justify-center rounded-full border px-8 py-4 font-semibold transition-all duration-100`}
      onClick={onClick}
    >
      {icon} <span className={icon ? "pl-2" : ""}>{text}</span>
    </button>
  );
};

export default Button;
