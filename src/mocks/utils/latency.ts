const DEFAULT_MIN_LATENCY_MS = 1_000;
const DEFAULT_MAX_LATENCY_MS = 2_000;

export interface LatencyRange {
  minMs?: number;
  maxMs?: number;
}

/**
 * Mock endpoints resolve instantly because the data is in-memory, which hides
 * every loading state from the UI. This reproduces realistic response times so
 * skeletons, spinners, and request cancellation stay exercised in development.
 */
export async function simulateNetworkLatency(
  range: LatencyRange = {},
): Promise<void> {
  const minMs = Math.max(0, range.minMs ?? DEFAULT_MIN_LATENCY_MS);
  const maxMs = Math.max(minMs, range.maxMs ?? DEFAULT_MAX_LATENCY_MS);
  const durationMs = minMs + Math.random() * (maxMs - minMs);

  await new Promise<void>((resolve) => {
    globalThis.setTimeout(resolve, durationMs);
  });
}
