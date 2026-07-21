export const CACHE_HEADERS = {
  STATIC_ASSETS: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
  DYNAMIC_READ: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  },
  PRIVATE_NO_CACHE: {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
  },
};
