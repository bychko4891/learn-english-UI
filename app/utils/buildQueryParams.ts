export function buildQueryParams(params: Record<string, string>) {
  const param = [];
  for (const key in params) {
    param.push(`${key}=${params[key]}`);
  }
  return param.join("&");
}
