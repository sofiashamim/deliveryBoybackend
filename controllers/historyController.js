const Auth = require('../models/Auth');
const DeliveryBoy = require('../models/Auth');
const dummyDeliveryBoyId = 'dummyDeliveryBoyId';
const apiService = require('../utils/apiService');

// Get order history
exports.getOrderHistory = async (req, res) => {
    try {
        const {userId} = req.body;
    const { orderId } = req.params;
        const user = await Auth.findById(userId);
        // const order = await apiService.fetchAvailableOrders();
        const orderHistory = await Promise.all(user.orders.map(async (orderId) => {
            const order = await apiService.fetchOrderDetails(orderId.toString());
            return order;
        }));

        res.json(orderHistory);
       
        
  
      res.json(user.orders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
// Get earnings history
exports.getEarningsHistory = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await Auth.findById(userId);
        const earningHistory = await Promise.all(user.earnings.map(async (earningId) => {
            const earning = await apiService.fetchEarningDetails(earningId.toString());
            return earning;
        }));

        res.json({
            earningHistory
        });
       
            } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
};
