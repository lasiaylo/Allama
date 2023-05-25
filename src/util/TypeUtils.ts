export function isDefined<T>(arg: T | undefined): arg is T {
  return arg !== undefined;
}

export function isNonNull<T>(arg: T | null | undefined): arg is T {
  return isDefined(arg) && arg !== null;
}
