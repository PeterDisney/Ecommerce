import React from 'react'


const ShippingAddressForm = ({ CheckoutChangeHandler }) => {
    return (
        <div>
            <p>Enter new shipping address below:</p>

            {/*---------- Shipping First Name ---------- */}
            <div className=' my-6'>
                <p className='text-md font-semibold mb-2 uppercase focus:bg-slate-50'>First Name*</p>
                <input onChange={CheckoutChangeHandler} type="text" name="shippingFirstName" className=' w-full p-3 border' />
            </div>
            {/*---------- Shipping Last Name ---------- */}
            <div className='mb-6'>
                <p className='text-md font-semibold mb-2 uppercase'>Last Name*</p>
                <input onChange={CheckoutChangeHandler} type="text" name="shippingLastName" className=' w-full p-3 border' />
            </div>
            {/*---------- Shipping Company ---------- */}
            <div className='mb-6'>
                <p className='text-md font-semibold mb-2 uppercase'>Company</p>
                <input onChange={CheckoutChangeHandler} type="text" name="shippingCompany" className=' w-full p-3 border' />
            </div>
            {/*---------- Shipping Address ---------- */}
            <div className='mb-6'>
                <p className='text-md font-semibold mb-2 uppercase'>Address*</p>
                <input onChange={CheckoutChangeHandler} type="text" name="shippingAddress" className=' w-full p-3 border' />
            </div>
            {/*---------- Shipping Address Line 2 ---------- */}
            <div className='mb-6'>
                <p className='text-md font-semibold mb-2 uppercase'>Address Line 2 (Optional)</p>
                <input onChange={CheckoutChangeHandler} type="text" name="shippingAddress2" className=' w-full p-3 border' />
            </div>
            {/*---------- Shipping City ---------- */}
            <div className='mb-6 flex'>
                <div className='mb-6 w-full mr-8'>
                    <p className='text-md font-semibold mb-2 uppercase'>City*</p>
                    <input onChange={CheckoutChangeHandler} type="text" name="shippingCity" className=' w-full p-3 border' />
                </div>
                {/*---------- Shipping State ---------- */}
                <div className='mb-6 w-full'>
                    <p className='text-md font-semibold mb-2 uppercase'>State*</p>
                    <select onChange={CheckoutChangeHandler} type="text" name='shippingState' className='mb-2 w-full p-3 border'>State*
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CT">Connecticut</option>
                        <option value="CO">Colorado</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisonsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
                </div>
            </div>
            {/*---------- Shipping Zip/Postal Code ---------- */}
            <div className='mb-6'>
                <p className='text-md font-semibold mb-2 uppercase'>Zip/Postal Code*</p>
                <input onChange={CheckoutChangeHandler} type="text" name="shippingZip" className=' w-full p-3 border' />
            </div>
        </div>
    )
}

ShippingAddressForm.propTypes = {}

export default ShippingAddressForm