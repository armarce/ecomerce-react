import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState: [],
    reducers: {
        setCategories: (state, actions) => state = actions.payload
    }
});

export const getCotegoriesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then((resp) => dispatch(setCategories(resp.data.data.categories)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;