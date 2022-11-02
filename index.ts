import { h, Component, render } from "zheleznaya";

const Chars = "abcdefghijklmnopqrstuvwxyz0123456789";
export function random(size: number = 5) {
  return Array(size).fill(null).map(() => Chars[Math.floor(Math.random() * (Chars.length))]).join("");
}

const styles: Record<string, string> = {};
let styleEl: HTMLStyleElement;
function init() {
  styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
}

function expand<T>(props: T, expander: ((props: T) => (string | number)) | string | number) {
  if (expander == null) {
    return "";
  }
  if (typeof expander === "string" || typeof expander === "number") {
    return expander;
  }
  return expander(props);
}

function toSelector(id: string) {
  return `*[data-zstyl='${id}']`
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
function convertToNonNestedStyle(id: string, style: string): string {
  const results = [];
  const patterns = style.matchAll(/([^;\{\}]+)\{([^\{\}]+)\}/g);
  for (const matched of patterns) {
    style = style.replace(matched[0].trim(), "");
    results.push(`${
      matched[1].trim().startsWith("&")
        ? matched[1].trim().replace("&", toSelector(id))
        : `${toSelector(id)} ${matched[1].trim()}`} { ${matched[2].trim()} }`);
  }
  results.unshift(`${toSelector(id)} { ${style.trim()} }`);
  return results.join("\n");
}

export function toStyleString<T>(id: string, props: T) {
  return (template: TemplateStringsArray, ...values: Array<((props: T) => (string | number)) | string | number>) => {
    const renderedStyle = template.map((it, i) => `${it}${expand(props, values[i])}`).join("").replace(/\n/g, "").replace(/ {2,}/g, " ").trim()
    return convertToNonNestedStyle(id, renderedStyle);
  }
}

function generateInnerFunction(tag: typeof tags[number]) {
  return function innerFunction<T>(template: TemplateStringsArray, ...values: Array<((props: T) => (string | number)) | string | number>): Component<T> {
    if (!styleEl) init();

    const id = random();
    return (props, children) => {
      styles[id] = toStyleString(id, props)(template, ...values);
      styleEl.innerHTML = Object.values(styles).map((v) => (v)).join("\n");

      return h(tag, { ...props, "data-zstyl": id }, ...children) as any;
    }
  }
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
] as const;

type StyledFunction = ReturnType<typeof generateInnerFunction>

const generatedInnerFunction = generateInnerFunction("div")
export const styled = tags.reduce((prev, key) => (prev[key] = generateInnerFunction(key), prev), generatedInnerFunction as unknown as (
  { [key in typeof tags[number]]: StyledFunction; } & StyledFunction
))