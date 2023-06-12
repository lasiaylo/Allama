export function isDefined(arg) {
    return arg !== undefined;
}
export function isNonNull(arg) {
    return isDefined(arg) && arg !== null;
}
