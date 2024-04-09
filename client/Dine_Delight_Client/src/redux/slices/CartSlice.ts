import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartItemInterface {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartInterface {
  cart: CartItemInterface[];
}
const initialState: CartInterface = {
  cart: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemInterface>) => {
      const { _id } = action.payload;
      const isItemExists = state.cart.find((item) => item._id === _id);
      if (isItemExists) {
        isItemExists.quantity++;
      } else {
        state.cart.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        itemId: string;
        quantity: number;
        type: "increment" | "decrement";
      }>
    ) => {
      const { itemId, quantity, type } = action.payload;
      const item = state.cart.find((item) => item._id === itemId);
      if (item && quantity) {
        if (type === "increment") {
          item.quantity += quantity;
        } else {
          if (item.quantity <= 1) {
            const filteredItems = state.cart.filter(
              (item) => item._id !== itemId
            );
            state.cart = filteredItems;
          }
          item.quantity -= quantity;
        }
      }
    },
    removeItem: (state, action: PayloadAction<{ itemId: string }>) => {
      const { itemId } = action.payload;
      const filteredItems = state.cart.filter((item) => item._id !== itemId);
      state.cart = filteredItems;
    },
    clearCart: () => initialState,
  },
});
export const { addToCart, updateQuantity, removeItem, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
