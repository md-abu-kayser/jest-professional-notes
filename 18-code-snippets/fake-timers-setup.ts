beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-01-01T00:00:00Z")); // optional fixed date
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

export async function advanceTimersAndFlush(ms: number): Promise<void> {
  jest.advanceTimersByTime(ms);
  await new Promise(jest.requireActual("timers").setImmediate);
}
