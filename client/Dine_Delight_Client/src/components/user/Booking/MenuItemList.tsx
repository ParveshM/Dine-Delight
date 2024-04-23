import { MenuItemInterface } from "../../../types/RestaurantInterface";
import { forwardRef } from "react";
import Button from "../../restaurant/Button";
import { MdDiscount } from "react-icons/md";
import { calculateDiscountedPrice } from "../../../utils/util";

interface MenuItemProps extends MenuItemInterface {
  handleClick: () => void;
}
const MenuItemList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MenuItemProps
> = (
  { name, price, isVegetarian, category, discount, tags, handleClick },
  ref
) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  return (
    <div
      className="relative  bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-md p-4 cursor-pointer"
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
            <MdDiscount className="w-4 h-4 mr-1" />
            {discount}%
          </div>
        )}{" "}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold break-words">{name}</h3>
        <p className="text-sm text-gray-600 mt-2 inline-flex gap-1">
          {discount > 0 && <del>₹{price}</del>}₹{discountedPrice}
        </p>
      </div>
      <div className="flex justify-end">
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
        <div>
          <Button
            label="Add"
            className="bg-green-500 focus:outline-none"
            handleButtonclick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(MenuItemList);
