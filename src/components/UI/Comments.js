import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import data from "../comments";
import "./Comments.css";
const Comments = () => {
  const [properties] = useState(data.properties);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = properties.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [properties, index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="bg-[#ecf2f8] py-7 my-8">
      <section className="section items-center">
        <div className="section-center items-center">
          {properties.map((item, indexPeople) => {
            const { id, name, comment } = item;

            let position = "nextSlide";
            if (indexPeople === index) {
              position = "activeSlide";
            }
            if (
              indexPeople === index - 1 ||
              (index === 0 && indexPeople === properties.length - 1)
            ) {
              position = "lastSlide";
            }

            return (
              <article
                className={`${position} text-center mt-[-2rem]`}
                key={id}
              >
                <div className="flex justify-center">
                  <FaComment className="w-16 h-10 mt-6 mb-4 text-center" />
                </div>
                <p className="leading-7 lg:text-[20px] text-sm text-[#737373]">
                  {comment}
                </p>
              </article>
            );
          })}
        </div>
        <div className="">
          <IoIosArrowForward
            className="next mr-36 w-6 h-6 hidden  lg:grid lg:block"
            onClick={() => setIndex(index + 1)}
          />
        </div>
        <div>
          <IoIosArrowBack
            className="prev ml-36 w-6 h-6 hidden  lg:grid"
            onClick={() => {
              setIndex(index - 1);
            }}
          />
        </div>
      </section>
    </div>
    //  <div className='flex justify-between mx-36   my-80 h-80'>
    //     <div className='z-[2]'>
    //       <AiOutlineArrowRight onClick={nextProperty} />
    //     </div>
    //     <div className='overflow-x-hidden w'>
    //       <div className='flex absolut cardsSliderWrapper z-1 ' style={style}>
    //       {properties.map((props, index) => (

    //         <div key={index} className='min-w-full'>
    //           <div>
    //           <p className='w-[700px] text-4xl text-center'>{props.comment}</p>

    //           </div>
    //          </div>
    //       ))}

    //       </div>
    //     </div>
    //     <div className=''>
    //       <AiOutlineArrowRight  onClick={prevProperty}/>
    //     </div>

    //  </div>
    // <div className='bg-[#b4b4b4]'>
    //     <div className='justify-center flex w-full' >
    //         <div className=''>
    //         <p className='text-8xl text-center font-bold '>""</p>
    //         <div className='flex justify-center'>
    //         <p className='w-1/2 text-center'>Excepteur sint occaecat cupidatat non proident. Ut enim ad minim veniam exercitation ullamco laboris aliquip. Commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

    //         </div>
    //         </div>
    //     </div>
    // </div>
  );
};

export default Comments;
