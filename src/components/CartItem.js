import React, { useState, useEffect } from "react";
import {
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import productCatsImg from "../assets/product-img-5.png";
import { getCarts, onRemove } from "../store/slice/cartSlice";
import { MdOutlineCancel } from "react-icons/md";

const CartItem = ({
  key,
  cartItem,
  onQuantInc,
  onQuantDec,
  totalPrice,
  onRemoveFromCart,
  cartItmss,
}) => {
  const dispatch = useDispatch();
  const { user, token, loggedin } = useSelector((state) => state.auth);

  const [qty, setQty] = useState(token?cartItem?.qty: cartItmss?.qty);
  // const { _id, name, price, img } = cartItem;

  const _id = token? cartItem?._id : cartItmss?._id;
  const [deleteLoading, setdeleteLoading] = useState(false);
  const [cartremoved, setcartremoved] = useState(false);
  const [cartAdded, setcartAdded] = useState(false);

  const { removeCart } = useSelector((state) => state.carts);

  console.log(cartItmss);
  const cits = JSON.parse(localStorage.getItem("cartItems"));

  useEffect(() => {
    // if (token) {
    //   dispatch(getCarts());
    // }
    JSON.parse(localStorage.getItem("cartItems"));
  }, [ ]);

  const onQuantIncrement = () => {
    setQty(qty + 1);
    onQuantInc(_id, qty + 1);
  };

  const onQuantDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    onQuantDec(_id, qty - 1);
  };

  const removeFromCart = (id) => {
    if(!token){
      const newCart = cits.filter((filteredCart) => filteredCart.product !== id);
      console.log(newCart);
  
      localStorage.setItem("cartItems", JSON.stringify(newCart));
  
    }
    if(token){
      onRemoveFromCart(id);
      setcartremoved(true);
      if (id === cartItem?._id) {
        setdeleteLoading(true);
      }
      if (id !== cartItem?._id) {
        setdeleteLoading(false);
      }
    }

  };

 

  console.log(cartItem?.price * cartItem?.qty);
  return (
    <div className="">
      <div className="grid content-center py-6 grid-cols-5 md:gap-7 gap-2 ">
        <div className="flex items-center">
          <button onClick={() => removeFromCart(token? cartItem?._id : cartItmss?._id)}>
            <MdOutlineCancel className="text-red-900 h-20" />
          </button>
        </div>
        <div className="flex">
          <div className="bg-[#f2f2f2] my-6 h-fit hidden md:block">
            <img
              src={token ? cartItem?.img : !token ? cartItmss?.img : null}
              className="md:h-20 md:w-20 h-10 object-cover "
            />
          </div>
          <p className="md:ml-3 ml-1 py-12 text-[13px] md:text-base">
            {token ? cartItem?.name : !token ? cartItmss?.name : null}
          </p>
        </div>
        <div className="justify-self-star py-12">
          <p className="text-[13px] md:text-base">{token ? cartItem?.price : !token ? cartItmss?.price : null}</p>
        </div>
        <div className="my-11">
          <div className="border items-center py-1 md:py-2  justify-between flex md:w-28 w-16">
            <button onClick={onQuantDecrement}>
              <MdKeyboardArrowLeft />
            </button>
            <p>{token ? cartItem?.qty : !token ? cartItmss?.qty : null}</p>
            <button onClick={onQuantIncrement}>
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
        <div className="py-12">
          <p className="text-[13px] md:text-base">
            {" "}
            {token ? cartItem?.price * cartItem?.qty : !token ? cartItmss?.price * cartItmss?.qty: null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
