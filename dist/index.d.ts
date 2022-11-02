import { Component } from "zheleznaya";
export declare function random(size?: number): string;
export declare function toStyleString<T>(id: string, props: T): (template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => string;
export declare function styled<T>(template: TemplateStringsArray, ...values: Array<((props: T) => (string | number)) | string | number>): Component<T>;
//# sourceMappingURL=index.d.ts.map