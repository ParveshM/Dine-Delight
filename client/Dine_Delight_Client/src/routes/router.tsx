import { Routes, Route } from "react-router-dom";
// import userRouter from "./userRouter";
// import restaurantRouter from "./restaurantRoute";
import Home from "../pages/user/home";
import SignUp from "../pages/user/signup";
import Login from "../pages/user/Login";

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="user/">
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Route>
      {/* Restaurant routes  */}
      <Route path="restaurant/">
        {/* <Route path="login" element={} /> */}
      </Route>
    </Routes>
  );
};
