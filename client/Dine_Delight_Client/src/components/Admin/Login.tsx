import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import showToast from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import { ADMIN_API } from "../../constants";
import { useAppDispatch } from "../../redux/store/Store";
import { setUser } from "../../redux/slices/UserSlice";
axios.defaults.withCredentials = true;
const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "Admin@123",
    },
    validate: validateLogin,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axios
        .post(ADMIN_API + "/login", { email, password })
        .then(({ data }) => {
          const { name, role } = data.admin;
          showToast(data.message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role }));
          navigate("/admin/dashboard");
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          showToast(response?.data?.message, "error");
        });
    },
  });

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="flex-1  flex flex-col items-center justify-center px-6 py-8 mx-auto md:mx-0 md:ml-8 lg:ml-16 xl:ml-24">
        <div className="w-full bg-white rounded-2xl shadow-2xl md:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-headerText md:text-2xl">
              Welcome Back Admin!
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
                  autoFocus
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
