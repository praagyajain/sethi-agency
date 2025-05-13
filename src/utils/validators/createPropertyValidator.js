import Joi from "joi";

const propertySchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required(),
  price: Joi.number().required().positive(),
  type: Joi.string()
    .valid("Apartment", "House", "Commercial", "Plot")
    .required(),
  listingType: Joi.string().valid("Sale", "Rent", "Lease").required(),
  address: Joi.object({
    street: Joi.string().allow(null, ""),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  pincode: Joi.number().required(),
  coordinates: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
  details: Joi.object({
    noOfBedRoom: Joi.number().required(),
    noOfBathroom: Joi.number().required(),
  }).required(),
  yearBuilt: Joi.date().optional(),
  area: Joi.object({
    unit: Joi.string()
      .valid("sqft", "hectares", "sqm", "acres", "N/A")
      .default("N/A"),
    length: Joi.number().required(),
    breadth: Joi.number().required(),
    total: Joi.number().required(),
  }).required(),
  imageUrl: Joi.array()
    .items(
      Joi.object({
        URL: Joi.string().uri().optional(),
      }),
    )
    .optional(),
  tourVideoUrl: Joi.array()
    .items(
      Joi.object({
        URL: Joi.string().uri().optional(),
      }),
    )
    .optional(),
  status: Joi.string().valid("Active", "Sold").optional(),
});

export const validateProperty = (data) => {
  return propertySchema.validate(data, { abortEarly: false });
};
