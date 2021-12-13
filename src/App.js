import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import Header from './components/Header/Header';
import ProductsContextProvider from './contexts/productsContext';
import Footer from './components/Footer/Footer'

import './App.css'
import Home from './components/Home/Home';
import AuthContextProvider from './contexts/authContext';
import Auth from './components/Auth/Auth';


const App = () => {
  return (
    <AuthContextProvider>
    <div>
      <ProductsContextProvider>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/admin' element={<AdminPage/>}/>
              <Route path='/auth' element={<Auth/>}/>
            </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
      </div>
      </AuthContextProvider>
  );
};

export default App;