import { Link } from "react-router-dom";
import { USER_API, emailRegex } from "../../constants";
import { useFormik } from "formik";
import axios from "axios";
import showToast from "../../utils/toaster";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: { email: "" },
    validate: ({ email }) => {
      let errors: { email?: string } = {};

      if (!email.trim().length) errors.email = "Required*";
      else if (!emailRegex.test(email)) errors.email = "Invalid email address";
      return errors;
    },
    onSubmit: ({ email }) => {
      axios
        .post(USER_API + "/forgot_password", { email })
        .then(({ data }) => showToast(data.message, "success"))
        .catch(({ response }) => {
          showToast(response.data.message, "error");
        });
    },
  });

  return (
    <div className="flex  justify-center items-center h-screen bg-slate-50">
      <div className=" my-10 bg-white p-8 rounded-xl border shadow shadow-slate-300">
        <h1 className="text-2xl font-medium">Forgot password</h1>
        <form className="my-5 " onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-5 ">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                type="text"
                className="w-full py-3 px-3 border md:px-20 border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
                {...formik.getFieldProps("email")}
              />
              {!formik.errors.email ||
                (formik.touched.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                ))}
            </label>

            <button
              className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Reset password</span>
            </button>
            <p className="text-center">
              Remember password ?
              <Link
                to="/user/auth/login"
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Login now </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
