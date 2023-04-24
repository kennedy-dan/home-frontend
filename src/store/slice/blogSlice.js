import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

export const getBlog = createAsyncThunk("/getblog", async (slug) => {
  const response = await axios.get(`/getblog/${slug}`);

  return response.data;
});

export const getBlogs = createAsyncThunk("/blogs", async () => {
  const response = await axios.get("/blog");
  console.log(response.data)
  return response.data;
});

const initialState = {
  status: "idle",
  results: null,
  blog: {
    status: "idle",
    result: null,
  },
  getblog: {
    status: "idle",
    result: null,
  },
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    // builder;
    //CREATE PRODUCT SLICE
    builder
      .addCase(getBlog.pending, (state) => {
        state.status = "loading";
        state.blog.status = "loading";
        state.blog.result = null;


      })
      .addCase(getBlog.fulfilled, (state, { payload }) => {
        // if (!payload) return;
        state.blog.status = "successful";
        state.blog.result = payload;
        toast.success("blog added");
      });

      builder
      .addCase(getBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogs.fulfilled, (state, { payload }) => {
        console.log(payload)
        if (!payload) return;
        state.getblog.status = "successful";
        state.getblog.result = payload;
      });
  },
});

export default blogSlice.reducer;
