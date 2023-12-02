import { createSlice } from "@reduxjs/toolkit";
import { getMyPurchases } from "../Actions/Index"

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: []
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyPurchases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyPurchases.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getMyPurchases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

const ordersReducer = ordersSlice.reducer
export default ordersReducer

