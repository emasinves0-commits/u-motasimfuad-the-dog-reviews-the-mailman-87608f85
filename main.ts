// u-motasimfuad-the-dog-reviews-the-mailman-87608f85 — The Dog Reviews the Mailman.
// One funny one-line review a dog gives the mailman. Writes the
// review to /output/entry.txt. Gate: 1–200 Unicode code points;
// this review is 174 characters.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  `Every envelope he slides through my slot smells like the vet’s cold table, so I shred them all — Steve, you are not delivering mail, you are delivering me to the thermometer.`;

// The gate counts Unicode code points; verified by local test 26 Nov 2026:
// entry.txt is 174 code points (178 UTF-8 bytes, curly apostrophe + em dash),
// no trailing newline, inside the 1–200 gate.
// Guard: the entry must ship exactly as written — no leading or
// trailing whitespace, no trailing newline.
if (ENTRY !== ENTRY.trim()) throw new Error("ENTRY has leading/trailing whitespace");
if (ENTRY.endsWith("\n")) throw new Error("ENTRY has a trailing newline");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Self-test: re-read the written file and verify it round-trips
// byte-identically (no trailing newline, no stray whitespace).
function selfTest(): void {
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY) throw new Error("self-test failed: entry.txt differs from ENTRY");
  if (back !== back.trim()) throw new Error("self-test failed: leading/trailing whitespace");
  if (back.endsWith("\n")) throw new Error("self-test failed: trailing newline");
  console.log(`self-test ok: ${[...ENTRY].length} chars, byte-identical`);
}

if (process.argv.includes("--self-test")) selfTest();

