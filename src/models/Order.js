import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userDetails: {
        type: Object,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// This prevents model overwrite issues in development.
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
