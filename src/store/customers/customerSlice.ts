import { createSlice } from "@reduxjs/toolkit";

import { Customer } from "types/customer";

import {
  addNewCustomer,
  fetchInitialCustomers,
  updateCustomer,
  deleteCustomer,
} from "./customerServise";

interface CustomersState {
  customers: Customer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CustomersState = {
  customers: [],
  status: "idle",
  error: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    resetCustomers: (state) => {
      state.customers = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialCustomers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchInitialCustomers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.customers = action.payload;
    });
    builder.addCase(fetchInitialCustomers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "An error occurred";
    });

    builder.addCase(addNewCustomer.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewCustomer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.customers.push(action.payload);
    });
    builder.addCase(addNewCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "An error occurred";
    });

    builder.addCase(deleteCustomer.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.customers = state.customers.filter((c) => c.id !== action.payload);
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "An error occurred";
    });

    builder
      .addCase(updateCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const updatedIndex = state.customers.findIndex(
          (c) => c.id === action.payload.id
        );

        if (updatedIndex !== -1) {
          state.customers[updatedIndex] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default customersSlice.reducer;
