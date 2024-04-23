import mongoose from "mongoose";

const emailSubscription = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isSubscribed: { type: Boolean },
});

export default mongoose.model("EmailSubscription", emailSubscription);
