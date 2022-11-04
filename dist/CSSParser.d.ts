declare type MediaQueryParseResult = {
    startIndex: number;
    lastIndex: number;
    body: string;
    rule: string;
    fullStyle: string;
};
declare type NestedStyleParseResult = {
    startIndex: number;
    lastIndex: number;
    body: string;
    querySelector: string;
    fullStyle: string;
};
export declare class CSSParser {
    readonly style: string;
    minify(style: string): string;
    constructor(style: string);
    fillWithId(id: string): string;
    getMediaQueries(style?: string): MediaQueryParseResult[];
    getNestedStyles(style?: string): NestedStyleParseResult[];
}
export {};
//# sourceMappingURL=CSSParser.d.ts.map