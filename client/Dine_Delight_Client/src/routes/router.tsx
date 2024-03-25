import { Routes, Route, Navigate } from "react-router-dom";
import AccountPage from "../pages/user/AccountPage";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/signup";
import RestaurantLogin from "../pages/restaurant/restaurantLogin";
import VerifyOTP from "../pages/user/VerifyOTP";
import RestaurantSignup from "../pages/restaurant/restaurantSignup";
import SellerPage from "../pages/restaurant/SellerPage";
import EmailVerificationPage from "../pages/restaurant/emailVerification";
import AdminLogin from "../pages/admin/AdminLogin";
import ProtectedRoute, {
  AdminProtectedRoute,
  SellerProtectedRoute,
} from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import ForgotPassword from "../pages/user/forgotPassword";
import ResetPassword from "../pages/user/resetPassword";
import AdminPage from "../pages/admin/AdminPage";
import UsersList from "../pages/admin/UserList";
import RestaurantList from "../pages/admin/RestaurantList";
import NewRegistration from "../pages/admin/newRegistration";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFoundPage from "../pages/Error404";
import ViewRestaurant from "../pages/restaurant/restaurantDetails";
import Home from "../pages/Home";
import Tables from "../pages/restaurant/Tables/Tables";
import TimeSlots from "../pages/restaurant/Tables/timeSlots";
import ViewTable from "../pages/restaurant/Tables/viewTableSlots";
import RestaurantView from "../pages/user/RestaurantViewPage";
import BookTable from "../pages/user/BookTable";
import PaymentCompleted from "../pages/user/payment/PaymentCompleted";
import BookingHistory from "../pages/user/BookingHistory";
import Reservations from "../pages/restaurant/Reservations";
import ViewReservation from "../pages/restaurant/viewReservation";
import ViewBooking from "../pages/user/viewBooking";

export const MainRouter = () => {
  return (
    <Routes>
      {/******************* User routes *****************/}
      <Route path="/" element={<Home />} />
      <Route path="/view_restaurant/:id" element={<RestaurantView />} />
      <Route path="" element={<PublicRoute />}>
        <Route path="/user/auth/signup" element={<SignUp />} />
        <Route path="/user/auth/verify_otp" element={<VerifyOTP />} />
        <Route path="/user/auth/login" element={<Login />} />
        <Route path="/user/auth/forgot_password" element={<ForgotPassword />} />
        <Route
          path="/user/auth/reset_password/:id"
          element={<ResetPassword />}
        />
      </Route>
      {/* </Route>  */}

      {/* User Protected Route  */}
      <Route path="" element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={<AccountPage children={<div>Profile</div>} />}
        />
        <Route path="/reserve_table" element={<BookTable />} />
        <Route path="/payment_status/:id" element={<PaymentCompleted />} />
        <Route
          path="/booking_history"
          element={<AccountPage children={<BookingHistory />} />}
        />
        <Route
          path="booking/view/:id"
          element={<AccountPage children={<ViewBooking />} />}
        />
      </Route>

      {/******************* Restaurant routes *****************/}
      <Route path="restaurant/auth/" element={<PublicRoute />}>
        <Route path="login" element={<RestaurantLogin />} />
        <Route path="signup" element={<RestaurantSignup />} />
        <Route path="verify_token/:token" element={<EmailVerificationPage />} />
      </Route>
      {/* Restaurant private routes  */}
      <Route path="/restaurant/" element={<SellerProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route
          path="dashboard"
          element={<SellerPage children={<div>Dashboard</div>} />}
        />
        <Route
          path="reservations"
          element={<SellerPage children={<Reservations />} />}
        />
        <Route
          path="reservations/view/:id"
          element={<SellerPage children={<ViewReservation />} />}
        />
        <Route path="table" element={<SellerPage children={<Tables />} />} />
        <Route
          path="view_table/:id"
          element={<SellerPage children={<ViewTable />} />}
        />
        <Route
          path="time_slots"
          element={<SellerPage children={<TimeSlots />} />}
        />
        <Route
          path="menu"
          element={<SellerPage children={<div>Food menu</div>} />}
        />
        <Route
          path="view"
          element={<SellerPage children={<ViewRestaurant />} />}
        />
      </Route>

      {/******************* Admin routes *****************/}
      <Route path="/admin/auth/" element={<PublicRoute />}>
        <Route path="login" element={<AdminLogin />} />
      </Route>

      {/* admin protected Route  */}
      <Route path="/admin" element={<AdminProtectedRoute />}>
        <Route
          path="dashboard"
          element={<AdminPage children={<AdminDashboard />} />}
        />
        <Route path="users" element={<AdminPage children={<UsersList />} />} />
        <Route
          path="restaurants"
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
