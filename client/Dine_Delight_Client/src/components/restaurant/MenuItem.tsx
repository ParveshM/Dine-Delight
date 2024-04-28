import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MenuItemInterface } from "../../types/RestaurantInterface";
import { forwardRef } from "react";
import { MdDiscount } from "react-icons/md";
import { calculateDiscountedPrice } from "../../utils/util";
import { FaCircle } from "react-icons/fa6";
import { IoTriangleSharp } from "react-icons/io5";

interface MenuItemProps extends MenuItemInterface {
  handleClick: (action: "Edit" | "Delete") => void;
}
const MenuItem: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MenuItemProps
> = (
  { name, price, isVegetarian, category, tags, discount, image, handleClick },
  ref
) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  return (
    <div
      className={`relative bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-md p-4`}
      ref={ref}
    >
      <div className="relative ">
        {image && (
          <img src={image} alt="Food" className="w-full h-auto rounded-md" />
        )}
        {/* Add badges */}
        {(category === "main course" || category === "starters") && (
          <>
            {isVegetarian ? (
              <div className="flex justify-center items-center w-5 h-5  border border-green-500 p-1  mt-2">
                <FaCircle className="text-green-500" />
              </div>
            ) : (
              <div className="flex justify-center items-center w-5 h-5  border border-red-500 p-1 mt-2">
                <IoTriangleSharp className="text-red-500" />
              </div>
            )}
          </>
        )}
        {discount > 0 && (
          <div className="absolute top-1 left-2 bg-yellow-400 text-yellow-900 py-1 px-2 rounded-md text-xs font-semibold flex items-center">
            <MdDiscount className="w-4 h-4" />
            {discount}%
          </div>
        )}
      </div>

      <div className="">
        <h3 className="text-lg font-semibold break-words">{name}</h3>
        <p className="text-sm text-gray-600 mt-2 inline-flex gap-1">
          {discount > 0 && <del>₹{price}</del>}₹{discountedPrice}
        </p>
      </div>
      {tags?.length ? (
        <div className="flex flex-wrap gap-1">
          {tags?.map((tag: string, index: number) => (
            <span
              key={`${index}-${tag}`}
              className="px-3 py-2 rounded-md text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <FaEdit
          className="w-5 h-5 cursor-pointer"
          onClick={() => handleClick("Edit")}
        />
        <MdDelete
          className="w-5 h-5 cursor-pointer"
          onClick={() => handleClick("Delete")}
        />
      </div>
    </div>
  );
};

export default forwardRef(MenuItem);
