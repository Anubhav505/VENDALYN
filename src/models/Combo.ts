import mongoose from "mongoose";

const comboSchema = new mongoose.Schema(
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
    image_1: { type: String, required: true },
    image_2: { type: String, required: true },
    image_3: { type: String, required: true },
  },
  { timestamps: true }
);

const Combo =
  mongoose.models.Combo || mongoose.model("Combo", comboSchema);
export default Combo;
