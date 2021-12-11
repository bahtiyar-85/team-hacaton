import React from 'react';
import AdminPage from './components/AdminPage/AdminPage';
import ProductsContextProvider from './contexts/productsContext';

const App = () => {
  return (
    <div>
      <ProductsContextProvider>
        <h1>Hello</h1>
        <AdminPage/>
      </ProductsContextProvider>
    </div>
  );
};

export default App;