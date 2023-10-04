"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
const AD_REPLACER_R = /(a)(d)/gi;
const charsLength = 52;
function getAlphabeticChar(code) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
}
function getAlphabeticString(code) {
    let name = '';
    let x;
    for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
        name = getAlphabeticChar(x % charsLength) + name;
    }
    return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, "$1-$2");
}
// djb2 algorithm
function phash(h, text) {
    let i = text.length;
    while (i) {
        h = (h * 33) ^ text.charCodeAt(--i);
    }
    return h;
}
const SEED = 5381;
function hashString(text) {
    return getAlphabeticString(phash(SEED, text));
}
exports.hashString = hashString;
//# sourceMappingURL=hash.js.map