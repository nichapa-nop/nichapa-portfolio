import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pin the workspace root to this folder (a stray lockfile in the home dir
  // was making Next infer the wrong root)
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
