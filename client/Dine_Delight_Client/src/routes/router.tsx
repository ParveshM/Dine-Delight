import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute, {
  AdminProtectedRoute,
  SellerProtectedRoute,
} from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import Loader from "../components/shimmers/Loader";

const AccountPage = lazy(() => import("../pages/user/AccountPage"));
const Login = lazy(() => import("../pages/user/Login"));
const SignUp = lazy(() => import("../pages/user/signup"));
const RestaurantLogin = lazy(
  () => import("../pages/restaurant/restaurantLogin")
);
const VerifyOTP = lazy(() => import("../pages/user/VerifyOTP"));
const RestaurantSignup = lazy(
  () => import("../pages/restaurant/restaurantSignup")
);
const SellerPage = lazy(() => import("../pages/restaurant/SellerPage"));
const EmailVerificationPage = lazy(
  () => import("../pages/restaurant/emailVerification")
);
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const ForgotPassword = lazy(() => import("../pages/user/forgotPassword"));
const ResetPassword = lazy(() => import("../pages/user/resetPassword"));
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));
const UsersList = lazy(() => import("../pages/admin/UserList"));
const RestaurantList = lazy(() => import("../pages/admin/RestaurantList"));
const NewRegistration = lazy(() => import("../pages/admin/newRegistration"));
const NotFoundPage = lazy(() => import("../pages/Error404"));
const ViewRestaurant = lazy(
  () => import("../pages/restaurant/restaurantDetails")
);
const Tables = lazy(() => import("../pages/restaurant/Tables/Tables"));
const TimeSlots = lazy(() => import("../pages/restaurant/Tables/timeSlots"));
const ViewTable = lazy(
  () => import("../pages/restaurant/Tables/viewTableSlots")
);
const SingleRestaurant = lazy(() => import("../pages/user/SingleRestaurant"));
const BookTable = lazy(() => import("../pages/user/Booking/BookTable"));
const PaymentCompleted = lazy(
  () => import("../pages/user/payment/PaymentCompleted")
);
const BookingHistory = lazy(
  () => import("../pages/user/Booking/BookingHistory")
);
const Reservations = lazy(() => import("../pages/restaurant/Reservations"));
const ViewReservation = lazy(
  () => import("../pages/restaurant/viewReservation")
);
const Menu = lazy(() => import("../pages/restaurant/Menu"));
const ViewBooking = lazy(() => import("../pages/user/Booking/viewBooking"));
const Profile = lazy(() => import("../pages/user/Profile"));
const TransactionHistory = lazy(
  () => import("../pages/user/TransactionHistory")
);
const Chat = lazy(() => import("../pages/user/Chat"));
const Home = lazy(() => import("../pages/Home"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const Cart = lazy(() => import("../pages/user/Booking/Cart"));
const Bookmarks = lazy(() => import("../pages/user/Bookmarks"));
const Dashboard = lazy(() => import("../pages/restaurant/Dashboard"));
const UnsubscribePage = lazy(() => import("../pages/user/UnsubscribePage"));
const MenuOrder = lazy(() => import("../pages/user/Orders/MenuOrder"));
const Banners = lazy(() => import("../pages/admin/Banners"));
const RecentOrders = lazy(() => import("../pages/user/Orders/RecentOrders"));
const RestaurantOrders = lazy(
  () => import("../pages/restaurant/RestaurantOrders")
);
const ContactUs = lazy(() => import("../pages/ContactUs"));
const AboutPage = lazy(() => import("../pages/AboutPage"));

export const MainRouter = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/******************* User routes *****************/}
          <Route path="/" element={<Home />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/view_restaurant/:id" element={<SingleRestaurant />} />
          <Route path="" element={<PublicRoute />}>
            <Route path="/user/auth/signup" element={<SignUp />} />
            <Route path="/user/auth/verify_otp" element={<VerifyOTP />} />
            <Route path="/user/auth/login" element={<Login />} />
            <Route
              path="/user/auth/forgot_password"
              element={<ForgotPassword />}
            />
            <Route
              path="/user/auth/reset_password/:id"
              element={<ResetPassword />}
            />
          </Route>
          <Route
            path="/unsubscribe/:restaurantId/:userId"
            element={<UnsubscribePage />}
          />

          <Route path="/menu/:id" element={<MenuOrder />} />

          {/* User Protected Route  */}
          <Route path="" element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={<AccountPage children={<Profile />} />}
            />
            <Route path="/reserve_table" element={<BookTable />} />
            <Route path="/payment_status/:id" element={<PaymentCompleted />} />
            <Route
              path="/booking_history"
              element={<AccountPage children={<BookingHistory />} />}
            />
            <Route
              path="/booking/view/:id"
              element={<AccountPage children={<ViewBooking />} />}
            />
            <Route
              path="/bookmarks"
              element={<AccountPage children={<Bookmarks />} />}
            />
            <Route
              path="/orders"
              element={<AccountPage children={<RecentOrders />} />}
            />

            <Route path="/cart/:id" element={<Cart />} />
            <Route
              path="/transaction_history"
              element={<AccountPage children={<TransactionHistory />} />}
            />
            <Route path="/chat" element={<Chat />} />
          </Route>

          {/******************* Restaurant routes *****************/}
          <Route path="restaurant/auth/" element={<PublicRoute />}>
            <Route path="login" element={<RestaurantLogin />} />
            <Route path="signup" element={<RestaurantSignup />} />
            <Route
              path="verify_token/:token"
              element={<EmailVerificationPage />}
            />
          </Route>
          {/* Restaurant private routes  */}
          <Route path="/restaurant/" element={<SellerProtectedRoute />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route
              path="dashboard"
              element={<SellerPage children={<Dashboard />} />}
            />
            <Route
              path="reservations"
              element={<SellerPage children={<Reservations />} />}
            />
            <Route
              path="reservations/view/:id"
              element={<SellerPage children={<ViewReservation />} />}
            />
            <Route
              path="table"
              element={<SellerPage children={<Tables />} />}
            />
            <Route
              path="view_table/:id"
              element={<SellerPage children={<ViewTable />} />}
            />
            <Route
              path="time_slots"
              element={<SellerPage children={<TimeSlots />} />}
            />
            <Route path="menu" element={<SellerPage children={<Menu />} />} />

            <Route
              path="orders"
              element={<SellerPage children={<RestaurantOrders />} />}
            />
            <Route
              path="view"
              element={<SellerPage children={<ViewRestaurant />} />}
            />
            <Route path="chat" element={<SellerPage children={<Chat />} />} />
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
            <Route
              path="users"
              element={<AdminPage children={<UsersList />} />}
            />
            <Route
              path="restaurants"
              element={<AdminPage children={<RestaurantList />} />} //passing  component as props
            />
            <Route
              path="new_registrations"
              element={<AdminPage children={<NewRegistration />} />}
            />
            <Route
              path="banners"
              element={<AdminPage children={<Banners />} />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
