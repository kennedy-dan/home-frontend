import React, { useState, useEffect } from "react";
import productCatsImg from "../assets/product-img-5.png";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById, getProducts } from "../store/slice/ProductSlice";
import { useParams } from "react-router-dom";
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
const ProductDetail = ({ props }) => {
  let productId = useParams();
  const _Id = productId._id;
  console.log(productId);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // const [cartItems, setcartItems] = useState([]);
  const { getProductById, getProduct } = useSelector((state) => state.products);

  useEffect(() => {
    console.log(props);
    dispatch(getProductsById(_Id));
  }, []);

  useEffect(() => {
    dispatch(getProducts)
  }, [])
  

  console.log(getProductById);
  const handleReduce = () => {
    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const addtocart = () => {
    const { _id, name, price } = getProductById.result?.product;
    const img = getProductById?.result?.product.images[0].url;
    console.log(img);

    const cartItems = {
      product: _id,
      name: name,
      price: price,
      quantity: quantity,
    };
    dispatch(addToCart({ cartItems: [cartItems] }));
  };

  return (
    <div>
      <div className="border sm:mx-16 mx-10  md:mx-28 border-gray-300 text-gray-400 items-center flex px-8 py-2 mt-10 justify-between">
        <p>
          {getProductById?.result?.product.name} has been added to your cart
        </p>
        <Link to='/cart' className="py-3 px-3  md:py-3 md:px-5 text-white bg-gray-800  hover:bg-white hover:text-gray-800 border border-black font-semibold text-[12px] md:text-[15px]">
          view cart
        </Link>
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
            
            <AiOutlineStar className='text-black' style={{color: 'red'}} />
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
          <Reviews />
        </div>
      </div>
      <div className=" sm:mx-16 mx-10  md:mx-28">
        <p className="text-base font-semibold">Related Products</p>
        <RelatedProducts getProduct={getProduct} _Id={_Id} category={getProductById?.result?.product.category.name} />
      </div>
    </div>
  );
};

export default ProductDetail;
