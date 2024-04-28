import { IoClose } from "react-icons/io5";
import { menuCategories } from "../../constants";
import { MenuCategory } from "../../types/RestaurantInterface";

const MenuDrawer: React.FC<{
  setDrawerOpen: (isOpen: boolean) => void;
  setSelectedCategory: (category: MenuCategory) => void;
}> = ({ setDrawerOpen, setSelectedCategory }) => {
  const handleCategoryClick = (
    event: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    const target = event.target as HTMLUListElement;
    if (target.tagName === "LI") {
      const category = target.dataset.category as MenuCategory;
      setSelectedCategory(category);
      setDrawerOpen(false);
    }
  };
  return (
    <div
      id="drawer-bottom-example"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full border p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none"
    >
      <button
        type="button"
        data-drawer-hide="drawer-bottom-example"
        aria-controls="drawer-bottom-example"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={() => setDrawerOpen(false)}
      >
        <IoClose className="w-6 h-6" />
      </button>
      <div>
        <h5 className="mb-2 ml-5 text-base font-semibold text-gray-500 dark:text-gray-400">
          Categories
        </h5>
        <ul
          className="h-40  bg-white rounded-md mx-2"
          onClick={handleCategoryClick}
        >
          {menuCategories.map((category, index) => (
            <li
              key={index}
              className="border-b last:border-b-0 text-sm block w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-100 
              focus:outline-none focus:bg-gray-100"
              data-category={category}
            >
              {category.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuDrawer;
