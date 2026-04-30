export function getAppBasePath(locationLike = globalThis.location) {
  const pathname = locationLike?.pathname || '/';
  if (pathname === '/ops-console' || pathname.startsWith('/ops-console/')) {
    return '/ops-console';
  }
  return '';
}

export function toAppUrl(path, locationLike = globalThis.location) {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return path;
  }
  return `${getAppBasePath(locationLike)}${path}`;
}

export function toAppWebSocketUrl(path = '/ws', locationLike = globalThis.location) {
  const proto = locationLike?.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${locationLike.host}${toAppUrl(path, locationLike)}`;
}
