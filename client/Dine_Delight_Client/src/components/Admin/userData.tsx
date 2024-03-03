import { useState } from "react";
import { UserInterface } from "../../types/UserInterface";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";

const UserData: React.FC<UserInterface> = ({ _id, name, email, isBlocked }) => {
  const [isChecked, setIsChecked] = useState<boolean>(isBlocked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosJWT
      .post(ADMIN_API + `/block_user/${_id}`)
      .catch((err) => console.log(err));
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">10</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ml-2 ${
              isChecked ? "bg-red-500" : "bg-green-400"
            }`}
          ></div>
          <p>{isChecked ? "Blocked" : "Active"}</p>
        </div>
      </td>
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
                isChecked ? "bg-red-500" : "bg-primary"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                isChecked ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
        </label>
      </td>
    </tr>
  );
};

export default UserData;
