import { MenuItemInterface } from "../../../types/RestaurantInterface";
import { forwardRef } from "react";
import Button from "../../restaurant/Button";
import { calculateDiscountedPrice } from "../../../utils/util";
import { FaCircle } from "react-icons/fa";
import { IoTriangleSharp } from "react-icons/io5";
interface MenuItemProps extends MenuItemInterface {
  handleClick: () => void;
}
const MenuItemList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MenuItemProps
> = (
  { name, price, isVegetarian, category, discount, tags, image, handleClick },
  ref
) => {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  return (
    <>
      <div
        className="flex p-4 justify-between md:border rounded-md py-4 cursor-pointer"
        ref={ref}
      >
        <div className="flex flex-col ">
          <div className="relative flex flex-col gap-2 ">
            {(category === "main course" || category === "starters") && (
              <>
                {isVegetarian ? (
                  <div className="flex justify-center items-center w-5 h-5  border border-green-500 p-1">
                    <FaCircle className="text-green-500" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-5 h-5  border border-red-500 p-1">
                    <IoTriangleSharp className="text-red-500" />
                  </div>
                )}
              </>
            )}
          </div>
          <h3 className="text-lg w-20 md:w-0 font-semibold leading-5 mt-1">
            {name}
          </h3>
          {discount > 0 && (
            <div
              className="w-16 bg-yellow-400 text-yellow-900 py-1 px-2 
            rounded-md text-xs font-semibold flex items-center mt-3"
            >
              {discount}% off
            </div>
          )}
          <p className="text-sm text-gray-600 mt-1 inline-flex gap-1">
            {discount > 0 && <del>₹{price}</del>}₹{discountedPrice}
          </p>
          {tags?.length ? (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={`${index}-${tag}`}
                  className="px-3 py-2 rounded-md text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <img src={image} alt={name} className="h-32 w-32 rounded-md mb-2" />
          <Button
            label="Add"
            className="absolute -bottom-2 w-[100px] bg-green-500 focus:outline-none"
            handleButtonclick={handleClick}
          />
        </div>
      </div>
      <hr className="md:hidden border-t last:border-none border-gray-400 mx-2" />
    </>
  );
};

export default forwardRef(MenuItemList);
