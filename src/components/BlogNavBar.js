import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import profile from "../assets/blog-sidebar-img.jpg";
import Shop from "../assets/shop-banner.jpg";
const BlogNavBar = () => {
  const categories = [
    {
      name: "Bedroom",
      number: 10,
    },
    {
      name: "House",
      number: 10,
    },
    {
      name: "Lightning",
      number: 10,
    },
    {
      name: "Bedroom",
      number: 10,
    },
    {
      name: "Bedroom",
      number: 10,
    },
    {
      name: "Bedroom",
      number: 10,
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center py-3 px-3 border border-gray-300 lg:w-fit">
        <input className="" placeholder="Search..." />
        <CiSearch className="text-gray-400 w-10 h-6" />
      </div>
      <div>
        <p className="mt-16 font-bold">Author</p>
        <img
          src={profile}
          alt="profile"
          className=" h-44 mt-3 object-contain"
        />
        <p className="pt-5 text-gray-600">
          Lorem ipsum dolor sit amet, elit adipisicing sed do eiusmod tempor
          incididunt ut labore et dolore magna
        </p>
      </div>
      <div>
        <p className="font-bold my-10">Categories</p>
        {categories.map((categoryList) => (
          <div>
            <Link to={`/shop/${categoryList.name}`}>
              <button onClick>
                <p className="text-[11px] font-semibold mb-2">
                  {categoryList.name} ({categoryList.number})
                </p>
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/shop" >
          <img src={Shop} alt="shop" className="w-fit h-fit" />
        </Link>
      </div>
    </div>
  );
};

export default BlogNavBar;
