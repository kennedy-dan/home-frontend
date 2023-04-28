import React, { useEffect } from "react";
import blog from "../../assets/blog.jpg";
import blog2 from "../../assets/blog-2.jpg";
import { getBlogs } from "../../store/slice/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Blog = () => {
  const dispatch = useDispatch();
  const { getblog } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const mappedBlog = getblog?.result?.blog.slice(0, 2);
  console.log(mappedBlog);

  return (
    <div className="grid grid-cols-2 gap-3 lg:mx-32 md:mx-20 mx-6  mt-20">
      {mappedBlog?.map((blogs) => (
        <div className="overflow-hidden">
          <img
            src={blogs?.images?.images}
            className="w-[520px] h-[300px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-transparent duration-1000"
          />
          <p className="text-center md:mt-10 mt-5 md:text-sm text-[9px] text-black">
            May 21, 2018 | by Nicole Burke
          </p>
          <p className="text-center mt-3 font-semibold md:text-lg text-[11px]">
            {blogs.name}
          </p>
          <Link to={`blog/${blogs.slug}`}>
            <p className="text-center md:text-xs text-[11px] underline underline-offset-8 font-semibold md:my-4 my-2">
              Read More
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
