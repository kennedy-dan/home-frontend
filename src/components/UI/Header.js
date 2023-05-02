import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import Drawer from "./Drawer";
import data from "./navcontent";
import { motion } from "framer-motion";
import { BsBag } from "react-icons/bs";
import { logOutCustomer } from "../../store/slice/authSlice";
import { CiSquareRemove } from "react-icons/ci";

import "./Header.css";
import Try from "./Try";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "../../store/slice/cartSlice";
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const [nav] = useState(data.nav);
  const dispatch = useDispatch();
  const { getcart } = useSelector((state) => state.carts);
  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);

  const [isHovered, setIsHovered] = useState(0);

  console.log(getcart);
  console.log(cartItem);
  const logOut = () => {
    dispatch(logOutCustomer());
  };

  useEffect(() => {
    dispatch(getCarts());
  }, []);

  useEffect(() => {
    setCartItems(getcart?.result?.cartItems);
  }, [getcart?.result?.cartItems]);

  const prodId = cartItem && Object.keys(cartItem).map((data) => data);

  const leaveCart = () => {
    setIsHovered(false);
  };
  const viewCart = () => {
    setIsHovered(true);
  };

  console.log(prodId?.length);

  const cartItems = (
    <div
      className=" bg-white px-8 py-3 "
      // onMouseOver={viewCart}
      // onMouseLeave={leaveCart}
    >
      {cartItem &&
        Object.keys(cartItem).map((key, index) => (
          <>
            <div className="flex justify-between py-4">
              <div className="flex justify-between">
                <img src={cartItem[key].img} className="h-10 w-10" />
                <div className="text-left pl-4">
                  <p className="text-[14px] font-bold">{cartItem[key].name}</p>

                  <p className="text-[13px] text-gray-500 mt-1">{cartItem[key].price}</p>
                </div>
              </div>

              <button>
                <CiSquareRemove />
              </button>
            </div>
          </>
        ))}
      <div className="flex justify-between">
        <p>Total:</p>
        <p className='font-bold text-gray-600 text-[13px]'>
          {cartItem &&
            Object.keys(getcart?.result?.cartItems).reduce(
              (totalPrice, key) => {
                const { price, qty } = getcart?.result?.cartItems[key];
                return totalPrice + price * qty;
              },
              0
            )}
        </p>
      </div>
      <Link to="/cart">
        <button className="py-3 px-2 md:px-4 w-full lg:px-5 text-black  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px] ">
          View cart
        </button>
      </Link>
      <Link to="/checkout">
        <button className="py-3 px-2 md:px-4 w-full lg:px-5 text-white bg-black  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px] ">
          Checkout
        </button>
      </Link>
    </div>
  );

  return (
    <div className={`flex justify-between h-16   items-center`}>
      <Link to="/">
        <p
          className={`text-2xl md:ml-10 ml-5 font-semibold ${
            location.pathname === "/" ? "text-white" : "text-black"
          }`}
        >
          Home
        </p>
      </Link>
      <div className="w-8">
        <AiOutlineMenu
          onClick={() => setIsOpen(true)}
          className={`flex ${
            location.pathname === "/" ? "text-white" : "text-black"
          } md:hidden mr-5  h-8 w-6`}
        />
      </div>
      <div className=" hidden md:flex w-1/2 items-center justify-evenly">
        {nav.map((navigate) => (
          <div className="paintingcategory">
            <NavLink
              to={navigate.slug}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-white" : "link"
              }
            >
              <p
                className={` ${
                  location.pathname === "/" ? "text-white" : "text-black"
                }  text-lg font-semibold`}
              >
                {navigate.name}
              </p>
            </NavLink>
            {navigate.content.map((navcontent) => (
              <motion.div
                animate={{ scale: 1 }}
                whileHover={{ scale: 1 }}
                initial={{ scale: 0 }}
                transition={{ type: "tween", duration: 3 }}
                className="bg-white authordese hidden"
              >
                <NavLink
                  to={navcontent.to}
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-white h-10" : "link"
                  }
                >
                  <p>{navcontent.name}</p>
                </NavLink>
              </motion.div>
            ))}
          </div>
        ))}
        <Link to="/cart" className="">
          <div className="" onMouseOver={viewCart} onMouseLeave={leaveCart}>
            <div className="flex items-center h-28">
              <div className="relative inline-block align-middle overflow-hidden">
                <BsBag
                  style={{
                    height: "30px",
                    width: "100%",

                    color: location.pathname === "/" ? "white" : "black",
                  }}
                />
                <div>
                  <p
                    className={`qodef-cart-number ${
                      location.pathname === "/" ? "text-white" : "text-black"
                    } absolute top-[26%] left-[35%] text-[14px] `}
                  >
                    {prodId?.length}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              onMouseOver={viewCart}
              onMouseLeave={leaveCart}
              initial={{ display: "none", scale: 0 }}
              transition={{
                duration: 1,
                type: "spring",
              }}
              animate={{
                scale: isHovered ? 1 : 0,
                display: "",
                // overflow: 'hidden'
              }}
              className="fixed top-20 right-[2%] w-[260px] overflow-hidden"
            >
              {cartItems}
            </motion.div>
          </div>
        </Link>
        {/* <button onClick={logOut}>log out</button> */}
        {/* <Try /> */}
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="ml-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "border-b-2  border-black  ml-5 h-10" : "ml-5 link "
            }
          >
            <p className="text-black text-lg font-semibold">Home</p>
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 bg-red-700 border-black w-fit ml-5 h-10"
                : " ml-5 link"
            }
          >
            {" "}
            <p className="text-black text-lg font-semibold">Shop</p>
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-black w-fit ml-5 h-10" : "ml-5 link"
            }
          >
            {" "}
            <p className="text-black text-lg font-semibold">Blog</p>
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-black w-fit ml-5 h-10" : "ml-5 link"
            }
          >
            {" "}
            <p className="text-black text-lg font-semibold">Portfolio</p>
          </NavLink>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
