import { Link, useNavigate } from "react-router-dom";
import { restSignupVector } from "../../assets/images";
import { useFormik } from "formik";
import showToast from "../../utils/toaster";
import axios from "axios";
import { RESTAURANT_API } from "../../constants";
import { useState } from "react";
import { validateSignUp } from "../../utils/validation";

const Signup: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignUp,
    onSubmit: ({ name: restaurantName, email, password }) => {
      setIsSubmitting(true);
      axios
        .post(RESTAURANT_API + "/signup", { restaurantName, email, password })
        .then(({ data }) => {
          showToast(data.message, "success");
          setTimeout(() => {
            navigate("/restaurant/auth/login");
          }, 1000);
        })
        .catch(({ response }) => {
          const { message } = response.data;
          setIsSubmitting(false);
          showToast(message, "error");
        });
    },
  });

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="relative flex-shrink-0 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <h1 className="absolute top-24 left-8 font-bold text-3xl text-slate-100 font-serif  leading-snug">
          Simplify Your Seating,
          <br /> Amplify Your Earnings! <br />
          Join Our Table Reservation System
        </h1>
        <img
          src={restSignupVector}
          alt="Restaurant table image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white mb-20 w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Let's get started
          </h1>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-gray-700">Restaurant name</label>
              <input
                type="text"
                placeholder="Enter Restaurant name"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                {...formik.getFieldProps("name")}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
            <button
              type="submit"
              className="w-full block bg-indigo-700 hover:bg-indigo-600 transition duration-300 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              disabled={isSubmitting}
            >
              Signup
            </button>
          </form>
          <p className="mt-8">
            Have an account?
            <Link
              to={"/restaurant/auth/login"}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
