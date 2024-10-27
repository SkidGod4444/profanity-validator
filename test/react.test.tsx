import { Profanity } from "../src/core";
import {ProfanityResolver} from "../src/resolver"

describe("ProfanityResolver", () => {
  const config = { customWords: ["badword"], heat: 0.9 };
  const profanity = new Profanity(config);
  const resolver = ProfanityResolver(profanity);

  test("Validates multiple fields, separates valid and profane fields", async () => {
    const values = { title: "Acceptable title", description: "Contains badword" };
    const result = await resolver(values);

    expect(result).toEqual({
      values: { title: "Acceptable title" },
      errors: {
        description: { type: "profanity", message: "Content flagged for: badword" }
      }
    });
  });
});