import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MobileItemCheckoutCard = ({ id, quantity }) => {
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
    <>
      {
        loaded
          ?
          <div className='pt-8 flex flex-col gap-2'>
            <img src={`https://d2tty9970z28ut.cloudfront.net/${productInfo.image.key}`} alt={productInfo.name} />
            <div className='flex justify-between gap-4'>
              <p className='uppercase font-semibold'>Brand</p>
              <div className='flex flex-col items-end'>
                <p className='uppercase font-semibold'>{productInfo.brand} </p>
              </div>
            </div>
            <div className='flex justify-between gap-4'>
              <p className='uppercase font-semibold'>Name</p>
              <div className='flex flex-col items-end'>
                <p className='uppercase font-semibold'>{productInfo.name}</p>
              </div>
            </div>
            <div className='flex justify-between gap-4'>
              <p className='uppercase font-semibold'>Color</p>
              <div className='flex flex-col items-end'>
                <p>{capitalizeFirstLetter(productInfo.colorName)}</p>
              </div>
            </div>
            <div className='flex justify-between gap-4'>
              <p className='uppercase font-semibold'>Size</p>
              <div className='flex flex-col items-end'>
                <p>{productInfo.size}</p>
              </div>
            </div>
            <div className='flex justify-between gap-4'>
              <p className='uppercase font-semibold'>Each</p>
              <p>{Number(productInfo.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
            <div className='flex justify-between gap-4'>
              <p className='uppercase font-semibold'>Quantity</p>
              <p>{quantity}</p>
            </div>
            <div className='flex justify-between gap-4'>
              <p className='uppercase font-semibold'>Total</p>
              <p>{Number(productInfo.price * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
          </div>
          : null
      }
    </>
  )
}

export default MobileItemCheckoutCard