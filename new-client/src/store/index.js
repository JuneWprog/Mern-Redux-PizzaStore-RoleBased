import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import cartReducer from "./slices/cart-slice";
import orderReducer from "./slices/order-slice";


const store = configureStore({
  reducer: {
   
    user: userReducer,
    cart: cartReducer,
    order: orderReducer
    
  },
});

export default store;