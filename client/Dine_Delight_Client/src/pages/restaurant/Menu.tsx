import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "../../components/restaurant/MenuItem";
import { RESTAURANT_API, menuCategories } from "../../constants";
import {
  MenuCategory,
  MenuItemInterface,
} from "../../types/RestaurantInterface";
import axiosJWT from "../../utils/axiosService";
import showToast from "../../utils/toaster";
import Button from "../../components/restaurant/Button";
import AddMenuModal from "../../components/restaurant/Modal/AddMenuModal";
import ConfirmationModal from "../../components/user/Modals/ConfirmationModal";
import { DebounceInput } from "react-debounce-input";
import MenuItemsShimmer from "../../components/shimmers/MenuItemsShimmer";
import QrGenerator from "../../components/restaurant/QrGenerator";

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isVegFilterActive, setIsVegFilterActive] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>("starters");
  const [menuItems, setMenuItems] = useState<MenuItemInterface[]>([]);
  const [itemForEdit, setItemForEdit] = useState<MenuItemInterface | null>(
    null
  );
  const [itemForDelete, setItemForDelete] = useState<MenuItemInterface | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isQrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver>();
  const lastMenuItem = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore]
  );

  const handleItemAdd = (item: MenuItemInterface, action: "Add" | "Edit") => {
    if (selectedCategory && item.category === selectedCategory) {
      if (action === "Add") {
        isVegFilterActive && item.isVegetarian
          ? setMenuItems((prev) => [...prev, item])
          : !item.isVegetarian && setMenuItems((prev) => [...prev, item]);
      } else {
        const filteredMenu = menuItems.filter(
          (menuItem) => menuItem._id !== item._id
        );
        filteredMenu.unshift(item);
        setMenuItems(filteredMenu);
        setItemForEdit(null);
      }
    }
  };

  const handleItemDelete = () => {
    if (itemForDelete) {
      const filteredMenu = menuItems.filter(
        (menuItem) => menuItem._id !== itemForDelete._id
      );
      setMenuItems(filteredMenu);
      setIsDeleteModalOpen(false);
      axiosJWT
        .delete(RESTAURANT_API + `/menu/delete/${itemForDelete._id}`)
        .then(({ data }) => showToast(data.message))
        .catch(() => showToast("Oops! Something went wrong", "error"));
    }
  };
  useEffect(() => {
    setMenuItems([]);
    setPage(1);
  }, [selectedCategory, isVegFilterActive, searchQuery]);

  useEffect(() => {
    page > 1 ? setIsLoadingMore(true) : setIsLoading(true);
    axiosJWT
      .get(RESTAURANT_API + "/menu", {
        params: {
          q: searchQuery,
          page,
          category: selectedCategory,
          ...(isVegFilterActive && { isVegetarian: isVegFilterActive }),
        },
      })
      .then(({ data }) => {
        setMenuItems((prev) => [...prev, ...data.menu]);
        setHasMore(data.menu?.length > 0);
        page > 1 ? setIsLoadingMore(false) : setIsLoading(false);
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, [selectedCategory, searchQuery, isVegFilterActive, page]);

  return (
    <div className="grid grid-cols-8 gap-8">
      <div className="col-span-5 md:col-span-6 space-y-8 ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2  mb-3">
          <h1 className="text-3xl font-semibold ">Menu</h1>
          <div className="flex item-center gap-2">
            <Button
              label="Qr Code"
              className="px-4 py-2 bg-green-400"
              handleButtonclick={() => setQrModalOpen(true)}
            />
            <Button
              label="Add Item"
              className="px-4 py-2 bg-yellow-400 "
              handleButtonclick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        <div className=" flex items-center gap-2">
          <DebounceInput
            min={1}
            debounceTimeout={500}
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full  border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
          />
          {(selectedCategory === "starters" ||
            selectedCategory === "main course") && (
            <label className="inline-flex items-center  ">
              <div
                className={`relative w-12 h-6 rounded-full cursor-pointer ${
                  isVegFilterActive ? "bg-green-500" : "bg-gray-300"
                }`}
                onClick={() => setIsVegFilterActive(!isVegFilterActive)}
              >
                <div
                  className={`absolute left-1 top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    isVegFilterActive ? "transform translate-x-full" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-2">Veg</span>
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-5">
          {selectedCategory && (
            <h3 className="text-xl font-semibold col-span-full uppercase">
              {selectedCategory}
            </h3>
          )}
          {isLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <MenuItemsShimmer key={index} />
              ))}
            </>
          ) : (
            <>
              {menuItems.length ? (
                <>
                  {menuItems.map((item, index) => {
                    if (menuItems.length === index + 1) {
                      return (
                        <MenuItem
                          {...item}
                          key={item._id}
                          handleClick={(action: "Edit" | "Delete") => {
                            if (action === "Edit") {
                              setIsEditModalOpen(true);
                              setItemForEdit(item);
                            } else {
                              setItemForDelete(item);
                              setIsDeleteModalOpen(true);
                            }
                          }}
                          ref={lastMenuItem}
                        />
                      );
                    } else {
                      return (
                        <MenuItem
                          {...item}
                          key={item._id}
                          handleClick={(action: "Edit" | "Delete") => {
                            if (action === "Edit") {
                              setIsEditModalOpen(true);
                              setItemForEdit(item);
                            } else {
                              setItemForDelete(item);
                              setIsDeleteModalOpen(true);
                            }
                          }}
                        />
                      );
                    }
                  })}
                </>
              ) : (
                <div className="col-span-6 flex flex-col justify-center items-center">
                  <h2 className="text-2xl  font-bold mb-2">No Items found</h2>
                  <p className="text-lg  text-gray-600">
                    Sorry, no items found matching your filter.
                  </p>
                </div>
              )}
            </>
          )}
          {isLoadingMore &&
            Array.from({ length: 3 }).map((_, index) => (
              <MenuItemsShimmer key={index} />
            ))}
        </div>
      </div>

      <div className=" col-span-3 md:col-span-2 space-y-4 sticky top-20 right-0 custom-vh">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        {menuCategories.map((category, index) => (
          <div
            className=" bg-[#000099] hover:bg-[#000080] py-4 rounded-md font-semibold
                      text-white text-center uppercase cursor-pointer"
            onClick={() => setSelectedCategory(category)}
            key={index}
          >
            {category}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddMenuModal
          setIsModalOpen={setIsModalOpen}
          handleItemAdd={handleItemAdd}
          action="Add"
        />
      )}
      {isEditModalOpen && itemForEdit && (
        <AddMenuModal
          setIsModalOpen={setIsEditModalOpen}
          handleItemAdd={handleItemAdd}
          action="Edit"
          menuItem={itemForEdit}
        />
      )}
      {isDeleteModalOpen && itemForDelete && (
        <ConfirmationModal
          action="deleteMenuItem"
          setIsOpen={setIsDeleteModalOpen}
          handleConfirmation={handleItemDelete}
        />
      )}
      {isQrModalOpen && <QrGenerator setIsModalOpen={setQrModalOpen} />}
    </div>
  );
};

export default Menu;
