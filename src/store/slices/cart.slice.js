import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig.js';

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: [],
    reducers: {
    setCart: (state, action) => action.payload,
    deleteItem: (state, actions) => state.filter(product => product.id !== actions.payload)
    
}})

console.log(getConfig());

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true));
     axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
    .then(res => {dispatch(setCart(res.data.data.cart.products))})
    .finally(() => dispatch(setIsLoading(false)));
}

export const postCartThunk = cartItem => dispatch => {
    dispatch(setIsLoading(true));
     axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cartItem, getConfig())
    .then(() => dispatch(getCartThunk()))
    .catch(error => console.log(error))
    .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartItemThunk = id => dispatch => {
    dispatch(setIsLoading(true));
     axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
    .then(() => {dispatch(deleteItem(id))})
    .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCartCheckoutThunk = () => dispatch => {
    dispatch(setIsLoading(true));
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
    .then(() => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;