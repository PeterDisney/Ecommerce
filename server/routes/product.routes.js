const ProductController = require('../controllers/products.controller');
const upload = require('../config/multer.config')


module.exports = app => {
    app.get('/api/product/:page', ProductController.getAllProducts);
    app.get('/api/product/view/:id', ProductController.findoneSingleProduct);
    app.get('/api/product/search/:searchTerm/:page', ProductController.searchProducts);
    app.post('/api/product',  upload.single('image'),  ProductController.createNewProduct);
    app.put('/api/product/:id', upload.single('image'), ProductController.updateExistingProduct);
    app.delete('/api/product/:id', ProductController.deleteAnExistingProduct);
    app.get('/api/product/categories', ProductController.getCategories);
    app.get('/api/product/:type/:name/:page', ProductController.getByMainOrSubCategory);
}