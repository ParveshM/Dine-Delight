import { useCallback, useState } from "react";
import ApprovalModal from "../../components/Admin/ApprovalModal";
import NewRegistrationData from "../../components/Admin/newRegistrationData";
import useNewRegistrations from "../../hooks/useNewRegistration";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import { filterNewRegistrations } from "../../utils/filter";
import showToast from "../../utils/toaster";
import { RestDetailsType } from "../../types/PropsType";
import Pagination from "../../components/Pagination";

const NewRegistration = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [restDetails, setResDetails] = useState<RestDetailsType | null>(null);
  const {
    newRestaurants,
    filteredRegistration,
    setNewRestaurants,
    setFilteredRegistration,
    setCurrentPage,
    currentPage,
    pageSize,
    itemsPerPage,
  } = useNewRegistrations();

  const handleModal = useCallback(
    (isOpen: boolean) => {
      setIsModalActive(isOpen);
    },
    [setIsModalActive]
  );

  const restData = useCallback((data: RestDetailsType) => {
    setResDetails(data);
  }, []);

  const handleAction = (action: string) => {
    axiosJWT
      .patch(ADMIN_API + `/validate_restaurant/${restDetails?.id}`, { action })
      .then(({ data }) => {
        const newFilterRegistration = filterNewRegistrations(
          restDetails?.id,
          filteredRegistration
        );
        setIsModalActive(false);
        setNewRestaurants(newFilterRegistration);
        setFilteredRegistration(newFilterRegistration);
        showToast(data?.message, "success");
      })
      .catch((error) => console.log(error));
  };

  if (!newRestaurants.length)
    return (
      <h1 className="mt-2 text-xl font-semibold">No registerations yet</h1>
    );

  return (
    <>
      <h1 className="mb-2 text-xl font-semibold ">New Registrations </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Restaurant name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Registration Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistration.map((restaurant) => (
              <NewRegistrationData
                key={restaurant._id}
                {...restaurant}
                isModalOpen={handleModal}
                sendDetails={restData}
              />
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
      {isModalActive && (
        <ApprovalModal
          isModalOpen={handleModal}
          sendAction={handleAction}
          name={restDetails?.name}
          email={restDetails?.email}
        />
      )}
    </>
  );
};

export default NewRegistration;
