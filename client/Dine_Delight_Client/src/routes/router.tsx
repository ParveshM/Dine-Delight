import { Routes, Route } from "react-router-dom";
import Profile from "../pages/user/Profile";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/signup";
import RestaurantLogin from "../pages/restaurant/restaurantLogin";
import VerifyOTP from "../pages/user/VerifyOTP";
import RestaurantSignup from "../pages/restaurant/restaurantSignup";
import Dashboard from "../pages/restaurant/dashBoard";
import AdminPages from "../pages/admin/AdminPages";
import EmailVerificationPage from "../pages/restaurant/emailVerification";
import AdminLogin from "../pages/restaurant/AdminLogin";
import ProtectedRoute, { SellerProtectedRoute } from "./ProtectedRoutes";
import PubliceRoute, {
  AdminPublicRoute,
  SellerPublicRoute,
} from "./PublicRoutes";
const ErrorComponent = () => <h1>Error</h1>;

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home page</div>} />
      <Route path="user/auth/" element={<PubliceRoute />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="verify_otp" element={<VerifyOTP />} />
        <Route path="login" element={<Login />} />
      </Route>
      {/* User Protected Route  */}
      <Route path="user/" element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Restaurant routes */}
      <Route path="restaurant/auth/" element={<SellerPublicRoute />}>
        <Route path="login" element={<RestaurantLogin />} />
        <Route path="signup" element={<RestaurantSignup />} />
        <Route path="verify_token/:token" element={<EmailVerificationPage />} />
      </Route>
      {/* Restaurant private routes  */}
      <Route path="/restaurant/" element={<SellerProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* Admin routes  */}
      <Route path="/admin/auth/" element={<AdminPublicRoute />}>
        <Route path="login" element={<AdminLogin />} />
      </Route>
      {/* admin protected Route  */}
      <Route path="admin/*" element={<AdminPages />} />

      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
};
