const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliveryBoySchema = new Schema({
    deliveryBoyId: { type: String, required: true, unique: true },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneOtp: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  onlineStatus: {
    type: Boolean,
    default: false
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  earnings: [{
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

const DeliveryBoy = mongoose.model('DeliveryBoy', deliveryBoySchema);

module.exports = DeliveryBoy;
