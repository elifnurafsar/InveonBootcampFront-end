import { createSlice } from "@reduxjs/toolkit";
import { getMyBasket, addToMyBasket, removeFromMyBasket, checkout } from "../Actions/Index"


const shoppingcartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [],
        error: "p"
        //single: ProductData[0],  // her bir ürün temsil eder
    },
    reducers: {
        AddToCart: (state, action) => {
            
        },

        updateCart: (state, action) => {
            
        },

        removeCart: (state, action) => {
           
        },

        //sepeti comple silmek için
        clearCart: (state) => {
            state.carts = []
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyBasket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.carts = action.payload;
            })
            .addCase(getMyBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToMyBasket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToMyBasket.fulfilled, (state, action) => {
                state.loading = false;
                //state.carts = action.payload;
                //console.log("Fullfilled: ", state.carts);
            })
            .addCase(addToMyBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeFromMyBasket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromMyBasket.fulfilled, (state, action) => {
                state.loading = false;
                state.carts = state.carts.filter(
                    (cart) => cart.cartDetailsId !== action.meta.arg.cartDetailsId
                );
            })
            .addCase(removeFromMyBasket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(checkout.pending, (state) => {
                state.loading = true;
                state.error = "p";
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "false";
            })
            .addCase(checkout.rejected, (state, action) => {
                state.loading = false;
                state.error = "rejected";
            });
    },
})

const shoppingcartReducer = shoppingcartSlice.reducer
export default shoppingcartReducer

