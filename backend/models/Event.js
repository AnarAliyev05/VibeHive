import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tədbiri yaradan mekan
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Tədbirə qoşulan insanlar
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
