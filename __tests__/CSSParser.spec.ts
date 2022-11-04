import { CSSParser } from "../CSSParser";

describe("CSSParser", () => {
  describe("getMediaQueries", () => {
    it("should parse media query", () => {
      const style = `
        display: flex;

        @media (max-width: 720px) {
          display: inline-flex;
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.getMediaQueries()).toMatchSnapshot()
    });
  });

  describe("getNestedStyles", () => {
    it("should parse nested style", () => {
      const style = `
        display: flex;

        .wrapper {
          display: inline-flex;
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.getNestedStyles()).toMatchSnapshot();
    });

    it("should parse multiple styles", () => {
      const style = `
        display: flex;

        .wrapper {
          display: inline-flex;
          color: black;
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.getNestedStyles()).toMatchSnapshot();
    })

    it("should parse multiple nested styles", () => {
      const style = `
        display: flex;

        .wrapper1 {
          display: inline-flex;
          color: black;
        }
        .wrapper2 {
          display: block;
          color: black;
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.getNestedStyles()).toMatchSnapshot();
    })

    it("should parse pseudo class", () => {
      const style = `
        display: flex;

        &:hover {
          display: block;
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.getNestedStyles()).toMatchSnapshot();
    });
  });

  describe('fillWithId', () => {
    it("should parse style and fill id.", () => {
      const style = `
        display: flex;

        &:hover {
          color: red;
        }

        .wrapper {
          color: blue;
        }

        @media (max-width: 200px) {
          display: inline-flex;
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.fillWithId("#element")).toMatchSnapshot();
    });

    it("should parse and fill id for multiple nested style.", () => {
      const style = `
        display: flex;

        &:hover {
          color: red;

          .inner {
            color: black;
          }
        }

        .wrapper {
          color: blue;

          .inner {
            color: green;
          }
        }

        @media (max-width: 200px) {
          display: inline-flex;

          .inner {
            color: yellow;
          }
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.fillWithId("#element")).toMatchSnapshot();
    });
  });
});