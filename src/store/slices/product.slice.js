import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: [],
    reducers: {
        setProduct: (state, actions) => state = actions.payload,
    }
})

export const getProductThunk = id => (dispatch) => {
    
    dispatch(setIsLoading(true));
    axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
    .then(res => dispatch(setProduct(res.data.data.product)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;