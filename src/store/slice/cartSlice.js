import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

export const addToCart = createAsyncThunk(
  "/user/cart/addtoCart",
  async (carts) => {
    const response = await axios.post("/user/cart/addtoCart", carts);

    return response.data.data;
  }
);

export const getCarts = createAsyncThunk("/user/getCartItems", async () => {
  const response = await axios.get("/user/getCartItems");
  console.log(response.data);
  return response.data;
});

export const removeFromCart = createAsyncThunk(
  "/removeFromCart ",
  async (_id) => {
    const response = await axios.put(`/cart/${_id}`);
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  status: "idle",
  results: null,
  carts: {
    status: "idle",
    result: null,
  },
  getcart: {
    status: "idle",
    result: null,
  },
  removeCart: {
    status: "idle",
    result: null,
  },
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  extraReducers: (builder) => {
    // builder;
    //CREATE PRODUCT SLICE
    builder
      .addCase(addToCart.pending, (state) => {
        state.carts.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        // if (!payload) return;
        state.carts.status = "successful";
        state.carts.result = payload;
        toast.success("item added to cart");
      });

    builder
      .addCase(getCarts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCarts.fulfilled, (state, { payload }) => {
        console.log(payload);
        if (!payload) return;
        state.getcart.status = "successful";
        state.getcart.result = payload;
      });

      builder
      .addCase(removeFromCart.pending, (state) => {
        state.removeCart.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        console.log(payload);
        // if (!payload) return;
        state.removeCart.status = "successful";
        state.removeCart.result = payload;
        toast.success("item has been deleted ");
      });
  },

  
});

export default cartSlice.reducer;
