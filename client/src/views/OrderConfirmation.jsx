import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import OrderShippingAddressCard from '../components/AdminComponents/OrderShippingAddressCard';
import OrderBillingAddressCard from '../components/AdminComponents/OrderBillingAddressCard';
import OrderSummary from '../components/AdminComponents/AdminOrderSummary';
import Navbar from '../components/GenericComponents/Navbar';
import CheckoutOrderSummary from '../components/CheckoutComponents/CheckoutOrderSummary';


const OrderConfirmation = () => {
  const [order, setOrder] = useState({})
  const [loaded, setLoaded] = useState()
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/order/${id}`)
      .then(res => {
        let { order } = res.data
        let { billing, shipping } = res.data.order
        setOrder((previousState) => ({
          ...previousState,
          billing: {
            email: billing.email,
            firstName: billing.firstName,
            lastName: billing.lastName,
            company: billing.company,
            address: billing.address,
            address2: billing.address2,
            city: billing.city,
            state: billing.state,
            zip: billing.zip,
            phone: billing.phone,
            sameAddress: billing.sameAddress
          },
          shipping: {
            firstName: shipping.firstName,
            lastName: shipping.lastName,
            company: shipping.company,
            address: shipping.address,
            address2: shipping.address2,
            city: shipping.city,
            state: shipping.state,
            zip: shipping.zip,
          },
          id: order._id,
          status: order.status,
          products: order.products,
          deliveryMethod: order.deliveryMethod,
          shippingCost: order.shippingCost,
          subTotal: order.subTotal,
          taxes: order.taxes,
          total: order.total
        }));
        setLoaded(true);
      })
      .catch(error => {
        console.log('Error:', error);
        console.log('Request payload:', error.config.data);
        console.log('Endpoint:', error.config.url);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-br from-slate-50 to-stone-300 min-h-screen '>
        {/* ----------- Order Summary --------------- */}
        {
          loaded ?
            <div className=' max-w-screen-xl mx-auto p-4'>
              <h2 className='text-2xl mb-4 mr-6 uppercase'>Congratulations, your order was received!</h2>
              <div className='flex justify-between items-center flex-wrap '>
                <h2 className='text-lg mb-4 mr-6'><span className='uppercase'>Order Number:</span> {order.id}</h2>
                <p className='text-lg mb-4'>
                  <span className='uppercase'>Order Status: </span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>
              <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-y-7 gap-x-14 lg:gap-x-7'>
                <OrderShippingAddressCard order={order} />
                <OrderBillingAddressCard order={order} />
                <div className='bg-white rounded shadow p-4 col-span-1 md:col-span-2 '>
                  <CheckoutOrderSummary cart={order.products} />
                </div>
                <OrderSummary order={order} />
              </div>
            </div>
            : null
        }
      </div>
    </>
  )
}

export default OrderConfirmation