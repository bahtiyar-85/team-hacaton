import React from 'react';
import AdminPage from './components/AdminPage/AdminPage';
import Header from './components/Header/Header';
import ProductsContextProvider from './contexts/productsContext';

const App = () => {
  return (
    <div>
      <ProductsContextProvider>
        <Header/>
        <AdminPage/>
      </ProductsContextProvider>
    </div>
  );
};

export default App;