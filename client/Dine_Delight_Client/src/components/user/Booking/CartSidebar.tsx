import { PanelRightClose } from "lucide-react";
import { BsPlus, BsDash } from "react-icons/bs";
import { clearCart } from "../../../redux/slices/CartSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store/Store";
import { TbCircleX } from "react-icons/tb";
import Button from "../../restaurant/Button";
import useCartSidebar from "../../../hooks/useCartSidebar";
import { useNavigate } from "react-router-dom";
interface CartSidbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  tableData?: {
    tableNumber: string;
    mobile: string;
  };
}

const CartSidebar: React.FC<CartSidbarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  tableData,
}) => {
  const dispatch = useAppDispatch();
  const {
    cartItems,
    handleCheckout,
    handleRemoveItem,
    handleUpdateQuantity,
    totalAmount,
    isSubmitting,
  } = useCartSidebar(tableData);
  const { isAuthenticated } = useAppSelector((state) => state.UserSlice);
  const navigate = useNavigate();
  return (
    <>
      <aside
        className={`fixed top-2 right-0 z-10 w-[100%]  md:w-[40%] lg:md-w-[30%] h-screen pt-10 shadow-md
    bg-white border-r border-gray-200
    ${
      isSidebarOpen
        ? "translate-y-0"
        : "hidden sm:-translate-y-0 -translate-y-full"
    }
     dark:bg-gray-800 dark:border-gray-700 `}
      >
        <div className=" px-3 pb-4  bg-white dark:bg-gray-800">
          <div className="flex items-center justify-center gap-2">
            <PanelRightClose
              className="focus:outline-none cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
            <h2 className="text-xl font-semibold flex-grow text-center">
              Cart
            </h2>
          </div>

          <hr className="my-2 text-black" />
          {cartItems.length ? (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-1  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-1  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-1  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-1  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remove
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td className="px-1  py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 break-words">
                          {item?.name}
                        </div>
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{item.price}
                        </div>
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            className="text-gray-600 focus:outline-none p-1 bg-red-200 rounded-md"
                            onClick={() =>
                              handleUpdateQuantity(item._id, 1, "decrement")
                            }
                          >
                            <BsDash className="h-4 w-4" />
                          </button>
                          <span className="px-2 text-gray-800 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            className="text-gray-600 focus:outline-none p-1 bg-green-200 rounded-md"
                            onClick={() =>
                              handleUpdateQuantity(item._id, 1, "increment")
                            }
                          >
                            <BsPlus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </td>
                      <td className="px-1 py-4 whitespace-nowrap">
                        <div
                          className="text-sm text-gray-900 cursor-pointer"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <TbCircleX className=" text-red-500 w-5 h-5" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className=" flex  flex-col justify-center items-center mt-10 py-10">
              <h1>No items in the cart</h1>
              <p>Add some items to get started!</p>
            </div>
          )}

          <div className="absolute bottom-16 left-3 right-3">
            <div className="flex justify-between items-center px-3 py-2 bg-gray-200 rounded-lg ">
              <Button
                label="Clear"
                className="bg-gray-500"
                handleButtonclick={() => dispatch(clearCart())}
              />
              <div className="space-x-2">
                <span className="font-semibold">Total:</span>
                <span>₹{(totalAmount && totalAmount) ?? 0}</span>
              </div>
            </div>
            {isAuthenticated ? (
              <button
                className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
                disabled:bg-blue-300 disabled:cursor-auto"
                onClick={() => handleCheckout()}
                disabled={isSubmitting || !cartItems.length ? true : false}
              >
                Checkout
              </button>
            ) : (
              <button
                onClick={() => navigate("/user/auth/login?redirectPath=menu")}
                className="w-full mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
