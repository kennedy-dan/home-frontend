import React, { useState, useEffect, useLayoutEffect } from "react";
import productCatsImg from "../assets/product-img-5.png";
import { motion, useAnimation } from "framer-motion";
import { getCategory } from "../store/slice/assetSlice";
import { getProducts } from "../store/slice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

import "./ProductItems.css";
import ProductItemSlug from "./ProductItemSlug";
const ProductItems = ({ getProduct, products, setProducts, status }) => {
  const [isHovered, setIsHovered] = useState(0);
  const [cartHovered, cartIsHovered] = useState(0);
  const { getProductSlug } = useSelector((state) => state.products);

  const rod = getProductSlug;



  const dispatch = useDispatch();

  const [first, setfirst] = useState("");

  function handleMouseEnter(id) {
    // const hoveridID = image.find(ids => ids.id ===id)

    setIsHovered(id);

    // }else {
    // console.log('none')
    // }
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  const handleMouseCartEnter = (id) => {
    cartIsHovered(id);
    setIsHovered(false);
  };
  const handleMouseCartLeave = () => {
    cartIsHovered(false);
  };


  // console.log(getProductSlug)

  return (
    <>
      {/* {rod?.status === "successful" ? ( */}
      <ProductItemSlug
        products={products}
        getProduct={getProduct}
        first={first}
        setfirst={setfirst}
        motion={motion}
        setProducts={setProducts}
      />
      {/* ) : ( */}
      {/* "" */}
      {/* )} */}
    </>
  );
};

export default ProductItems;
