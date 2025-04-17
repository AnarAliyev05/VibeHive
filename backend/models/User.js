import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["person", "venue","admin"], required: true }, // Person və Venue
  address: { type: String, required: function() { return this.role === 'venue'; } }, // Yalnız venue üçün
  phone: { type: String, required: function() { return this.role === 'venue'; } },   // Yalnız venue üçün
  workingHours: { type: String, required: function() { return this.role === 'venue'; } }  // Yalnız venue üçün
});

export default mongoose.model("User", userSchema);