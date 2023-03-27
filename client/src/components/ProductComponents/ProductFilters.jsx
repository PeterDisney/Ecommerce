import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductFilterLinks from "./ProductFilterLinks";

const ProductFilters = () => {
  const { name } = useParams();
  console.log(useParams());

  // Hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const selected = (category, name) => {
    console.log(category);
    if (category.name === name) {
      return "border-b-2 border-stone-800";
    }
    return "bg-white";
  };
  const categories = [
    {
      name: "motorcycles",
      text: "Motorcycles",
      subcategory: [
        {
          name: "street",
          text: "Street",
        },
        {
          name: "sport",
          text: "Sport",
        },
        {
          name: "sporttouring",
          text: "Sport Touring",
        },
        {
          name: "touring",
          text: "Touring",
        },
        {
          name: "naked",
          text: "Naked",
        },
        {
          name: "enduro",
          text: "Enduro",
        },
        {
          name: "adventure",
          text: "Adventure",
        },
        {
          name: "cruiser",
          text: "Cruiser",
        },
        {
          name: "caferacer",
          text: "Cafe Racer",
        },
        {
          name: "bobber",
          text: "Bobber",
        },
      ],
    },
    {
      name: "components",
      text: "Components",
      subcategory: [
        {
          name: "air&fuel",
          text: "Air & Fuel",
        },
        {
          name: "batteries",
          text: "Batteries",
        },
        {
          name: "body",
          text: "Body",
        },
        {
          name: "brakes",
          text: "Brakes",
        },
        {
          name: "drivetrain",
          text: "Drivetrain",
        },
        {
          name: "suspension",
          text: "Suspension",
        },
        {
          name: "exhaust",
          text: "Exhaust",
        },
        {
          name: "footcontrols",
          text: "Foot Controls",
        },
        {
          name: "tires",
          text: "Tires",
        },
        {
          name: "wheels",
          text: "Wheels",
        },
      ],
    },
    {
      name: "accessories",
      text: "Accessories",
      subcategory: [
        {
          name: "bags",
          text: "Bags",
        },
        {
          name: "electronics",
          text: "Electronics",
        },
        {
          name: "tools",
          text: "Tools",
        },
        {
          name: "hydration",
          text: "Hydration",
        },
        {
          name: "cleaning",
          text: "Cleaning",
        },
        {
          name: "ridinggear",
          text: "Riding Gear",
        },
      ],
    },
  ];
  return (
    <div className="bg-white rounded shadow row-span-full">
      <div className="lg">
        <button
          type="button"
          onClick={toggleMenu}
          className="relative w-full py-4 pl-4 pr-10 text-left text-2xl font-medium text-stone-800 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
        >
          <span className="sr-only">Filter products</span>
          <span className="block h-6 w-6">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className={`${isMenuOpen ? "hidden" : "block"} h-5 w-5`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M2.646 4.646a.5.5 0 01.708 0L10 10.293l6.646-6.647a.5.5 0 11.708.708l-7 7a.5.5 0 01-.708 0l-7-7a.5.5 0 010-.708z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className={`${isMenuOpen ? "block" : "hidden"} h-5 w-5`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3.293 4.293a1 1 0 011.414 0L10 9.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:block mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0 sm:w-fit`}
      >
    <div className="bg-white rounded shadow row-span-fit">
      <div>
        {categories.map((category) => (
          <React.Fragment>
            <ProductFilterLinks
              type="category"
              name={category.name}
              text={category.text}
              classes="text-2xl text-stone-800 ml-6 bg-transparent"
              selected={selected}
            />
            {category.subcategory.map((subcategory) => (
              <ProductFilterLinks
                type="subcategory"
                name={subcategory.name}
                text={subcategory.text}
                classes="text-xl text-stone-800 ml-10 bg-transparent"
                selected={selected}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
  </div>
  )
  
};

export default ProductFilters;
