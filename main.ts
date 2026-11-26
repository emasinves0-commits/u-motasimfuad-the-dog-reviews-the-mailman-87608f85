// u-motasimfuad-the-dog-reviews-the-mailman-87608f85 — The Dog Reviews the Mailman.
// One funny one-line review a dog gives the mailman. Writes the
// review to /output/entry.txt. Gate: 1–200 Unicode code points;
// this review is 174 characters.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  `Every envelope he slides through my slot smells like the vet’s cold table, so I shred them all — Steve, you are not delivering mail, you are delivering me to the thermometer.`;

// The gate counts Unicode code points; verified by local test 26 Nov 2026:
// entry.txt is 174 code points (178 UTF-8 bytes, curly apostrophe + em dash),
// no trailing newline, inside the 1–200 gate.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
