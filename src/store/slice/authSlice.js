import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";



export const _Login = createAsyncThunk("/signin", async (data) => {
  const response = await axios.post(`/signin`, data);

  return response.data;
});

const initialState = {
  user: null,
  token: null,
  loading: false,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
		logOutCustomer: (state) => {
			state.token = null;
			state.user = null;
			state.error = null;
			state.loading = false;
		}
  },
  extraReducers: (builder) => {
    builder
      .addCase(_Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(_Login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(_Login.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log(payload)
        const { user } = payload;

        state.token = payload.token;
        state.user = user;
        state.contributorData = user.contributor_data;
        state.modalDisplay = false;
      });
  },
});

export const { logOutCustomer } =
	authSlice.actions;

export default authSlice.reducer;
