import { execSync } from "child_process";
import { createServer, Server } from "http";

export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeout = 5000,
  interval = 100,
): Promise<void> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (await condition()) return;
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error("Timeout waiting for condition");
}

export function createTestServer(
  requestListener: (
    req: import("http").IncomingMessage,
    res: import("http").ServerResponse,
  ) => void,
): Promise<{ server: Server; port: number }> {
  return new Promise((resolve, reject) => {
    const server = createServer(requestListener);
    server.listen(0, () => {
      const address = server.address();
      if (address && typeof address !== "string") {
        resolve({ server, port: address.port });
      } else {
        reject(new Error("Server did not bind to a port"));
      }
    });
    server.on("error", reject);
  });
}
