import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

export const createCategory = createAsyncThunk("/category", async (data) => {
  //make number dynamic
  const response = await axios.post(`/category/create`, data);
  return response.data.data;
});

export const getCategory = createAsyncThunk("/getCategory", async () => {
  //make number dynamic
  const response = await axios.get(`/category/get`);
  return response.data;
});

const initialState = {
  status: "idle",
  results: null,
  category: {
    status: "idle",
    result: null,
  },
  getCategories: {
    status: "idle",
    result: null,
  },
};

export const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    frameImage: (state, { payload }) => {
      state.frameImg.assets = payload;
    },
  },
  extraReducers: (builder) => {
    // SINGLE ASSET
    // builder
    //SEARCH SLICE
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.status = "successful";
        state.category.result = payload;
      });
    builder
      .addCase(getCategory.pending, (state) => {
        state.getCategories.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, {payload }) => {
        console.log(payload)
        state.getCategories.status = "successful";
        state.getCategories.result = payload;
      });
  },
});
export const { frameImage, clearCheckout } = assetSlice.actions;
export default assetSlice.reducer;
