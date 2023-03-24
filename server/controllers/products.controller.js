const Orders = require("../models/order.model");
const Products = require("../models/product.model")
const productQueries = require('../queries/product.queries')

const PAGE_SIZE = 9;

// Read All
module.exports.getAllProducts = async (req, res) => {
  const page = req.params.page ? parseInt(req.params.page) : 1;
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const totalDocs = await Products.countDocuments();
    const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

    const products = await Products.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(PAGE_SIZE);

    res.json({ products, page, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Find one
module.exports.findoneSingleProduct = (req, res) => {
  Products.findOne({ _id: req.params.id })
    .then(oneSingleProduct => res.json({ product: oneSingleProduct }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

//  Create
module.exports.createNewProduct = async (req, res) => {
  console.log(req.body, req.file)
  const product = {
    ...req.body,
    image: req.file
  }
  const newProduct = new Products(product);

  try {
    newProduct.validateSync();
    await newProduct.save()
    res.status(201).json({
      message: 'Product created successfully',
      product
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Validation failed',
      errors: error.errors
    });
  }
}

// Update
module.exports.updateExistingProduct = (req, res) => {
  req.body = {
    ...req.body,
    image: req.file,
  }
  Products.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )
    .then(updatedProduct => res.json({ product: updatedProduct }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

// Delete
module.exports.deleteAnExistingProduct = (req, res) => {
  Products.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

// Get mainCategory and subCategories
module.exports.getCategories = (req, res) => {
  productQueries.getCategories()
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};

// Get products by category or subcategory
module.exports.getByMainOrSubCategory = async (req, res) => {
  const { type, name, page } = req.params
  const offset = (page - 1) * PAGE_SIZE;

  try {
    if (type === 'category') {
      const totalDocs = await Products.find({ mainCategory: name }).countDocuments();
      const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

      const products = await Products.find({ mainCategory: name })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(PAGE_SIZE);

      res.json({ products, page, totalPages });

    } else if (type === 'subcategory') {

      const totalDocs = await Products.find({ subCategory: name }).countDocuments();
      const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

      const products = await Products.find({ subCategory: name })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(PAGE_SIZE);

      res.json({ products, page, totalPages });
    } else {
      res.status(400).send('Invalid parameter');
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
}


// Search
module.exports.searchProducts = async (req, res) => {
  const { searchTerm, page } = req.params;
  const regex = new RegExp(searchTerm, 'i');
  const offset = (page -1) * PAGE_SIZE;
  
  const searchAttributes = [
        { 'name': regex },
        { 'brand': regex },
        { 'mainCategory': regex },
        { 'subCategory': regex },
      ]
  try {
    const totalDocs = await Products.find({$or: searchAttributes}).countDocuments()
    const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

    const products = await Products.find({ $or: searchAttributes})
    .sort({ createdAt: -1})
    .skip(offset)
    .limit(PAGE_SIZE);

    res.json({ products, page, totalPages });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};