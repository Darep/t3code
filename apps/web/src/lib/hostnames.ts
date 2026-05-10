const LOOPBACK_HOSTNAMES = new Set(["127.0.0.1", "::1", "localhost"]);

export function normalizeHostname(hostname: string): string {
  return hostname
    .trim()
    .toLowerCase()
    .replace(/^\[(.*)\]$/, "$1");
}

export function isLoopbackHostname(hostname: string): boolean {
  const normalizedHostname = normalizeHostname(hostname);
  return LOOPBACK_HOSTNAMES.has(normalizedHostname) || normalizedHostname.startsWith("127.");
}

export function rewriteLoopbackUrlHostToPageHost(url: URL, pageHostname: string): URL {
  const normalizedPageHostname = normalizeHostname(pageHostname);
  if (
    normalizedPageHostname.length === 0 ||
    !isLoopbackHostname(url.hostname) ||
    isLoopbackHostname(normalizedPageHostname)
  ) {
    return url;
  }

  url.hostname = normalizedPageHostname;
  return url;
}
