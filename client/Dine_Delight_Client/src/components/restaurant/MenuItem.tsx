import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MenuItemInterface } from "../../types/RestaurantInterface";
import { forwardRef } from "react";

interface MenuItemProps extends MenuItemInterface {
  handleClick: (action: "Edit" | "Delete") => void;
}
const MenuItem: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MenuItemProps
> = ({ name, price, isVegetarian, category, handleClick }, ref) => {
  return (
    <div
      className={`relative  bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-md p-4 `}
      ref={ref}
    >
      {(category === "main course" || category === "starters") && (
        <div className="relative mb-2">
          <p
            className={`absolute top-0 right-0 ${
              isVegetarian ? "bg-green-500" : "bg-red-500"
            }  text-white py-1 px-2 rounded-full text-xs font-semibold`}
          >
            {isVegetarian ? "veg" : "non-veg"}
          </p>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold break-words">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">₹{price}</p>
      </div>
      <div className="absolute bottom-2 right-2 flex gap-2 ">
        <FaEdit
          className=" w-5 h-5 cursor-pointer "
          onClick={() => handleClick("Edit")}
        />
        <MdDelete
          className="w-5 h-5 cursor-pointer "
          onClick={() => handleClick("Delete")}
        />
      </div>
    </div>
  );
};

export default forwardRef(MenuItem);
