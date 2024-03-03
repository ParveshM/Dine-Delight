import { memo } from "react";
import { NewRegistrationType } from "../../types/PropsType";

const NewRegistrationData: React.FC<NewRegistrationType> = ({
  _id,
  restaurantName,
  email,
  createdAt: registrationDate,
  isModalOpen,
  sendDetails,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {restaurantName}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">
        {new Date(registrationDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="px-6 py-4">
        <button
          className="py-2 px-5 rounded-md bg-green-400 text-white font-semibold hover:bg-green-500 transition duration-150"
          onClick={() => {
            sendDetails({ id: _id, name: restaurantName, email });
            isModalOpen(true);
          }}
        >
          View
        </button>
      </td>
    </tr>
  );
};
export default memo(NewRegistrationData);
