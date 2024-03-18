interface ButtonPropsInterface {
  handleButtonclick: () => void;
  label: string;
  className?: string;
}
const Button: React.FC<ButtonPropsInterface> = ({
  handleButtonclick,
  label,
  className,
}) => {
  const defaultClassStyle =
    "py-2 px-5 rounded-md  text-white font-semibold  transition duration-150";
  return (
    <button
      className={`${defaultClassStyle} ${className}`}
      onClick={handleButtonclick}
    >
      {label}
    </button>
  );
};

export default Button;
