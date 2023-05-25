import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import avatar from "../../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../store/slice/ProductSlice";
import {AiOutlineUser} from 'react-icons/ai'

// 646a80c45320490002dc8084

// 646a81b75320490002dc860f
const Reviews = (getProductById) => {
  const [index, setIndex] = useState();
  const { user, token, loggedin } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [ratings, setRatings] = useState();
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

  const submitRating = () => {
    dispatch(
      addReview({
        name: name,
        comment: comment,
        productId: getProductById?.getProductById?.result?.product?._id,
        rating: ratings
      })
    );
  };

  console.log(getProductById?.getProductById?.result?.product?._id);

  const reviews = (
    <div>
      {/* <p className="my-4 font-semibold">1 review for Black light</p> */}

      <div>
        {getProductById?.getProductById?.result?.product.reviews.map(
          (comments) => (
            <div className="mt-7">
              <div className="flex items-center">
                <div className="">
                  <AiOutlineUser />
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
                    <p className="font-semibold ">{comments.name}</p> -
                    <span>{(getProductById?.getProductById?.result?.product?.createdAt).toString().substring(0,10)}</span>
                  </div>
                  <p>{comments.comment}</p>
                </div>
              </div>
            </div>
          )
        )}
        <div className="text-[14px] text-gray-400">
          <p className="mt-1">Add a review</p>
          <p className="mt-2">
            Your email address will not be published. Required fields are marked
            *
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
          <textarea
            className="outline-none border w-full h-[200px]"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <p className="mt-8">Name *</p>
          <input
            className="outline-none border w-full h-[60px] "
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p className="mt-8">ratings *</p>
          <input
            className="outline-none border w-full h-[60px] "
            value={ratings}
            onChange={(e) => setRatings(e.target.value)}
          />

          <div className="mt-4">
            <button
              onClick={submitRating}
              className="text-white font-semibold text-[12px] bg-gray-800 py-3 px-6"
            >
              Submit
            </button>
          </div>
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
        {index == 2 && reviews}
      </div>
    </div>
  );
};

export default Reviews;
