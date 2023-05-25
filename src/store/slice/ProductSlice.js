import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

export const createProduct = createAsyncThunk("/product", async (products) => {
  const response = await axios.post("/product/create", products);

  return response.data.data;
});

export const getProducts = createAsyncThunk("/getProduct", async () => {
  const response = await axios.get("/product/get");
  console.log(response);
  return response.data;
});

export const getProductsBySlug = createAsyncThunk(
  "/getProductBySlug",
  async (slug) => {
    const response = await axios.get(`/product/get/${slug}`);

    return response.data;
  }
);

export const getProductsById = createAsyncThunk(
  "/getProductsById",
  async (_id) => {
    const response = await axios.get(`/products/get/${_id}`);

    return response.data;
  }
);

export const addReview = createAsyncThunk("/addReview", async (reviews) => {
  const response = await axios.put(`/product/reviews`, reviews);

  return response.data;
});

const initialState = {
  status: "idle",
  results: null,
  products: {
    status: "idle",
    result: null,
  },
  getProduct: {
    status: "idle",
    result: null,
  },
  getProductSlug: {
    status: "idle",
    result: null,
  },
  getProductById: {
    status: "idle",
    result: null,
  },
  addRev: {
    status: "idle",
    result: null,
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // builder;
    //CREATE PRODUCT SLICE
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.products.status = "successful";
        state.products.result = payload;
      });

    builder
      .addCase(getProducts.pending, (state) => {
        state.getProduct.status = "loading";
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.status = "successful";
        state.getProduct.status = "successful";
        state.getProduct.result = payload;
      });
    builder
      .addCase(getProductsBySlug.pending, (state) => {
        state.getProductSlug.status = "loading";
        state.status = "loading";
      })
      .addCase(getProductsBySlug.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.status = "successful";
        state.getProductSlug.status = "successful";
        state.getProductSlug.result = payload;
      });
    builder
      .addCase(getProductsById.pending, (state) => {
        state.getProductById.status = "loading";
        state.status = "loading";
      })
      .addCase(getProductsById.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.status = "successful";
        state.getProductById.status = "successful";
        state.getProductById.result = payload;
      });
    builder
      .addCase(addReview.pending, (state) => {
        state.addRev.status = "loading";
      })
      .addCase(addReview.fulfilled, (state, { payload }) => {
        state.addRev.status = "successful";
        state.addRev.result = payload;
      });
  },
});

export default productSlice.reducer;
