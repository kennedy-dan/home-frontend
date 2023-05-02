import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

export const _SignUp = createAsyncThunk("/signup", async (data) => {
  const response = await axios.post(`/signup`, data);

  return response.data;
});

export const _Login = createAsyncThunk("/signin", async (data) => {
  const response = await axios.post(`/signin`, data);

  return response.data;
});

const initialState = {
  user: null,
  token: null,
  loading: false,
  status: "idle",
  loggedin: {
    status: 'idle'
  }
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
      state.loggedin.status = "idle"

		}
  },
  extraReducers: (builder) => {
    builder
      .addCase(_Login.pending, (state) => {
        state.loading = true;
        state.loggedin.status = "loading"

      })
      .addCase(_Login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(_Login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loggedin.status = "successful"
        console.log(payload)
        const { user } = payload;

        state.token = payload.token;
        state.user = user;
        state.contributorData = user.contributor_data;
        state.modalDisplay = false;
      });

      builder
			.addCase(_SignUp.pending, (state) => {
				state.loading = true;
			})
			.addCase(_SignUp.rejected, (state) => {
				state.loading = false;
			})
			.addCase(_SignUp.fulfilled, (state, { payload }) => {
        console.log(payload)

				state.loading = false;

				// state.user = payload.data.data;
				toast.success(payload.user);
			});

  },
});

export const { logOutCustomer } =
	authSlice.actions;

export default authSlice.reducer;
