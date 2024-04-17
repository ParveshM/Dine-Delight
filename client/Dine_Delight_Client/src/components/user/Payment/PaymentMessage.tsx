import { Link, useParams } from "react-router-dom";
import { paymentFailedImg } from "../../../assets/images";
import { CookingPot } from "lucide-react";

interface PaymentMessageProps {
  isSuccess: boolean;
}

const PaymentMessage: React.FC<PaymentMessageProps> = ({ isSuccess }) => {
  const { id } = useParams();
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-2">
      <div
        className={`bg-white p-6 rounded-lg shadow-md ${isSuccess && "px-10"}`}
      >
        <div className="text-center">
          {isSuccess ? (
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6 "
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          ) : (
            <div className="w-16 h-16 mx-auto my-6">
              <img src={paymentFailedImg} alt="Payment failed image" />
            </div>
          )}
          <h3 className="md:text-2xl text-lg text-gray-900 font-semibold mb-2">
            {isSuccess ? "Booking Successfull" : "Payment Failed!"}
          </h3>
          <p className="text-gray-600 mb-4">
            {isSuccess
              ? "Thank you for completing your  payment."
              : "Sorry, your payment was unsuccessful. Please try again later."}
          </p>
          <p className="text-gray-600 mb-8">
            {isSuccess
              ? "Have a great day!"
              : "If the problem persists, please contact customer support."}
          </p>
          <div className="flex items-center gap-2">
            <Link
              to={isSuccess ? "/booking_history" : "/"}
              className={`inline-block px-8 py-3 ${
                isSuccess
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-red-600 hover:bg-red-500"
              } text-white font-semibold rounded-lg shadow-md transition duration-300`}
            >
              {isSuccess ? "View Booking" : "GO BACK"}
            </Link>
            {isSuccess && (
              <Link
                to={`/cart/${id}`}
                className="bg-teal-400 hover:bg-teal-500  inline-flex gap-1 items-center
              text-white font-semibold px-8 py-3 rounded-lg 
              "
              >
                Have something on mind ? <CookingPot className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMessage;
