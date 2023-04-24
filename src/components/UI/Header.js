import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import Drawer from "./Drawer";
import data from "./navcontent";
import { motion } from "framer-motion";
import { BsBag } from "react-icons/bs";
import { logOutCustomer } from "../../store/slice/authSlice";

import "./Header.css";
import Try from "./Try";
import { useDispatch, useSelector } from "react-redux";
import { getCarts } from "../../store/slice/cartSlice";
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [nav] = useState(data.nav);
  const dispatch = useDispatch();
  const { getcart } = useSelector((state) => state.carts);
  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);
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

  console.log(prodId?.length);
  return (
    <div className="flex justify-between h-16 bg-gray-500 items-center">
      <Link to="/">
        <p className="text-2xl md:ml-10 ml-5 font-semibold text-white">Home</p>
      </Link>
      <div className="w-8">
        <AiOutlineMenu
          onClick={() => setIsOpen(true)}
          className="flex text-white md:hidden mr-5  h-8 w-6"
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
              <p className="text-white text-lg font-semibold">
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
        <div className="">
          <BsBag style={{ height: "30px", width: "30px", color: "white" }} />
          <span class="qodef-cart-number text-white absolute top-6 left-[91%] ">
            {prodId?.length}
          </span>
        </div>
        <button onClick={logOut}>log out</button>
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
