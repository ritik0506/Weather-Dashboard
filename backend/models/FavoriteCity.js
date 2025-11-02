import mongoose from "mongoose";

const favoriteCitySchema = new mongoose.Schema({
  city: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

export default mongoose.model("FavoriteCity", favoriteCitySchema);
