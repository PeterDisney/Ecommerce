import React, { useState } from 'react'
import RedButton from '../GenericComponents/RedButton'
import SubCategoryFilter from './SubCategoryFilter'


const ProductForm = ({ title, subTitle, buttonText, submitFunction, productInfo, setProductInfo, errors}) => {
    const [inputValue, setInputValue] = useState('$0.00')

    const changeHandler = (e) => {
        setProductInfo((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.value
        }))
        console.log(productInfo)
    }
    
    const handlePriceChange = (e) => {
        let input = e.target.value.replace(/[^\d]/g, '');
        let cents = parseInt(input, 10);
        if (isNaN(cents)) {
            cents = 0;
        }

        let dollars = cents / 100;
        let formattedPrice = dollars.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        setProductInfo((previousState) => ({
            ...previousState,
            price: dollars
        }));
        setInputValue(formattedPrice);
        console.log(inputValue)
        console.log(productInfo.price)
    };


    const fileChangeHandler = (e) => {
        setProductInfo((previousState) => ({
            ...previousState,
            [e.target.name]: e.target.files[0]
        }))
    }

    return (
        <div className='max-w-screen-md mx-auto '>
            <form className='bg-white p-10' encType="multipart/form-data" onSubmit={submitFunction}>
                {/*----------- Product Form ------------ */}
                <h3 className='text-2xl my-4 uppercase'>{title}</h3>
                <p className=' mb-4 text-zinc-500'>{subTitle}</p>
                {
                    errors ?
                    errors.map((error) => (
                        <p className='text-red-600'>{error}</p>
                    ))
                    : null
                }

                {/*---------- Name ---------- */}
                <div className='mt-4 mb-6'>
                    <p className='text-md font-semibold mb-2 uppercase'>Name</p>
                    <input onChange={changeHandler} type="text" name="name" value={productInfo.name} className=' w-full p-3 border' />
                </div>

                {/*---------- Brand ---------- */}
                <div className='mb-6'>
                    <p className='text-md font-semibold mb-2 uppercase'>Brand</p>
                    <input onChange={changeHandler} type="text" name="brand" value={productInfo.brand} className=' w-full p-3 border' />
                </div>

                {/*---------- Description ---------- */}
                <div className=' mb-6'>
                    <p className='text-md font-semibold mb-2 uppercase focus:bg-slate-50'>Description</p>
                    <textarea onChange={changeHandler} type="textarea" name="description" value={productInfo.description} className='h-36 w-full text-start p-3 border ' />
                </div>

                {/*---------- Main Category ---------- */}
                <div className="md:flex gap-8">
                    <div className='mb-6 w-full'>
                        <p className='text-md font-semibold mb-2 uppercase' >Main Category</p>
                        <select onChange={changeHandler} name="mainCategory" value={productInfo.mainCategory} className=' w-full p-3 border' >
                            <option value="motorcycles">Motorcycles</option>
                            <option value="components">Components</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>

                    {/*---------- Sub Category ---------- */}
                    <div className='mb-6 w-full'>
                        <p className='text-md font-semibold mb-2 uppercase' >Sub Category</p>
                        <SubCategoryFilter changeHandler={changeHandler} productInfo={productInfo} setProductInfo={setProductInfo} />
                    </div>
                </div>

                {/*---------- Price ---------- */}
                <div className="md:flex gap-8">
                    <div className='mb-6 w-full'>
                        <p className='text-md font-semibold mb-2 uppercase'>Price</p>
                        <input onChange={handlePriceChange} type="text" name="price" value={inputValue} className='w-full p-3 border' />
                    </div>
                    {/*---------- Quantity ---------- */}
                    <div className='mb-6 w-full'>
                        <p className='text-md font-semibold mb-2 uppercase'>Quantity</p>
                        <input onChange={changeHandler} type="number" name="quantity" value={productInfo.quantity} className=' w-full p-3 border' />
                    </div>
                </div>

                {/*---------- Image ---------- */}
                <div className='mb-6'>
                    <p className='text-md font-semibold mb-2 uppercase'>Image</p>
                    <input onChange={fileChangeHandler} type="file" name="image" className=' w-full p-3 border' />
                </div>

                {/*---------- Color ---------- */}
                <div className="md:flex gap-8">
                    <div className='flex gap-8 w-full'>
                        <div className='mb-6'>
                            <p className='text-md font-semibold mb-2 uppercase'>Color</p>
                            <input onChange={changeHandler} type="color" name="color" value={productInfo.color} className=' w-full border h-3/5 p-1' />
                        </div>

                        {/*---------- Color Name ---------- */}
                        <div className='mb-6 w-full'>
                            <p className='text-md font-semibold mb-2 uppercase'>Color Name</p>
                            <input onChange={changeHandler} type="text" name="colorName" value={productInfo.colorName} className=' w-full p-3 border' />
                        </div>
                    </div>

                    {/*---------- Size ---------- */}
                    <div className='mb-6 w-full'>
                        <p className='text-md font-semibold mb-2 uppercase' >Size</p>
                        <input onChange={changeHandler} name="size" value={productInfo.size} className=' w-full p-3 border' />
                        {/* <input onChange={labelChangeHandler} name="label" value={productInfo.size.label} className=' w-full p-3 border' /> */}
                    </div>
                </div>
                <RedButton buttonText={buttonText} />


            </form>
        </div>
    )
}

export default ProductForm