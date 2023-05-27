import { Component } from "zheleznaya";
export declare function random(size?: number): string;
export declare function toStyleString<T>(template: TemplateStringsArray, ...values: Array<((props: T) => (string | number)) | string | number>): (id: string, props: T) => string;
export declare function css<U extends typeof tags[number], T>(template: TemplateStringsArray, ...values: Array<((props: T & Partial<TagAndHTMLType[U]>) => (string | number)) | string | number>): string;
declare type TagAndHTMLType = {
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
};
declare const tags: Array<keyof TagAndHTMLType>;
export declare const styled: {
    object: <T>(template: TemplateStringsArray, ...values: (string | number | ((props: T & Partial<HTMLObjectElement>) => (string | number)))[]) => Component<T & Partial<HTMLObjectElement>>;
    body: <T_1>(template: TemplateStringsArray, ...values: (string | number | ((props: T_1 & Partial<HTMLBodyElement>) => (string | number)))[]) => Component<T_1 & Partial<HTMLBodyElement>>;
    a: <T_2>(template: TemplateStringsArray, ...values: (string | number | ((props: T_2 & Partial<HTMLAnchorElement>) => (string | number)))[]) => Component<T_2 & Partial<HTMLAnchorElement>>;
    abbr: <T_3>(template: TemplateStringsArray, ...values: (string | number | ((props: T_3 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_3 & Partial<HTMLElement>>;
    address: <T_4>(template: TemplateStringsArray, ...values: (string | number | ((props: T_4 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_4 & Partial<HTMLElement>>;
    area: <T_5>(template: TemplateStringsArray, ...values: (string | number | ((props: T_5 & Partial<HTMLAreaElement>) => (string | number)))[]) => Component<T_5 & Partial<HTMLAreaElement>>;
    article: <T_6>(template: TemplateStringsArray, ...values: (string | number | ((props: T_6 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_6 & Partial<HTMLElement>>;
    aside: <T_7>(template: TemplateStringsArray, ...values: (string | number | ((props: T_7 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_7 & Partial<HTMLElement>>;
    audio: <T_8>(template: TemplateStringsArray, ...values: (string | number | ((props: T_8 & Partial<HTMLAudioElement>) => (string | number)))[]) => Component<T_8 & Partial<HTMLAudioElement>>;
    b: <T_9>(template: TemplateStringsArray, ...values: (string | number | ((props: T_9 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_9 & Partial<HTMLElement>>;
    base: <T_10>(template: TemplateStringsArray, ...values: (string | number | ((props: T_10 & Partial<HTMLBaseElement>) => (string | number)))[]) => Component<T_10 & Partial<HTMLBaseElement>>;
    bdi: <T_11>(template: TemplateStringsArray, ...values: (string | number | ((props: T_11 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_11 & Partial<HTMLElement>>;
    bdo: <T_12>(template: TemplateStringsArray, ...values: (string | number | ((props: T_12 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_12 & Partial<HTMLElement>>;
    blockquote: <T_13>(template: TemplateStringsArray, ...values: (string | number | ((props: T_13 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_13 & Partial<HTMLElement>>;
    br: <T_14>(template: TemplateStringsArray, ...values: (string | number | ((props: T_14 & Partial<HTMLBRElement>) => (string | number)))[]) => Component<T_14 & Partial<HTMLBRElement>>;
    button: <T_15>(template: TemplateStringsArray, ...values: (string | number | ((props: T_15 & Partial<HTMLButtonElement>) => (string | number)))[]) => Component<T_15 & Partial<HTMLButtonElement>>;
    canvas: <T_16>(template: TemplateStringsArray, ...values: (string | number | ((props: T_16 & Partial<HTMLCanvasElement>) => (string | number)))[]) => Component<T_16 & Partial<HTMLCanvasElement>>;
    caption: <T_17>(template: TemplateStringsArray, ...values: (string | number | ((props: T_17 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_17 & Partial<HTMLElement>>;
    cite: <T_18>(template: TemplateStringsArray, ...values: (string | number | ((props: T_18 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_18 & Partial<HTMLElement>>;
    code: <T_19>(template: TemplateStringsArray, ...values: (string | number | ((props: T_19 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_19 & Partial<HTMLElement>>;
    col: <T_20>(template: TemplateStringsArray, ...values: (string | number | ((props: T_20 & Partial<HTMLTableColElement>) => (string | number)))[]) => Component<T_20 & Partial<HTMLTableColElement>>;
    colgroup: <T_21>(template: TemplateStringsArray, ...values: (string | number | ((props: T_21 & Partial<HTMLTableColElement>) => (string | number)))[]) => Component<T_21 & Partial<HTMLTableColElement>>;
    data: <T_22>(template: TemplateStringsArray, ...values: (string | number | ((props: T_22 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_22 & Partial<HTMLElement>>;
    datalist: <T_23>(template: TemplateStringsArray, ...values: (string | number | ((props: T_23 & Partial<HTMLDataListElement>) => (string | number)))[]) => Component<T_23 & Partial<HTMLDataListElement>>;
    dd: <T_24>(template: TemplateStringsArray, ...values: (string | number | ((props: T_24 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_24 & Partial<HTMLElement>>;
    del: <T_25>(template: TemplateStringsArray, ...values: (string | number | ((props: T_25 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_25 & Partial<HTMLElement>>;
    details: <T_26>(template: TemplateStringsArray, ...values: (string | number | ((props: T_26 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_26 & Partial<HTMLElement>>;
    dfn: <T_27>(template: TemplateStringsArray, ...values: (string | number | ((props: T_27 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_27 & Partial<HTMLElement>>;
    dialog: <T_28>(template: TemplateStringsArray, ...values: (string | number | ((props: T_28 & Partial<HTMLDialogElement>) => (string | number)))[]) => Component<T_28 & Partial<HTMLDialogElement>>;
    div: <T_29>(template: TemplateStringsArray, ...values: (string | number | ((props: T_29 & Partial<HTMLDivElement>) => (string | number)))[]) => Component<T_29 & Partial<HTMLDivElement>>;
    dl: <T_30>(template: TemplateStringsArray, ...values: (string | number | ((props: T_30 & Partial<HTMLDListElement>) => (string | number)))[]) => Component<T_30 & Partial<HTMLDListElement>>;
    dt: <T_31>(template: TemplateStringsArray, ...values: (string | number | ((props: T_31 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_31 & Partial<HTMLElement>>;
    em: <T_32>(template: TemplateStringsArray, ...values: (string | number | ((props: T_32 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_32 & Partial<HTMLElement>>;
    embed: <T_33>(template: TemplateStringsArray, ...values: (string | number | ((props: T_33 & Partial<HTMLEmbedElement>) => (string | number)))[]) => Component<T_33 & Partial<HTMLEmbedElement>>;
    fieldset: <T_34>(template: TemplateStringsArray, ...values: (string | number | ((props: T_34 & Partial<HTMLFieldSetElement>) => (string | number)))[]) => Component<T_34 & Partial<HTMLFieldSetElement>>;
    figcaption: <T_35>(template: TemplateStringsArray, ...values: (string | number | ((props: T_35 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_35 & Partial<HTMLElement>>;
    figure: <T_36>(template: TemplateStringsArray, ...values: (string | number | ((props: T_36 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_36 & Partial<HTMLElement>>;
    footer: <T_37>(template: TemplateStringsArray, ...values: (string | number | ((props: T_37 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_37 & Partial<HTMLElement>>;
    form: <T_38>(template: TemplateStringsArray, ...values: (string | number | ((props: T_38 & Partial<HTMLFormElement>) => (string | number)))[]) => Component<T_38 & Partial<HTMLFormElement>>;
    h1: <T_39>(template: TemplateStringsArray, ...values: (string | number | ((props: T_39 & Partial<HTMLHeadingElement>) => (string | number)))[]) => Component<T_39 & Partial<HTMLHeadingElement>>;
    h2: <T_40>(template: TemplateStringsArray, ...values: (string | number | ((props: T_40 & Partial<HTMLHeadingElement>) => (string | number)))[]) => Component<T_40 & Partial<HTMLHeadingElement>>;
    h3: <T_41>(template: TemplateStringsArray, ...values: (string | number | ((props: T_41 & Partial<HTMLHeadingElement>) => (string | number)))[]) => Component<T_41 & Partial<HTMLHeadingElement>>;
    h4: <T_42>(template: TemplateStringsArray, ...values: (string | number | ((props: T_42 & Partial<HTMLHeadingElement>) => (string | number)))[]) => Component<T_42 & Partial<HTMLHeadingElement>>;
    h5: <T_43>(template: TemplateStringsArray, ...values: (string | number | ((props: T_43 & Partial<HTMLHeadingElement>) => (string | number)))[]) => Component<T_43 & Partial<HTMLHeadingElement>>;
    h6: <T_44>(template: TemplateStringsArray, ...values: (string | number | ((props: T_44 & Partial<HTMLHeadingElement>) => (string | number)))[]) => Component<T_44 & Partial<HTMLHeadingElement>>;
    head: <T_45>(template: TemplateStringsArray, ...values: (string | number | ((props: T_45 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_45 & Partial<HTMLElement>>;
    header: <T_46>(template: TemplateStringsArray, ...values: (string | number | ((props: T_46 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_46 & Partial<HTMLElement>>;
    hgroup: <T_47>(template: TemplateStringsArray, ...values: (string | number | ((props: T_47 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_47 & Partial<HTMLElement>>;
    hr: <T_48>(template: TemplateStringsArray, ...values: (string | number | ((props: T_48 & Partial<HTMLHRElement>) => (string | number)))[]) => Component<T_48 & Partial<HTMLHRElement>>;
    html: <T_49>(template: TemplateStringsArray, ...values: (string | number | ((props: T_49 & Partial<HTMLHtmlElement>) => (string | number)))[]) => Component<T_49 & Partial<HTMLHtmlElement>>;
    i: <T_50>(template: TemplateStringsArray, ...values: (string | number | ((props: T_50 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_50 & Partial<HTMLElement>>;
    iframe: <T_51>(template: TemplateStringsArray, ...values: (string | number | ((props: T_51 & Partial<HTMLIFrameElement>) => (string | number)))[]) => Component<T_51 & Partial<HTMLIFrameElement>>;
    img: <T_52>(template: TemplateStringsArray, ...values: (string | number | ((props: T_52 & Partial<HTMLImageElement>) => (string | number)))[]) => Component<T_52 & Partial<HTMLImageElement>>;
    input: <T_53>(template: TemplateStringsArray, ...values: (string | number | ((props: T_53 & Partial<HTMLInputElement>) => (string | number)))[]) => Component<T_53 & Partial<HTMLInputElement>>;
    ins: <T_54>(template: TemplateStringsArray, ...values: (string | number | ((props: T_54 & Partial<HTMLModElement>) => (string | number)))[]) => Component<T_54 & Partial<HTMLModElement>>;
    kbd: <T_55>(template: TemplateStringsArray, ...values: (string | number | ((props: T_55 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_55 & Partial<HTMLElement>>;
    label: <T_56>(template: TemplateStringsArray, ...values: (string | number | ((props: T_56 & Partial<HTMLLabelElement>) => (string | number)))[]) => Component<T_56 & Partial<HTMLLabelElement>>;
    legend: <T_57>(template: TemplateStringsArray, ...values: (string | number | ((props: T_57 & Partial<HTMLLegendElement>) => (string | number)))[]) => Component<T_57 & Partial<HTMLLegendElement>>;
    li: <T_58>(template: TemplateStringsArray, ...values: (string | number | ((props: T_58 & Partial<HTMLLIElement>) => (string | number)))[]) => Component<T_58 & Partial<HTMLLIElement>>;
    link: <T_59>(template: TemplateStringsArray, ...values: (string | number | ((props: T_59 & Partial<HTMLLinkElement>) => (string | number)))[]) => Component<T_59 & Partial<HTMLLinkElement>>;
    main: <T_60>(template: TemplateStringsArray, ...values: (string | number | ((props: T_60 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_60 & Partial<HTMLElement>>;
    map: <T_61>(template: TemplateStringsArray, ...values: (string | number | ((props: T_61 & Partial<HTMLMapElement>) => (string | number)))[]) => Component<T_61 & Partial<HTMLMapElement>>;
    mark: <T_62>(template: TemplateStringsArray, ...values: (string | number | ((props: T_62 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_62 & Partial<HTMLElement>>;
    menu: <T_63>(template: TemplateStringsArray, ...values: (string | number | ((props: T_63 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_63 & Partial<HTMLElement>>;
    meta: <T_64>(template: TemplateStringsArray, ...values: (string | number | ((props: T_64 & Partial<HTMLMetaElement>) => (string | number)))[]) => Component<T_64 & Partial<HTMLMetaElement>>;
    meter: <T_65>(template: TemplateStringsArray, ...values: (string | number | ((props: T_65 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_65 & Partial<HTMLElement>>;
    nav: <T_66>(template: TemplateStringsArray, ...values: (string | number | ((props: T_66 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_66 & Partial<HTMLElement>>;
    noscript: <T_67>(template: TemplateStringsArray, ...values: (string | number | ((props: T_67 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_67 & Partial<HTMLElement>>;
    ol: <T_68>(template: TemplateStringsArray, ...values: (string | number | ((props: T_68 & Partial<HTMLOListElement>) => (string | number)))[]) => Component<T_68 & Partial<HTMLOListElement>>;
    optgroup: <T_69>(template: TemplateStringsArray, ...values: (string | number | ((props: T_69 & Partial<HTMLOptGroupElement>) => (string | number)))[]) => Component<T_69 & Partial<HTMLOptGroupElement>>;
    option: <T_70>(template: TemplateStringsArray, ...values: (string | number | ((props: T_70 & Partial<HTMLOptionElement>) => (string | number)))[]) => Component<T_70 & Partial<HTMLOptionElement>>;
    output: <T_71>(template: TemplateStringsArray, ...values: (string | number | ((props: T_71 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_71 & Partial<HTMLElement>>;
    p: <T_72>(template: TemplateStringsArray, ...values: (string | number | ((props: T_72 & Partial<HTMLParagraphElement>) => (string | number)))[]) => Component<T_72 & Partial<HTMLParagraphElement>>;
    picture: <T_73>(template: TemplateStringsArray, ...values: (string | number | ((props: T_73 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_73 & Partial<HTMLElement>>;
    pre: <T_74>(template: TemplateStringsArray, ...values: (string | number | ((props: T_74 & Partial<HTMLPreElement>) => (string | number)))[]) => Component<T_74 & Partial<HTMLPreElement>>;
    progress: <T_75>(template: TemplateStringsArray, ...values: (string | number | ((props: T_75 & Partial<HTMLProgressElement>) => (string | number)))[]) => Component<T_75 & Partial<HTMLProgressElement>>;
    q: <T_76>(template: TemplateStringsArray, ...values: (string | number | ((props: T_76 & Partial<HTMLQuoteElement>) => (string | number)))[]) => Component<T_76 & Partial<HTMLQuoteElement>>;
    rp: <T_77>(template: TemplateStringsArray, ...values: (string | number | ((props: T_77 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_77 & Partial<HTMLElement>>;
    rt: <T_78>(template: TemplateStringsArray, ...values: (string | number | ((props: T_78 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_78 & Partial<HTMLElement>>;
    ruby: <T_79>(template: TemplateStringsArray, ...values: (string | number | ((props: T_79 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_79 & Partial<HTMLElement>>;
    s: <T_80>(template: TemplateStringsArray, ...values: (string | number | ((props: T_80 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_80 & Partial<HTMLElement>>;
    samp: <T_81>(template: TemplateStringsArray, ...values: (string | number | ((props: T_81 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_81 & Partial<HTMLElement>>;
    script: <T_82>(template: TemplateStringsArray, ...values: (string | number | ((props: T_82 & Partial<HTMLScriptElement>) => (string | number)))[]) => Component<T_82 & Partial<HTMLScriptElement>>;
    section: <T_83>(template: TemplateStringsArray, ...values: (string | number | ((props: T_83 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_83 & Partial<HTMLElement>>;
    select: <T_84>(template: TemplateStringsArray, ...values: (string | number | ((props: T_84 & Partial<HTMLSelectElement>) => (string | number)))[]) => Component<T_84 & Partial<HTMLSelectElement>>;
    small: <T_85>(template: TemplateStringsArray, ...values: (string | number | ((props: T_85 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_85 & Partial<HTMLElement>>;
    source: <T_86>(template: TemplateStringsArray, ...values: (string | number | ((props: T_86 & Partial<HTMLSourceElement>) => (string | number)))[]) => Component<T_86 & Partial<HTMLSourceElement>>;
    span: <T_87>(template: TemplateStringsArray, ...values: (string | number | ((props: T_87 & Partial<HTMLSpanElement>) => (string | number)))[]) => Component<T_87 & Partial<HTMLSpanElement>>;
    strong: <T_88>(template: TemplateStringsArray, ...values: (string | number | ((props: T_88 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_88 & Partial<HTMLElement>>;
    style: <T_89>(template: TemplateStringsArray, ...values: (string | number | ((props: T_89 & Partial<HTMLStyleElement>) => (string | number)))[]) => Component<T_89 & Partial<HTMLStyleElement>>;
    sub: <T_90>(template: TemplateStringsArray, ...values: (string | number | ((props: T_90 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_90 & Partial<HTMLElement>>;
    summary: <T_91>(template: TemplateStringsArray, ...values: (string | number | ((props: T_91 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_91 & Partial<HTMLElement>>;
    sup: <T_92>(template: TemplateStringsArray, ...values: (string | number | ((props: T_92 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_92 & Partial<HTMLElement>>;
    table: <T_93>(template: TemplateStringsArray, ...values: (string | number | ((props: T_93 & Partial<HTMLTableElement>) => (string | number)))[]) => Component<T_93 & Partial<HTMLTableElement>>;
    tbody: <T_94>(template: TemplateStringsArray, ...values: (string | number | ((props: T_94 & Partial<HTMLTableSectionElement>) => (string | number)))[]) => Component<T_94 & Partial<HTMLTableSectionElement>>;
    td: <T_95>(template: TemplateStringsArray, ...values: (string | number | ((props: T_95 & Partial<HTMLTableDataCellElement>) => (string | number)))[]) => Component<T_95 & Partial<HTMLTableDataCellElement>>;
    textarea: <T_96>(template: TemplateStringsArray, ...values: (string | number | ((props: T_96 & Partial<HTMLTextAreaElement>) => (string | number)))[]) => Component<T_96 & Partial<HTMLTextAreaElement>>;
    tfoot: <T_97>(template: TemplateStringsArray, ...values: (string | number | ((props: T_97 & Partial<HTMLTableSectionElement>) => (string | number)))[]) => Component<T_97 & Partial<HTMLTableSectionElement>>;
    th: <T_98>(template: TemplateStringsArray, ...values: (string | number | ((props: T_98 & Partial<HTMLTableHeaderCellElement>) => (string | number)))[]) => Component<T_98 & Partial<HTMLTableHeaderCellElement>>;
    thead: <T_99>(template: TemplateStringsArray, ...values: (string | number | ((props: T_99 & Partial<HTMLTableSectionElement>) => (string | number)))[]) => Component<T_99 & Partial<HTMLTableSectionElement>>;
    time: <T_100>(template: TemplateStringsArray, ...values: (string | number | ((props: T_100 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_100 & Partial<HTMLElement>>;
    title: <T_101>(template: TemplateStringsArray, ...values: (string | number | ((props: T_101 & Partial<HTMLTitleElement>) => (string | number)))[]) => Component<T_101 & Partial<HTMLTitleElement>>;
    tr: <T_102>(template: TemplateStringsArray, ...values: (string | number | ((props: T_102 & Partial<HTMLTableRowElement>) => (string | number)))[]) => Component<T_102 & Partial<HTMLTableRowElement>>;
    track: <T_103>(template: TemplateStringsArray, ...values: (string | number | ((props: T_103 & Partial<HTMLTrackElement>) => (string | number)))[]) => Component<T_103 & Partial<HTMLTrackElement>>;
    u: <T_104>(template: TemplateStringsArray, ...values: (string | number | ((props: T_104 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_104 & Partial<HTMLElement>>;
    ul: <T_105>(template: TemplateStringsArray, ...values: (string | number | ((props: T_105 & Partial<HTMLUListElement>) => (string | number)))[]) => Component<T_105 & Partial<HTMLUListElement>>;
    var: <T_106>(template: TemplateStringsArray, ...values: (string | number | ((props: T_106 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_106 & Partial<HTMLElement>>;
    video: <T_107>(template: TemplateStringsArray, ...values: (string | number | ((props: T_107 & Partial<HTMLVideoElement>) => (string | number)))[]) => Component<T_107 & Partial<HTMLVideoElement>>;
    wbr: <T_108>(template: TemplateStringsArray, ...values: (string | number | ((props: T_108 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_108 & Partial<HTMLElement>>;
    big: <T_109>(template: TemplateStringsArray, ...values: (string | number | ((props: T_109 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_109 & Partial<HTMLElement>>;
    keygen: <T_110>(template: TemplateStringsArray, ...values: (string | number | ((props: T_110 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_110 & Partial<HTMLElement>>;
    menuitem: <T_111>(template: TemplateStringsArray, ...values: (string | number | ((props: T_111 & Partial<HTMLElement>) => (string | number)))[]) => Component<T_111 & Partial<HTMLElement>>;
    param: <T_112>(template: TemplateStringsArray, ...values: (string | number | ((props: T_112 & Partial<HTMLParamElement>) => (string | number)))[]) => Component<T_112 & Partial<HTMLParamElement>>;
} & (<T_29>(template: TemplateStringsArray, ...values: (string | number | ((props: T_29 & Partial<HTMLDivElement>) => (string | number)))[]) => Component<T_29 & Partial<HTMLDivElement>>);
export {};
//# sourceMappingURL=index.d.ts.map