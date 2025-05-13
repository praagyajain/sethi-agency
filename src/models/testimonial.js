// models/Testimonial.js
import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  image: String,
  quote: String,
  description: String,
  author: String,
  role: String,
});

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
