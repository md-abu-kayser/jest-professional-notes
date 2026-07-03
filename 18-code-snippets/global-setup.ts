import { execSync } from "child_process";
import { writeFileSync } from "fs";
import path from "path";

export default async function globalSetup(): Promise<void> {
  console.log("🌍 Running global setup...");

  process.env.API_BASE_URL = "http://localhost:9999";

  const globalData = {
    testStartTime: Date.now(),
    apiBaseUrl: process.env.API_BASE_URL,
  };
  writeFileSync(
    path.join(__dirname, "global-setup.json"),
    JSON.stringify(globalData, null, 2),
  );

  console.log("Global setup complete.");
}
