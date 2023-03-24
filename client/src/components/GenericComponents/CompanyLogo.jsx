import React from 'react'
import { FaMotorcycle } from 'react-icons/fa'

const CompanyLogo = ({linkRoute}) => {
  return (
    <a href={linkRoute} className='text-3xl font-bold bg-white rounded-md border-slate-600 border-8 -skew-x-12 px-2 text-stone-800 min-w-max' > Moto <FaMotorcycle className='mb-1' style={{display:"inline-block"}} /> Market</a>
  )
}

export default CompanyLogo