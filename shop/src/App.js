import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Main from './pages/Main/MainPage';
import Categories from './pages/Categories/CategoriesPage'
import Products from './pages/Products/ProductsPage';

import { useDispatch, useSelector } from 'react-redux';
import SalesPage from './pages/All_sales/SalesPage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartPage from './pages/Cart/CartPage';
function App() {


  

    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/All" element={<Categories  />} />
          <Route path="/categories/:categoryId" element={<Categories  />} />

          <Route path="/all_products" element={<Products/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/all_sales" element={<SalesPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="*" element={<NotFoundPage />}/>
          {/* Добавьте другие маршруты по необходимости */}
        </Routes>
      
        <Footer />
      </div>
    );
  
}
export default App;
