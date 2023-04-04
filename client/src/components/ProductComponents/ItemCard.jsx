import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ItemCard = ({
  id,
  decrementProductQuantity,
  incrementProductQuantity,
  quantity,
  removeItem,
}) => {
  const [productInfo, setProductInfo] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/product/view/${id}`
        );
        if (res.data.product) {
          console.log(res.data.product);
          let { product } = res.data;
          await setProductInfo((previousState) => ({
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
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const returnToProduct = () => {
    navigate(`/products/${id}`);
  };
// bg-white rounded shadow p-4
  return (
    <>
      {loaded ? (
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-2 sm:gap-4 xl:gap-8 col-span-1 sm:col-span-2 items-center p-4 bg-white rounded shadow">
          <div className="w-72 md:w-52 lg:w-60 xl:w-72 shrink-0">
            <div className="w-full relative pb-[56.25%]">
              <img
                className="cursor-pointer w-full h-full absolute object-cover"
                onClick={returnToProduct}
                src={`https://ds3rnipsrzco1.cloudfront.net/${productInfo.image.key}`}
                alt="cart item"
              />
            </div>
          </div>
          <div className="grow shrink-0 basis-1/3">
            <p className="cursor-pointer" onClick={returnToProduct}>
              {productInfo.brand} {productInfo.name}
            </p>
            <p>{capitalizeFirstLetter(productInfo.colorName)}</p>
            <p>{productInfo.size}</p>
          </div>
          <div className="shrink flex lg:flex-col gap-8 lg:gap-0">
            <div className="">
              <div className="flex align-center h-12 rounded-lg relative bg-transparent mt-1">
                <form onSubmit={(e) => decrementProductQuantity(e, id)}>
                  <button className="w-12 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full cursor-pointer outline-none">
                    -
                  </button>
                </form>
                <p className="w-12 p-3 focus:outline-none text-center font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default text-gray-700  outline-none">
                  {quantity}
                </p>
                <form onSubmit={(e) => incrementProductQuantity(e, id)}>
                  <button className="w-12 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full cursor-pointer">
                    +
                  </button>
                </form>
              </div>
              <form onSubmit={(e) => removeItem(e, id)}>
                <button>Remove</button>
              </form>
            </div>
            <p className="text-lg my-4 font-bold">
              {Number(productInfo.price * quantity).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ItemCard;
