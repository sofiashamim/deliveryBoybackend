const Auth = require('../models/Auth');
const DeliveryBoy = require('../models/Auth');
const apiService = require('../utils/apiService');
const dummyDeliveryBoyId = 'dummyDeliveryBoyId';
const mongoose = require('mongoose');
// Get available orders
exports.getAvailableOrders = async (req, res) => {
  try {
    // Fetch available orders from restaurant API
    const orders = await apiService.fetchAvailableOrders();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
    const { orderId, deliveryBoyId } = req.params;

    try {
        // Fetch order details from restaurant API using orderId
        const order = await apiService.fetchOrderDetails(orderId);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
// exports.acceptOrder = async (req, res) => {
//     const { orderId, deliveryBoyId } = req.params;
// console.log(orderId,deliveryBoyId)
//     try {
//         // Logic to accept order and update delivery boy's orders list
//         let deliveryBoy = await DeliveryBoy.findOne({ deliveryBoyId });

//         if (!deliveryBoy) {
//             return res.status(404).json({ error: 'Delivery boy not found' });
//         }

//         // Initialize orders array if undefined
//         if (!deliveryBoy.orders) {
//             deliveryBoy.orders = [];
//         }

//         // Check if order is already accepted
//         // if (deliveryBoy.orders.includes(orderId)) {
//         //     return res.status(400).json({ error: 'Order already accepted' });
//         // }

//         // Update delivery boy's orders list
//         deliveryBoy.orders.push(orderId);
//         await deliveryBoy.save();

//         res.json({ message: 'Order accepted successfully', deliveryBoy });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// };


exports.acceptOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      
        const order = await apiService.fetchOrderDetails(orderId);

        order.isAccepted = true;
        res.json({ message: 'Order accepted successfully',order });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Reject order
exports.rejectOrder = async (req, res) => {
    const { orderId } = req.params;
    const {reason} = req.body;
    try {
        const order = await apiService.fetchOrderDetails(orderId);

        order.status = false;
        order.rejectionReason=reason;
        res.json({ message: 'Order rejected successfully', order });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Start delivery
exports.startDelivery = async (req, res) => {
    const { orderId, deliveryBoyId } = req.params;

    try {
        // Logic to mark order as started for delivery
        let deliveryBoy = await DeliveryBoy.findOne({ deliveryBoyId });

        if (!deliveryBoy) {
            return res.status(404).json({ error: 'Delivery boy not found' });
        }

        // Check if delivery boy has accepted the order
        // if (!deliveryBoy.orders.includes(orderId)) {
        //     return res.status(400).json({ error: 'Delivery boy has not accepted this order' });
        // }

        // Perform start delivery actions
        // Simulated action: Update order status to 'In Progress'
        const order = await apiService.fetchOrderDetails(orderId); // Fetch order details
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        order.status = 'In Progress'; // Update order status
        // Save the updated order status
        await apiService.updateOrder(orderId, order);

        res.json({ message: 'Delivery started successfully', deliveryBoy });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Finish delivery
exports.finishDelivery = async (req, res) => {
    const { orderId } = req.params;
    try {
        const {userId} = req.body;
        const user = await Auth.findById(userId);
        console.log(req.body,req.params,user)
            user.orders.push(orderId);
            user.earnings.push(orderId);
        const order = await apiService.fetchOrderDetails(orderId);
        order.isAccepted = true;
        order.status = "delivered";
        await user.save();


        res.json({ message: `Congratulation,you have successfully delivered order ${orderId}`, });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const logoutUser = async (req, res) => {
  const { userId } = req.params; // Assuming you pass userId as a route parameter

  try {
    // Find the user by userId
    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update onlineStatus to false
    user.onlineStatus = false;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error('Error logging out user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
