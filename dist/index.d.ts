import { Component } from "zheleznaya";
export declare function random(size?: number): string;
export declare function toStyleString<T>(id: string, props: T): (template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => string;
export declare const styled: {
    object: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    a: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    abbr: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    address: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    area: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    article: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    aside: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    audio: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    b: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    base: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    bdi: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    bdo: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    blockquote: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    body: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    br: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    button: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    canvas: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    caption: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    cite: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    code: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    col: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    colgroup: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    data: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    datalist: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    dd: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    del: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    details: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    dfn: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    dialog: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    div: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    dl: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    dt: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    em: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    embed: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    fieldset: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    figcaption: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    figure: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    footer: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    form: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    h1: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    h2: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    h3: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    h4: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    h5: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    h6: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    head: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    header: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    hgroup: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    hr: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    html: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    i: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    iframe: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    img: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    input: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    ins: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    kbd: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    label: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    legend: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    li: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    link: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    main: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    map: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    mark: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    menu: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    meta: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    meter: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    nav: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    noscript: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    ol: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    optgroup: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    option: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    output: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    p: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    picture: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    pre: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    progress: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    q: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    rp: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    rt: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    ruby: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    s: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    samp: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    script: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    section: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    select: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    small: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    source: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    span: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    strong: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    style: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    sub: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    summary: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    sup: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    table: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    tbody: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    td: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    textarea: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    tfoot: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    th: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    thead: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    time: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    title: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    tr: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    track: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    u: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    ul: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    var: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    video: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    wbr: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    big: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    keygen: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    menuitem: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
    param: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>;
} & (<T>(template: TemplateStringsArray, ...values: (string | number | ((props: T) => (string | number)))[]) => Component<T>);
//# sourceMappingURL=index.d.ts.map