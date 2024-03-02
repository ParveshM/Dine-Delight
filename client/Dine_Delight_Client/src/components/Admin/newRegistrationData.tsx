import { NewRegistrationType } from "../../types/PropsType";

const NewRegistrationData: React.FC<NewRegistrationType> = ({
  isModalOpen,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        Villagio restaurant
      </th>
      <td className="px-6 py-4">Silver</td>
      <td className="px-6 py-4">Laptop</td>
      <td className="px-6 py-4">
        <button
          className="py-2 px-5 rounded-md bg-green-400 text-white font-semibold hover:bg-green-500 transition duration-150"
          onClick={() => isModalOpen(true)}
        >
          View
        </button>
      </td>
    </tr>
  );
};
export default NewRegistrationData;
