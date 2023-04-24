import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import avatar from '../../assets/avatar.png'

const Reviews = () => {
  const [index, setIndex] = useState();
  const descriptionInfoReviews = [
    {
      content: "Description",
    },
    {
      content: "Additional information",
    },
    {
      content: "Reviews",
    },
  ];

  const handleIndex = (i) => {
    setIndex(i);
  };

  const description = (
    <p className="text-gray-400 text-[15px]">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco ommodo
      consequat. Duis aute irure dolor in reprehenderit dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident.
    </p>
  );

  const additionalInfo = (
    <div>
      <div className="flex items-center justify-between w-5/12">
        <p className="font-semibold text-sm">Dimensions</p>
        <p className="text-sm text-gray-400 ">20 × 40 × 30 cm</p>
      </div>
      <div className="flex items-center justify-between text-center w-5/12">
        <p className="font-semibold text-sm">Color</p>
        <p className="text-sm text-gray-400  ">Black, Gold</p>
      </div>
    </div>
  );

  const review = (
    <div>
      <p className="my-4 font-semibold">1 review for Black light</p>
      <div className="flex ">
        <div className="">
          <img src={avatar} className='w-[100px] h-[90px] object-cover' />
        </div>
        <div className="ml-2">
          <div className="flex items-center mt-4">
            <AiFillStar style={{ color: "rgb(209 213 219)" }} />
            <AiFillStar style={{ color: "rgb(209 213 219)" }} />
            <AiFillStar style={{ color: "rgb(209 213 219)" }} />
            <AiFillStar style={{ color: "rgb(209 213 219)" }} />
            <AiFillStar style={{ color: "rgb(209 213 219)" }} />
          </div>
          <div className="flex items-center text-gray-400 text-[14px] ">
            <p className="font-semibold ">Kennedy Daniel</p> -
            <span>May 23, 2018</span>
          </div>
          <p></p>
        </div>
      </div>
      <div className="text-[14px] text-gray-400">
        <p className="mt-1">Add a review</p>
        <p className="mt-2">
          Your email address will not be published. Required fields are marked *
        </p>
        <p className="mt-8">Your rating *</p>
        <div className="flex">
          <AiFillStar style={{ color: "rgb(209 213 219)" }} />
          <AiFillStar style={{ color: "rgb(209 213 219)" }} />
          <AiFillStar style={{ color: "rgb(209 213 219)" }} />
          <AiFillStar style={{ color: "rgb(209 213 219)" }} />
          <AiFillStar style={{ color: "rgb(209 213 219)" }} />
        </div>
        <p className="mt-2">Your review *</p>
        <textarea className="outline-none border w-full h-[200px] " />
        <p className="mt-8">Name *</p>
        <input className="outline-none border w-full h-[60px] " />
        <p className="mt-8">Email *</p>
        <input className="outline-none border w-full h-[60px] " />

        <div className="mt-4">
          <button className='text-white font-semibold text-[12px] bg-gray-800 py-3 px-6'>Submit</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className=" mt-14">
        {descriptionInfoReviews.map((contents, i) => (
          <button
            onClick={() => handleIndex(i)}
            className="bg-[#f2f2f2] py-2 mr-3 hover:bg-black hover:text-white text-sm  px-4"
          >
            {contents.content}
          </button>
        ))}
        {index == 0 && description}
        {index == 1 && additionalInfo}
        {index == 2 && review}
      </div>
    </div>
  );
};

export default Reviews;
