import { Link } from "react-router-dom";
import { restLoginVector } from "../../assets/images";

const Login: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="relative hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <h1 className="absolute top-24 left-8 font-bold text-3xl text-white leading-snug">
          Turn Tables into Profit!
          <br />
          <Link to={"/restaurant/signup"}>
            <span className=" text-red-500  hover:text-red-600 transition duration-200 hover:underline">
              Register now.
            </span>
          </Link>
        </h1>
        <img
          src={restLoginVector}
          alt="Restaurant table image "
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>
          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
            {/* <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div> */}
            <button
              type="submit"
              className="w-full block bg-indigo-700 hover:bg-indigo-600 transition duration-300 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
