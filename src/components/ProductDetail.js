import React, { useState, useEffect } from "react";
import productCatsImg from "../assets/product-img-5.png";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById, getProducts, addReview } from "../store/slice/ProductSlice";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Reviews from "./UI/Reviews";
import RelatedProducts from "./UI/RelatedProducts";
import { addToCart } from "../store/slice/cartSlice";
import { toast } from "react-toastify";
const ProductDetail = ({ props }) => {
  let productId = useParams();
  const _Id = productId._id;
  const location = useLocation();

  const dispatch = useDispatch();
  const { getcart } = useSelector((state) => state.carts);
  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mon, setMon] = useState(false);
  const { user, token, loggedin } = useSelector((state) => state.auth);

  // const [cartItems, setcartItems] = useState([]);
  const { getProductById, getProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsById(_Id));
  }, []);
  const cits = JSON.parse(localStorage.getItem("cartItems"));

  useEffect(() => {
    dispatch(getProducts);
  }, [cits]);

  const handleReduce = () => {
    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

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
  console.log(localprodId);
  console.log(cartItmss);

  let newp;
  const addtocart = () => {
    const { _id, name, price } = getProductById.result?.product;
    const img = getProductById?.result?.product.images[0].url;
    // const product = cits.map(prods => prods.product)
    if (prodId && token) {
      newp = prodId.find((pro) => pro === _id);
    }

    if (localprodId && !token) {
      newp = localprodId.find((pro) => pro === _id);
    }
    console.log(newp);
    console.log(_id);
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
        toast.success("item added to cart");
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

  return (
    <div>
      <div className="bg-[#ecf2f8] py-12 my-20">
        <div className="container mx-auto">
          <div className="mx-10 sm:mx-8 lg:mx-0 xl:mx-20">
            <p className="italic font-semibold text-lg">
              {" "}
              {`Home/Product/${getProductById.result?.product.name}`}
            </p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 justify-between sm:mx-16 mx-10  md:mx-28  my-20">
        <div className="bg-[#f2f2f2] h-fit">
          <img
            src={getProductById?.result?.product.images[0].url}
            className="h-[300px] w-full object-fill"
            alt="prod-img"
          />
        </div>
        <div className="w-">
          <p className="text-2xl text-black font-bold">
            {getProductById?.result?.product.name}
          </p>
          <div className="flex items-center mt-4">
            <AiOutlineStar className="text-black" style={{ color: "red" }} />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <AiOutlineStar />
            <p className="ml-3 text-sm">(1 customer review)</p>
          </div>
          <p className="my-4 text-sm font-semibold">
            £{getProductById?.result?.product.price}
          </p>
          <p className="text-gray-400 text-[15px]">
            {getProductById?.result?.product.description}
          </p>
          <div className="flex my-8">
            <div className="border items-center justify-between flex w-28">
              <button disabled={quantity <= 1} onClick={handleReduce}>
                <MdKeyboardArrowLeft />
              </button>
              <p>{quantity}</p>
              <button onClick={handleIncrease}>
                <MdKeyboardArrowRight />
              </button>
            </div>
            <button
              className="bg-black w-28 ml-3  text-white py-3"
              onClick={addtocart}
            >
              <p className="text-center text-[11px] font-bold">Add to cart</p>
            </button>
          </div>
          <div className="flex mb-6 items-center">
            <MdOutlineFavoriteBorder />
            <p className="ml-3 text-[12px] text-black">Add to Wishlist</p>
          </div>

          <p className="my-4 text-[12px] font-[500] text-black">
            Category: {getProductById?.result?.product.category.name}
          </p>
          <p className="text-[12px] font-medium text-black">
            Quantity: {getProductById?.result?.product.quantity}
          </p>
          <Reviews getProductById={getProductById} />
        </div>
      </div>
      <div className=" sm:mx-16 mx-10  md:mx-28">
        <p className="text-base font-semibold">Related Products</p>
        <RelatedProducts
          getProduct={getProduct}
          _Id={_Id}
          category={getProductById?.result?.product.category.name}
          token={token}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
