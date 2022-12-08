type Types =
    "StyleSheet"
  | "LocalStyle"
  | "Style"
  | "Identifier"
  | "Value"
  | "Values"
  | "NestedStyle"
  | "Selector"
  | "Block"
  | "MediaCondition"
  | "Media"
  | "Keyframe"
  ;

interface Ast {
  type: Types;
};

type RootStyle = LocalStyle | NestedStyle | MediaStyle | KeyframeStyle;

export interface StyleSheetAst extends Ast {
  type: "StyleSheet";
  children: Array<LocalStyle | NestedStyle | MediaStyle | KeyframeStyle>;
}

export const StyleSheetParser: Parser<StyleSheetAst> = {
  parse(style: string): ParsedResult<StyleSheetAst> {
    const children: StyleSheetAst["children"] = [];
    let result: ParsedResult<RootStyle> = { remaining: style };
    let successToParse;
    do {
      successToParse = false;
      for (const parser of [LocalStyleParser, NestedStyleParser, MediaStyleParser, KeyframeStyleParser]) {
        result = parser.parse(result.remaining);
        if (result.ast) {
          children.push(result.ast);
          successToParse = true;
        }
      }
    } while (successToParse)

    return {
      ast: {
        type: "StyleSheet",
        children,
      },
      remaining: result.remaining
    };
  }
}

export interface Identifier extends Ast {
  type: "Identifier";
  name: string;
}

export const IdentifierParser: Parser<Identifier> = {
  parse(style: string): ParsedResult<Identifier> {
    style = style.trimStart();
    const result = style.match(/^([a-zA-Z0-9\-_.]+)/);
    if (result == null || result[0].length === 0) {
      return { remaining: style };
    }
    const name = result[0];
    return {
      ast: {
        type: "Identifier",
        name,
      },
      remaining: style.slice(name.length),
    }
  }
}

export interface Value extends Ast {
  type: "Value";
  value: string;
}

