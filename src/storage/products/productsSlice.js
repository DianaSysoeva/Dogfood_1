import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'
import { isLiked } from '../../utils/product';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async function (_, { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }) {
		try {
			const { user } = getState();
			const data = await api.getProductList();
			return fulfillWithValue({ ...data, currentUser: user.data });

		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error)
		}

	}

)

export const fetchChangeLikeProduct = createAsyncThunk(
	'products/fetchChangeLikeProduct',
	async function (
		product,
		{ rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }) {
		try {
			const { user } = getState();
			const liked = isLiked(product.likes, user.data._id)
			const data = await api.changeLikeProduct(product._id, liked);
			return fulfillWithValue({ product: data, liked });

		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error)
		}

	}

)

// const liked = isLiked(product.likes, currentUser._id)
// return api.changeLikeProduct(product._id, liked)
//   .then((updateCard) => {
// 	 const newProducts = cards.map(cardState => {
// 		return cardState._id === updateCard._id ? updateCard : cardState;
// 	 })
// 	 if (!liked) {
// 		setFavorites(prevState => [...prevState, updateCard])
// 	 } else {
// 		setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
// 	 }

// 	 setCards(newProducts);
// 	 return updateCard;
//   })
// }, [currentUser, cards])

const initialState = {
	data: [],
	total: null,
	favoriteProducts: [],
	loading: true,
	error: null
}

const productsSlice = createSlice({
	name: "products",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.loading = true;
			state.error = null;
		})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				const { products, total, currentUser } = action.payload
				state.data = products;
				state.favoriteProducts = products.filter(item => isLiked(item.likes, currentUser._id));
				state.total = total;
				state.loading = false;
			})
			.addCase(fetchChangeLikeProduct.fulfilled, (state, action) => {
				const {liked, product} =  action.payload;
				state.data = state.data.map(cardState => {
				return cardState._id === product._id ? product : cardState;
				})
				if (!liked) {
					state.favoriteProducts.push(product);
				} else {
					state.favoriteProducts = state.favoriteProducts.filter(card => card._id !== product._id)
				
				}

			})

			.addMatcher(isError, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})

	}
})

function isError(action) {
	return action.type.endsWith('rejected');
}
export default productsSlice.reducer;