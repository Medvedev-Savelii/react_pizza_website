import axios from "axios";
import { RootState } from "../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://629026d227f4ba1c65b49bdc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

type Pizza = {
	id: string,
	title:string,
	price:number,
	imageUrl:string,
	sizes:number[],
	types:number[],
}

interface PizzaSliceState {
	items: Pizza[],
	status: "Loading" | "Success" | "Error",
}


const initialState: PizzaSliceState = {
  items: [],
  status: "Loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "Loading";
      state.items = [];
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "Success";
    },

    [fetchPizzas.rejected]: (state) => {
      state.status = "Error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state:RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
