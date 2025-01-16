import mongoose, { Document, Schema, Model } from "mongoose";

export interface ShipmentDocument extends Document {
  product_name: string;
  price: number;
  size: string;
  user_name: string;
  user_contact: string;
  user_email: string;
  address: string;
  pin_code: string;
  payment: "razorpay" | "cod"; // New field to store payment method
  createdAt: Date;
  updatedAt: Date;
}

const ShipmentSchema: Schema = new Schema<ShipmentDocument>(
  {
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    user_name: { type: String, required: true },
    user_contact: { type: String, required: true },
    user_email: { type: String, required: true },
    address: { type: String, required: true },
    pin_code: { type: String, required: true },
    payment: { type: String, required: true }, // Payment method field
  },
  { timestamps: true }
);

export const Shipment: Model<ShipmentDocument> =
  mongoose.models.Shipment ||
  mongoose.model<ShipmentDocument>("Shipment", ShipmentSchema);
