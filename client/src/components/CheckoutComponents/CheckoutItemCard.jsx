import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CheckoutItemCard = ({ id, quantity }) => {
  const [loaded, setLoaded] = useState(false);
  const [productInfo, setProductInfo] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:8000/api/product/view/${id}`)
      .then(res => {
        let { product } = res.data
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
          image: product.image
        }));
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="grid mb-4 grid-cols-5 gap-x-4">
      {
        loaded
          ? <>
            <div className="col-span-3 flex gap-2">
              <div className='w-32 shrink-0 p-4'>
                <div className='w-full relative pb-[56.25%]'>
                  <img className='w-full h-full absolute object-cover' src={`https://ds3rnipsrzco1.cloudfront.net/${productInfo.image.key}`} alt="cart item" />
                </div>
              </div>
              <div>
                <p className='uppercase font-semibold'>{productInfo.brand} {productInfo.name}</p>
                {/* eventually generate color productInfo.color? */}
                <p>{capitalizeFirstLetter(productInfo.colorName)}</p>
                <p>{productInfo.size}</p>
              </div>
            </div>
            <div className='col-span-2 flex justify-between'>
              <p>{Number(productInfo.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p>{quantity}</p>
              <p>{Number(productInfo.price * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
          </>
          : null
      }
    </div>
  )
}

export default CheckoutItemCard