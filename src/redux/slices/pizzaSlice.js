import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzas',
	async params => {
		const { category, sortBy, order, search, currentPage } = params
		const { data } = await axios.get(
			`https://65e430913070132b3b24590e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItem(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzas.pending, state => {
				state.status = 'loading'
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.status = 'success'
				state.items = action.payload
			})
			.addCase(fetchPizzas.rejected, state => {
				state.status = 'error'
				state.items = []
			})
	},
})
export const selectPizzaData = state => state.pizza


export const { setItem } = pizzaSlice.actions

export default pizzaSlice.reducer
