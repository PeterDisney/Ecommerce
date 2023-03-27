import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductFilterLinks from "./ProductFilterLinks";

const ProductFilters = () => {
  const { name } = useParams();
  console.log(useParams());

  const selected = (id) => {
    console.log(id);
    if (id === name) {
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
  );
};

export default ProductFilters;
