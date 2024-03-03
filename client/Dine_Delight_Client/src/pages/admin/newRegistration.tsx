import { useCallback, useState } from "react";
import ApprovalModal from "../../components/Admin/ApprovalModal";
import NewRegistrationData from "../../components/Admin/newRegistrationData";
import useNewRegistrations from "../../hooks/useNewRegistration";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import { filterNewRegistrations } from "../../utils/filter";
import showToast from "../../utils/toaster";
import { RestDetailsType } from "../../types/PropsType";

const NewRegistration = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [restDetails, setResDetails] = useState<RestDetailsType | null>(null);
  const {
    newRestaurants,
    filteredRegistration,
    setNewRestaurants,
    setFilteredRegistration,
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
      .post(ADMIN_API + `/validate_restaurant/${restDetails?.id}`, { action })
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
      <h1 className="mb-2 text-xl font-semibold">No registerations yet</h1>
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
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-center pt-4 mb-2 "
          aria-label="Table navigation"
        >
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
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
