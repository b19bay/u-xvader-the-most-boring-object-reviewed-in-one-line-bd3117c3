import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The nail clipper has trimmed a thousand nails and still launches one clipping across the room every single time.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  console.error("entry line fails the gate (1-200 chars, single line)");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
// Read-back check: what landed on disk must be byte-identical to the line,
// and the byte count is part of the tie-break, so assert it too.
const back = readFileSync(`${outDir}/entry.txt`, "utf8");
if (back !== LINE || Buffer.byteLength(back, "utf8") !== 112) {
  console.error("read-back mismatch: entry.txt does not match the line");
  process.exit(1);
}
