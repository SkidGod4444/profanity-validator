import { Profanity } from "../src/core";
import {ProfanityResolver} from "../src/resolver"

describe("ProfanityResolver", () => {
  let profanity: Profanity;
  let resolver: ReturnType<typeof ProfanityResolver>;

  beforeEach(() => {
    profanity = new Profanity({
      customWords: ["bad", "awful"],
      heat: 0.5,
    });
    resolver = ProfanityResolver(profanity);
  });

  it("Validates multiple fields, separates valid and profane fields", async () => {
    const values = {
      title: "Acceptable title",
      description: "This is a badword description",
    };
  
    const result = await resolver(values);
  
    expect(result).toEqual({
      values: { title: "Acceptable title" },
      errors: {
        description: { type: "profanity", message: "Content flagged for: bad" },
      },
    });
  });

  it("should only add errors to the profane fields", async () => {
    const values = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "This is a bad message",
    };

    const { values: validFields, errors } = await resolver(values);

    expect(validFields).toEqual({
      name: "John Doe",
      email: "johndoe@example.com",
    });
    expect(errors).toEqual({
      message: { type: "profanity", message: "Content flagged for: bad" },
    });
  });

  it("should not add errors if no profanity is detected", async () => {
    const values = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "This is a good message",
    };

    const { values: validFields, errors } = await resolver(values);

    expect(validFields).toEqual(values);
    expect(errors).toEqual({});
  });

  // it("should handle errors during validation", async () => {
  //   jest.spyOn(profanity, "checkApi" as keyof Profanity).mockRejectedValue(new Error("API request failed"));
  
  //   const values = {
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //     message: "This is a message",
  //   };
  
  //   const { values: validFields, errors } = await resolver(values);
  
  //   expect(validFields).toEqual(values);
  //   expect(errors).toEqual({
  //     message: { type: "profanity", message: "An error occurred while validating the field" },
  //   });
  // });

  it("should skip fields that are configured to be excluded", async () => {
    profanity = new Profanity({
      excludeFields: ["email"],
      customWords: ["bad", "awful"],
      heat: 0.5,
    });
    resolver = ProfanityResolver(profanity);
  
    const values = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "This is a bad message",
    };
  
    const { values: validFields, errors } = await resolver(values);
  
    expect(validFields).toEqual({
      name: "John Doe",
      email: "johndoe@example.com",
    });
    expect(errors).toEqual({
      message: { type: "profanity", message: "Content flagged for: bad" },
    });
  });

});