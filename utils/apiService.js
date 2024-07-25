const dummyData = {
    orders: [
      {
        orderId: '1',
        paymentMethod: 'Credit Card',
        totalPayment: 25.99,
        restaurantLocation: '123 Main St, City, State',
        deliveryLocation: '456 Elm St, City, State'
      },
      {
        orderId: '2',
        paymentMethod: 'Cash on Delivery',
        totalPayment: 15.75,
        restaurantLocation: '789 Oak St, City, State',
        deliveryLocation: '890 Pine St, City, State'
      }
      // Add more dummy orders as needed
    ],
    orderDetails: {
      '1': {
        orderId: '1',
        foodItems: [
          { name: 'Pizza', cost: 12.99 },
          { name: 'Salad', cost: 8.99 },
          { name: 'Drink', cost: 4.01 }
        ],
        deliveryCharge: 2.00,
        total: 25.99,
        restaurantLocation: '123 Main St, City, State',
        deliveryLocation: '456 Elm St, City, State',
        customerName: 'John Doe',
        customerMobile: '123-456-7890',
        paymentMethod: 'Credit Card',
        isAccepted: false,
        status: "not-started",
        rejectionReason:""
      },
      '2': {
        orderId: '2',
        foodItems: [
          { name: 'Burger', cost: 10.00 },
          { name: 'Fries', cost: 5.50 }
        ],
        deliveryCharge: 0.25,
        total: 15.75,
        restaurantLocation: '789 Oak St, City, State',
        deliveryLocation: '890 Pine St, City, State',
        customerName: 'Jane Smith',
        customerMobile: '987-654-3210',
        paymentMethod: 'Cash on Delivery',
        isAccepted: false,
        status: "not-started",
        rejectionReason:""

      }
      // Add more dummy order details as needed
    }
  };
 async function fetchEarningDetails (earningId){
    // Simulate fetching earning details from an API or database
    const earnings = [
        {
            earningId: '1',
            amount: 50.00,
            date: '2024-07-20',
            orderId: '1'
        },
        {
            earningId: '2',
            amount: 30.75,
            date: '2024-07-21',
            orderId: '2'
        }
        // Add more dummy earnings as needed
    ];

    return earnings.find(earning => earning.earningId === earningId);
};
  
  // Function to fetch available orders (dummy data)
  async function fetchAvailableOrders() {
    try {
      // Return all orders
      return dummyData.orders;
    } catch (error) {
      console.error('Error fetching available orders:', error);
      throw error;
    }
  }
  
  // Function to fetch order details by orderId (dummy data)
  async function fetchOrderDetails(orderId) {
    try {
      // Return order details for the specified orderId
      return dummyData.orderDetails[orderId];
    } catch (error) {
      console.error(`Error fetching order details for orderId ${orderId}:`, error);
      throw error;
    }
  }
  
  // Export functions to be used in controllers
  module.exports = {
    fetchAvailableOrders,
    fetchOrderDetails,
    fetchEarningDetails
  };
  