import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import Header from './components/Header/Header';
import ProductsContextProvider from './contexts/productsContext';

const App = () => {
  return (
    <div>
      <ProductsContextProvider>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path='/' element={<AdminPage/>}/>
            </Routes>
        </BrowserRouter>
      </ProductsContextProvider>
    </div>
  );
};

export default App;