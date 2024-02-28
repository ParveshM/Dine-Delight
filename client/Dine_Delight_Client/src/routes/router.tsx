import { createBrowserRouter } from "react-router-dom";
import { Home, SignUp, OTPForm, LoginForm } from "../pages/user";
const Comp = () => <h1>Hoi</h1>;
const ErrorComponent = () => <h1>ERrrr</h1>;
export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/user",
    children: [
      { path: "signup", element: <SignUp /> },
      { path: "verify_otp", element: <OTPForm /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
  { path: "*", element: <ErrorComponent /> },
]);
