import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsThunk } from './store/slices/products.slice';
import { getCotegoriesThunk } from './store/slices/categories.slice';
import { Home } from './pages/Home';
import { Loader } from './components/Loader';
import { Product } from './pages/Product';
import { Login } from './pages/Login';
import { CartSidebar } from './components/CartSidebar';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Purchases } from './pages/Purchases';
import { User } from './pages/User';


function App() {

  const isLoading = useSelector(state => state.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getProductsThunk());
    dispatch(getCotegoriesThunk());

  }, []);

  return (
      <>
        {isLoading && <Loader/>}
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/login/" element={<Login/>}/>
            <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases/>} />
              <Route path="/user/" element={<User/>}/>
            </Route>
          </Routes>
        </HashRouter>
      </>
  )
}

export default App