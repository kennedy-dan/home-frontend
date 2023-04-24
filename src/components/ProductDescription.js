import React, { useEffect, useState, useLayoutEffect } from "react";
import CategoriesNav from "./CategoriesNav";
import ProductItems from "./ProductItems";
import { getCategory } from "../store/slice/assetSlice";
import { getProducts } from "../store/slice/ProductSlice";
import { getProductsBySlug } from "../store/slice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
const ProductDescription = () => {
  const location = useLocation();
  const [products, setProducts] = useState();
  const { getProductSlug } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { getProduct, status } = useSelector((state) => state.products);
  const rod = getProduct;
  const _slugId = useParams();
  const _slug = _slugId.slug;
  useEffect(() => {
    dispatch(getCategory());
    if ((location.pathname === "/shop")) {
      dispatch(getProducts());
    }
  }, []);

  useEffect(() => {
    setProducts(rod);
  }, [getProduct]);

  return (
    <>
      <div className="bg-[#ecf2f8] py-9 mt-20">
        <div className="container mx-auto">
          <div className="mx-10 sm:mx-8 lg:mx-0 xl:mx-20">
            <p> Home{location.pathname}</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="lg:flex mx-10 sm:mx-8 lg:mx-0 xl:mx-20">
          <ProductItems
            rod={rod}
            getProduct={getProduct}
            setProducts={setProducts}
            status={status}
            products={products}
          />
          <CategoriesNav
            rod={rod}
            getProduct={getProduct}
            setProducts={setProducts}
            status={status}
            products={products}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
