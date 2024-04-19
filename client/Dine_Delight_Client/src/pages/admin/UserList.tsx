import UserData from "../../components/Admin/userData";
import Pagination from "../../components/Pagination";
import useUsers from "../../hooks/useUsers";
const UsersList: React.FC = () => {
  const { users, setCurrentPage, currentPage, pageSize, itemsPerPage } =
    useUsers();
  return (
    <>
      <h1 className="mb-2 text-xl font-semibold ">Users</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg custom-vh ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-4 py-3">
                Total bookings
              </th>

              <th scope="col" className="px-8 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return <UserData {...user} key={user._id} />;
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalCount={pageSize}
          itemsPerPage={itemsPerPage} //items per page
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};
export default UsersList;
