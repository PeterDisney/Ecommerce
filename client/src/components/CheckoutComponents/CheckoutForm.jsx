import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import CheckoutNav from './CheckoutNav';
import BillingInfo from './BillingInfo';
import ShippingAddressForm from './ShippingAddressForm';
import RedButton from '../GenericComponents/RedButton';
import { DeliveryMethod } from './DeliveryMethod';
import CreditCardForm from './CreditCardForm';
import CheckoutOrderSummary from './CheckoutOrderSummary';
import SameAddressCheckbox from './SameAddressCheckbox';
import { Elements } from 'react-stripe-elements';
import StripeProviderWrapper from '../StripeComponents/StripeProviderWrapper';
import Alert from '../GenericComponents/Alert';


const CheckoutForm = ({ cart, setCart }) => {
    const navigate = useNavigate()
    const [orderInfo, setOrderInfo] = useState({
        billing: {
            email: "",
            firstName: "",
            lastName: "",
            company: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: 0,
            phone: 0,
            sameAddress: true
        },
        shipping: {
            firstName: "",
            lastName: "",
            company: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: 0
        },
        status: 'pending',
        products: [],
        deliveryMethod: 'standard',
        shippingCost: 0.00,
        subTotal: 0.00,
        taxes: 0.00,
        total: 0.00
    })

    const [stripeInfo, setStripeInfo] = useState({
        number: 0,
        exp_month: "0",
        exp_year: 2023,
        cvc: 0
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let subTotalCalc = 0;
        for (let product of cart) {
            subTotalCalc += product['quantity'] * product['price'];
        }
        let costOfShipping = subTotalCalc > 2000 ? 0 : subTotalCalc * 0.017
        setOrderInfo((previousState) => ({
            ...previousState,
            products: cart,
            subTotal: subTotalCalc,
            shippingCost: costOfShipping,
            taxes: subTotalCalc * 0.08,
            total: subTotalCalc * 1.08
        }));
    }, [cart]);

    const lowercaseFirstLetter = (string) => {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    const CheckoutChangeHandler = (e) => {
        const { name, value } = e.target;
        // Update the appropriate object based on the input name
        if (name.startsWith('billing')) {
            setOrderInfo(previousState => ({
                ...previousState,
                billing: {
                    ...previousState.billing,
                    [lowercaseFirstLetter((name.substring(7)))]: value
                }
            }));
            if (orderInfo.billing.sameAddress && orderInfo.shipping.hasOwnProperty(lowercaseFirstLetter(name.substring(7)))) {
                setOrderInfo(previousState => ({
                    ...previousState,
                    shipping: {
                        ...previousState.shipping,
                        [lowercaseFirstLetter((name.substring(7)))]: value
                    }
                }));
            }
        } else if (name.startsWith('shipping')) {
            setOrderInfo(previousState => ({
                ...previousState,
                shipping: {
                    ...previousState.shipping,
                    [lowercaseFirstLetter((name.substring(8)))]: value
                }
            }));
        } else if (name.startsWith('stripe')) {
            setStripeInfo(previousState => ({
                ...previousState,
                [lowercaseFirstLetter((name.substring(6)))]: value
            }));
        } else {
            setOrderInfo(previousState => ({
                ...previousState,
                [name]: value
            }));
        }
        console.log(orderInfo)
        console.log(orderInfo.products)
    };

    const boolCheckboxHandler = (e) => {
        const bool = e.target.value === "true" ? true : false;
        setOrderInfo((previousState) => ({
            ...previousState,
            billing: {
                ...previousState.billing,
                [e.target.name]: bool
            }
        }))
        if (bool === true) {
            setOrderInfo((previousState) => ({
                ...previousState,
                shipping: {
                    firstName: orderInfo.billing.firstName,
                    lastName: orderInfo.billing.lastName,
                    company: orderInfo.billing.company,
                    address: orderInfo.billing.address,
                    address2: orderInfo.billing.address2,
                    city: orderInfo.billing.city,
                    state: orderInfo.billing.state,
                    zip: orderInfo.billing.zip
                }
            }))
        }
        if (bool === false) {
            setOrderInfo((previousState) => ({
                ...previousState,
                shipping: {
                    firstName: "",
                    lastName: "",
                    company: "",
                    address: "",
                    address2: "",
                    city: "",
                    state: "",
                    zip: 0
                }
            }))
        }
    }

    const deliveryMethodHandler = (e) => {
        const { name, value } = e.target;
        let costOfShipping = 0
        if (value === "economy") {
            costOfShipping = orderInfo.subTotal > 2000 ? 0 : orderInfo.subTotal * 0.013
        }
        if (value === "standard") {
            costOfShipping = orderInfo.subTotal > 2000 ? 0 : orderInfo.subTotal * 0.017
        }
        if (value === "twoDay") {
            costOfShipping = orderInfo.subTotal * 0.024
        }
        setOrderInfo((previousState) => ({
            ...previousState,
            [name]: value,
            shippingCost: costOfShipping
        }))
        console.log(orderInfo);
    }


    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            // Creating Payment Method using Card Element
            const { data } = await axios.post('http://localhost:8000/api/stripe/charge', {
                amount: Math.round(orderInfo.total * 100), // convert total to cents
                currency: "usd",
                cardElement: stripeInfo
            });
            console.log(data);

            setOrderInfo(previousState => ({
                ...previousState,
                status: "received"
            }));

            const updatedOrderInfo = {
                ...orderInfo,
                status: "received"
            }

            const res = await axios.post("http://localhost:8000/api/order", updatedOrderInfo);
            console.log(res);
            console.log(res.data);
            const orderId = res.data.orderId
            console.log(orderId);

            setCart([])

            navigate(`/order-confirmation/${orderId}`);
        } catch (error) {
            console.error(error);
            setErrors([error.response.data.error]);
        }
    };


    return (
        <StripeProviderWrapper>
            <>
                <CheckoutNav />
                <Elements>
                    <div className='max-w-screen-md mx-auto'>

                        <form onSubmit={submitHandler} className='bg-white p-10 ' action="">

                            {/*----------- Billing Information Form ------------ */}
                            <BillingInfo CheckoutChangeHandler={CheckoutChangeHandler} />

                            {/*----------- Shipping Address Same as Billing? ------------ */}
                            <SameAddressCheckbox boolCheckboxHandler={boolCheckboxHandler} orderInfo={orderInfo} />

                            {/*----------- Shipping Information Form ------------ */}
                            {
                                orderInfo.billing.sameAddress === true
                                    ? null
                                    : <ShippingAddressForm CheckoutChangeHandler={CheckoutChangeHandler} />
                            }

                            {/*----------- Shipping Type ------------ */}
                            <DeliveryMethod cart={cart} deliveryMethodHandler={deliveryMethodHandler} />

                            {/*----------- Credit Card Information ------------ */}
                            <CreditCardForm CheckoutChangeHandler={CheckoutChangeHandler} />
                            {/*----------- Product Cards/Order Summary ------------ */}
                            <CheckoutOrderSummary cart={cart} />
                            {
                                errors.length > 0 ?
                                    <Alert alertMessages={errors} />
                                    : null
                            }
                            <RedButton buttonText="Submit Your Order" />
                        </form>
                    </div>
                </Elements>
            </>
        </StripeProviderWrapper>
    )
}

export default CheckoutForm