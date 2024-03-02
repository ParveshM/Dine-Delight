import { Route, Routes } from "react-router-dom";
import Header from "../../components/Admin/Header/Header";
import Sidebar from "../../components/Admin/Header/Sidebar";
import UsersList from "./UserList";
import RestaurantList from "./RestaurantList";
import NewRegistration from "./newRegistration";
const AdminPages: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Sidebar children={<div>Dashboard</div>} />} />
        <Route path="/users" element={<Sidebar children={<UsersList />} />} />
        <Route
          path="/restaurant_list"
          element={<Sidebar children={<RestaurantList />} />} //passing  component as props
        />
        <Route
          path="/new_registrations"
          element={<Sidebar children={<NewRegistration />} />}
        />
        <Route path="*" element={<div>ADMIN ERROR</div>} />
      </Routes>
    </>
  );
};
export default AdminPages;
