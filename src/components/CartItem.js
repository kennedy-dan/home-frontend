import React, { useState, useEffect } from "react";
import {
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import productCatsImg from "../assets/product-img-5.png";
import { getCarts } from "../store/slice/cartSlice";

const CartItem = ({ key, cartItem, onQuantInc, onQuantDec, totalPrice }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(cartItem.qty);
  const { _id, name, price, img } = cartItem;

  console.log(totalPrice);

  useEffect(() => {
    dispatch(getCarts());
  }, [qty]);

  const onQuantIncrement = () => {
    setQty(qty + 1);
    onQuantInc(_id, qty + 1);
  };

  const onQuantDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    onQuantDec(_id, qty - 1);
  };

  console.log(cartItem.price * cartItem.qty);
  return (
    <div className="">
      <div className="grid content-center py-6 grid-cols-5 md:gap-7 gap-2 ">
        <div className="">
          <p className="py-12">x</p>
        </div>
        <div className="flex">
          <div className="bg-[#f2f2f2] my-6 h-fit hidden md:block">
            <img src={cartItem.img} className="md:h-20 h-10 " />
          </div>
          <p className="md:ml-3 ml-1 py-12 text-[13px] md:text-base">
            {cartItem.name}
          </p>
        </div>
        <div className="justify-self-star py-12">
          <p className="text-[13px] md:text-base">{cartItem.price}</p>
        </div>
        <div className="my-11">
          <div className="border items-center py-1 md:py-2  justify-between flex md:w-28 w-16">
            <button onClick={onQuantDecrement}>
              <MdKeyboardArrowLeft />
            </button>
            <p>{cartItem.qty}</p>
            <button onClick={onQuantIncrement}>
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
        <div className="py-12">
          <p className="text-[13px] md:text-base">
            {" "}
            {cartItem.price * cartItem.qty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
