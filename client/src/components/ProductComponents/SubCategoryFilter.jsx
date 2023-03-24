import React, {useEffect} from 'react'

const SubCategoryFilter = ({changeHandler, productInfo}) => {

    
      if (productInfo.mainCategory === "motorcycles") {
          return (
              <select onChange={ changeHandler } name="subCategory" value={productInfo.subCategory} className=' w-full p-3 border' >
                  <option value="street">Street</option>
                  <option value="sport">Sport</option>
                  <option value="sporttouring">Sport Touring</option>
                  <option value="touring">Touring</option>
                  <option value="naked">Naked</option>
                  <option value="enduro">Enduro</option>
                  <option value="adventure">Adventure</option>
                  <option value="cruiser">Cruiser</option>
                  <option value="caferacer">Cafe Racer</option>
                  <option value="bobber">Bobber</option>
              </select>
          )
      }
      if (productInfo.mainCategory === "components") {
          return (
              <select onChange={ changeHandler } name="subCategory" value={productInfo.subCategory} className=' w-full p-3 border' >
                  <option value="air&fuel">Air & Fuel</option>
                  <option value="batteries">Batteries</option>
                  <option value="body">Body</option>
                  <option value="brakes">Brakes</option>
                  <option value="drivetrain">Drivetrain</option>
                  <option value="suspension">Suspension</option>
                  <option value="exhaust">Exhaust</option>
                  <option value="footcontrols">Foot Controls</option>
                  <option value="tires">Tires</option>
                  <option value="wheels">Wheels</option>
              </select>
          )
      }
      if (productInfo.mainCategory === "accessories") {
          return (
              <select onChange={ changeHandler } name="subCategory" value={productInfo.subCategory} className=' w-full p-3 border' >
                  <option value="bags">Bags</option>
                  <option value="electronics">Electronics</option>
                  <option value="tools">Tools</option>
                  <option value="hydration">Hydration</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="ridinggear">Riding Gear</option>
              </select>
          )
      }
  }

export default SubCategoryFilter
