import React, { useState, useEffect } from "react";
import productCatsImg from "../assets/product-img-5.png";
import { getCarts, addToCart, removeFromCart } from "../store/slice/cartSlice";
import cartSlice from "../store/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  const { getcart } = useSelector((state) => state.carts);
  const { user, token, loggedin } = useSelector((state) => state.auth);

  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);
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
  useEffect(() => {
    if (token) {
      // dispatch(getCarts());
    }
  }, []);

  useEffect(() => {
    if(token){
      setCartItems(getcart?.result?.cartItems);
    }
    if(!token){
      setCartItems(cartItmss);

    }
  }, [getcart?.result?.cartItems,cartItmss ]);

  // const { name, price, img } = cartItems[cartItems._id];


  console.log(cartItem);
  console.log(cartItmss)

  const quantityInc = (_id, qty) => {
  // console.log(cartItem[_id]);
  console.log(cartItmss[_id]);

    console.log({ _id, qty });
    const { name, price, img } = token? cartItem[_id] : cartItmss[_id];
    const cartItems = {
      product: _id,
      name: name,
      price: price,
      quantity: qty,
    };
    const cartItms = {
      product: _id,
      name: name,
      price: price,
      img: img,
      qty: qty,
    };
    const cart = window.localStorage.getItem("cartItems");

    if (cart === null) {
      window.localStorage.setItem("cartItems", JSON.stringify([cartItms]));
    } else {
      const getCurrentCart = localStorage.getItem("cartItems");
      const currentCart = JSON.parse(getCurrentCart);

      currentCart.push(cartItms);

      localStorage.setItem("cartItems", JSON.stringify(currentCart));
      toast.success('item added to cart')
    }
    if(token){
      dispatch(addToCart({ cartItems: [cartItems] }));
      // dispatch(getCarts());
    }
 
  };
  const quantityDec = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = token? cartItem[_id] : cartItmss[_id];
    const cartItems = {
      product: _id,
      name: name,
      price: price,
      quantity: qty,
    };
    const cartItms = {
      product: _id,
      name: name,
      price: price,
      img: img,
      qty: qty,
    };
    const cart = window.localStorage.getItem("cartItems");

    if (cart === null) {
      window.localStorage.setItem("cartItems", JSON.stringify([cartItms]));
    } else {
      const getCurrentCart = localStorage.getItem("cartItems");
      const currentCart = JSON.parse(getCurrentCart);

      currentCart.push(cartItms);

      localStorage.setItem("cartItems", JSON.stringify(currentCart));
      toast.success('item added to cart')
    }
    if(token){
      dispatch(addToCart({ cartItems: [cartItems] }));
      // dispatch(getCarts());
    }
  };

  const onRemoveFromCart = (_id) => {
    console.log(_id);
    dispatch(removeFromCart(_id));
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

          {token &&
            cartItem &&
            Object.keys(cartItem).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItem[key]}
                // cartItmss={cartItmss[key]}
                onQuantInc={quantityInc}
                onQuantDec={quantityDec}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}

          {!token &&
            cartItmss &&
            Object.keys(cartItmss).map((key, index) => (
              <CartItem
                key={index}
                // cartItem={cartItem[key]}
                cartItmss={cartItmss[key]}
                onQuantInc={quantityInc}
                onQuantDec={quantityDec}
                onRemoveFromCart={onRemoveFromCart}
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
                {token && cartItem &&
                  Object.keys(getcart?.result?.cartItems).reduce(
                    (totalPrice, key) => {
                      const { price, qty } = getcart?.result?.cartItems[key];
                      return totalPrice + price * qty;
                    },
                    0
                  )}
                        {!token && cartItem &&
                  Object.keys(cartItmss).reduce(
                    (totalPrice, key) => {
                      const { price, qty } = cartItmss[key];
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
                {token && cartItem &&
                  Object.keys(getcart?.result?.cartItems).reduce(
                    (totalPrice, key) => {
                      const { price, qty } = getcart?.result?.cartItems[key];
                      return totalPrice + price * qty;
                    },
                    0
                  )}
                           {!token && cartItem &&
                  Object.keys(cartItmss).reduce(
                    (totalPrice, key) => {
                      const { price, qty } = cartItmss[key];
                      return totalPrice + price * qty;
                    },
                    0
                  )}
              </p>
            </div>
            <div className="bg-gray-300 w-full h-[1px] my-4"></div>
          </div>
          <div className="mt-10">
            <Link
              to="/checkout"
              className="py-3 px-3  md:py-4 md:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black mt-10 font-semibold text-[12px] md:text-[15px]"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
