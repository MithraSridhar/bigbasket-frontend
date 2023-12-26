import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../redux/ItemSlice"; //passing name as itemReducer for "itemSlice.reducer" from ItemSlice.js

export const store = configureStore({
    reducer:{
       itemShop: itemReducer
    }

})