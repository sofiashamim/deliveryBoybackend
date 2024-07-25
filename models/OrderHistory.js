const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderHistorySchema = new Schema({
    // deliveryBoy: { type: Schema.Types.ObjectId, ref: 'Auth', required: true },
    // order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    status: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('OrderHistory', orderHistorySchema);
