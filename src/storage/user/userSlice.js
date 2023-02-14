import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/api'
import { SORTED } from '../../utils/constants';
import { isLiked } from '../../utils/product';
import { isError } from '../../utils/store';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async function (_, { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }) {
		try {
			const data = await api.getUserInfo();
			return fulfillWithValue(data);

		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error)
		}

	}
);
export const userAuthenticate = createAsyncThunk(
	'user/userAuthenticate',
	async function (dataAuth, { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }) {
		try {
			const data = await api.authorize(dataAuth);
			if (data.token) {
				localStorage.setItem('jwt', data.token)
			} else {
				return rejectWithValue(data)
			}
			return fulfillWithValue(data);

		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error)
		}

	}
);
export const userRegister = createAsyncThunk(
	'user/userRegister',
	async function (dataRegister, { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }) {
		try {
			const data = await api.register(dataRegister);
			return fulfillWithValue(data);

		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error)
		}

	}
);
export const userTokenCheck = createAsyncThunk(
	'user/userTokenCheck',
	async function (token, { rejectWithValue, fulfillWithValue, dispatch, getState, extra: api }) {
		try {
			const data = await api.checkToken(token);
			dispatch(authCheck())
			return fulfillWithValue(data);

		} catch (error) {
			localStorage.clear();
			return rejectWithValue(error);
		} finally {
		dispatch(authCheck())
		}

	}
);



const initialState = {
	isAuthChecked: false,
	data: null,
	userErrors: null,
	getUserRequest: true,
	loginUserRequest: false,
	registerUserRequest: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		authCheck: (state) => {
		state.isAuthChecked = true;
		},
		
		logout: (state) => {
		state.data= null;
		localStorage.removeItem('jwt')
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.getUserRequest = true;
				state.userErrors = null;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.data = action.payload;
				state.getUserRequest = false;
			})

			.addCase(userAuthenticate.pending, (state) => {
				state.loginUserRequest = true;
				state.userErrors = null;
			})
			.addCase(userAuthenticate.fulfilled, (state, action) => {
				state.data = action.payload.data;
				state.loginUserRequest = false;
				
			})

			.addCase(userRegister.pending, (state) => {
				state.registerUserRequest = true;
				state.userErrors = null;
			})
			.addCase(userRegister.fulfilled, (state, action) => {
				state.data = action.payload;
				state.registerUserRequest = false;
			})

			.addCase(userTokenCheck.pending, (state) => {
				state.getUserRequest = true;
				state.userErrors = null;
			})
			.addCase(userTokenCheck.fulfilled, (state, action) => {
				state.data = action.payload;
				state.getUserRequest = false;
			})
			.addMatcher(isError, (state, action) => {
				state.userErrors = action.payload;
				state.getUserRequest = false;
				state.loginUserRequest = false;
				state.registerUserRequest = false;
			});

	},
});

export const {authCheck, logout} = userSlice.actions;

export default userSlice.reducer;