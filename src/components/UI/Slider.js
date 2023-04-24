import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import slideone from "../../assets/main-slider-img-1.jpg";
import slidetwo from "../../assets/main-home-slide-2.jpg";
import slidethree from "../../assets/main-home-slide-1.jpg";
import { motion } from "framer-motion";
// import "aos/dist/aos.css";
import { MdKeyboardArrowRight, MdPayment } from "react-icons/md";

import Aos from "aos";

const featuredProducts = [slideone, slidetwo, slidethree];

const featuredText = [
  <div className="flex absolute top-0 left-0 z-[1] justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
    <motion.div
      className="ml-32 "
      animate={{ x: -80, scale: 1, display: "block" }}
      initial={{ x: 30, display: "none" }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <p className="text-white text-4xl md:text-8xl font-semibold">
        Shop and fun
      </p>
      <p className="text-white text-sm md:text-xl   mt-8">
        Ut enim ad minim veniam, quis nostrud exercitation <br /> ullamco ommodo
        consequat.
      </p>
      <button className="py-3 px-4 border-white border-2 mt-8">
        <p className="text-white">view more</p>
      </button>
    </motion.div>
  </div>,
  <div className="flex  absolute top-0 left-0 z-[1] justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
    <div className="flex justify-center">
      <motion.div
        animate={{ scale: 1, display: "block" }}
        initial={{ y: 0, scale: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
        className=""
      >
        <p className="text-white text-4xl  md:text-8xl md:text-center font-semibold">
          All For Your Home
        </p>
        <p className="text-white md:text-xl w-11/12 md:w-full text-sm mt-8 md:text-center">
          Ut enim ad minim veniam, quis nostrud exercitation <br /> ullamco
          ommodo consequat. Duis aute irure dolor in.
        </p>
        <div className="flex md:justify-center">
          <button className="py-3 px-7 border-white border-2 mt-8 text-center">
            <p className="text-white">view more</p>
          </button>
        </div>
      </motion.div>
    </div>
  </div>,
  <div className="flex  w-full absolute top-0 left-0 z-[1] justify-center items-end  px-4 h-full cursor-pointer group focus:outline-none">
    <motion.div
      className="sm:ml-80 ml-32"
      animate={{ y: -280, scale: 1, display: "block" }}
      initial={{ y: 40, display: "none" }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      <p className="text-white text-4xl  md:text-8xl md:text-center font-semibold">
        Kids furniture
      </p>
      <p className="text-white w-11/12 md:w-full text-sm md:text-xl mt-8 md:text-center">
        Ut enim ad minim veniam, quis nostrud exercitation <br /> ullamco ommodo
        consequat. Duis aute irure dolor in.
      </p>
      <div className="flex md:justify-center">
        <button className="py-3 px-7 border-white border-2 mt-8 text-center">
          <p className="text-white">view more</p>
        </button>
      </div>
    </motion.div>
  </div>,
];

let count = 0;
let slideInterval;
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    count = (count + 1) % featuredText.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    const textLength = featuredText.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    count = (currentIndex + textLength - 1) % textLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  return (
    <div>
      <div className="w-full  select-none -mt-20  z-[-1] top-[0px] right-[0p]">
        <div
          className=" aspect-w-16 aspect-h-9 h-screen flex items-center   bg-center"
          style={{ backgroundImage: `url(${slideone})` }}
        >
          <motion.div
            className="ml-32 "
            whileInView={{ x: -80, scale: 1, display: "block" }}
            initial={{ x: 30, display: "" }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <p className="text-white text-4xl md:text-8xl font-semibold">
              Shop and fun
            </p>
            <p className="text-white text-sm md:text-xl   mt-8">
              Ut enim ad minim veniam, quis nostrud exercitation <br /> ullamco
              ommodo consequat.
            </p>
            <Link to='/shop'>
              <button className="py-3 px-7 border-white hover:border-black border mt-7">
                <div className="flex justify-center text-white hover:text-black items-center">
                  <p className="text-gray pr-3">View more</p>
                  <MdKeyboardArrowRight className="" />
                </div>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
