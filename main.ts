import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "It's midnight and my fridge just locked me out; apparently the leftovers hired a bouncer, and I'm not on the list.";

const OUT = "/output/entry.txt";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
const roundTrip = readFileSync(OUT, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("round-trip mismatch: file content differs from entry");
}
console.log(`wrote ${ENTRY.length} chars to ${OUT}`);
