import { Profanity } from "./core";

export const ProfanityResolver = (profanity: Profanity) => {
  return async (values: Record<string, any>) => {
    const errors: Record<string, any> = {};
    const validFields: Record<string, any> = {};

    await Promise.all(
      Object.entries(values).map(async ([field, value]) => {
        const validator = profanity.createValidator(field);
        if (!validator) return;

        const result = await validator(String(value));
        if (result.isValid === true) {
          validFields[field] = value;  // Populate validFields for valid fields
        } else {
          errors[field] = { type: 'profanity', message: result.message };
        }
      })
    );

    return { values: validFields, errors };
  };
};

