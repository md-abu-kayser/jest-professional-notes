import { rmSync, existsSync } from "fs";
import path from "path";

export default async function globalTeardown(): Promise<void> {
  console.log("🧹 Running global teardown...");

  const tempFile = path.join(__dirname, "global-setup.json");
  if (existsSync(tempFile)) {
    rmSync(tempFile);
  }

  console.log("Global teardown complete.");
}
