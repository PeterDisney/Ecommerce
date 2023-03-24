const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            minLength: [3, 'Name must be at least {MINLENGTH} characters.']
        },
        brand: {
            type: String,
            required: [true, 'Brand is required.'],
            minLength: [3, 'Brand must be at least {MINLENGTH} characters.']
        },
        description: {
            type: String,
            required: [true, 'Description is required.'],
            minLength: [10, 'Description must be at least {MINLENGTH} characters.'],
            maxLength: [3000, 'Description must be at least {MINLENGTH} characters.']
        },
        mainCategory: {
            type: String,
            required: [true, 'Main Category is required.'],
            minLength: [3, 'Main Category must be at least {MINLENGTH} characters.']
        },
        subCategory: {
            type: String,
            required: [true, 'Sub Category is required.'],
            minLength: [3, 'Sub Category must be at least {MINLENGTH} characters.']
        },
        price: {
            type: mongoose.Decimal128,
            required: [true, 'Price is required.'],
            min: [0.01, 'Price must be more than $0.00']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required.'],
            min: [0, 'Quantity must be 0 or greater.']
        },
        quantitySold: {
            type: Number,
            required: [true, 'Quantity Sold is required.'],
            min: [0, 'Quantity Sold must be 0 or greater.']
        },
        color: {
            type: String,
            required: [true, 'Color is required.'],
            minLength: [1, 'Color must be at least {MINLENGTH} characters.']
        },
        colorName: {
            type: String,
            required: [true, 'Color Name is required.'],
            minLength: [3, 'Color Name must be at least {MINLENGTH} characters.']
        },
        size: {
                type: String,
                required: [true, 'Size is required.'],
                minLength: [1, 'Size must be at least {MINLENGTH} characters.']
        },
        image: {}
    },
    { timestamps: true });


const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;