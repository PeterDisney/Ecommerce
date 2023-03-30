import React from 'react'

const OrderSummary = ({ order }) => {
  return (
    <div className='bg-white rounded shadow p-4 flex flex-col'>
      {/* ----------- Order Summary Info --------------- */}
      <p className='text-xl mb-2 uppercase font-semibold'>Order Summary:</p>

      {/* ----------- Sub Total -------------- */}
      <div className='flex justify-between'>
        <p className='text-lg my-1'>Sub Total: </p>
        <p className='text-lg my-1' >{Number(order.subTotal.$numberDecimal).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
      {/* ----------- Shipping Cost -------------- */}

      <div className='flex justify-between'>
        <p className='text-lg my-1'>Shipping: </p>
        <p className='text-lg my-1' >{Number(order.shippingCost.$numberDecimal).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>

      {/* ----------- Tax -------------- */}
      <div className='flex justify-between'>
        <p className='text-lg my-1'>Tax: </p>
        <p className='text-lg my-1' >{Number(order.taxes.$numberDecimal).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
      {/* ----------- Total -------------- */}
      <div className='flex justify-between'>
        <p className='text-lg my-1'>Total: </p>
        <p className='text-lg my-1' >{Number(order.total.$numberDecimal).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
      </div>
    </div>
  )
}

export default OrderSummary