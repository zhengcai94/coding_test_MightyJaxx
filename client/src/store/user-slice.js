import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createProduct, deleteProduct, getProducts, editProduct } from "./product-slice";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null, // to get back user object
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
};

export const setupUser = createAsyncThunk(
  "user/setupUser",
  async ({ currentUser, endPoint, alertText }, thunkAPI) => {
    try {
      console.log(thunkAPI);
      const response = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = response.data;
      return { user, token, location, alertText };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (currentUser, thunkAPI) => {
    try {
      const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      console.log(data);
      const { user, token, location } = data;
      return { user, token, location };
    } catch (error) {
      // console.log(error.response);
      if(error.response.status === 401){
        thunkAPI.dispatch(logoutUser());
      }else {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    displayAlert: (state) => {
      state.showAlert = true;
      state.alertText = "Please provide all values!";
      state.alertType = "danger";
    },
    clearAlert: (state) => {
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    logoutUser: (state) => {
      state.isLoading = false;
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
      state.user = null;
      state.token = null;
      state.jobLocation = "";
      state.userLocation = "";
      state.showSidebar = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("location");
    },
  },
  extraReducers: {
    [setupUser.pending]: (state) => {
      state.isLoading = true;
    },
    [setupUser.fulfilled]: (state, { payload }) => {
      const { user, location, token, alertText } = payload;
      state.isLoading = false;
      state.token = payload.token;
      state.user = payload.user;
      state.userLocation = payload.location;
      state.jobLocation = payload.location;
      state.showAlert = true;
      state.alertType = "success";
      state.alertText = alertText;
      localStorage.setItem("user", JSON.stringify(user)); //convert user object to string as we can only store string in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("location", location);
    },
    [setupUser.rejected]: (state, { payload }) => {
      // console.log(payload);
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user, location, token } = payload;
      state.isLoading = false;
      state.token = payload.token;
      state.user = payload.user;
      state.userLocation = payload.location;
      state.jobLocation = payload.location;
      state.showAlert = true;
      state.alertType = 'success';
      state.alertText = 'User Profile Updated!';
      localStorage.setItem("user", JSON.stringify(user)); //convert user object to string as we can only store string in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("location", location);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload;
    },
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = 'success';
      state.alertText = 'New Job Created!';
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = "danger";
      state.alertText = payload;
    },
    [getProducts.pending]: (state) => {
      state.isLoading = true;
      state.showAlert = false;
    },
    [getProducts.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [editProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [editProduct.fulfilled]: (state) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = 'success';
      state.alertText = 'Job Updated'
    },
    [editProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertType = 'danger';
      state.alertText = payload
    },
  },
});

export const { displayAlert, clearAlert, toggleSidebar, logoutUser } =
  userSlice.actions;

export default userSlice.reducer;
