const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: { type: String, required: true },
    restaurant: { type: String, required: true },
    items: [{ type: String, required: true }],
    status: { type: String, default: 'pending' },
    deliveryBoy: { type: Schema.Types.ObjectId, ref: 'Auth' },
    rejectionReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
