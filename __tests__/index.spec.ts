import { when } from "jest-when";
import { random, styled } from ".."

describe("zstyl", () => {
  let styleEl: { innerText: string };

  beforeEach(() => {
    styleEl = { innerText: "" };
    when(document.createElement)
      .calledWith("style")
      .mockReturnValue(styleEl as HTMLStyleElement);
  });
  describe("styled", () => {
    const randomSpy = jest.spyOn(Math, "random");
    beforeAll(() => {
      let i = 0;
      randomSpy.mockImplementation(() => {
        i = i + 1 % 36;
        return i / 36;
      });
    });
    afterAll(() => {
      randomSpy.mockRestore();
    });
    it("should create zheleznaya styled component", () => {
      const Component = styled`
        display: flex;
        gap: 16px;
      `;
      expect(Component).toBeDefined();
      expect(styleEl.innerText).toMatchSnapshot();
    });
  });

  describe("random", () => {
    it("should include '9' and 'a'", () => {
      const actual = random(1000);
      expect(actual).toContain("9");
      expect(actual).toContain("a");
    });
  });
})
