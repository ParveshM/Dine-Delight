import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/home";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/signup";
import RestaurantLogin from "../pages/restaurant/restaurantLogin";
import VerifyOTP from "../pages/user/VerifyOTP";
import RestaurantSignup from "../pages/restaurant/restaurantSignup";
import Dashboard from "../pages/restaurant/dashBoard";
import AdminPages from "../pages/admin/AdminPages";
const ErrorComponent = () => <h1>ERrrr</h1>;

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="user/">
        <Route path="signup" element={<SignUp />} />
        <Route path="verify_otp" element={<VerifyOTP />} />
        <Route path="login" element={<Login />} />
      </Route>
      {/* Restaurant routes */}
      <Route path="restaurant/">
        <Route path="login" element={<RestaurantLogin />} />
        <Route path="signup" element={<RestaurantSignup />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      {/* Admin routes  */}
      <Route path="admin/*" element={<AdminPages />} />

      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
};
