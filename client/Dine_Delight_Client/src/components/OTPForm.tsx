import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { USER_API } from "../constants";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../utils/Set&GetLs";
import showToast from "../utils/toaster";
import { useNavigate } from "react-router-dom";

const OTPForm: React.FC = () => {
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: ({ otp }) => {
      const errors: any = {};
      if (!/^\d{6}$/.test(otp)) {
        errors.otp = "OTP must be exactly 6 digits";
      }
      if (!otp.trim().length) errors.otp = "Required";
      return errors;
    },
    onSubmit: ({ otp }) => {
      const userId = getItemFromLocalStorage("userId");
      if (userId) {
        axios
          .post(USER_API + "/verify_otp", { otp, userId })
          .then(({ data }) => {
            showToast(data.message, "success");
            removeItemFromLocalStorage("userId");
            setTimeout(() => navigate("/user/auth/login"), 1000);
          })
          .catch(({ response }) => {
            showToast(response.data.message, "error");
          });
      } else {
        showToast("something went wrong", "error");
        return navigate("/user/auth/login", { replace: true });
      }
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const resendCode = () => {
    setSeconds(60);
    const userId = getItemFromLocalStorage("userId");
    if (userId) {
      axios
        .post(USER_API + "/resend_otp", { userId })
        .then(({ data }) => {
          showToast(data.message, "success");
        })
        .catch(({ response }) => {
          showToast(response.data.message, "error");
        });
    } else {
      showToast("something went wrong", "error");
      return navigate("/user/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Email Verification
        </h1>
        <p className="text-gray-600 text-center mb-8">
          We have sent a verification code to your email
        </p>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <input
              className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter verification code"
              {...formik.getFieldProps("otp")}
            />
            {formik.errors.otp && formik.touched.otp && (
              <p className="text-red-500 mt-1">{formik.errors.otp}</p>
            )}
          </div>
          <button
            className="w-full py-2 bg-green-400 text-white rounded-lg font-semibold shadow-md hover:bg-green-500 transition duration-300"
            type="submit"
          >
            Verify Account
          </button>
          <div className="text-center text-sm text-gray-500">
            <p>Didn't receive the code?</p>
            <button
              className="text-blue-600 hover:underline"
              onClick={resendCode}
              disabled={seconds !== 0}
            >
              Resend
              <span className="font-medium">
                {seconds !== 0 && ` (${seconds}s)`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OTPForm;
