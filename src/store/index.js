import { configureStore } from '@reduxjs/toolkit';
import isLoadingSlice from './slices/isLoading.slice';
import productsSlice from './slices/products.slice';
import categoriesSlice from './slices/categories.slice';
import productSlice from './slices/product.slice';
import cartSlice from './slices/cart.slice';
import purchasesSlice from './slices/purchases.slice';
export default configureStore({
    reducer: {
        isLoading: isLoadingSlice, 
        products: productsSlice,
        product: productSlice, 
        categories: categoriesSlice,
        cart: cartSlice,
        purchases: purchasesSlice
    }
})