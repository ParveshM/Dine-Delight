import { ButtonHTMLAttributes } from "react";

interface ButtonPropsInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleButtonclick?: () => void;
  label: string;
  className?: string;
  isDisabled?: boolean;
  buttontype?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonPropsInterface> = ({
  handleButtonclick,
  label,
  isDisabled,
  className,
  buttontype,
}) => {
  const defaultClassStyle =
    "py-2 px-5 rounded-md  text-white font-semibold  transition duration-150";
  return (
    <button
      className={`${defaultClassStyle} ${className}`}
      onClick={handleButtonclick}
      disabled={isDisabled ?? false}
      type={`${buttontype ?? "button"}`}
    >
      {label}
    </button>
  );
};

export default Button;
