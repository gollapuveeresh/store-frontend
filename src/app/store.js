import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production' // Enable devTools automatically
});

export default store;
