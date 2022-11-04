"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSParser = void 0;
function space(width) {
    return Array(width).fill(null).map(() => " ").join("");
}
function indent(text, width) {
    return text.split("\n").map(t => `${space(width)}${t}`).join(`\n`);
}
class CSSParser {
    style;
    minify(style) {
        return style.replace(/\n/g, "").replace(/ {2,}/g, " ").trim();
    }
    constructor(style) {
        this.style = this.minify(style);
    }
    fillWithId(id) {
        let style = this.style;
        const results = [];
        for (const mediaQuery of this.getMediaQueries(style)) {
            const parser = new CSSParser(mediaQuery.body);
            const filled = parser.fillWithId(id);
            style = style.replace(mediaQuery.fullStyle, "");
            results.push(`@media (${mediaQuery.rule}) { \n${indent(filled, 2)}\n}`);
        }
        for (const nestedStyle of this.getNestedStyles(style)) {
            const parser = new CSSParser(nestedStyle.body);
            const filled = parser.fillWithId(nestedStyle.querySelector.startsWith("&") ? nestedStyle.querySelector.replace("&", id) : `${id} ${nestedStyle.querySelector}`);
            style = style.replace(nestedStyle.fullStyle, "");
            results.push(filled);
        }
        results.unshift(`${id} { ${style.trim()} }`);
        return results.join("\n");
    }
    getMediaQueries(style = this.style) {
        const results = [];
        const parser = new Parser(style);
        let startIndex = parser.findIndexAfter("@media");
        while (startIndex !== -1) {
            let lastIndex = startIndex;
            const firstBraceIndexOf = parser.peek(startIndex).findIndexAfter("{");
            parser.peek(firstBraceIndexOf);
            let leftBrace = 0;
            let rightBrace = 0;
            while (true) {
                const char = parser.getOne();
                if (char === "{")
                    leftBrace++;
                if (char === "}")
                    rightBrace++;
                if (leftBrace === rightBrace) {
                    lastIndex = parser.currentIndex();
                    break;
                }
            }
            results.push({
                startIndex,
                lastIndex,
                body: parser.get(firstBraceIndexOf + 1, lastIndex - 1).trim(),
                rule: parser.get(startIndex, firstBraceIndexOf).match(/@media\s*\((.+)\)/)?.[1] ?? "",
                fullStyle: style.slice(startIndex, lastIndex),
            });
            startIndex = parser.findIndexAfter("@media");
        }
        return results;
    }
    getNestedStyles(style = this.style) {
        const results = [];
        const parser = new Parser(style);
        let startIndex = parser.findIndexAfter("{");
        while (startIndex !== -1) {
            const startIndexOfQuerySelector = parser.peek(startIndex).findLastIndexBefore("}", ";") + 1;
            const querySelector = parser.get(startIndexOfQuerySelector + 1, startIndex - 1).trim();
            let leftBrace = 0;
            let rightBrace = 0;
            let lastIndex = startIndexOfQuerySelector;
            while (true) {
                const currnet = parser.getOne();
                if (currnet === "{")
                    leftBrace++;
                if (currnet === "}")
                    rightBrace++;
                if (leftBrace === rightBrace) {
                    lastIndex = parser.currentIndex();
                    break;
                }
            }
            results.push({
                startIndex: startIndexOfQuerySelector,
                lastIndex,
                querySelector,
                body: parser.get(startIndex + 1, lastIndex - 1).trim(),
                fullStyle: parser.get(startIndexOfQuerySelector, lastIndex).trim(),
            });
            startIndex = parser.peek(lastIndex).findIndexAfter("{");
        }
        return results;
    }
}
exports.CSSParser = CSSParser;
class Parser {
    text;
    index = 0;
    constructor(text) {
        this.text = text;
    }
    next() {
        return this.text[++this.index];
    }
    currentIndex() {
        return this.index;
    }
    current() {
        return this.text[this.index];
    }
    getOne() {
        return this.text[this.index++];
    }
    peek(index) {
        this.index = index;
        return this;
    }
    findLastIndexBefore(...texts) {
        return Math.max(...texts.map(text => this.text.slice(0, this.index).lastIndexOf(text)), 0);
    }
    findIndexAfter(...texts) {
        const indexOf = Math.min(...texts.map(text => this.text.slice(this.index).indexOf(text)), Infinity);
        return indexOf === -1 ? -1 : this.index + indexOf;
    }
    get(from, to) {
        return this.text.slice(from, to);
    }
}
//# sourceMappingURL=CSSParser.js.map