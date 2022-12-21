import { StyleSheetParser } from "../BNFStyledParser";
import { AstRenderer } from "../AstRenderer";

describe("AstRenderer", () => {
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

        @keyframes keyframe-name {
          0% {
            height: 10px;
          }

          100% {
            height: 100px;
          }
        }
      `;
      const stylesheet = StyleSheetParser.parse(style);
      expect(AstRenderer.renderStyleSheetWithId("#element", stylesheet.ast!)).toMatchSnapshot();
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

      const stylesheet = StyleSheetParser.parse(style);
      expect(AstRenderer.renderStyleSheetWithId("#element", stylesheet.ast!)).toMatchSnapshot();
    });

    it("should real pattern", () => {
      const style = `
        display: flex;
        gap: 16px;
        justify-content: center;

        @media (max-width: 940px) {
          flex-direction: column;
        }

        @keyframes keyframe-name {
          0% {
            height: 10px;
          }

          100% {
            height: 100px;
          }
        }
      `;
      const stylesheet = StyleSheetParser.parse(style);
      expect(AstRenderer.renderStyleSheetWithId("*[data-zstyl='aaaaa']", stylesheet.ast!)).toMatchSnapshot();
    });
  });

});
