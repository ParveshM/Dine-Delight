import { ImSpinner2 } from "react-icons/im";

const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ImSpinner2 className="animate-spin mx-auto h-5 w-5" />
    </div>
  );
};

export default Spinner;
