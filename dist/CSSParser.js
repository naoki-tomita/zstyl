"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSParser = void 0;
const BNFStyledParser_1 = require("./BNFStyledParser");
function space(width) {
    return Array(width).fill(null).map(() => " ").join("");
}
function indent(text, width) {
    return text.split("\n").map(t => `${space(width)}${t}`).join(`\n`);
}
class CSSParser {
    style;
    #minify(style) {
        return style.replace(/\n/g, "").replace(/ {2,}/g, " ").trim();
    }
    constructor(style) {
        this.style = this.#minify(style);
    }
    fillWithId(id) {
        const parsedResult = BNFStyledParser_1.StyleSheetParser.parse(this.style);
        if (!parsedResult.ast) {
            return "";
        }
        return this.renderStyleSheetWithId(id, parsedResult.ast);
    }
    renderStyleSheetWithId(id, stylesheet) {
        const localStyles = stylesheet.children.filter((it) => it.type === "LocalStyle");
        const others = stylesheet.children.filter((it) => it.type !== "LocalStyle");
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
    }
    renderLocalStylesWithId(id, localStyles) {
        return `${id} { ${localStyles
            .map(it => `${this.renderIdentifier(it.prop)}: ${this.renderIdentifiers(it.values)};`)
            .join(" ")} }`;
    }
    renderNestedStyleWithId(id, nestedStyle) {
        const newId = nestedStyle.selector.value.includes("&")
            ? nestedStyle.selector.value.replaceAll("&", id)
            : `${id} ${nestedStyle.selector.value}`;
        return this.renderBlock(newId, nestedStyle.block);
    }
    renderMediaStyleWithId(id, mediaStyle) {
        return `@media (${this.renderIdentifier(mediaStyle.condition.prop)}: ${this.renderIdentifiers(mediaStyle.condition.values)}) {
${indent(this.renderBlock(id, mediaStyle.block), 2)}
}`;
    }
    renderKeyframeStyleWithId(id, mediaStyle) {
        return `@keyframe ${this.renderIdentifier(mediaStyle.name)} {
${indent(this.renderBlock(id, mediaStyle.block), 2)}
}`;
    }
    renderBlock(id, block) {
        const localStyles = block.body.filter((it) => it.type === "LocalStyle");
        const nestedStyles = block.body.filter((it) => it.type === "NestedStyle");
        const localStylesResult = this.renderLocalStylesWithId(id, localStyles);
        const nestedStyleResults = nestedStyles.map(style => this.renderNestedStyleWithId(id, style));
        return [localStylesResult, ...nestedStyleResults].join("\n");
    }
    renderIdentifiers(identifiers) {
        return identifiers.values.map(this.renderIdentifier).join(" ");
    }
    renderIdentifier(identifier) {
        return identifier.name;
    }
}
exports.CSSParser = CSSParser;
//# sourceMappingURL=CSSParser.js.map