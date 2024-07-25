const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    phoneOtp: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    onlineStatus: {
        type: Boolean,
        default: false,
    },
    orders: [{
        type: String,
        ref: 'Order',
    }],
    earnings: [{
        type: String,
        ref: 'Order',
    }],
    deliveryBoyId: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Auth', authSchema);
