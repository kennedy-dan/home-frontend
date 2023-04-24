import React, { useEffect } from "react";
import Slider from "./UI/Slider";
import NewProducts from "./UI/NewProducts";
import Blog from "./UI/Blog";
import Comments from "./UI/Comments";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/slice/ProductSlice";
const Home = ({ ref, inView }) => {
  const dispatch = useDispatch();
  const { getProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(inView);
  return (
    <>
      <Slider />

      <div className="">
        <NewProducts getProduct={getProduct} ref={ref} inView={inView} />
        <Blog />
        <Comments />
      </div>
    </>
  );
};

export default Home;
