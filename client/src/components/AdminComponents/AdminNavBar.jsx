import React from 'react'
import axios from 'axios'
import CompanyLogo from '../GenericComponents/CompanyLogo'
import { useNavigate } from 'react-router-dom'


const AdminNavBar = () => {
  const navigate = useNavigate()

  const logout = () => {
    axios.post('http://localhost:8000/admin/logout', {}, {
      withCredentials: true,
    })
      .then(res => {
        console.log(res)
        navigate('/admin')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className=' w-full text-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black'>
      <div className=' mx-auto max-w-screen-xl w-full flex justify-center sm:justify-between items-center py-2 px-4  text-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black font-body flex-wrap'>

        {/*----------- Company Logo ------------ */}
        <CompanyLogo linkRoute='/dashboard/orders' />

        {/* ------------- Links ----------------- */}

        <ul className='flex items-center gap-4 '>

          {/* -------------- Orders Link --------------- */}

          <li className='py-4 text-white'>
            <a href="/dashboard/orders">Orders</a>
          </li>

          {/* ----------- Products Link -------------- */}

          <li className='py-4 text-white'>
            <a href="/dashboard/products">Products</a>
          </li>

          {/* ------------- Logout Link ------------- */}

          <li className='py-4 text-white'>
            <p className='cursor-pointer' onClick={logout}>Logout</p>
          </li>

        </ul>
      </div>
    </div >
  )
}

export default AdminNavBar