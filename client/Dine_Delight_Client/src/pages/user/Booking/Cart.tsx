import { menuCategories } from "../../../constants";
import MenuItemsShimmer from "../../../components/shimmers/MenuItemsShimmer";
import { DebounceInput } from "react-debounce-input";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/user/Header/Navbar";
import MenuItemList from "../../../components/user/Booking/MenuItemList";
import CartSidebar from "../../../components/user/Booking/CartSidebar";
import { IoIosCart } from "react-icons/io";
import { useAppSelector } from "../../../redux/store/Store";
import { IoBagCheck } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { useMemo } from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import MenuDrawer from "../../../components/user/Order/MenuDrawer";
import TableConfirmation from "../../../components/user/Order/TableConfirmation";

const Cart: React.FC = () => {
  const {
    booking,
    menuItems,
    isLoading,
    searchQuery,
    formData,
    lastMenuItem,
    isDrawerOpen,
    isLoadingMore,
    setFormData,
    isSidebarOpen,
    setDrawerOpen,
    setSearchQuery,
    setIsSidebarOpen,
    handleAddToCart,
    selectedCategory,
    isVegFilterActive,
    setTableInputModal,
    showTableInputModal,
    setIsVegFilterActive,
    setSelectedCategory,
  } = useCart();

  const cart = useAppSelector((state) => state.CartSlice.cart);
  const navigate = useNavigate();
  const bookingstatus: string[] = [
    "Cancelled",
    "Checked-in",
    "No-show",
    "Completed",
  ];
  const totalAmount = useMemo(() => {
    if (cart.length)
      return cart.reduce((acc, item) => {
        let subTotal = item?.quantity * item?.price;
        return (acc += subTotal);
      }, 0);
  }, [cart]);

  return bookingstatus.includes(booking?.bookingStatus ?? "") ? (
    <>{navigate(-1)}</>
  ) : (
    <>
      <Navbar />
      <div className="relative grid md:grid-cols-8 gap-8 mt-20  ">
        <div className="hidden md:block col-span-3 md:col-span-2 space-y-4 sticky top-20 right-0 custom-vh ml-2">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className=" space-y-2">
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
        </div>
        <div className="col-span-5 md:col-span-6 space-y-8 ">
          <div className="flex justify-between items-center gap-2 ">
            <h1 className="text-3xl font-semibold pl-2">Menu</h1>
          </div>
          <div className=" flex items-center gap-2 mx-2">
            <DebounceInput
              min={1}
              debounceTimeout={500}
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 w-full md:max-w-2xl  border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
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
                <span className="ml-2 font-semibold text-sm ">Veg</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 mx-2 pb-12">
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
                          <MenuItemList
                            {...item}
                            key={item._id}
                            handleClick={() => handleAddToCart(item)}
                            ref={lastMenuItem}
                          />
                        );
                      } else {
                        return (
                          <MenuItemList
                            {...item}
                            key={item._id}
                            handleClick={() => handleAddToCart(item)}
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
          <CartSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            tableData={formData}
          />
        </div>
        <div className="fixed bottom-20 right-5 md:hidden">
          <button
            className="bg-black p-3 rounded-full shadow-lg text-white focus:outline-none"
            onClick={() => setDrawerOpen(true)}
          >
            <MdOutlineRestaurantMenu className="h-6 w-6" />
          </button>
        </div>

        {isDrawerOpen && (
          <MenuDrawer
            drawerOpen={isDrawerOpen}
            setDrawerOpen={setDrawerOpen}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        <div className={`fixed hidden md:block top-[100px] right-3`}>
          <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IoIosCart className="w-6 h-6 text-white" />
            {cart?.length ? (
              <span className="absolute top-0 right-0 -mt-3 -mr-1 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                {cart.length}
              </span>
            ) : null}
          </button>
        </div>

        <div
          className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 flex justify-between
           items-center md:hidden`}
        >
          <div className="flex items-center">
            <div className="relative mr-4 flex gap-2 items-center">
              <IoBagCheck className="text-3xl text-white" />
              {cart.length ? (
                <span className="absolute top-0 right-0  mt-1 transform translate-x-1/2 -translate-y-1/2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  {cart.length}
                </span>
              ) : null}
            </div>
            {cart.length ? (
              <p className="text-lg font-medium">₹{totalAmount}</p>
            ) : null}
          </div>
          <button
            className="text-sm inline-flex gap-2 items-center font-semibold "
            onClick={() => setIsSidebarOpen(true)}
          >
            VIEW CART <FaArrowRightLong />
          </button>
        </div>
        {showTableInputModal && (
          <TableConfirmation
            setTable={setFormData}
            setTableInputModal={setTableInputModal}
          />
        )}
      </div>
    </>
  );
};

export default Cart;
