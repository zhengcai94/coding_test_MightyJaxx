import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 50,
    },
    SKU: {
      type: String,
      required: [true, "Please provide SKU"],
      maxlength: 50,
    },
    image: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      default: "other",
    },
    productLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
