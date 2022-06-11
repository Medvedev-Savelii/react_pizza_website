import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
	id: string,
	title:string,
	type:string,
	imageUrl:string,
	price:number,
	count: number,
	size:number,
}


interface CartSliceState { 
	totalPrice: number, 
	items: CartItem[],
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
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

export const selectCart = (state:RootState) => state.cart;

export const selectCartItemById = (id: string) => (state:RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
