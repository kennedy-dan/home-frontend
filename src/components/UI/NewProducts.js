import React, { useState, useEffect } from "react";
import product1 from "../../assets/product-imgg-4.png";
import product2 from "../../assets/product-img-5.png";
import product3 from "../../assets/product-img-6.png";
import vids from "../../assets/vids.mp4";
import h1 from "../../assets/h1-img-1.png";
import h2 from "../../assets/h1-img-2.png";
import h3 from "../../assets/h1-img-7.png";
import h4 from "../../assets/h1-img-8.png";
import h5 from "../../assets/h1-img-12.png";
import h6 from "../../assets/h1-img-10.png";
import "./NewProduts.css";
import "aos/dist/aos.css";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../store/slice/ProductSlice";
import { Link } from "react-router-dom";

import Aos from "aos";
import {
  AiFillPlayCircle,
  AiOutlineClose,
  AiOutlineDollarCircle,
  AiOutlineShopping,
} from "react-icons/ai";
import { MdKeyboardArrowRight, MdPayment } from "react-icons/md";

import { BiTime } from "react-icons/bi";


const NewProducts = ({ getProduct }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const playVid = () => {
    setIsOpen(true);
  };
  const { getProductSlug } = useSelector((state) => state.products);
  console.log(getProduct)
  const { ref, inView } = useInView({
    threshold: 0,
  });

  console.log(ref);

  const closeVid = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="absolut  h-full w-full md:mt-[80px] mt-[60px]">
      <p className="text-center text-3xl font-semibold tracking-wider">
        New Products
      </p>
      <div className="flex justify-center">
        <p className="text-center mt-5 text-gray-600 text-base md:w-1/2 md-w-full">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
          consequat. Duis aute irure dolor in reprehenderit.
        </p>
      </div>
      <div className="w-full my-20">
        <div className="md:flex lg:mx-20 md:mx-0 mx-20 justify-around">
          <Link to={`/product/${getProduct?.result?.products[0]._id}`}>
            <div className="  w-180 md:w-[250px] lg:w-[300px] xl:w-[360px] cursor-pointer">
              <div>
                <p className="text-sm font-semibold pt-2 ml-3">NEW</p>
                <motion.img
                  src={getProduct?.result?.products[0].images[0].url}
                  alt=""
                  className=" md:h-[300px] lg:h-[400px] hover:scale-105 duration-1000 object-cover"
                />
              </div>
            </div>
            <p className="text-center mt-5 font-semibold">
              {getProduct?.result?.products[0].name}
            </p>
            <p className="text-center mb-20">
              £{getProduct?.result?.products[0].price}
            </p>
          </Link>
          <Link to={`/product/${getProduct?.result?.products[1]._id}`}>
            <div className=" w-100 md:w-[250px] lg:w-[300px] xl:w-[360px] cursor-pointer">
              <div>
                <p className="text-sm font-semibold pt-2 ml-3">NEW</p>
                <img
                  src={getProduct?.result?.products[1].images[0].url}
                  alt=""
                  className="md:h-[300px] lg:h-[400px] transition ease-in-out delay-150 hover:scale-105 duration-1000 object-cover"
                />
              </div>
            </div>
            <p className="text-center mt-5  font-semibold">
              {getProduct?.result?.products[1].name}
            </p>
            <p className="text-center mb-20">
              £{getProduct?.result?.products[1].price}
            </p>
          </Link>
          <Link to={`/product/${getProduct?.result?.products[2]._id}`}>
            <div className=" w-180 md:w-[250px] lg:w-[300px] xl:w-[360px] cursor-pointer">
              <div>
                <p className="text-sm font-semibold pt-2 ml-3">NEW</p>
                <img
                  src={getProduct?.result?.products[2].images[0].url}
                  alt=""
                  className="md:h-[300px] lg:h-[400px] transition ease-in-out delay-150  hover:scale-105 hover:bg-transparent duration-1000 object-cover"
                />
              </div>
            </div>
            <p className="text-center mt-5 font-semibold ">
              {getProduct?.result?.products[2].name}
            </p>
            <p className="text-center mb-20">
              £{getProduct?.result?.products[2].price}
            </p>
          </Link>
        </div>
      </div>
      <div
        className={`flex justify-center items-center bg-fixed bg-cover bg-no-repeat bg-center h-[400px] w-full bg-[url('./assets/h1-parallax-img-1.jpg')]`}
      >
        <div>
          <p className="font-bold text-white text-center text-4xl">
            Upcoming collection
          </p>
          <p className="text-white text-center text-lg mt-10 sm:mx-0 mx-5">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo{" "}
            <br />
            consequat. Duis aute irure dolor in reprehenderit.
          </p>
          <div className="flex justify-center mt-6">
            <Link to="/category-list">
              <button className="py-3 px-7 hover:bg-black hover:border-black border-white border">
                <div className="flex justify-center items-center text-white">
                  <p className="text-gray pr-3">View more</p>
                  <MdKeyboardArrowRight className="" />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center items-center bg-fixed bg-cover bg-no-repeat bg-center h-[400px] w-full bg-[url('./assets/h1-parallax-img-2.jpg')]`}
      >
        <div>
          {isOpen === false ? (
            <AiFillPlayCircle
              className="text-white w-16 opacity-50 h-16 cursor-pointer"
              onClick={playVid}
            />
          ) : (
            <AiOutlineClose
              className="text-white w-10 h-10 cursor-pointer"
              onClick={closeVid}
            />
          )}

          <video
            src={vids}
            autoPlay={false}
            controls="controls"
            className={`w-60 h-60 ${isOpen === true ? "block" : "hidden"}`}
          />
        </div>
      </div>

      <div className="lg:flex items-center lg:mt-80 mt-60 justify-evenly h-60">
        <div className="xl:w-1/2">
          <p className="font-bold  text-center text-4xl">Stylish Chairs</p>
          <p className=" text-center text-lg mt-10 text-gray-500 sm:mx-0 mx-10">
            Ut enim ad minim veniam, quis nostrud exercitation <br /> ullamco
            ommodo consequat. Duis aute irure.
          </p>
          <div className="flex justify-center ">
            <Link to="/shop/Furniture">
              <button
                className="py-3 px-7 border-black border mt-4"
                onClick={() => dispatch(getProductsBySlug("Furniture"))}
              >
                <div className="flex justify-center items-center">
                  <p className="text-gray pr-3">View more</p>
                  <MdKeyboardArrowRight className="" />
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:mt-0 md:w mt-10 flex justify-center">
          <div
            ref={ref}
            className="flex bg-[#f7f5f6] md:mx-0 mx-10   md:w-[520px] h-[500px] lg:mr-5"
          >
            <motion.img
              whileInView={{ y: 10 }}
              initial={{ y: -40 }}
              transition={{ type: "tween", duration: 5 }}
              src={h1}
              alt="chair"
              className={`h-[270px] w-[270px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]  xl:h-[550px] xl:w-[550px] object-fit `}
            />

            <motion.img
              whileInView={{ y: 260 }}
              initial={{ y: 280 }}
              transition={{ type: "tween", duration: 5 }}
              src={h2}
              alt="chair"
              className={`h-[140px] w-[140px] md:h-[200px] md:w-[200px] lg:h-[200px] lg:w-[200px]  xl:h-[200px] xl:w-[200px]  object-fit`}
            />
          </div>
        </div>
      </div>

      <div className="lg:flex items-center mt-[700px] sm:mt-[900px] lg:mt-96 xl:mt-80 h-60  justify-evenly">
        <div className="lg:mt-0 mt-10 flex justify-center">
          <div className="flex bg-[#f7f5f6] mx-10 md:mx-0 h-[500px] w-[520px] lg:ml-5">
            <motion.img
              whileInView={{ y: 10 }}
              initial={{ y: -40 }}
              transition={{ type: "tween", duration: 5 }}
              src={h3}
              alt="chair"
              className={`h-[270px] w-[270px] md:h-[400px] md:h-[400px] lg:h-[500px] lg:w-[500px]  xl:h-[600px] xl:w-[600px] object-fit `}
            />

            <motion.img
              whileInView={{ y: 260 }}
              initial={{ y: 280 }}
              transition={{ type: "tween", duration: 5 }}
              src={h4}
              alt="chair"
              className={`h-[140px] w-[140px] md:h-[200px] md:h-[200px] lg:h-[200px] lg:w-[200px]  xl:h-[230px] xl:w-[230px]  object-fit`}
            />
          </div>
        </div>
        <div className="xl:w-1/2 mt-20 lg:mt-0">
          <p className="font-bold  text-center text-4xl">Contemporary lamps</p>
          <p className=" text-center text-lg mt-10 text-gray-500 sm:mx-0 mx-10">
            Ut enim ad minim veniam, quis nostrud exercitation <br /> ullamco
            ommodo consequat. Duis aute irure.
          </p>
          <div className="flex justify-center mt-4">
            <Link to="/shop/lamps">
              <button className="py-3 px-7 border-black border">
                <div className="flex justify-center items-center">
                  <p className="text-gray pr-3">View more</p>
                  <MdKeyboardArrowRight className="" />
                </div>
              </button>
            </Link>
          </div>
        </div>
        <></>
      </div>

      <div className="lg:flex items-center lg:mt-80 mt-[800px] justify-around h-60">
        <div className="xl:w-1/2">
          <p className="font-bold  text-center text-4xl">Stylish tea set</p>
          <p className=" text-center text-lg mt-10 text-gray-500 sm:mx-0 mx-10">
            Ut enim ad minim veniam, quis nostrud exercitation <br /> ullamco
            ommodo consequat. Duis aute irure.
          </p>
          <div className="flex justify-center mt-4">
            <Link to="/shop/Decoration">
              <button className="py-3 px-7 border-black border">
                <div className="flex justify-center items-center">
                  <p className="text-gray pr-3">View more</p>
                  <MdKeyboardArrowRight className="" />
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:mt-0 mt-10 flex justify-evenly">
          <div className="flex bg-[#f7f5f6] mx-10 md:mx-0 h-[500px] w-[520px] lg:mr-5">
            <motion.img
              whileInView={{ y: -20 }}
              initial={{ y: -90 }}
              transition={{ type: "tween", duration: 5 }}
              src={h5}
              alt="chair"
              className={`h-[270px] w-[270px]  md:h-[400px] lg:h-[500px] lg:w-[500px]  xl:h-[600px] xl:w-[600px] object-fit `}
            />

            <motion.img
              whileInView={{ y: 260 }}
              initial={{ y: 280 }}
              transition={{ type: "tween", duration: 5 }}
              src={h6}
              alt="chair"
              className={`h-[140px] w-[140px] md:h-[200px] md:h-[200px] lg:h-[200px] lg:w-[200px]  xl:h-[200px] xl:w-[200px]  object-fit`}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#ecf2f8] lg:mt-72 md:mt-[700px] mt-[600px] py-6">
        <div className="flex md:mx-32 mx-6 justify-between items-center ">
          <p className="font-bold md:text-3xl text-[12px]">
            Order now for an express delivery in 24h!
          </p>
          <button className="md:py-3 md:px-7 border-black border">
            <Link to='/checkout' className="flex justify-between items-center">
              <p className="text-gray pr-3 md:text-lg text-[8px]">View more</p>
              <MdKeyboardArrowRight className="" />
            </Link>
          </button>
        </div>
      </div>

      <div className=" md:mx-auto lg:mx-32 md:mx-20 mx-6 py-8  pt-20 grid md:grid-cols-4 ">
        <div className="">
          <div className="flex items-center">
            <AiOutlineShopping className="w-10 h-10" />
            <p className="ml-4 text-lg font-semibold">Shop online</p>
          </div>
          <p className="mt-5 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
        <div className="">
          <div className="flex items-center">
            <AiOutlineDollarCircle className="w-10 h-10" />
            <p className="ml-4 text-lg font-bold">Free shipping</p>
          </div>
          <p className="mt-5 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
        <div className="">
          <div className="flex items-center">
            <BiTime className="h-10 w-10" />
            <p className="ml-4 text-lg font-bold">Return policy</p>
          </div>
          <p className="mt-5 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
        <div className="">
          <div className="flex items-center">
            <MdPayment className="w-10 h-10" />
            <p className="ml-4 text-lg font-bold">Payment methods</p>
          </div>
          <p className="mt-5 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
