import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MenuItemInterface } from "../../types/RestaurantInterface";
import { forwardRef } from "react";
import { MdDiscount } from "react-icons/md";
import { calculateDiscountedPrice } from "../../utils/util";

interface MenuItemProps extends MenuItemInterface {
  handleClick: (action: "Edit" | "Delete") => void;
}
const MenuItem: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MenuItemProps
> = (
  { name, price, isVegetarian, category, tags, discount, handleClick },
  ref
) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  return (
    <div
      className={`relative  bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-md p-4 `}
      ref={ref}
    >
      <div className="flex items-center relative mb-4">
        {(category === "main course" || category === "starters") && (
          <p
            className={`absolute top-0 right-0 ${
              isVegetarian ? "bg-green-500" : "bg-red-500"
            }  text-white py-1 px-2 rounded-full text-xs font-semibold`}
          >
            {isVegetarian ? "veg" : "non-veg"}
          </p>
        )}
        {discount > 0 && (
          <div className="absolute top-0 left-2 bg-yellow-400 text-yellow-900 py-1 px-2 rounded-md text-xs font-semibold flex items-center">
            <MdDiscount className="w-4 h-4 " />
            {discount}%
          </div>
        )}
      </div>

      <div className="p-4 ">
        <h3 className="text-lg font-semibold break-words">{name}</h3>
        <p className="text-sm text-gray-600 mt-2 inline-flex gap-1">
          {discount > 0 && <del>₹{price}</del>}₹{discountedPrice}
        </p>
      </div>
      {tags?.length ? (
        <div className="flex flex-wrap gap-1 ">
          {tags?.map((tag: string, index: number) => (
            <span
              key={`${index}-${tag}`}
              className=" px-3 py-2 rounded-md text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
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
