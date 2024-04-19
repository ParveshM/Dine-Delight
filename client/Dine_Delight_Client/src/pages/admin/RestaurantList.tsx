import RestaurantData from "../../components/Admin/restaurantData";
import Pagination from "../../components/Pagination";
import useRestaurant from "../../hooks/useRestaurant";

const RestaurantList: React.FC = () => {
  const {
    restaurants,
    filteredRestaurants,
    setCurrentPage,
    currentPage,
    pageSize,
    itemsPerPage,
  } = useRestaurant();

  if (!restaurants.length)
    return <h1 className="mb-2 text-xl font-semibold ">No Restaurants</h1>;

  return (
    <>
      <h1 className="mb-2 text-xl font-semibold ">Restaurants</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Restaurant name
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantData {...restaurant} key={restaurant._id} />
            ))}
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
export default RestaurantList;
