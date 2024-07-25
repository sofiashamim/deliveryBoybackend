const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get available orders route
router.get('/available', orderController.getAvailableOrders);

// Get order details route
router.get('/:orderId', orderController.getOrderDetails);

// Accept order route
router.post('/:orderId/accept', orderController.acceptOrder);

// Reject order route
router.post('/:orderId/reject', orderController.rejectOrder);

// Start delivery routea
router.post('/:orderId/start', orderController.startDelivery);

// Finish delivery route
router.post('/:orderId/finish', orderController.finishDelivery);

module.exports = router;
