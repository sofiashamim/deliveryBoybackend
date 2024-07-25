const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Get order history route
router.post('/orderhistory', historyController.getOrderHistory);

// Get earnings history route
router.post('/earningshistory', historyController.getEarningsHistory);

module.exports = router;
