import { h, Component, render } from "zheleznaya";
import { AstRenderer } from "./AstRenderer";
import { StyleSheetParser } from "./BNFStyledParser";

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

export function toStyleString<T>(id: string, props: T) {
  return (template: TemplateStringsArray, ...values: Array<((props: T) => (string | number)) | string | number>) => {
    const renderedStyle = template.map((it, i) => `${it}${expand(props, values[i])}`).join("");
    const { ast } = StyleSheetParser.parse(renderedStyle);
    return AstRenderer.renderStyleSheetWithId(toSelector(id), ast!);
  }
}

function isServerSide(): boolean {
  return typeof window === "undefined";
}

function generateInnerFunction<U extends typeof tags[number]>(tag: U) {
  return function innerFunction<T>(template: TemplateStringsArray, ...values: Array<((props: T & Partial<TagAndHTMLType[U]>) => (string | number)) | string | number>): Component<T & Partial<TagAndHTMLType[U]>> {
    if (!isServerSide() && !styleEl) init();

    const id = random();
    return (props, children) => {
      styles[id] = toStyleString(id, props)(template, ...values);
      styleEl && (styleEl.innerHTML = Object.values(styles).map((v) => (v)).join("\n"));

      return h(tag, { ...props, "data-zstyl": id }, ...children) as any;
    }
  }
}
type TagAndHTMLType = {
  a: HTMLAnchorElement;
  abbr: HTMLElement;
  address: HTMLElement;
  area: HTMLAreaElement;
  article: HTMLElement;
  aside: HTMLElement;
  audio: HTMLAudioElement;
  b: HTMLElement;
  base: HTMLBaseElement;
  bdi: HTMLElement;
  bdo: HTMLElement;
  big: HTMLElement;
  blockquote: HTMLElement;
  body: HTMLBodyElement;
  br: HTMLBRElement;
  button: HTMLButtonElement;
  canvas: HTMLCanvasElement;
  caption: HTMLElement;
  cite: HTMLElement;
  code: HTMLElement;
  col: HTMLTableColElement;
  colgroup: HTMLTableColElement;
  data: HTMLElement;
  datalist: HTMLDataListElement;
  dd: HTMLElement;
  del: HTMLElement;
  details: HTMLElement;
  dfn: HTMLElement;
  dialog: HTMLDialogElement;
  div: HTMLDivElement;
  dl: HTMLDListElement;
  dt: HTMLElement;
  em: HTMLElement;
  embed: HTMLEmbedElement;
  fieldset: HTMLFieldSetElement;
  figcaption: HTMLElement;
  figure: HTMLElement;
  footer: HTMLElement;
  form: HTMLFormElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  head: HTMLElement;
  header: HTMLElement;
  hgroup: HTMLElement;
  hr: HTMLHRElement;
  html: HTMLHtmlElement;
  i: HTMLElement;
  iframe: HTMLIFrameElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  ins: HTMLModElement;
  kbd: HTMLElement;
  keygen: HTMLElement;
  label: HTMLLabelElement;
  legend: HTMLLegendElement;
  li: HTMLLIElement;
  link: HTMLLinkElement;
  main: HTMLElement;
  map: HTMLMapElement;
  mark: HTMLElement;
  menu: HTMLElement;
  menuitem: HTMLElement;
  meta: HTMLMetaElement;
  meter: HTMLElement;
  nav: HTMLElement;
  noscript: HTMLElement;
  object: HTMLObjectElement;
  ol: HTMLOListElement;
  optgroup: HTMLOptGroupElement;
  option: HTMLOptionElement;
  output: HTMLElement;
  p: HTMLParagraphElement;
  param: HTMLParamElement;
  picture: HTMLElement;
  pre: HTMLPreElement;
  progress: HTMLProgressElement;
  q: HTMLQuoteElement;
  rp: HTMLElement;
  rt: HTMLElement;
  ruby: HTMLElement;
  s: HTMLElement;
  samp: HTMLElement;
  script: HTMLScriptElement;
  section: HTMLElement;
  select: HTMLSelectElement;
  small: HTMLElement;
  source: HTMLSourceElement;
  span: HTMLSpanElement;
  strong: HTMLElement;
  style: HTMLStyleElement;
  sub: HTMLElement;
  summary: HTMLElement;
  sup: HTMLElement;
  table: HTMLTableElement;
  tbody: HTMLTableSectionElement;
  td: HTMLTableDataCellElement;
  textarea: HTMLTextAreaElement;
  tfoot: HTMLTableSectionElement;
  th: HTMLTableHeaderCellElement;
  thead: HTMLTableSectionElement;
  time: HTMLElement;
  title: HTMLTitleElement;
  tr: HTMLTableRowElement;
  track: HTMLTrackElement;
  u: HTMLElement;
  ul: HTMLUListElement;
  var: HTMLElement;
  video: HTMLVideoElement;
  wbr: HTMLElement;
}

const tags: Array<keyof TagAndHTMLType> = [
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

type StyledFunction<T extends keyof TagAndHTMLType> = ReturnType<typeof generateInnerFunction<T>>

const generatedInnerFunction = generateInnerFunction("div")
export const styled = tags.reduce((prev, key) => (prev[key] = generateInnerFunction(key), prev), generatedInnerFunction as unknown as (
  { [key in typeof tags[number]]: StyledFunction<key>; } & StyledFunction<"div">
))
