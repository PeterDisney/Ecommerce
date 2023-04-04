import React from "react";
import { Link } from "react-router-dom";
import GrayButton from "../GenericComponents/GrayButton";
import ProductFilters from "./ProductFilters";

const ProductGrid = ({ allProducts, loaded, page, setPage, totalPages }) => {
  const pageLinks = () => {
    const links = []
    let i = 1
    while (i <= totalPages) {
      const pageNumber = i;
      links.push(
        pageNumber === page ?
          <p className="text-xl underline text-slate-500 cursor-pointer" key={i} onClick={() => setPage(pageNumber)}>{i}</p>
          : <p className="text-xl underline text-blue-700 cursor-pointer" key={i} onClick={() => setPage(pageNumber)}>{i}</p>
      )
      i++
    }
    return links
  }
  return (
    // Body
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 min-h-screen">
      <div className="max-w-screen-xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-3 md:grid-rows-3 sm:grid-rows-2 xsm:grid-rows-1 gap-10 p-4 ">
        <ProductFilters />
        {/* ------------Loop through all products-------------- */}
        {loaded ? allProducts.map((product, key) =>
          <div className="bg-white flex flex-col justify-between items-center rounded shadow p-4" key={key}>
            <div className="w-full relative pb-[56.25%]">
              <a href={`/products/${product._id}`}>
                <img className="w-full h-full absolute object-cover" src={`https://ds3rnipsrzco1.cloudfront.net/${product.image.key}`} alt={product.name} />
              </a>
            </div>
            <p className="text-center my-4">{product.brand} {product.name}</p>
            <p className="text-center my-4">{Number(product.price.$numberDecimal).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <form className="w-full" action={`/products/${product._id}`}>
              <GrayButton buttonText="View" />
            </form>
          </div>
        ) : null}
      </div>
      <div className="max-w-screen-xl mx-auto flex justify-end gap-1 w-full pr-4">
        {loaded ? pageLinks() : null}
      </div>
    </div>
  );
};

export default ProductGrid;
