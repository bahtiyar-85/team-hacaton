import React from 'react';
import AdminPage from './components/AdminPage/AdminPage';
import Header from './components/Header/Header';
import ProductsContextProvider from './contexts/productsContext';
import Footer from './components/Footer/Footer'

import './App.css'
import Home from './components/Home/Home';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <ProductsContextProvider>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/admin' element={<AdminPage/>}/>
            </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
      </div>
  );
};

export default App;