import React, { useState, useEffect } from "react";
import table from "../../assets/table.png";
import chair from "../../assets/chair.png";
import light from "../../assets/light.png";
import { motion, useAnimation } from "framer-motion";
import { getProducts, getProductsById } from "../../store/slice/ProductSlice";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../store/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const RelatedProducts = ({category, getProduct,token }) => {
  const dispatch = useDispatch()
  let productid = useParams();
  const _Id = productid._id;
  const image = [
    { img: table, id: 1 },
    { img: chair, id: 2 },
    { img: light, id: 3 },
  ];
  const [isHovered, setIsHovered] = useState(0);
  const [cartHovered, cartIsHovered] = useState(0);
  const { getcart } = useSelector((state) => state.carts);
  let newp;

  const { getProductSlug } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItems] = useState(getcart?.result?.cartItems);
  const [mon, setMon] = useState(false);
  const [tryy, setTryy] = useState(false);
  

  function handleMouseEnter(id) {
    // const hoveridID = image.find(ids => ids.id ===id)

    setIsHovered(id);

    // }else {
    // console.log('none')
    // }
  }
  const productId = (_id) => {
    dispatch(getProductsById(_id));
  };

  useEffect(() => {
    dispatch(getProductsById(_Id));
  }, []);

  useEffect(() => {
    dispatch(getProducts())
  }, [])
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
  // useEffect(() => {
  //   setCartItems(getcart?.result?.cartItems);
  // }, [getcart?.result?.cartItems]);

  const related = getProduct?.result?.products?.filter(relate => relate.category.name === category && relate._id !== _Id)
  console.log(related)
  function handleMouseLeave() {
    setIsHovered(false);
  }

  const handleMouseCartEnter = (id) => {
    cartIsHovered(id);
    setIsHovered(false);
  };
  const handleMouseCartLeave = () => {
    cartIsHovered(false);
  };

  return (
    <div className="grid md:container md:mx-auto md:grid-cols-3 md:gap-4 my-20">
      {related && related.map((products) => (
          <div className="text-center mt-8"> 
            <div
              className="bg-[#f2f relative overflow-hidden"
              onMouseEnter={() => handleMouseEnter(products._id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={`/product/${products._id}`}
                onClick={() => productId(products._id)}
              >
                <img
                  src={products.images[0].url}
                  className=" h-[300px] w-full object-cover "
                />
              </Link>

              <motion.div
                initial={{ display: "none" }}
                transition={{
                  duration: 0.2,
                  type: "tween",
                }}
                // initial={{ display:'hidden' }}
                animate={{
                  translateX:
                    isHovered === products._id
                      ? "-70%"
                      : cartHovered === products._id
                      ? "0%"
                      : "-100%",
                  display: "",
                  // overflow: 'hidden'
                }}
                onClick={() =>
                  addtocart(products._id, products.name, products.price, products.images[0].url)
                }
                onMouseEnter={() => handleMouseCartEnter(products._id)}
                onMouseLeave={() => handleMouseCartLeave(products._id)}
                className="bg-black z-10 cursor-pointer text-white overflow-x-hidden text-[10px] px-4 py-5 left-[0] absolute top-[70%] flex addcart items-center"
              >
                <p className="font-bold cursor-pointer">Add to Cart</p>
                {/* <p>+</p> */}
              </motion.div>
            </div>
            
          </div>
        ))}
      {}
    </div>
  );
};

export default RelatedProducts;
