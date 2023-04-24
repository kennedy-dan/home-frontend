import React from "react";
import blog from "../../assets/blog.jpg";
import blog2 from "../../assets/blog-2.jpg";
const Blog = () => {
  return (
    <div className="grid grid-cols-2 gap-3 lg:mx-32 md:mx-20 mx-6  mt-20">
      <div className="overflow-hidden">
        <img src={blog} className="w-[520px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-1000" />
        <p className="text-center md:mt-10 mt-5 md:text-sm text-[9px] text-black">May 21, 2018 | by Nicole Burke</p>
        <p className="text-center mt-3 font-semibold md:text-lg text-[11px]">
          You should use natural materials <br /> in your design
        </p>
        <p className="text-center md:text-xs text-[11px] underline underline-offset-8 font-semibold md:my-4 my-2">Read More</p>
      </div>
      <div className="overflow-hidden">
        <div>
        <img src={blog2} className="w-[520px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-1000" />
        </div>
        <p className="text-center md:mt-10 mt-5 md:text-sm text-[9px] text-black">May 21, 2018 | by Nicole Burke</p>
        <p className="text-center mt-3 font-semibold md:text-lg text-[11px]">
        
          You should use natural materials <br /> in your design
        </p>
        <p className="text-center md:text-xs text-[11px] underline underline-offset-8 font-semibold md:my-4 my-2">Read More</p>
        
      </div>
    </div>
  );
};

export default Blog;
