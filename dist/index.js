"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styled = exports.css = exports.renderTemplate = exports.toStyleString = exports.random = void 0;
const zheleznaya_1 = require("zheleznaya");
const AstRenderer_1 = require("./AstRenderer");
const BNFStyledParser_1 = require("./BNFStyledParser");
const hash_1 = require("./hash");
const Chars = "abcdefghijklmnopqrstuvwxyz0123456789";
function random(size = 5) {
    return Array(size).fill(null).map(() => Chars[Math.floor(Math.random() * (Chars.length))]).join("");
}
exports.random = random;
const styles = {};
let styleEl;
function init() {
    const styleElement = document.querySelector("style[data-zstyl]");
    if (styleElement) {
        styleEl = styleElement;
    }
    else {
        styleEl = document.createElement("style");
        styleEl.setAttribute("data-zstyl", "");
        document.head.appendChild(styleEl);
    }
}
function expand(props, expander) {
    if (expander == null) {
        return "";
    }
    if (typeof expander === "string" || typeof expander === "number") {
        return expander;
    }
    return expander(props);
}
function toSelector(id) {
    return `*[data-zstyl='${id}']`;
}
function toClassSelector(className) {
    return `.${className}`;
}
function toStyleString(id, renderedStyle) {
    const { ast } = BNFStyledParser_1.StyleSheetParser.parse(renderedStyle);
    return AstRenderer_1.AstRenderer.renderStyleSheetWithId(toSelector(id), ast);
}
exports.toStyleString = toStyleString;
function isServerSide() {
    return typeof window === "undefined";
}
function renderTemplate(props) {
    return (template, ...values) => {
        return template.map((it, i) => `${it}${expand(props, values[i])}`).join("");
    };
}
exports.renderTemplate = renderTemplate;
function updateStyleEl() {
    if (isServerSide()) {
        globalThis.__ssrRenderedStyle = Object.values(styles).join("\n");
    }
    else {
        styleEl && (styleEl.innerHTML = Object.values(styles).join("\n"));
    }
}
globalThis.__ssrRenderedStyle = "";
function generateInnerFunction(tag) {
    return function innerFunction(template, ...values) {
        if (!isServerSide() && !styleEl)
            init();
        return (props, children) => {
            const styleText = renderTemplate(props)(template, ...values);
            const id = (0, hash_1.hashString)(styleText);
            styles[id] = toStyleString(id, styleText);
            updateStyleEl();
            return (0, zheleznaya_1.h)(tag, { ...props, "data-zstyl": id }, ...children);
        };
    };
}
function css(template, ...values) {
    if (!isServerSide() && !styleEl)
        init();
    const renderedStyle = template.map((it, i) => `${it}${expand({}, values[i])}`).join("");
    const id = (0, hash_1.hashString)(renderedStyle);
    const className = `c-zstyl-${id}`;
    const { ast } = BNFStyledParser_1.StyleSheetParser.parse(renderedStyle);
    styles[id] = AstRenderer_1.AstRenderer.renderStyleSheetWithId(toClassSelector(className), ast);
    updateStyleEl();
    return className;
}
exports.css = css;
const tags = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
];
const generatedInnerFunction = generateInnerFunction("div");
exports.styled = tags.reduce((prev, key) => (prev[key] = generateInnerFunction(key), prev), generatedInnerFunction);
//# sourceMappingURL=index.js.map