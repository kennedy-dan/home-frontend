import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

export const addBilling = createAsyncThunk("/user/address", async (address) => {
  const response = await axios.post("/user/address", address);
  console.log(response)
  return response.data;
});

export const getBilling = createAsyncThunk("/user/getaddress", async () => {
  const response = await axios.get("/user/address");
  console.log(response.data);
  return response.data;
});

const initialState = {
  status: "idle",
  results: null,
  billing: {
    status: "idle",
    result: null,
  },
  getbilling: {
    status: "idle",
    result: null,
  },
};

export const billingSlice = createSlice({
  name: "carts",
  initialState,
  extraReducers: (builder) => {
    // builder;
    //CREATE PRODUCT SLICE
    builder
      .addCase(addBilling.pending, (state) => {
        state.billing.status = "loading";
      })
      .addCase(addBilling.fulfilled, (state, { payload }) => {
        // if (!payload) return;
        console.log(payload)
        state.billing.status = "successful";
        state.billing.result = payload;
        toast.success(payload.message)
      });

    builder
      .addCase(getBilling.pending, (state) => {
        state.getbilling.status = "loading";
      })
      .addCase(getBilling.fulfilled, (state, { payload }) => {
        console.log(payload);
        if (!payload) return;
        state.getbilling.status = "successful";
        state.getbilling.result = payload;
      });
  },
});

export default billingSlice.reducer;
