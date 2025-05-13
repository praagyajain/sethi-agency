import Joi from "joi";

const updatePropertySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  cost: Joi.number().optional(),
  type: Joi.string()
    .valid("Apartment", "House", "Commercial", "Plot")
    .optional(),
  listingType: Joi.string().valid("Sale", "Rent", "Lease").optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
  pincode: Joi.string().optional(),
  coordinates: Joi.object({
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
  }).optional(),
  moreDetails: Joi.object({
    noOfBedRoom: Joi.number().optional(),
    noOfBathroom: Joi.number().optional(),
  }).optional(),
  yearBuilt: Joi.number().optional(),
  area: Joi.object({
    unit: Joi.string().valid("sqft", "hectares", "sqm", "acres").optional(),
    length: Joi.number().optional(),
    breadth: Joi.number().optional(),
    totalArea: Joi.number().optional(),
  }).optional(),
  imageUrl: Joi.string().uri().optional(),
  tourVideoUrl: Joi.string().uri().optional(),
});

export function updatePropertyValidator(data) {
  return updatePropertySchema.validate(data, { abortEarly: false });
}
