import React from 'react'
import CheckoutItemCard from './CheckoutItemCard'
import MobileItemCheckoutCard from './MobileItemCheckoutCard'

const CheckoutOrderSummary = ({ cart }) => {
    return (
        <>
            <div className='hidden sm:block'>
                <div className="grid mb-2 gap-x-4 grid-cols-5 col-span-2">
                    <p className='col-span-3 uppercase font-semibold'>Item Description</p>
                    <div className='col-span-2 flex justify-between'>
                        <p className='uppercase font-semibold'>Each</p>
                        <p className='uppercase font-semibold'>Quantity</p>
                        <p className='uppercase font-semibold'>Total</p>
                    </div>
                </div>
                {cart.map((product, i) => (
                    <CheckoutItemCard key={i} id={product.product_id} quantity={product.quantity} />
                ))}
            </div>
            <div className=' sm:hidden'>
            <p className='col-span-3 uppercase text-xl font-semibold'>Items Summary</p>
                {cart.map((product, i) => (
                    <MobileItemCheckoutCard key={i} id={product.product_id} quantity={product.quantity} />
                ))}
            </div>
        </>
    )
}

export default CheckoutOrderSummary