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
function styled(template, ...values) {
    if (!styleEl)
        init();
    const id = random();
    return (props, children) => {
        styles[id] = toStyleString(id, props)(template, ...values);
        console.log(styles);
        styleEl.innerHTML = Object.values(styles).map((v) => (v)).join("\n");
        return (0, zheleznaya_1.h)("div", { "data-zstyl": id }, ...children);
    };
}
exports.styled = styled;
//# sourceMappingURL=index.js.map