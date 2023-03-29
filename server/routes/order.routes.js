const OrderController = require('../controllers/order.controller');
const { check } = require('express-validator');


module.exports = app => {
    app.get('/api/order/view/:page', OrderController.getAllOrders);
    app.get('/api/order/:id', check('id').isMongoId(), OrderController.findoneSingleOrder);
    app.get('/api/order/search/:searchTerm/:page', OrderController.searchOrders);
    app.post('/api/order', OrderController.createNewOrder);
    app.put('/api/order/:id', OrderController.updateExistingOrder);
    app.delete('/api/order/:id', OrderController.deleteAnExistingOrder);
}