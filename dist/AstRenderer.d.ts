import type { Block, Identifier, Values, KeyframeStyle, LocalStyle, MediaStyle, NestedStyle, StyleSheetAst, Value } from "./BNFStyledParser";
export declare const AstRenderer: {
    renderStyleSheetWithId(id: string, stylesheet: StyleSheetAst): string;
    renderLocalStylesWithId(id: string, localStyles: LocalStyle[]): string;
    renderNestedStyleWithId(id: string, nestedStyle: NestedStyle): string;
    renderMediaStyleWithId(id: string, mediaStyle: MediaStyle): string;
    renderKeyframeStyleWithId(id: string, mediaStyle: KeyframeStyle): string;
    renderBlock(id: string, block: Block): string;
    renderIdentifiers(identifiers: Values): string;
    renderValue(value: Value): string;
    renderIdentifier(identifier: Identifier): string;
};
//# sourceMappingURL=AstRenderer.d.ts.map