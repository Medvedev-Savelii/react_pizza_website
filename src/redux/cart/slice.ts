import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import { CartItem, CartSliceState } from "./types";



const {items, totalPrice} = getCartFromLS();


const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItem: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});



export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
