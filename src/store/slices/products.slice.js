import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: [],
    reducers: {
        setProducts: (state, actions) => state = actions.payload,
        searchProducts: (state, actions) => {

            return state.filter(product => product.title.toLowerCase().includes(actions.payload.toLowerCase()));

        }
    }
})

export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then(res => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const getProductsByCategoryIdThunk = id => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then(res => dispatch(setProducts(res.data.data.products.filter(product => product.category.id === id))))
    .finally(() => dispatch(setIsLoading(false)));
};

export const getProductsByPriceThunk = (start, end) => (dispatch) => {
    dispatch(setIsLoading(true));

    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then(res => dispatch(setProducts(res.data.data.products.filter(product => {

        return (Number(product.price) >= Number(start)) && (Number(product.price) <= Number(end))
    
    }))))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setProducts, searchProducts} = productsSlice.actions;

export default productsSlice.reducer;