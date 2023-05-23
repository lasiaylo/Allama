function isDefined<T>(arg: T | undefined): arg is T {
  return arg !== undefined;
}

function isNonNull<T>(arg: T | null | undefined): arg is T {
  return isDefined(arg) && arg !== null;
}
