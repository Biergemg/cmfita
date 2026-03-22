const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
    };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  buckets.set(key, current);
  return {
    allowed: true,
    remaining: MAX_REQUESTS - current.count,
    retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
  };
}

export function clearRateLimitBuckets() {
  buckets.clear();
}
