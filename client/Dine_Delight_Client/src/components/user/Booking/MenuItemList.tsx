import { MenuItemInterface } from "../../../types/RestaurantInterface";
import { forwardRef } from "react";
import Button from "../../restaurant/Button";

interface MenuItemProps extends MenuItemInterface {
  handleClick: () => void;
}
const MenuItemList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  MenuItemProps
> = ({ name, price, isVegetarian, category, tags, handleClick }, ref) => {
  return (
    <div
      className="relative  bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-md p-4 cursor-pointer"
      ref={ref}
    >
      {(category === "starters" || category === "main course") && (
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
