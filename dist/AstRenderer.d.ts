import type { Block, Identifier, Identifiers, KeyframeStyle, LocalStyle, MediaStyle, NestedStyle, StyleSheetAst } from "./BNFStyledParser";
export declare const AstRenderer: {
    renderStyleSheetWithId(id: string, stylesheet: StyleSheetAst): string;
    renderLocalStylesWithId(id: string, localStyles: LocalStyle[]): string;
    renderNestedStyleWithId(id: string, nestedStyle: NestedStyle): string;
    renderMediaStyleWithId(id: string, mediaStyle: MediaStyle): string;
    renderKeyframeStyleWithId(id: string, mediaStyle: KeyframeStyle): string;
    renderBlock(id: string, block: Block): string;
    renderIdentifiers(identifiers: Identifiers): string;
    renderIdentifier(identifier: Identifier): string;
};
//# sourceMappingURL=AstRenderer.d.ts.map