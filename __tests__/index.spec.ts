import { when } from "jest-when";
import { parseStyle, random, styled, toStyleString } from ".."

describe("zstyl", () => {
  describe("toStyleString", () => {
    it("should create zheleznaya styled component", () => {
      const styleString = toStyleString("id", { color: "green" })`
        display: flex;
        justify-content: center;
        color: ${({ color }) => color};
      `;
      expect(styleString).toMatchSnapshot();
    });
  });

  describe("random", () => {
    it("should include '9' and 'a'", () => {
      const actual = random(1000);
      expect(actual).toContain("9");
      expect(actual).toContain("a");
    });
  });

  describe("parseStyle", () => {
    it("should parse nested style", () => {
      const parsedStyle = parseStyle(`
        display: flex;
        justify-content: center;

        .style-name {
          display: block;
          color: red;
        }
      `);
      console.log(parsedStyle);
    });
  });
})
