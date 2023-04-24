import React, { useEffect, useLayoutEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getCategory } from "../store/slice/assetSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../store/slice/ProductSlice";
import { Link, useParams } from "react-router-dom";

const CategoriesNav = ({ setProducts, products }) => {
  const dispatch = useDispatch();
  const { getCategories } = useSelector((state) => state.assets);
  const { getProductSlug } = useSelector((state) => state.products);
  const [rerender, sertrerender] = useState(false)

  const rod = getProductSlug;
  useEffect(() => {
    // dispatch(getProductSlug);
  }, [getProductSlug]);


  // useEffect(() => {
  //   setProducts(rod);
  // }, [rerender]);

  const getCats = (slug) => {
    dispatch(getProductsBySlug(slug));
  
    sertrerender(true)
    setProducts(getProductSlug)
  };
console.log(products)
  return (
    
     <div className="my-10 ">
      <div className="flex justify-between items-center py-3 px-3 border border-gray-300 lg:w-fit">
        <input className="" placeholder="Search..." />
        <CiSearch className="text-gray-400 w-10 h-6" />
      </div>
      <div>
        <p className="font-bold my-10">Categories</p>
        {getCategories?.result?.categories.map((categoryList) => (
          <div>
            <Link to={`/shop/${categoryList.name}`}>
              <button onClick={() => getCats(categoryList.name)}>
                <p className="text-[11px] font-semibold mb-2">
                  {categoryList.name} ({categoryList.number})
                </p>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesNav;
