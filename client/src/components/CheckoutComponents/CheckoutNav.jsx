import React from 'react'
import CompanyLogo from '../GenericComponents/CompanyLogo'

const CheckoutNav = (props) => {
    return (
        <div className='w-full flex justify-center items-center py-2 px-8 2xl:px-72 text-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black font-body flex-wrap'>

            {/*----------- Company Logo ------------ */}
            <CompanyLogo linkRoute='/'/>
        </div>
    )
}

export default CheckoutNav