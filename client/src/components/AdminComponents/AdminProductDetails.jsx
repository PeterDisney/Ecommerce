import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductDescription from "../ProductComponents/ProductDescription";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: "",
    brand: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    price: 0.0,
    quantity: 0,
    quantitySold: 0,
    image: "",
    color: "",
    size: "xsm",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/view/${id}`)
      .then((res) => {
        let { product } = res.data;
        setProductInfo((previousState) => ({
          ...previousState,
          name: product.name,
          brand: product.brand,
          description: product.description,
          mainCategory: product.mainCategory,
          subCategory: product.subCategory,
          price: product.price.$numberDecimal,
          quantity: product.quantity,
          quantitySold: product.quantitySold,
          color: product.color,
          colorName: product.colorName,
          size: product.size,
          image: product.image,
        }));
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    // Body
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 p-2 min-h-screen">
      {loaded ? (
        <div className="max-w-screen-xl mx-auto grid  sm:grid-cols-3 lg:grid-cols-4 rounded shadow ">
          {/* -------- Product Image -------- */}
          <div className="bg-white col-span-1 sm:col-span-2 lg:col-span-3 items-center p-8 min-h-full">
            <img
              src={`https://ds3rnipsrzco1.cloudfront.net/${productInfo.image.key}`}
              className="w-full h-full absolute object-scale-down"
              alt={productInfo.name}
            />
          </div>

          {/* ------------- Summary --------------- */}
          <div className="bg-white flex flex-col  p-8">
            <p className="text-2xl my-4">{productInfo.brand}</p>
            <h2 className="text-3xl font-bold uppercase">{productInfo.name}</h2>
            <p className="text-xl my-4">${productInfo.price}</p>

            <div class="flex gap-4">
              {/* Color Picker */}
              <div>
                <p className="font-semibold">Color:</p>
                <div
                  className="h-14 m-2 border-2 flex justify-center items-center p-6"
                >{productInfo.colorName}</div>
              </div>

              {/*  Size */}
              <div>
                <p className="font-semibold">Size:</p>
                <div className="h-14 m-2 border-2 flex justify-center items-center p-6 min-w-max">
                  {productInfo.size}
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold">Inventory:</p>
              <p className="h-14 w-14 m-2 border-2 flex justify-center items-center p-6">
                {productInfo.quantity}
              </p>
            </div>

            {/* Main category */}
            <p className="font-semibold">Category:</p>
            <div className="flex">
              <div className="h-14 m-2 border-2 flex justify-center items-center p-6">
                {productInfo.mainCategory}
              </div>
            </div>

            {/*  Size */}
            <p className="font-semibold">Sub Category:</p>
            <div className="flex mb-4">
              <div className="h-14 m-2 border-2 flex justify-center items-center p-6">
                {productInfo.subCategory}
              </div>
            </div>
          </div>

          {/* ------------ Description -------------- */}
          <div className="bg-white col-span-1 sm:col-span-3 p-8 lg:col-span-4 ">
            <h2 className="text-3xl font-semibold my-4 uppercase">
              {productInfo.name}
            </h2>
            <p className="text-xl font-semibold mb-1">Description:</p>
            <ProductDescription description={productInfo.description} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminProductDetails;
