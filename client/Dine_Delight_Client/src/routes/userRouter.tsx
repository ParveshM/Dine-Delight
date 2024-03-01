import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Suspense, lazy } from "react";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/signup";
const VerifyOTP = lazy(() => import("../pages/user/VerifOTP"));

const ErrorComponent = () => <h1>ERrrr</h1>;

const userRouter = (
  <Suspense fallback={<div>loading........</div>}>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify_otp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  </Suspense>
);

export default userRouter;
