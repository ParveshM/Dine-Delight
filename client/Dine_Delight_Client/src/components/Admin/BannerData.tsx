import { Trash } from "lucide-react";
import { useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import { BannerInterface } from "../../types/RestaurantInterface";

interface BannerProps extends BannerInterface {
  index: number;
  handleDeleteImg: (id: string) => void;
}
const BannerData: React.FC<BannerProps> = ({
  _id,
  image,
  description,
  title,
  isActive,
  index,
  handleDeleteImg,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isActive);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axiosJWT
      .patch(ADMIN_API + `/banners/edit/${_id}?isActive=${!isChecked}`)
      .catch((err) => console.log(err));
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index}
      </th>
      <td className="px-6 py-4">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 object-cover rounded-md"
        />
      </td>

      <td className="px-6 py-4">{title}</td>

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
                isChecked ? "bg-green-500" : "bg-red-500"
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
      <td className="px-6 py-4">
        <button
          className="p-1 rounded-md bg-red-400 text-white font-semibold hover:bg-red-500 transition duration-150"
          onClick={() => handleDeleteImg(_id)}
        >
          <Trash />
        </button>
      </td>
    </tr>
  );
};

export default BannerData;
