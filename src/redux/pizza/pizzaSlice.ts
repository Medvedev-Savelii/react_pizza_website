import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
  };


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
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

enum Status {
	LOADING = 'loading',
	SUCCESS = 'completed',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: Pizza[],
	status: Status,
}


const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
		state.status = Status.LOADING;
		state.items = [];
    });
	builder.addCase(fetchPizzas.fulfilled, (state, action) => {
		state.items = action.payload;
		state.status = Status.SUCCESS;
	});
	builder.addCase(fetchPizzas.rejected, (state, action) => {
		state.status = Status.ERROR;
        state.items = [];
	});
  },
});

export const selectPizzaData = (state:RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
