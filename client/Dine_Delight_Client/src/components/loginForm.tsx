import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import showToast from "../utils/toaster";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { validateLogin } from "../utils/validation";
import { USER_API } from "../constants";
import { logo, vectorLogin } from "../assets/images";
import { useAppDispatch } from "../redux/store/Store";
import { setUser } from "../redux/UserSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axios
        .post(USER_API + "/login", { email, password })
        .then(({ data }) => {
          const { name, role } = data.user;
          showToast(data.message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role }));
          navigate("/user/profile");
        })
        .catch(({ response }) => {
          console.log(response);
          setIsSubmitting(false);
          showToast(response?.data?.message, "error");
        });
    },
  });

  const handleGooglSignIn = (user: {
    name: string;
    email: string;
    picture: string;
    email_verified: boolean;
  }) => {
    axios
      .post(USER_API + "/google_signIn", { user })
      .then(({ data }) => {
        const { message, user } = data;
        showToast(message, "success");
        dispatch(
          setUser({ name: user.name, isAuthenticated: true, role: user.role })
        );
        navigate("/user/profile");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="relative ml-16 h-96 mt-10 flex-1 hidden md:block ">
        <h1 className="font-bold text-3xl text-center font-serif  ">
          Dining Elevated: Reserve Your Culinary Experience Now!
        </h1>
        <div className="absolute w-20 rounded-xl max-w-md:top-14  left-5">
          <img
            src={logo}
            alt="Website logo"
            className="max-w-full h-auto items-center"
          />
        </div>
        <img
          src={vectorLogin}
          alt="image of a couple enjoying dinner with dine delight"
          className="max-w-full h-auto  rounded-lg"
        />
      </div>
      <div className="flex-1  flex flex-col items-center justify-center px-6 py-8 mx-auto md:mx-0 md:ml-8 lg:ml-16 xl:ml-24">
        <div className="w-full bg-white rounded-2xl shadow-2xl md:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-headerText md:text-2xl">
              Welcom Back!
            </h1>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
              <button
                type="submit"
                className="w-full px-6 py-2 text-white rounded-lg bg-gradient-to-l from-red-500 to-red-600 hover:bg-gradient-to-r  transition-all duration-500 "
                disabled={isSubmitting ? true : false}
              >
                <span className="font-semibold"> SignIn</span>
              </button>
            </form>
            <div className="flex items-center mt-4">
              <div className="border-b border-gray-300 flex-1 "></div>
              <div className="mx-3 text-sm text-gray-500 ">Or</div>
              <div className="border-b border-gray-300 flex-1"></div>
            </div>
            <div className="px-4 py-2 w-full  flex justify-center gap-2 ">
              <GoogleLogin
                onSuccess={(credentialResponse: any) => {
                  const data: {
                    name: string;
                    email: string;
                    picture: string;
                    email_verified: boolean;
                  } = jwtDecode(credentialResponse?.credential);
                  // console.log(data);
                  handleGooglSignIn(data);
                }}
                onError={() => {
                  showToast("Login Failed", "error");
                }}
              />
            </div>

            <p className="text-sm  text-black text-center">
              <Link
                to={"/user/signup"}
                className=" pl-1 hover:underline font-medium "
              >
                Forgot password ?
              </Link>
            </p>
            <p className="text-sm  text-black text-center">
              Dont have an account ?
              <Link
                to={"/user/auth/signup"}
                className=" pl-1 hover:underline font-medium "
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
