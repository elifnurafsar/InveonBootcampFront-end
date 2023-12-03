import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import { getAllProducts, getProductByID, getProductsByCategory, getUserFavorites, toggleFavorite, deleteAllFavorites, addProduct } from "../Actions/Index"


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: ProductData,
        snacks: [],
        seasonal: [],
        desserts: [],
        italian: [],
        healthy: [],
        gluten_free: [],
        carts: [],
        favorites: [],
        single: ProductData[0],  // her bir ürün temsil eder
    },
    reducers: {
        AddToCart: (state, action) => {
            
        },

        getProductById: (state, action) => {
           
        },

        updateCart: (state, action) => {
            
        },

        removeCart: (state, action) => {
           
        },

        //sepeti comple silmek için
        clearCart: (state) => {
            state.carts = []
        },

        addToFavorites: (state, action) => {
            
        },
        
        removeToFav: (state, action) => {
            
        },
        //favorileri temizle
        clearFav: (state) => {
            state.favorites = [] // state içindeki favori arrayını temizlemiş oluyor 
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
                //console.log("*NULL STATE GET ALL*");
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.result;
                //console.log("Fullfilled: ", state.products);
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                //console.log("*", state.error);
            })
            .addCase(getProductByID.pending, (state) => {
                state.loading = true;
                state.error = null;
                //console.log("*NULL STATE GET BY ID*");
            })
            .addCase(getProductByID.fulfilled, (state, action) => {
                state.loading = false;
                state.single = action.payload.result;
            })
            .addCase(getProductByID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                //console.log("*", state.error);
            })
            .addCase(getProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                //console.log("*NULL STATE GET BY CATEGORY*");
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;

                const categoryName = action.payload.categoryName;

                // Check the category and update the corresponding array in the state
                const _products = action.payload._products.result;
        
                switch (categoryName) {
                    case 'snack':
                        state.snacks = _products;
                        break;
                    case 'dessert':
                        state.desserts = _products;
                        break;
                    case 'italian':
                        state.italian = _products;
                        break;
                    case 'gluten_free':
                        state.gluten_free = _products;
                        break;
                    case 'healthy':
                        state.healthy = _products;
                        break;
                    case 'seasonal':
                        state.seasonal = _products;
                        break;
                    default:
                        state.products = _products;
                        break;
                }
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log("*", state.error);
            })
            .addCase(getUserFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFavorites.fulfilled, (state, action) => {
                //console.log("Inside the getUserFavorites reducer ");
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(getUserFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(toggleFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.loading = false;
                if(action.meta.arg._action == 'remove'){
                    state.favorites = state.favorites.filter(
                        (favoriteItem) => favoriteItem.productId !== action.meta.arg.productId
                    );
                }
                else if(action.meta.arg._action == 'add'){
                    
                }
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAllFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAllFavorites.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Action: ", action);
                state.favorites = [];
                
            })
            .addCase(deleteAllFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                console.log("full");
                
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

const productsReducer = productsSlice.reducer
export default productsReducer

