import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import logReducer from './userLogSlice'
const AppStore = configureStore({
    reducer: {
        cart: cartReducer,

        userlog: logReducer,
    },
});
export default AppStore;