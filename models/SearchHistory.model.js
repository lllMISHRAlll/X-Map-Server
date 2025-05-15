import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SearchHistory", searchSchema);
