declare type Types = "StyleSheet" | "LocalStyle" | "Style" | "Identifier" | "Identifiers" | "NestedStyle" | "Selector" | "Block" | "Media" | "Keyframe";
interface Ast {
    type: Types;
}
export interface StyleSheetAst extends Ast {
    type: "StyleSheet";
    children: Array<LocalStyle | NestedStyle | MediaStyle | KeyframeStyle>;
}
export declare const StyleSheetParser: Parser<StyleSheetAst>;
export interface Identifier extends Ast {
    type: "Identifier";
    name: string;
}
export declare const IdentifierParser: Parser<Identifier>;
export interface Identifiers extends Ast {
    type: "Identifiers";
    values: Identifier[];
}
export declare const IdentifiersParser: Parser<Identifiers>;
export interface Style extends Ast {
    type: "Style";
    prop: Identifier;
    values: Identifiers;
}
export declare const StyleParser: Parser<Style>;
export interface LocalStyle extends Ast {
    type: "LocalStyle";
    prop: Identifier;
    values: Identifiers;
}
export declare const LocalStyleParser: Parser<LocalStyle>;
declare type AnyStyle = LocalStyle | NestedStyle;
export interface Selector extends Ast {
    type: "Selector";
    value: string;
}
export declare const SelectorParser: Parser<Selector>;
export interface Block extends Ast {
    type: "Block";
    body: AnyStyle[];
}
export declare const BlockParser: Parser<Block>;
export interface NestedStyle extends Ast {
    type: "NestedStyle";
    selector: Selector;
    block: Block;
}
export declare const NestedStyleParser: Parser<NestedStyle>;
export interface MediaStyle extends Ast {
    type: "Media";
    condition: Style;
    block: Block;
}
export declare const MediaStyleParser: Parser<MediaStyle>;
export interface KeyframeStyle extends Ast {
    type: "Keyframe";
    name: Identifier;
    block: Block;
}
export declare const KeyframeStyleParser: Parser<KeyframeStyle>;
declare type ParsedResult<T extends Ast> = {
    ast?: T;
    remaining: string;
};
interface Parser<T extends Ast> {
    parse(style: string): ParsedResult<T>;
}
export {};
//# sourceMappingURL=BNFStyledParser.d.ts.map