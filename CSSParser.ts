
type MediaQueryParseResult = {
  startIndex: number;
  lastIndex: number;
  body: string;
  rule: string;
  fullStyle: string;
};

type NestedStyleParseResult = {
  startIndex: number;
  lastIndex: number;
  body: string;
  querySelector: string;
  fullStyle: string;
}

function space(width: number) {
  return Array(width).fill(null).map(() => " ").join("");
}
function indent(text: string, width: number) {
  return text.split("\n").map(t => `${space(width)}${t}`).join(`\n`);
}
export class CSSParser {
  readonly style: string;
  minify(style: string): string {
    return style.replace(/\n/g, "").replace(/ {2,}/g, " ").trim();
  }

  constructor(style: string) {
    this.style = this.minify(style);
  }

  fillWithId(id: string) {
    let style = this.style;
    const results: string[] = [];
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

  getMediaQueries(style: string = this.style): MediaQueryParseResult[] {
    const results: MediaQueryParseResult[] = [];
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
        if (char === "{") leftBrace++;
        if (char === "}") rightBrace++;
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
      })
      startIndex = parser.findIndexAfter("@media");
    }
    return results;
  }

  getNestedStyles(style: string = this.style): NestedStyleParseResult[] {
    const results: NestedStyleParseResult[] = []
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
        if (currnet === "{") leftBrace++;
        if (currnet === "}") rightBrace++;
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

class Parser {
  index: number = 0;
  constructor(readonly text: string) {}

  next(): string {
    return this.text[++this.index];
  }
  currentIndex(): number {
    return this.index;
  }
  current() {
    return this.text[this.index];
  }
  getOne() {
    return this.text[this.index++];
  }
  peek(index: number) {
    this.index = index;
    return this;
  }
  findLastIndexBefore(...texts: string[]) {
    return Math.max(...texts.map(text => this.text.slice(0, this.index).lastIndexOf(text)), 0);
  }
  findIndexAfter(...texts: string[]) {
    const indexOf = Math.min(...texts.map(text => this.text.slice(this.index).indexOf(text)), Infinity);
    return indexOf === -1 ? -1 : this.index + indexOf;
  }
  get(from: number, to: number) {
    return this.text.slice(from, to);
  }
}
