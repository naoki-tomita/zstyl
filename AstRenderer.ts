import type { Block, Identifier, Values, KeyframeStyle, LocalStyle, MediaStyle, NestedStyle, StyleSheetAst, Value } from "./BNFStyledParser"
import { StyleSheetParser } from "./BNFStyledParser";

function space(width: number) {
  return Array(width).fill(null).map(() => " ").join("");
}
function indent(text: string, width: number) {
  return text.split("\n").map(t => `${space(width)}${t}`).join(`\n`);
}
export const AstRenderer = {
  renderStyleSheetWithId(id: string, stylesheet: StyleSheetAst): string {
    const localStyles = stylesheet.children.filter((it): it is LocalStyle => it.type === "LocalStyle");
    const others = stylesheet.children.filter((it): it is (NestedStyle | MediaStyle | KeyframeStyle) => it.type !== "LocalStyle");
    const localStylesResult = this.renderLocalStylesWithId(id, localStyles);
    const othersResults = others.map(style => {
      switch (style.type) {
        case "NestedStyle":
          return this.renderNestedStyleWithId(id, style);
        case "Media":
          return this.renderMediaStyleWithId(id, style);
        case "Keyframe":
          return this.renderKeyframeStyleWithId(id, style);
      }
    });
    return [localStylesResult, ...othersResults].join("\n");
  },

  renderLocalStylesWithId(id: string, localStyles: LocalStyle[]): string {
    if (localStyles.length === 0) {
      return ``;
    }
    return `${id} { ${
      localStyles
        .map(it => `${this.renderIdentifier(it.prop)}: ${this.renderIdentifiers(it.values)};`)
        .join(" ")
    } }`;
  },

  renderNestedStyleWithId(id: string, nestedStyle: NestedStyle): string {
    const newId = nestedStyle.selector.value.includes("&")
      ? nestedStyle.selector.value.replaceAll("&", id)
      : `${id} ${nestedStyle.selector.value}`;
    return this.renderBlock(newId, nestedStyle.block);
  },

  renderMediaStyleWithId(id: string, mediaStyle: MediaStyle): string {
    return `@media (${
      this.renderIdentifier(mediaStyle.condition.name)
    }: ${
      this.renderIdentifier(mediaStyle.condition.value)
    }) {
${indent(this.renderBlock(id, mediaStyle.block), 2)}
}`;
  },

  renderKeyframeStyleWithId(id: string, mediaStyle: KeyframeStyle): string {
    return `@keyframes ${this.renderIdentifier(mediaStyle.name)} {
${indent(this.renderBlock("", mediaStyle.block), 2)}
}`;
  },

  renderBlock(id: string, block: Block) {
    const localStyles = block.body.filter((it): it is LocalStyle => it.type === "LocalStyle");
    const nestedStyles = block.body.filter((it): it is NestedStyle => it.type === "NestedStyle");
    const localStylesResult = this.renderLocalStylesWithId(id, localStyles);
    const nestedStyleResults = nestedStyles.map(style => this.renderNestedStyleWithId(id, style));
    return [localStylesResult, ...nestedStyleResults].join("\n").trimStart();
  },

  renderIdentifiers(identifiers: Values): string {
    return identifiers.values.map(this.renderValue).join(" ");
  },

  renderValue(value: Value): string {
    return value.value;
  },

  renderIdentifier(identifier: Identifier): string {
    return identifier.name;
  },
}
