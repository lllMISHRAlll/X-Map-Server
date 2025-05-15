import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
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

const Location = mongoose.model("Location", locationSchema);

export { Location };
