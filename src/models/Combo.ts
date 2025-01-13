import mongoose from "mongoose";

const comboSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image_1: { type: String, required: true },
    image_2: { type: String, required: true },
    image_3: { type: String, required: true },
  },
  { timestamps: true }
);

const Combo =
  mongoose.models.Combo || mongoose.model("Combo", comboSchema);
export default Combo;
