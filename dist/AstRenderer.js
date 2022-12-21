"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstRenderer = void 0;
function space(width) {
    return Array(width).fill(null).map(() => " ").join("");
}
function indent(text, width) {
    return text.split("\n").map(t => `${space(width)}${t}`).join(`\n`);
}
exports.AstRenderer = {
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
    },
    renderLocalStylesWithId(id, localStyles) {
        if (localStyles.length === 0) {
            return ``;
        }
        return `${id} { ${localStyles
            .map(it => `${this.renderIdentifier(it.prop)}: ${this.renderIdentifiers(it.values)};`)
            .join(" ")} }`;
    },
    renderNestedStyleWithId(id, nestedStyle) {
        const newId = nestedStyle.selector.value.includes("&")
            ? nestedStyle.selector.value.replaceAll("&", id)
            : `${id} ${nestedStyle.selector.value}`;
        return this.renderBlock(newId, nestedStyle.block);
    },
    renderMediaStyleWithId(id, mediaStyle) {
        return `@media (${this.renderIdentifier(mediaStyle.condition.name)}: ${this.renderIdentifier(mediaStyle.condition.value)}) {
${indent(this.renderBlock(id, mediaStyle.block), 2)}
}`;
    },
    renderKeyframeStyleWithId(id, mediaStyle) {
        return `@keyframes ${this.renderIdentifier(mediaStyle.name)} {
${indent(this.renderBlock("", mediaStyle.block), 2)}
}`;
    },
    renderBlock(id, block) {
        const localStyles = block.body.filter((it) => it.type === "LocalStyle");
        const nestedStyles = block.body.filter((it) => it.type === "NestedStyle");
        const localStylesResult = this.renderLocalStylesWithId(id, localStyles);
        const nestedStyleResults = nestedStyles.map(style => this.renderNestedStyleWithId(id, style));
        return [localStylesResult, ...nestedStyleResults].join("\n").trimStart();
    },
    renderIdentifiers(identifiers) {
        return identifiers.values.map(this.renderValue).join(" ");
    },
    renderValue(value) {
        return value.value;
    },
    renderIdentifier(identifier) {
        return identifier.name;
    },
};
//# sourceMappingURL=AstRenderer.js.map