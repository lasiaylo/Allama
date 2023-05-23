export function ToNonbreakHyphen(str: string) {
  return str.replaceAll('-', '‑');
}

export function isEmpty(str: string) {
  return !str || str.length === 0;
}

export function isBlank(str: string | null) {
  return !str || /^\s*$/.test(str);
}
