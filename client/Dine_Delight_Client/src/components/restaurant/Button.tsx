interface ButtonPropsInterface {
  handleButtonclick: () => void;
  label: string;
}
const Button: React.FC<ButtonPropsInterface> = ({
  handleButtonclick,
  label,
}) => {
  return (
    <button
      className="py-2 px-5 rounded-md bg-orange-400 text-white font-semibold hover:bg-orange-500 transition duration-150"
      onClick={handleButtonclick}
    >
      {label}
    </button>
  );
};

export default Button;
