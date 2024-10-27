import { Profanity } from "./core";

export const ProfanityResolver = (profanity: Profanity) => {
  return async (values: Record<string, any>) => {
    const errors: Record<string, any> = {};
    const validFields: Record<string, any> = {};

    await Promise.all(
      Object.entries(values).map(async ([field, value]) => {
        const result = await profanity.validateField(String(value));
        if (result === true) {
          validFields[field] = value;
        } else {
          errors[field] = {
            type: 'profanity',
            message: result
          };
        }
      })
    );

    // console.log("Valid Fields:", validFields);
    // console.log("Errors:", errors);

    return {
      values: validFields,
      errors
    };
  };
};
