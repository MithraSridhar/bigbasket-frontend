import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartItems: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    //action - show loading
    showLoading: (state) => {
      state.loading = true;
      console.log(state.loading);
    },
    //action - hide loading
    hideLoading: (state) => {
      state.loading = false;
      console.log(state.loading);
    },
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
  },
});

export const { showLoading, hideLoading, addToCart } = itemSlice.actions;
export default itemSlice.reducer;
