import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: {
    type: String,
    enum: ["Apartment", "House", "Commercial", "Plot"],
    required: true,
  },
  listingType: {
    type: String,
    enum: ["Sale", "Rent", "Lease"],
    required: true,
  },
  address: {
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  pincode: { type: Number, required: true },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  details: {
    noOfBedRoom: { type: Number },
    noOfBathroom: { type: Number },
  },
  yearBuilt: { type: Date },
  area: {
    unit: {
      type: String,
      enum: ["sqft", "hectares", "sqm", "acres", "N/A"],
      default: "N/A",
    },
    length: { type: Number },
    breadth: { type: Number },
    total: { type: Number },
  },
  imageUrl: [{ URL: { type: String } }],
  tourVideoUrl: [{ URL: { type: String } }],
  status: {
    type: String,
    enum: ["Active", "Sold"],
    default: "Active",
  },
});

export default mongoose.models.Property ||
  mongoose.model("Property", propertySchema);
