import { Profanity } from "../src/core";

// Mocked fetch for testing purposes
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      isProfanity: true,
      flaggedFor: ["badword"],
      score: 0.95
    })
  })
) as jest.Mock;

describe("Profanity Class", () => {
  const config = { customWords: ["badword"], excludeFields: ["excludeMe"], heat: 0.9 };
  const profanity = new Profanity(config);

  test("API check flags profane content", async () => {
    const result = await profanity.validateField("This is a badword");
    expect(result).toEqual({ isValid: false, message: "Content flagged for: badword" });
  });

  test("Detect empty string value and return valid", async () => {
    const result = await profanity.validateField("");
    expect(result).toEqual({ isValid: true, message: 'Value is empty' });
  });

  test("Ignores fields in excludeFields", async () => {
    const validator = profanity.createValidator("excludeMe");
    expect(validator).toBeUndefined();
  });
});