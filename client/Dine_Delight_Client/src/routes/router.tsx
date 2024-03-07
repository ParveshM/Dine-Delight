import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../pages/user/Profile";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/signup";
import RestaurantLogin from "../pages/restaurant/restaurantLogin";
import VerifyOTP from "../pages/user/VerifyOTP";
import RestaurantSignup from "../pages/restaurant/restaurantSignup";
import Dashboard from "../pages/restaurant/dashBoard";
import EmailVerificationPage from "../pages/restaurant/emailVerification";
import AdminLogin from "../pages/admin/AdminLogin";
import ProtectedRoute, {
  AdminProtectedRoute,
  SellerProtectedRoute,
} from "./ProtectedRoutes";
import PubliceRoute, {
  AdminPublicRoute,
  SellerPublicRoute,
} from "./PublicRoutes";
import ForgotPassword from "../pages/user/forgotPassword";
import ResetPassword from "../pages/user/resetPassword";
import AdminPage from "../pages/admin/AdminPage";
import UsersList from "../pages/admin/UserList";
import RestaurantList from "../pages/admin/RestaurantList";
import NewRegistration from "../pages/admin/newRegistration";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFoundPage from "../components/Error404";
import ViewRestaurant from "../pages/restaurant/ViewRestaurant";

export const MainRouter = () => {
  return (
    <Routes>
      {/******************* User routes *****************/}
      <Route path="/" element={<div>Home page</div>} />
      <Route path="user/auth/" element={<PubliceRoute />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="verify_otp" element={<VerifyOTP />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot_password" element={<ForgotPassword />} />
        <Route path="reset_password/:id" element={<ResetPassword />} />
      </Route>
      {/* User Protected Route  */}
      <Route path="user/" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="profile" />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/******************* Restaurant routes *****************/}
      <Route path="restaurant/auth/" element={<SellerPublicRoute />}>
        <Route path="login" element={<RestaurantLogin />} />
        <Route path="signup" element={<RestaurantSignup />} />
        <Route path="verify_token/:token" element={<EmailVerificationPage />} />
      </Route>
      {/* Restaurant private routes  */}
      <Route path="/restaurant/" element={<SellerProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route
          path="dashboard"
          element={<Dashboard children={<div>Dashboard</div>} />}
        />
        <Route
          path="reservations"
          element={<Dashboard children={<div>Reservations</div>} />}
        />
        <Route
          path="menu"
          element={<Dashboard children={<div>Food menu</div>} />}
        />
        <Route
          path="view"
          element={<Dashboard children={<ViewRestaurant />} />}
        />
        <Route
          path="table"
          element={<Dashboard children={<div>Tables</div>} />}
        />
      </Route>

      {/******************* Admin routes *****************/}
      <Route path="/admin/auth/" element={<AdminPublicRoute />}>
        <Route path="login" element={<AdminLogin />} />
      </Route>

      {/* admin protected Route  */}
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route
          path="dashboard"
          element={<AdminPage children={<AdminDashboard />} />}
        />
        <Route path="users" element={<AdminPage children={<UsersList />} />} />
        <Route
          path="restaurant_list"
          element={<AdminPage children={<RestaurantList />} />} //passing  component as props
        />
        <Route
          path="new_registrations"
          element={<AdminPage children={<NewRegistration />} />}
        />
      </Route>
      <Route path="banners" element={<div>Banners</div>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};