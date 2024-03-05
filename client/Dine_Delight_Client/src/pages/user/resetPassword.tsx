import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { validateResetPassword } from "../../utils/validation";
import axios from "axios";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { ChevronLeft } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: validateResetPassword,
    onSubmit: ({ password }) => {
      axios
        .post(USER_API + `/reset_password/${id}`, { password })
        .then(({ data }) => {
          showToast(data.message, "success");
          navigate("/user/auth/login");
        })
        .catch(({ response }) => showToast(response.data.message, "error"));
    },
  });
  return (
    <div className="flex  justify-center items-center h-screen bg-slate-50">
      <div className=" my-10 bg-white p-8 rounded-xl border shadow shadow-slate-300">
        <ChevronLeft
          className="mb-2 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-medium">Reset password</h1>
        <form className="my-5 " onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-5 ">
            <label htmlFor="text">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input
                type="password"
                className="w-full py-3 px-3 border md:px-20 border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter new password"
                {...formik.getFieldProps("password")}
              />
              {!formik.errors.password ||
                (formik.touched.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                ))}
            </label>
            <label htmlFor="confirm Password">
              <p className="font-medium text-slate-700 pb-2">
                confirm Password
              </p>
              <input
                type="password"
                className="w-full py-3 px-3 border md:px-20 border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Confirm new  Password "
                {...formik.getFieldProps("confirmPassword")}
              />
              {!formik.errors.confirmPassword ||
                (formik.touched.confirmPassword && (
                  <p className="text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                ))}
            </label>

            <button
              className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              type="submit"
            >
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
