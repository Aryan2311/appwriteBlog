import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authentication/authSlice";


export const store = configureStore({
    reducer:{
        auth:authSlice ,
    }
})