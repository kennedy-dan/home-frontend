import React, { useState, useEffect } from "react";
import Slider from "./components/UI/Slider";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/UI/Header";
import { useInView } from "react-intersection-observer";
import Footer from "./components/UI/Footer";
import ShopGrid from "./components/ShopGrid";
import ProductDescription from "./components/ProductDescription";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Try from "./components/Try";
import { persistor, store } from "../src/store/index";
import { Provider } from "react-redux";
import Login from "./components/Login";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleBlog from "./components/SingleBlog";
import Blog from "./components/Blog";

function App() {
  return (
    <div className="font-[poppins] tracking-wider">
      <Provider store={store}>
      <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          pauseOnFocusLoss={false}
          transition={Zoom}
        />
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />

          <Route element={<ShopGrid />} path="/category-list" />
          <Route element={<ProductDescription />} path="/shop" />
          <Route element={<ProductDescription />} path="/shop/:slug" />
          <Route element={<ProductDetail />} path="/product/:_id" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<Checkout />} path="/checkout" />
          <Route element={<Try />} path="/try" />
          <Route element={<SingleBlog />} path='/blog/:slug' />
          <Route element={<Blog />} path='/blog' />
        </Routes>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
