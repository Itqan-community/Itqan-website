/**
 * Task scheduler utilities to break up long tasks and improve TBT
 */

/**
 * Yields control to the main thread by scheduling the next task
 */
export function yieldToMain(): Promise<void> {
  return new Promise(resolve => {
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      // Use scheduler API if available (modern browsers)
      (window as any).scheduler.postTask(resolve, { priority: 'user-blocking' });
    } else {
      // Fallback to setTimeout
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Processes an array of items in chunks to avoid blocking the main thread
 */
export async function processInChunks<T>(
  items: T[],
  processor: (item: T, index: number) => void | Promise<void>,
  chunkSize: number = 5
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    
    // Process chunk
    for (let j = 0; j < chunk.length; j++) {
      await processor(chunk[j], i + j);
    }
    
    // Yield control if there are more items
    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }
}

/**
 * Defers execution of non-critical tasks until idle
 */
export function runWhenIdle(callback: () => void | Promise<void>): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout: 5000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(callback, 100);
  }
}

/**
 * Optimized animation frame scheduler
 */
export function scheduleWork(callback: () => void): number {
  return requestAnimationFrame(() => {
    // Use postMessage for better scheduling
    const channel = new MessageChannel();
    channel.port2.onmessage = () => callback();
    channel.port1.postMessage(null);
  });
}
