import { configureStore } from "@reduxjs/toolkit";
import api from "../utils/api";
import productsReducer from './products/productsSlice';
import singleProductReducer from './singleProduct/singleProductSlice';
import userSlice from "./user/userSlice";

const store = configureStore({
	reducer: {
		products: productsReducer,
		user: userSlice,
		singleProduct: singleProductReducer
	},
   middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
         thunk: { 
				extraArgument: api,
            }
      })

})


export default store;