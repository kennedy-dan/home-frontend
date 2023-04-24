import React, { useState, useEffect } from "react";
import productCatsImg from "../assets/product-img-5.png";

import { getCarts, addToCart } from "../store/slice/cartSlice";
import cartSlice from "../store/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
const Cart = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  const { getcart } = useSelector((state) => state.carts);

  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);
  useEffect(() => {
    dispatch(getCarts());
  }, []);

  useEffect(() => {
    setCartItems(getcart?.result?.cartItems);
  }, [getcart?.result?.cartItems]);

  // const { name, price, img } = cartItems[cartItems._id];
  console.log(cartItem);

  const quantityInc = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = cartItem[_id];
    const cartItems = {
      product: _id,
      name: name,
      price: price,
      quantity: qty,
    };
    dispatch(addToCart({ cartItems: [cartItems] }));
    dispatch(getCarts());
  };
  const quantityDec = (_id, qty) => {
    const { name, price, img } = cartItem[_id];
    const cartItems = {
      product: _id,
      name: name,
      price: price,
      quantity: qty,
    };

    dispatch(addToCart({ cartItems: [cartItems] }));
    dispatch(getCarts());
  };
  return (
    <div>
      <div className="bg-[url('assets/cart-bg.jpg')] bg-center bg-fixed bg-cover  h-[60vh]  w-full">
        <div className="flex items-center justify-center  h-full">
          <p className="text-white text-center font-semibold text-6xl">Cart</p>
        </div>
      </div>
      <div>
        <div className="lg:mx-20 md:mx-10 mx-2 my-20">
          <div className="grid content-center py-6 grid-cols-5 md:gap-7 gap-2 text-[13px] md:text-xl font-bold">
            <div className=""></div>
            <div>
              <p>Product</p>
            </div>
            <div>
              <p>Price</p>
            </div>
            <div>
              <p>Quantity</p>
            </div>
            <div>
              <p>Subtotal</p>
            </div>
          </div>
          <div className="bg-gray-300 w-full h-[1px] mt-4"></div>

          {cartItem &&
            Object.keys(cartItem).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItem[key]}
                onQuantInc={quantityInc}
                onQuantDec={quantityDec}
              />
            ))}
          <div className="bg-gray-300 w-full h-[1px]"></div>
          <div className="flex justify-start md:justify-end">
            <button className="py-4 px-2 md:px-4 lg:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px] ">
              Update cart
            </button>
          </div>
          <p className="md:text-2xl text-lg lg:text-3xl font-bold my-7 md:my-4">
            Cart totals
          </p>

          <div>
            <div className="grid md:grid-cols-6 grid-cols-3">
              <p className="font-bold">Subtotal</p>
              <p>
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
            <div className="bg-gray-300 w-full h-[1px] my-4"></div>

            <div className="grid md:grid-cols-6 grid-cols-3">
              <p className="font-bold">total</p>
              <p className="font-bold">
                {" "}
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
            <div className="bg-gray-300 w-full h-[1px] my-4"></div>
          </div>

          <Link to ='/checkout' className="py-3 px-3  md:py-4 md:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black mt-4 font-semibold text-[12px] md:text-[15px]">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
