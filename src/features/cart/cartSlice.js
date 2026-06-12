import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
  },
  reducers: {
    addToCart: (state, action) => {
      // Expects item in payload: { id, name, price, image, selectedSize, color }
      const newItem = action.payload;
      const size = newItem.selectedSize || "M"; // Default to M if not provided
      
      // Look for item with same id AND same size
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id && item.selectedSize === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...newItem,
          selectedSize: size,
          quantity: 1
        });
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeFromCart: (state, action) => {
      // Expects payload: { id, selectedSize }
      const { id, selectedSize } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      );
      cartSlice.caseReducers.calculateTotal(state);
    },
    increaseQuantity: (state, action) => {
      // Expects payload: { id, selectedSize }
      const { id, selectedSize } = action.payload;
      const item = state.cartItems.find(
        (item) => item.id === id && item.selectedSize === selectedSize
      );
      if (item) {
        item.quantity += 1;
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    decreaseQuantity: (state, action) => {
      // Expects payload: { id, selectedSize }
      const { id, selectedSize } = action.payload;
      const item = state.cartItems.find(
        (item) => item.id === id && item.selectedSize === selectedSize
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove from cart if quantity falls to 0
          state.cartItems = state.cartItems.filter(
            (item) => !(item.id === id && item.selectedSize === selectedSize)
          );
        }
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    calculateTotal: (state) => {
      const { total, qty } = state.cartItems.reduce(
        (acc, item) => {
          acc.total += item.price * item.quantity;
          acc.qty += item.quantity;
          return acc;
        },
        { total: 0, qty: 0 }
      );
      state.totalAmount = total;
      state.totalQuantity = qty;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  calculateTotal
} = cartSlice.actions;

export default cartSlice.reducer;
