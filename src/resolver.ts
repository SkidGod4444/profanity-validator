import { Profanity } from "./core";

export const ProfanityResolver = (profanity: Profanity) => {
  return async (values: Record<string, any>) => {
    const errors: Record<string, any> = {};
    const validFields: Record<string, any> = {};

    await Promise.all(
      Object.entries(values).map(async ([field, value]) => {
        const validator = profanity.createValidator(field);
        if (!validator) {
          validFields[field] = value;
          return;
        }

        try {
          const result = await validator(String(value));
          if (result.isValid === true) {
            validFields[field] = value;
          } else {
            errors[field] = { type: 'profanity', message: result.message };
          }
        } catch (error) {
          console.error(`Error validating field "${field}":`, error);
          errors[field] = { type: 'profanity', message: 'An error occurred while validating the field' };
        }
      })
    );

    return { values: validFields, errors: Object.keys(errors).length > 0 ? errors : {} };
  };
};