export const ValueParser: Parser<Value> = {
  parse(style: string): ParsedResult<Value> {
    const result = style.trimStart().match(/^([a-zA-Z0-9\-%#_.\()]+)/);
    if (result == null || result[0].length === 0) {
      return { remaining: style };
    }
    const value = result[0];
    return {
      ast: {
        type: "Value",
        value,
      },
      remaining: style.trimStart().slice(value.length),
    }
  }
}

export interface Values extends Ast {
  type: "Values";
  values: Value[];
}

export const ValuesParser: Parser<Values> = {
  parse(style: string): ParsedResult<Values> {
    let result = ValueParser.parse(style);
    if (!result.ast) {
      return { remaining: style };
    }
    const results: Value[] = [result.ast];
    while (true) {
      const remaining = result.remaining;
      result = ValueParser.parse(remaining);
      if (!result.ast) {
        return {
          ast: {
            type: "Values",
            values: results,
          },
          remaining,
        }
      }
      results.push(result.ast);
    }
  }
}

export interface Style extends Ast {
  type: "Style"
  prop: Identifier;
  values: Values;
}
export const StyleParser: Parser<Style> = {
  parse(style: string): ParsedResult<Style> {
    const identifier = IdentifierParser.parse(style);
    if (!identifier.ast) {
      return { remaining: style };
    }
    const colonWithIdentifiers = identifier.remaining.trimStart();
    if (!colonWithIdentifiers.startsWith(":")) {
      return { remaining: style };
    }
    const identifiers = ValuesParser.parse(colonWithIdentifiers.slice(1));
    if (!identifiers.ast) {
      return { remaining: style };
    }
    return {
      ast: {
        type: "Style",
        prop: identifier.ast,
        values: identifiers.ast,
      },
      remaining: identifiers.remaining
    }
  }
}

export interface LocalStyle extends Ast {
  type: "LocalStyle";
  prop: Identifier;
  values: Values;
}
export const LocalStyleParser: Parser<LocalStyle> = {
  parse(style: string): ParsedResult<LocalStyle> {
    const result = StyleParser.parse(style);
    if (
      !result.ast ||
      !result.remaining.trimStart().startsWith(";")
    ) {
      return { remaining: style };
    }
    return {
      ast: {
        type: "LocalStyle",
        prop: result.ast.prop,
        values: result.ast.values,
      },
      remaining: result.remaining.trimStart().slice(1)
    }
  }
}

type AnyStyle = LocalStyle | NestedStyle;

export interface Selector extends Ast {
  type: "Selector";
  value: string; // ここを BNF で表現するのはあきらめました
}

export const SelectorParser: Parser<Selector> = {
  parse(style: string): ParsedResult<Selector> {
    const result = style.trimStart().match(/^([a-zA-Z0-9_()+>| ,.#~=%^$&\[\]"'*:/\-]+)/)
    if (result == null) {
      return { remaining: style };
    }
    const value = result[0].trim()
    return {
      ast: {
        type: "Selector",
        value,
      },
      remaining: style.trimStart().slice(value.length)
    }
  }
}

export interface Block extends Ast {
  type: "Block";
  body: AnyStyle[];
}

export const BlockParser: Parser<Block> = {
  parse(style: string): ParsedResult<Block> {
    if (!style.trimStart().startsWith("{")) {
      return { remaining: style };
    }
    let result: ParsedResult<AnyStyle> = { remaining: style.trimStart().slice(1) };
    const results: AnyStyle[] = [];
    let successToParse: boolean;
    do {
      successToParse = false;
      for (const parser of [LocalStyleParser, NestedStyleParser]) {
        result = parser.parse(result.remaining);
        if (result.ast) {
          successToParse = true;
          results.push(result.ast);
        }
      }
    } while (successToParse)
    if (!result.remaining.trimStart().startsWith("}")) {
      return { remaining: style }
    }
    return {
      ast: {
        type: "Block",
        body: results,
      },
      remaining: result.remaining.trimStart().slice(1)
    }
  }
}

export interface NestedStyle extends Ast {
  type: "NestedStyle";
  selector: Selector;
  block: Block;
}

export const NestedStyleParser: Parser<NestedStyle> = {
  parse(style: string): ParsedResult<NestedStyle> {
    const selector = SelectorParser.parse(style);
    if (!selector.ast) {
      return { remaining: style };
    }
    const block = BlockParser.parse(selector.remaining);
    if (!block.ast) {
      return { remaining: style };
    }
    return {
      ast: {
        type: "NestedStyle",
        selector: selector.ast,
        block: block.ast,
      },
      remaining: block.remaining
    }
  }
}

interface MediaCondition extends Ast {
  type: "MediaCondition";
  name: Identifier;
  value: Identifier;
}

export interface MediaStyle extends Ast {
  type: "Media"
  condition: MediaCondition;
  block: Block;
}

export const MediaStyleParser: Parser<MediaStyle> = {
  parse(style: string): ParsedResult<MediaStyle> {
    if (!style.trimStart().startsWith("@media")) {
      return { remaining: style };
    }
    const slicedAtMediaStyle = style.trimStart().slice("@media".length);
    if (!slicedAtMediaStyle.trimStart().startsWith("(")) {
      return { remaining: style };
    }
    const leftParenTrimmedStyle = slicedAtMediaStyle.trimStart().slice(1);
    const nameResult = IdentifierParser.parse(leftParenTrimmedStyle);
    if (!nameResult.ast) {
      return { remaining: style };
    }
    if (!nameResult.remaining.trimStart().startsWith(":")) {
      return { remaining: style };
    }
    const valueResult = IdentifierParser.parse(nameResult.remaining.trimStart().slice(1));
    if (!valueResult.ast) {
      return { remaining: style };
    }
    if (!valueResult.remaining.trimStart().startsWith(")")) {
      return { remaining: style };
    }
    const rightParenTrimmedStyle = valueResult.remaining.trimStart().slice(1);
    const blockResult = BlockParser.parse(rightParenTrimmedStyle);
    if (!blockResult.ast) {
      return { remaining: style };
    }
    return {
      ast: {
        type: "Media",
        condition: {
          type: "MediaCondition",
          name: nameResult.ast,
          value: valueResult.ast,
        },
        block: blockResult.ast
      },
      remaining: blockResult.remaining
    }
  }
}

export interface KeyframeStyle extends Ast {
  type: "Keyframe"
  name: Identifier;
  block: Block;
}

export const KeyframeStyleParser: Parser<KeyframeStyle> = {
  parse(style: string): ParsedResult<KeyframeStyle> {
    if (!style.trimStart().startsWith("@keyframe")) {
      return { remaining: style };
    }
    const keyframeExcludedStyle = style.trimStart().slice("@keyframe".length);
    const nameResult = IdentifierParser.parse(keyframeExcludedStyle);
    if (!nameResult.ast) {
      return { remaining: style };
    }
    const blockStyle = nameResult.remaining;
    const blockResult = BlockParser.parse(blockStyle);
    if (!blockResult.ast) {
      return { remaining: style };
    }
    return {
      ast: {
        type: "Keyframe",
        name: nameResult.ast,
        block: blockResult.ast
      },
      remaining: blockResult.remaining,
    }
  }
}

type ParsedResult<T extends Ast> = {
  ast?: T, remaining: string
};

interface Parser<T extends Ast> {
  parse(style: string): ParsedResult<T>;
}
