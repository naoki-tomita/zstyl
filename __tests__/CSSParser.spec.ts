import { StyleSheetParser } from "../BNFStyledParser";
import { CSSParser } from "../CSSParser";

describe("CSSParser", () => {
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

    it("should real pattern", () => {
      const style = `
        display: flex;
        gap: 16px;
        justify-content: center;

        @media (max-width: 940px) {
          flex-direction: column;
        }
      `;
      const parser = new CSSParser(style);
      expect(parser.fillWithId("*[data-zstyl='aaaaa']")).toMatchSnapshot();
    });
  });

  describe("#renderLocalStylesWithId", () => {
    const tests = [
      // `
      //   display: flex;
      //   background: black center;
      // `,
    ]

    const parser = new CSSParser("");
    tests.forEach((style) => {
      it("should render successfully", () => {
        const result = StyleSheetParser.parse(style);
        expect(parser.renderLocalStylesWithId("id", result.ast?.children as any)).toMatchSnapshot();
      });
    })
  });

});
