import { configureStore } from '@reduxjs/toolkit';
import api from '../utils/api';
import productsReducer from './products/productsSlice';
import userReducer from './user/userSlice';
const store = configureStore({
	reducer: {
		products: productsReducer,
		user: userReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			}
		})
})

export default store;