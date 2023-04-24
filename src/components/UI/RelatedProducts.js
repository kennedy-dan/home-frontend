import React, { useState } from "react";
import table from "../../assets/table.png";
import chair from "../../assets/chair.png";
import light from "../../assets/light.png";
import { motion, useAnimation } from "framer-motion";

const RelatedProducts = () => {
  const image = [
    { img: table, id: 1 },
    { img: chair, id: 2 },
    { img: light, id: 3 },
  ];
  const [isHovered, setIsHovered] = useState(0);
  const [cartHovered, cartIsHovered] = useState(0);
  function handleMouseEnter(id) {
    // const hoveridID = image.find(ids => ids.id ===id)

    setIsHovered(id);

    // }else {
    // console.log('none')
    // }
  }

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
    <div className="grid md:container mx-10 md:mx-auto md:grid-cols-3 gap-4 my-20">
      {image.map((images) => (
        <motion.div
          onMouseEnter={() => handleMouseEnter(images.id)}
          onMouseLeave={() => handleMouseLeave(images.id)}
          // style={{ backgroundImage: `url(${images.img})` }}
          className="h-[300px]  items-center bg-[#f2f2f2] fle  "
        >
          <motion.img
            src={images.img}
            className=" h-[210px] w-[280px] md:h-[250px] md:w-[230px] lg:h-[250px] lg:w-[320px]  xl:h-[280px] xl:w-[360px]   object-cover absolute"
            transition={{
              duration: 1,
              type: "tween",
            }}
            whileHover={{ scale: 1.07 }}
          />
          <div className="h-full items-center flex  ">
            <motion.div
              className="bg-black cursor-pointer px- py- h-[40px]   z-[1] justify-betwee flex items-center"
              onMouseEnter={() => handleMouseCartEnter(images.id)}
              onMouseLeave={() => handleMouseCartLeave(images.id)}
              transition={{
                duration: 0.3,
                type: "tween",
              }}
              // initial={{ display:'hidden' }}
              animate={{
                width:
                  isHovered === images.id
                    ? 20
                    : cartHovered === images.id
                    ? 130
                    : 0,
                justifyContent:
                  isHovered === images.id ? "center" : "space-between",
                padding: cartHovered === images.id ? "0px 7px" : "",
              }}
              // whileHover={{ scale: 1.07 }}
            >
              <div className="">
                <motion.p
                  transition={{
                    duration: 0.2,
                    type: "tween",
                  }}
                  // initial={{ display:'hidden' }}
                  animate={{
                    display: cartHovered ? "block" : "none",
                    // padding: cartHovered ? 10 : "none",
                  }}
                  className="text-white text-[12px] h-fit"
                >
                  Add to cart
                </motion.p>
              </div>

              <div
                className={`flex justify-center ${isHovered ? "w-full" : ""}`}
              >
                <motion.p className="text-white text-center text-[12px]">
                  +
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* <img src={images.img} /> */}
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedProducts;
