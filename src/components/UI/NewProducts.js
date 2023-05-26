import React, { useState, useEffect } from "react";
import product1 from "../../assets/product-imgg-4.png";
import product2 from "../../assets/product-img-5.png";
import product3 from "../../assets/product-img-6.png";
import vids from "../../assets/vids.mp4";
import h1 from "../../assets/h1-img-1.png";
import h2 from "../../assets/h1-img-2.png";
import h3 from "../../assets/h1-img-7.png";
import h4 from "../../assets/h1-img-8.png";
import h5 from "../../assets/blackbottle.png";
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

import { addToCart, getCarts } from "../../store/slice/cartSlice";

import Aos from "aos";
import {
  AiFillPlayCircle,
  AiOutlineClose,
  AiOutlineDollarCircle,
  AiOutlineShopping,
} from "react-icons/ai";
import { MdKeyboardArrowRight, MdPayment } from "react-icons/md";

import { BiTime } from "react-icons/bi";
import { toast } from "react-toastify";

const NewProducts = ({ getProduct }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { getcart } = useSelector((state) => state.carts);
  const { getProductById } = useSelector((state) => state.products);
  const { user, token, loggedin } = useSelector((state) => state.auth);

  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);
  const [mon, setMon] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const playVid = () => {
    setIsOpen(true);
  };
  const { getProductSlug } = useSelector((state) => state.products);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (token) {
      dispatch(getCarts());
    }
  }, [mon]);

  const closeVid = () => {
    setIsOpen(false);
  };

  const [cartHovered, cartIsHovered] = useState(0);
  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleMouseEnter(id) {
    // const hoveridID = image.find(ids => ids.id ===id)

    setIsHovered(id);
  }

  const handleMouseCartEnter = (id) => {
    cartIsHovered(id);
    setIsHovered(false);
  };
  const handleMouseCartLeave = () => {
    cartIsHovered(false);
  };

  const cits = JSON.parse(localStorage.getItem("cartItems"));
  console.log(cits);
  let cartItmss = {};

  cits?.forEach((item, index) => {
    cartItmss[item.product.toString()] = {
      _id: item.product.toString(),
      name: item.name,
      img: item.img,
      price: item.price,
      qty: item.qty,
    };
  });

  const prodId = cartItem && Object.keys(cartItem).map((data) => data);
  const localprodId = cartItmss && Object.keys(cartItmss).map((data) => data);
  console.log(cartItem);
  console.log(cartItmss);

  let newp;
  const addtocart = (_id, name, price, img) => {
    // const { _id, name, price } = getProductById.result?.product;
    // const img = getProductById?.result?.product.images[0].url;
    // const product = cits.map(prods => prods.product)
    if (prodId && token) {
      newp = prodId.find((pro) => pro === _id);
    }

    if (localprodId && !token) {
      newp = localprodId.find((pro) => pro === _id);
    }

    const cartItems = {
      product: _id,
      name: name,
      price: price,
      quantity: quantity,
    };

    const cartItms = {
      product: _id,
      name: name,
      price: price,
      img: img,
      qty: quantity,
    };
    if (newp === _id) {
      toast.error("item already in cart");
    } else {
      const cart = window.localStorage.getItem("cartItems");

      if (cart === null) {
        window.localStorage.setItem("cartItems", JSON.stringify([cartItms]));
      } else {
        const getCurrentCart = localStorage.getItem("cartItems");
        const currentCart = JSON.parse(getCurrentCart);

        currentCart.push(cartItms);

        localStorage.setItem("cartItems", JSON.stringify(currentCart));
      }
      // const cartItem = JSON.stringify({cartItms: cartItms})
      // localStorage.setItem("cartItems", [cartItem])
      //   const cits = JSON.parse(localStorage.getItem('cartItems'))
      //  const newCart = cits.cartItms.push(cartItms)

      if (token) {
        dispatch(addToCart({ cartItems: [cartItems] }));
      }

      setMon(!mon);
    }
  };

  useEffect(() => {
    setCartItems(getcart?.result?.cartItems);
  }, [getcart?.result?.cartItems]);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="absolut  h-full w-full md:mt-[80px] mt-[60px]">
      <p className="text-center text-2xl md:text-3xl font-semibold tracking-wider">
        New Products
      </p>
      <div className="flex justify-center">
        <p className="text-center mt-5 md:px-0 px-5 text-gray-600 text-sm md:text-base  md:w-1/2 md-w-full">
          The perfect addition to any home decoration! Our products are designed
          with both style and comfort in mind, featuring sleek lines and plush
          cushions that provide maximum support.
        </p>
      </div>
      <div className="w-full my-20">
        <div className="md:flex lg:mx-20 md:mx-0 mx-20 justify-around">
          <div
            className="relative overflow-hidden"
            onMouseEnter={() =>
              handleMouseEnter(getProduct?.result?.products[0]._id)
            }
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/product/${getProduct?.result?.products[0]._id}`}>
              <div className="  w-full md:w-[250px] lg:w-[300px] xl:w-[360px] cursor-pointer">
                <div>
                  {/* <div className='flex w-full justify-cente'> */}
                  <motion.img
                    src={getProduct?.result?.products[0].images[0].url}
                    alt=""
                    className="h-[220px] md:h-[300px] lg:h-[400px] hover:scale-105 duration-1000 object-cover"
                  />
                  {/* </div> */}
                </div>
              </div>
            </Link>
            <div className="absolute top-[0%]">
              <p className="text-sm font-semibold pt-2 ml-3 ">NEW</p>
            </div>
            <motion.div
              initial={{ display: "none" }}
              transition={{
                duration: 0.2,
                type: "tween",
              }}
              // initial={{ display:'hidden' }}
              animate={{
                translateX:
                  isHovered === getProduct?.result?.products[0]._id
                    ? "-70%"
                    : cartHovered === getProduct?.result?.products[0]._id
                    ? "0%"
                    : "-100%",
                display: "",
                // overflow: 'hidden'
              }}
              onClick={() =>
                addtocart(
                  getProduct?.result?.products[0]._id,
                  getProduct?.result?.products[0].name,
                  getProduct?.result?.products[0].price,
                  getProduct?.result?.products[0].images[0].url,

                )
              }
              onMouseEnter={() =>
                handleMouseCartEnter(getProduct?.result?.products[0]._id)
              }
              onMouseLeave={() =>
                handleMouseCartLeave(getProduct?.result?.products[0]._id)
              }
              className="bg-black z-10 cursor-pointer text-white overflow-x-hidden text-[12px] px-4 py-5 left-[0] absolute top-[38%] md:top-[50%]  flex addcart items-center"
            >
              <p className="font-bold cursor-pointer">Add to Cart</p>
              {/* <p>+</p> */}
            </motion.div>

            <p className="text-center mt-5 font-semibold">
              {getProduct?.result?.products[0].name}
            </p>
            <p className="text-center mb-20">
              £{getProduct?.result?.products[0].price}
            </p>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={() =>
              handleMouseEnter(getProduct?.result?.products[1]._id)
            }
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/product/${getProduct?.result?.products[1]._id}`}>
              <div className="  w-full md:w-[250px] lg:w-[300px] xl:w-[360px] cursor-pointer">
                <div>
                  {/* <div className='flex w-full justify-cente'> */}
                  <motion.img
                    src={getProduct?.result?.products[1].images[0].url}
                    alt=""
                    className="h-[220px] md:h-[300px] lg:h-[400px] hover:scale-105 duration-1000 object-cover"
                  />
                  {/* </div> */}
                </div>
              </div>
            </Link>
            <div className="absolute top-[0%]">
              <p className="text-sm font-semibold pt-2 ml-3 ">NEW</p>
            </div>
            <motion.div
              initial={{ display: "none" }}
              transition={{
                duration: 0.2,
                type: "tween",
              }}
              // initial={{ display:'hidden' }}
              animate={{
                translateX:
                  isHovered === getProduct?.result?.products[1]._id
                    ? "-70%"
                    : cartHovered === getProduct?.result?.products[1]._id
                    ? "0%"
                    : "-100%",
                display: "",
                // overflow: 'hidden'
              }}
              onClick={() =>
                addtocart(
                  getProduct?.result?.products[1]._id,
                  getProduct?.result?.products[1].name,
                  getProduct?.result?.products[1].price,
                  getProduct?.result?.products[1].images[0].url,

                )
              }
              onMouseEnter={() =>
                handleMouseCartEnter(getProduct?.result?.products[1]._id)
              }
              onMouseLeave={() =>
                handleMouseCartLeave(getProduct?.result?.products[1]._id)
              }
              className="bg-black z-10 cursor-pointer text-white overflow-x-hidden text-[12px] px-4 py-5 left-[0] absolute top-[38%] md:top-[50%] flex addcart items-center"
            >
              <p className="font-bold cursor-pointer">Add to Cart</p>
              {/* <p>+</p> */}
            </motion.div>

            <p className="text-center mt-5 font-semibold">
              {getProduct?.result?.products[1].name}
            </p>
            <p className="text-center mb-20">
              £{getProduct?.result?.products[1].price}
            </p>
          </div>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() =>
              handleMouseEnter(getProduct?.result?.products[2]._id)
            }
            onMouseLeave={handleMouseLeave}
          >
            <Link to={`/product/${getProduct?.result?.products[2]._id}`}>
              <div className="  w-full md:w-[250px] lg:w-[300px] xl:w-[360px] cursor-pointer">
                <div>
                  {/* <div className='flex w-full justify-cente'> */}
                  <motion.img
                    src={getProduct?.result?.products[2].images[0].url}
                    alt=""
                    className="h-[220px] md:h-[300px] lg:h-[400px] w-full hover:scale-105 duration-1000 object-cover"
                  />
                  {/* </div> */}
                </div>
              </div>
            </Link>
            <div className="absolute top-[0%]">
              <p className="text-sm font-semibold pt-2 ml-3 ">NEW</p>
            </div>
            <motion.div
              initial={{ display: "none" }}
              transition={{
                duration: 0.2,
                type: "tween",
              }}
              // initial={{ display:'hidden' }}
              animate={{
                translateX:
                  isHovered === getProduct?.result?.products[2]._id
                    ? "-70%"
                    : cartHovered === getProduct?.result?.products[2]._id
                    ? "0%"
                    : "-100%",
                display: "",
                // overflow: 'hidden'
              }}
              onClick={() =>
                addtocart(
                  getProduct?.result?.products[2]._id,
                  getProduct?.result?.products[2].name,
                  getProduct?.result?.products[2].price,
                  getProduct?.result?.products[2].images[0].url,

                )
              }
              onMouseEnter={() =>
                handleMouseCartEnter(getProduct?.result?.products[2]._id)
              }
              onMouseLeave={() =>
                handleMouseCartLeave(getProduct?.result?.products[2]._id)
              }
              className="bg-black z-10 cursor-pointer text-white overflow-x-hidden text-[12px] px-4 py-5 left-[0] absolute top-[38%] md:top-[50%]  flex addcart items-center"
            >
              <p className="font-bold cursor-pointer">Add to Cart</p>
              {/* <p>+</p> */}
            </motion.div>

            <p className="text-center mt-5 font-semibold">
              {getProduct?.result?.products[2].name}
            </p>
            <p className="text-center mb-20">
              £{getProduct?.result?.products[2].price}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center items-center bg-fixed bg-cover bg-no-repeat bg-center h-[400px] w-full bg-[url('./assets/h1-parallax-img-1.jpg')]`}
      >
        <div>
          <p className="font-bold text-white text-center md:text-4xl text-3xl">
            Upcoming collection
          </p>
          <p className="text-white text-center text-sm md:text-lg mt-5 sm:mx-0 mx-5">
            Get ready to transform your living spaces with our upcoming
            collections for interior decoration!
          </p>
          <div className="flex justify-center mt-6">
            <Link to="/category-list">
              <button className="md:py-3 md:px-7 py-2 px-4 hover:bg-black hover:border-black border-white border">
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

      <div className="lg:flex items-center md:mt-30 mt-20 justify-evenly h-60">
        <div className="xl:w-1/2">
          <p className="font-bold  text-center text-4xl">Stylish Chairs</p>
          <p className=" text-center text-sm md:text-lg md:mt-10 mt-5 text-gray-500 sm:mx-0 mx-10">
            Upgrade your seating game with our stylish chairs{" "}
            <br className="md:block hidden" /> that are sure to make a statement
            in any room!
          </p>
          <div className="flex justify-center ">
            <Link to="/shop/Furniture">
              <button
                className="md:py-3 md:px-7 py-2 px-4 border-black border mt-4"
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

      <div className="lg:flex items-center mt-[540px] sm:mt-[900px] lg:mt-96 xl:mt-80 h-60  justify-evenly">
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
          <p className="font-bold  text-center text-3xl md:text-4xl">
            Contemporary lamps
          </p>
          <p className=" text-center text-sm md:text-lg md:mt-10 mt-5 text-gray-500 sm:mx-0 mx-10">
            Light up your life and elevate your home decor with our{" "}
            <br className="md:block hidden" /> stunning collection of
            contemporary lamps!
          </p>
          <div className="flex justify-center mt-4">
            <Link to="/shop/LAMPS">
              <button className="md:py-3 md:px-7 py-2 px-4 border-black border">
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

      <div className="lg:flex items-center lg:mt-80 mt-[600px] md:mt-[800px] justify-around h-60">
        <div className="xl:w-1/2">
          <p className="font-bold  text-center text-3xl md:text-4xl">
            Stylish tea set
          </p>
          <p className=" text-center text-sm md:text-lg mt-10 text-gray-500 sm:mx-0 mx-10">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat. Duis aute irure.
          </p>
          <div className="flex justify-center mt-4">
            <Link to="/shop/Decoration">
              <button className="md:py-3 md:px-7 py-2 px-4 border-black border">
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
              className={`h-[230px] w-[230px]  md:h-[400px] lg:h-[350px] lg:w-[350px]  xl:h-[370px] xl:w-[370px] object-fit `}
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
          <p className="font-bold md:text-3xl text-[10px]">
            Order now for an express delivery in 24h!
          </p>
          <button className="md:py-3 md:px-7 py-1 px-2 border-black border">
            <Link
              to="/checkout"
              className="flex md:justify-between justify-around items-center"
            >
              <p className="text-gray pr-3 md:text-lg text-[9px]">View more</p>
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
          <p className="md:mt-5 mt-2 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
        <div className="md:mt-0 mt-6">
          <div className="flex items-center">
            <AiOutlineDollarCircle className="w-10 h-10" />
            <p className="ml-4 text-lg font-bold">Free shipping</p>
          </div>
          <p className="md:mt-5 mt-2 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
        <div className="md:mt-0 mt-6">
          <div className="flex items-center">
            <BiTime className="h-10 w-10" />
            <p className="ml-4 text-lg font-bold">Return policy</p>
          </div>
          <p className="md:mt-5 mt-2 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
        <div className="md:mt-0 mt-6">
          <div className="flex items-center">
            <MdPayment className="w-10 h-10" />
            <p className="ml-4 text-lg font-bold">Payment methods</p>
          </div>
          <p className="md:mt-5 mt-2 w-11/12 text-sm text-gray-500">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
            consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
