import React from 'react'
import CheckoutForm from '../components/CheckoutComponents/CheckoutForm'
import StripePaymentForm from '../components/CheckoutComponents/StripePaymentForm'

const Checkout = ({ cart, setCart }) => {
  return (
    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 to-gray-300'>
      <CheckoutForm  cart={cart} setCart={setCart}/>
        {/* <StripePaymentForm /> */}
    </div>
  )
}

export default Checkout