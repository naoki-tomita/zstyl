"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styled = exports.toStyleString = exports.random = void 0;
const zheleznaya_1 = require("zheleznaya");
const Chars = "abcdefghijklmnopqrstuvwxyz0123456789";
function random(size = 5) {
    return Array(size).fill(null).map(() => Chars[Math.floor(Math.random() * (Chars.length))]).join("");
}
exports.random = random;
const styles = {};
let styleEl;
function init() {
    styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
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
/*
input
display: flex;
justify-content: center;

&:hover {
  display: block;
  color: red;
}

output
$id {
  display: flex;
  justify-content: center;
}

${id}:hover {
  display: block;
  color: red;
}
 */
function convertToNonNestedStyle(id, style) {
    const results = [];
    const patterns = style.matchAll(/([^;\{\}]+)\{([^\{\}]+)\}/g);
    for (const matched of patterns) {
        style = style.replace(matched[0].trim(), "");
        results.push(`${matched[1].trim().startsWith("&")
            ? matched[1].trim().replace("&", toSelector(id))
            : `${toSelector(id)} ${matched[1].trim()}`} { ${matched[2].trim()} }`);
    }
    results.unshift(`${toSelector(id)} { ${style.trim()} }`);
    return results.join("\n");
}
function toStyleString(id, props) {
    return (template, ...values) => {
        const renderedStyle = template.map((it, i) => `${it}${expand(props, values[i])}`).join("").replace(/\n/g, "").replace(/ {2,}/g, " ").trim();
        return convertToNonNestedStyle(id, renderedStyle);
    };
}
exports.toStyleString = toStyleString;
function generateInnerFunction(tag) {
    return function innerFunction(template, ...values) {
        if (!styleEl)
            init();
        const id = random();
        return (props, children) => {
            styles[id] = toStyleString(id, props)(template, ...values);
            styleEl.innerHTML = Object.values(styles).map((v) => (v)).join("\n");
            return (0, zheleznaya_1.h)("div", { "data-zstyl": id }, ...children);
        };
    };
}
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