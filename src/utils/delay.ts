export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let lastInvocationTime: number = Date.now();

export async function handleDelay(delayTime: number) {
  const now = Date.now();
  const timeSinceLastInvocation = now - lastInvocationTime;
  lastInvocationTime = Date.now()
  if (timeSinceLastInvocation < delayTime) {
    const ms = delayTime - timeSinceLastInvocation
    lastInvocationTime = Date.now() + ms
    await delay(ms);
  }
  return;
}