export function ToNonbreakHyphen(str) {
    return str.replaceAll('-', '‑');
}
export function isEmpty(str) {
    return !str || str.length === 0;
}
export function isBlank(str) {
    return !str || /^\s*$/.test(str);
}
