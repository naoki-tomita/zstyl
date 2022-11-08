import { random, styled, toStyleString } from "../index";

describe("zstyl", () => {
  describe("toStyleString", () => {
    it("should create zheleznaya styled component", () => {
      const styleString = toStyleString("id", { color: "green" })`
        @media (max-width: 600px) {
          display: inline-flex;

          &:hover {
            color: black;
          }
        }

        display: flex;
        justify-content: center;
        color: ${({ color }) => color};

        &:hover {
          color: red;
        }

        &:active {
          color: blue;
        }

        .hoge {
          width: 100%;
        }
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

  describe("styled.div", () => {
    it("should be defined", () => {
      expect(styled.div).toBeDefined();
    });
  });
})
