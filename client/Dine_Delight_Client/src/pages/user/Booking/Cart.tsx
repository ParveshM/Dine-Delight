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

const Cart = () => {
  const {
    booking,
    menuItems,
    isLoading,
    searchQuery,
    lastMenuItem,
    setSearchQuery,
    isLoadingMore,
    isSidebarOpen,
    setIsSidebarOpen,
    handleAddToCart,
    selectedCategory,
    isVegFilterActive,
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

  return bookingstatus.includes(booking?.bookingStatus ?? "") ||
    booking?.foodStatus ? (
    navigate(-1)
  ) : (
    <>
      <Navbar />
      <div className="relative grid grid-cols-8 gap-8 mt-20  ">
        <div className=" col-span-3 md:col-span-2 space-y-4 sticky top-20 right-0 custom-vh ml-2">
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
          <div className="flex justify-between items-center gap-2  mb-3">
            <h1 className="text-3xl font-semibold ">Menu</h1>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-2">
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
            cartItems={cart}
          />
        </div>
        <div className="absolute top-3 right-3">
          <button
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IoIosCart className="w-6 h-6 text-white" />
            <span className="absolute top-0 right-0 -mt-3 -mr-1 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              {cart.length ?? 0}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
