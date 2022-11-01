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

function toStyleString<T>(id: string, template: TemplateStringsArray, values: Array<(props: T) => (string | number)>, props: T) {
  return `
    *[data-zstyl=${id}] {
      ${template.map((it, i) => `${it}${values[i]?.(props) ?? ""}`).join("")}
    }
  `;
}

export function styled<T>(template: TemplateStringsArray, ...values: Array<(props: T) => (string | number)>): Component<T> {
  if (!styleEl) init();

  const id = random();
  return (props, children) => {
    styles[id] = toStyleString(id, template, values, props);
    styleEl.innerText = Object.values(styles).map((v) => (v)).join("\n");

    return <div {...props as any} data-zstyl={id}>{children}</div>
  }
}
