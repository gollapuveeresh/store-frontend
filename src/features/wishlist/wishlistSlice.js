import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: []
  },
  reducers: {
    addToWishlist: (state, action) => {
      // Expects item in payload
      const item = action.payload;
      const exists = state.wishlistItems.find((wItem) => wItem.id === item.id);
      if (!exists) {
        state.wishlistItems.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      // Expects id in payload
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter((wItem) => wItem.id !== id);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
