"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyframeStyleParser = exports.MediaStyleParser = exports.NestedStyleParser = exports.BlockParser = exports.SelectorParser = exports.LocalStyleParser = exports.StyleParser = exports.IdentifiersParser = exports.IdentifierParser = exports.StyleSheetParser = void 0;
;
exports.StyleSheetParser = {
    parse(style) {
        const children = [];
        let result = { remaining: style };
        let successToParse;
        do {
            successToParse = false;
            for (const parser of [exports.LocalStyleParser, exports.NestedStyleParser, exports.MediaStyleParser, exports.KeyframeStyleParser]) {
                result = parser.parse(result.remaining);
                if (result.ast) {
                    children.push(result.ast);
                    successToParse = true;
                }
            }
        } while (successToParse);
        return {
            ast: {
                type: "StyleSheet",
                children,
            },
            remaining: result.remaining
        };
    }
};
exports.IdentifierParser = {
    parse(style) {
        style = style.trimStart();
        const result = style.match(/^([a-zA-Z0-9\-%]+)/);
        if (result == null || result[0].length === 0) {
            return { remaining: style };
        }
        const name = result[0];
        return {
            ast: {
                type: "Identifier",
                name,
            },
            remaining: style.substring(name.length),
        };
    }
};
exports.IdentifiersParser = {
    parse(style) {
        let result = exports.IdentifierParser.parse(style);
        if (!result.ast) {
            return { remaining: style };
        }
        const results = [result.ast];
        while (true) {
            const remaining = result.remaining;
            result = exports.IdentifierParser.parse(remaining);
            if (!result.ast) {
                return {
                    ast: {
                        type: "Identifiers",
                        values: results,
                    },
                    remaining,
                };
            }
            results.push(result.ast);
        }
    }
};
exports.StyleParser = {
    parse(style) {
        const identifier = exports.IdentifierParser.parse(style);
        if (!identifier.ast) {
            return { remaining: style };
        }
        const colonWithIdentifiers = identifier.remaining.trimStart();
        if (!colonWithIdentifiers.startsWith(":")) {
            return { remaining: style };
        }
        const identifiers = exports.IdentifiersParser.parse(colonWithIdentifiers.slice(1));
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
        };
    }
};
exports.LocalStyleParser = {
    parse(style) {
        const result = exports.StyleParser.parse(style);
        if (!result.ast ||
            !result.remaining.trimStart().startsWith(";")) {
            return { remaining: style };
        }
        return {
            ast: {
                type: "LocalStyle",
                prop: result.ast.prop,
                values: result.ast.values,
            },
            remaining: result.remaining.trimStart().slice(1)
        };
    }
};
exports.SelectorParser = {
    parse(style) {
        const result = style.trimStart().match(/^([a-zA-Z0-9_()+>| ,.#~=%^$&\[\]"'*:/\-]+)/);
        if (result == null) {
            return { remaining: style };
        }
        const value = result[0].trim();
        return {
            ast: {
                type: "Selector",
                value,
            },
            remaining: style.trimStart().slice(value.length)
        };
    }
};
exports.BlockParser = {
    parse(style) {
        if (!style.trimStart().startsWith("{")) {
            return { remaining: style };
        }
        let result = { remaining: style.trimStart().slice(1) };
        const results = [];
        let successToParse;
        do {
            successToParse = false;
            for (const parser of [exports.LocalStyleParser, exports.NestedStyleParser]) {
                result = parser.parse(result.remaining);
                if (result.ast) {
                    successToParse = true;
                    results.push(result.ast);
                }
            }
        } while (successToParse);
        if (!result.remaining.trimStart().startsWith("}")) {
            return { remaining: style };
        }
        return {
            ast: {
                type: "Block",
                body: results,
            },
            remaining: result.remaining.trimStart().slice(1)
        };
    }
};
exports.NestedStyleParser = {
    parse(style) {
        const selector = exports.SelectorParser.parse(style);
        if (!selector.ast) {
            return { remaining: style };
        }
        const block = exports.BlockParser.parse(selector.remaining);
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
        };
    }
};
exports.MediaStyleParser = {
    parse(style) {
        if (!style.trimStart().startsWith("@media")) {
            return { remaining: style };
        }
        const slicedAtMediaStyle = style.trimStart().slice("@media".length);
        if (!slicedAtMediaStyle.trimStart().startsWith("(")) {
            return { remaining: style };
        }
        const leftParenTrimmedStyle = slicedAtMediaStyle.trimStart().slice(1);
        const styleResult = exports.StyleParser.parse(leftParenTrimmedStyle);
        if (!styleResult.ast) {
            return { remaining: style };
        }
        if (!styleResult.remaining.trimStart().startsWith(")")) {
            return { remaining: style };
        }
        const rightParenTrimmedStyle = styleResult.remaining.trimStart().slice(1);
        const blockResult = exports.BlockParser.parse(rightParenTrimmedStyle);
        if (!blockResult.ast) {
            return { remaining: style };
        }
        return {
            ast: {
                type: "Media",
                condition: styleResult.ast,
                block: blockResult.ast
            },
            remaining: blockResult.remaining
        };
    }
};
exports.KeyframeStyleParser = {
    parse(style) {
        if (!style.trimStart().startsWith("@keyframe")) {
            return { remaining: style };
        }
        const keyframeExcludedStyle = style.trimStart().slice("@keyframe".length);
        const nameResult = exports.IdentifierParser.parse(keyframeExcludedStyle);
        if (!nameResult.ast) {
            return { remaining: style };
        }
        const blockStyle = nameResult.remaining;
        const blockResult = exports.BlockParser.parse(blockStyle);
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
        };
    }
};
//# sourceMappingURL=BNFStyledParser.js.map