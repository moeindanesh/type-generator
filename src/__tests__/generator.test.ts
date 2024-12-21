import { describe, test, expect } from "bun:test";
import { generateTypes } from "../generator.js";

describe("generateTypes", () => {
  test("should throw error if URL is not provided", async () => {
    await expect(generateTypes({ url: "", output: "./types" })).rejects.toThrow(
      "URL must be provided",
    );
  });
});
