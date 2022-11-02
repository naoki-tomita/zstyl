import { h, Component } from "zheleznaya";

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

export function parseStyle(style: string) {
  const results = style.match(/[^;]\s*(\S+)\s*\{([\s\S]+)}/gm);
  return results;
}

export function toStyleString<T>(id: string, props: T) {
  return (template: TemplateStringsArray, ...values: Array<(props: T) => (string | number)>) => {
    return `
      *[data-zstyl=${id}] {
        ${template.map((it, i) => `${it}${values[i]?.(props) ?? ""}`).join("")}
      }
    `;
  }
}

export function styled<T>(template: TemplateStringsArray, ...values: Array<(props: T) => (string | number)>): Component<T> {
  if (!styleEl) init();

  const id = random();
  return (props, children) => {
    styles[id] = toStyleString(id, props)(template, ...values);
    styleEl.innerText = Object.values(styles).map((v) => (v)).join("\n");

    return <div {...props as any} data-zstyl={id}>{children}</div>
  }
}
