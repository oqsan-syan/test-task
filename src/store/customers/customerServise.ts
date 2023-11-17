import axios from "axios";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";

import { AddedCustomer, Customer, UpdateCustomer } from "types/customer";

export const fetchInitialCustomers: AsyncThunk<Customer[], void, {}> =
  createAsyncThunk("customers/fetchInitialCustomers", async () => {
    try {
      const response = await axios.get("/api/customers");
      return response.data;
    } catch (error) {
      throw error;
    }
  });

export const addNewCustomer = createAsyncThunk(
  "customers/addNewCustomer",
  async (newCustomer: AddedCustomer) => {
    try {
      const response = await axios.post("/api/customers", newCustomer);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async (updatedCustomer: UpdateCustomer) => {
    try {
      const response = await axios.put(
        `/api/customers/${updatedCustomer.id}`,
        updatedCustomer
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId: string) => {
    try {
      await axios.delete(`/api/customers/${customerId}`);
      return customerId;
    } catch (error) {
      throw error;
    }
  }
);
