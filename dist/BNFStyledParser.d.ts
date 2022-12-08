declare type Types = "StyleSheet" | "LocalStyle" | "Style" | "Identifier" | "Value" | "Values" | "NestedStyle" | "Selector" | "Block" | "MediaCondition" | "Media" | "Keyframe";
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
export interface Value extends Ast {
    type: "Value";
    value: string;
}
export declare const ValueParser: Parser<Value>;
export interface Values extends Ast {
    type: "Values";
    values: Value[];
}
export declare const ValuesParser: Parser<Values>;
export interface Style extends Ast {
    type: "Style";
    prop: Identifier;
    values: Values;
}
export declare const StyleParser: Parser<Style>;
export interface LocalStyle extends Ast {
    type: "LocalStyle";
    prop: Identifier;
    values: Values;
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
interface MediaCondition extends Ast {
    type: "MediaCondition";
    name: Identifier;
    value: Identifier;
}
export interface MediaStyle extends Ast {
    type: "Media";
    condition: MediaCondition;
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