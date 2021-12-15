import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import Header from './components/Header/Header';
import ProductsContextProvider from './contexts/productsContext';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer'

import './App.css'
import Home from './components/Home/Home';
import AuthContextProvider, { useAuth } from './contexts/authContext';
import Auth from './components/Auth/Auth';
import CartContextProvider from './contexts/cartContext';
import ReactCreditCard from 'react-credit-cards';
import CreditCard from '../src/components/CreditCard/CreditCard';
import CreditApp from '../src/components/CreditCard/CreditApp';
import Price from './components/Price/Price';





const App = () => {
  return (
    <AuthContextProvider>
      <div className='container'>
        <CartContextProvider>
          <ProductsContextProvider>
            <BrowserRouter>
              <Header/>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/admin' element={<AdminPage/>}/>
                  <Route path='/auth' element={<Auth/>}/>
                  <Route path='/cart' element={<Cart/>}/>
                  <Route path='/credit' element={<CreditApp/>}/>
                  <Route path='/price' element={<Price/>}/>
                </Routes>
            </BrowserRouter>
          </ProductsContextProvider>
        </CartContextProvider>
      </div>
    </AuthContextProvider>
  );
};

export default App;