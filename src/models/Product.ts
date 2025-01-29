import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    d_1:{type: String, required: false},
    d_2:{type: String, required: false},
    d_3:{type: String, required: false},
    d_4:{type: String, required: false},
    d_5:{type: String, required: false},
    d_6:{type: String, required: false},
    price: { type: Number, required: true },
    oprice: { type: Number, required: true },
    category: { type: String, required: true },
    image_1: { type: String, required: true },
    image_2: { type: String, required: true },
    image_3: { type: String, required: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
