import { useState } from "react";
import { RestaurantInterface } from "../../types/RestaurantInterface";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";

const RestaurantData: React.FC<RestaurantInterface> = ({
  _id,
  restaurantName,
  email,
  openingTime,
  closingTime,
  address,
  isListed,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isListed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosJWT
      .post(ADMIN_API + `/list_restaurant/${_id}`)
      .catch((err) => console.log(err));
  };
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
        344 Plaza Real, Suite 1433 Boca Raton, FL 33432-3937
      </td>
      <td className="px-6 py-4">Open</td>
      <td className="px-6 py-4">
        <label className="flex cursor-pointer select-none items-center">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <div
              className={`box block h-6 w-10 rounded-full ${
                !isChecked ? "bg-red-500" : "bg-primary"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                !isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </td>
    </tr>
  );
};
export default RestaurantData;
