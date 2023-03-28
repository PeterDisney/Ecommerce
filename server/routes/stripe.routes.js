const StripeController = require('../controllers/stripe.controller');


module.exports = app => {
    app.get("/api/stripe/payment", StripeController.payment);
    app.get("/api/stripe/config", StripeController.config);
    app.post('/api/stripe/charge', StripeController.createPaymentIntent);
}
