import Joi from "joi";

export const validateContact = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().required(),
    number: Joi.string().pattern(/^\d+$/).required(),
    description: Joi.string().required(),
  });

  return schema.validate(data, { abortEarly: false });
};