import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import shoppingcartReducer from "./slices/shoppingcart";
import ordersReducer from "./slices/orders";

export const store = configureStore ( {
    reducer : {
        products : productsReducer,
        user : userReducer,
        settings : settingsReducer,
        shoppingcart : shoppingcartReducer,
        orders : ordersReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for async actions
    })
})