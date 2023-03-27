import React from 'react'
import { FaMotorcycle } from 'react-icons/fa'

const CompanyLogo = ({linkRoute}) => {
  return (
    <a href={linkRoute} className='text-3xl font-bold bg-white rounded-md border-red-600 border-4 -skew-x-12 underline px-2 text-stone-800 min-w-max' > Moto <FaMotorcycle className='mb-1 underline' style={{display:"inline-block"}} /> Market</a>
  )
}

export default CompanyLogo