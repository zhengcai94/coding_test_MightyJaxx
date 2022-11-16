import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearAlert, logoutUser } from "./user-slice";

// const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isEditing: false,
  editProductId: "",
  title: "",
  SKU: "",
  image: "",
  productLocation: userLocation || "",
  productType: "other",
  products: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  search: "",
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (_, thunkAPI) => {
    const { title, SKU, image, productLocation, productType } =
      thunkAPI.getState().product;
    try {
      await axios.post(
        "/api/v1/products",
        { title, SKU, image, productLocation, productType },
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.token}`,
          },
        }
      );
    } catch (error) {
      if (error.response.status === 401) {
        return;
        //   thunkAPI.dispatch(logoutUser());
      } else {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    //will add page later
    const { search, page } = thunkAPI.getState().product;
    let url = `products?page=${page}&`;
    if (search) {
      url = url + `search=${search}`;
    }
    try {
      const { data } = await axios.get(`/api/v1/${url}`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      const { products, totalProducts, numOfPages } = data;
      return { products, totalProducts, numOfPages };
    } catch (error) {
      if (error.response.status === 401) {
          thunkAPI.dispatch(logoutUser());
        return;
      } else {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (_, thunkAPI) => {
    let url = `products/${thunkAPI.getState().product.editProductId}`;
    try {
      const { title, SKU, image, productLocation, productType } =
        thunkAPI.getState().product;
      await axios.patch(
        `/api/v1/${url}`,
        { title, SKU, image, productLocation, productType },
        {
          headers: {
            Authorization: `Bearer ${thunkAPI.getState().user.token}`,
          },
        }
      );
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
      } else {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    let url = `products/${productId}`;
    try {
      await axios.delete(`/api/v1/${url}`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      thunkAPI.dispatch(getProducts());
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
      } else {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      state[payload.name] = payload.value;
      state.page = 1;
    },
    clearValues: (state) => {
      state.isEditing = false;
      state.editProductId = "";
      state.title = "";
      state.SKU = "";
      state.image = "";
      state.productLocation = userLocation || "";
      state.productType = "other";
    },
    setEditProduct: (state, { payload }) => {
      const job = state.products.find((product) => product._id === payload);
      const { _id, title, SKU, image, productLocation, productType } = job;
      state.isEditing = true;
      state.editProductId = _id;
      state.title = title;
      state.image = image;
      state.SKU = SKU;
      state.productLocation = productLocation;
      state.productType = productType;
    },
    clearFilters: (state) => {
      state.search = "";
    },
    changePage: (state, { payload }) => {
        state.page = payload;
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.totalProducts = payload.totalProducts;
      state.numOfPages = payload.numOfPages;
    },
  },
});

export const {
  handleChange,
  clearValues,
  setEditProduct,
  clearFilters,
  changePage,
} = productSlice.actions;

export default productSlice.reducer;
