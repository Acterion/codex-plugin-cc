#!/usr/bin/env node

import process from "node:process";
import { MODEL_TIERS, renderModelTierGuide } from "./lib/model-tiers.mjs";

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ tiers: MODEL_TIERS }, null, 2));
} else {
  process.stdout.write(renderModelTierGuide());
}
