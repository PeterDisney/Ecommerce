import React, { useState } from 'react'
import axios from 'axios'
import AdminNavBar from '../components/AdminComponents/AdminNavBar'
import CheckoutNav from '../components/CheckoutComponents/CheckoutNav'
import RedButton from '../components/GenericComponents/RedButton'
import { useNavigate } from 'react-router-dom'

const AdminRegistration = () => {
  const navigate = useNavigate()
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) =>
    setRegistrationInfo((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }))

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/admin', registrationInfo, {
        withCredentials: true,
      })
      navigate("/dashboard/orders")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <AdminNavBar />
      <div className='mx-auto bg-gradient-to-br from-slate-50 to-stone-300 h-screen'>
        <form onSubmit={submitHandler} className='max-w-screen-md mx-auto bg-white p-10 '>
          <h3 className='text-2xl my-4 uppercase'>Admin Registration</h3>
          {/*---------- First Name ---------- */}
          <div className='mb-6'>
            <p className='text-md font-semibold mb-2 uppercase'>First Name</p>
            <input onChange={handleChange} type="text" name="firstName" className=' w-full p-3 border' />
          </div>
          {/*---------- Last Name ---------- */}
          <div className='mb-6'>
            <p className='text-md font-semibold mb-2 uppercase'>Last Name</p>
            <input onChange={handleChange} type="text" name="lastName" className=' w-full p-3 border' />
          </div>
          {/*---------- Email ---------- */}
          <div className='mb-6'>
            <p className='text-md font-semibold mb-2 uppercase'>Email</p>
            <input onChange={handleChange} type="email" name="email" className=' w-full p-3 border' />
          </div>
          {/*---------- Password ---------- */}
          <div className=' mb-6'>
            <p className='text-md font-semibold mb-2 uppercase focus:bg-slate-50'>Password</p>
            <input onChange={handleChange} type="password" name="password" className=' w-full p-3 border' />
          </div>
          {/*---------- Confirm Password ---------- */}
          <div className='mb-6'>
            <p className='text-md font-semibold mb-2 uppercase'>Confirm Password</p>
            <input onChange={handleChange} type="password" name="confirmPassword" className=' w-full p-3 border' />
          </div>
          <RedButton buttonText="Login" />
        </form>
      </div>
    </div>
  )
}

export default AdminRegistration