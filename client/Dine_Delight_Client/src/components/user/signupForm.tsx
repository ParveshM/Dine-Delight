import { vector, logo } from "../../assets/images";
import { useFormik } from "formik";
import { validateSignUp } from "../../utils/validation";
import showToast from "../../utils/toaster";
import axios from "axios";
import { USER_API } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import { setItemToLocalStorage } from "../../utils/Set&GetLs";
import { useState } from "react";
const SignupForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignUp,
    onSubmit: ({ name, email, password }) => {
      setIsSubmitting(true);
      axios
        .post(USER_API + "/signup", { name, email, password })
        .then(({ data }) => {
          console.log(data);
          showToast(data.message, "success");
          setTimeout(() => {
            setItemToLocalStorage("userId", data.newUser._id);
            navigate("/user/auth/verify_otp");
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
    <section className="flex items-center justify-center min-h-screen">
      <div className=" relative flex-1 hidden md:block ">
        <h1 className="font-bold text-3xl text-center font-serif">
          Reserve your spot, dine with delight!
        </h1>
        <div className="absolute  w-20 rounded-xl top-10 left-8">
          <img src={logo} alt="" className="max-w-full h-auto items-center" />
        </div>
        <img
          src={vector}
          alt="image of a couple enjoying dinner with dine delight"
          className="max-w-full h-auto "
        />
      </div>
      <div className="flex-1  flex flex-col items-center justify-center px-6 py-8 mx-auto md:mx-0 md:ml-8 lg:ml-16 xl:ml-24">
        <div className="w-full bg-white rounded-2xl shadow-2xl md:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-headerText md:text-2xl">
              Create new account
            </h1>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Name
                </label>
                <input
                  type="text"
                  className=" border-b-2 border-b-slate-200 text-gray-900 outline-none sm:text-sm  block w-full p-2.5 "
                  placeholder="John doe"
                  {...formik.getFieldProps("name")}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="jhondoe@gmail.com"
                  className=" border-b-2 border-b-slate-200 text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border-b-2 border-b-slate-200 text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
                <div className="absolute top-1/2 right-2 transForm -translate-y-1/2 cursor-pointer"></div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-secondaryColor"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className=" border-b-2 border-b-slate-200 text-gray-900 outline-none sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                className="w-full px-6 py-2 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-l  transition-all duration-500 "
                disabled={isSubmitting}
              >
                <span className="font-semibold"> Signup</span>
              </button>

              <p className="text-sm  text-black text-center">
                Already have an account ?
                <Link
                  to={"/user/auth/login"}
                  className=" pl-1 hover:underline font-medium "
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
