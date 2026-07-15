#!/usr/bin/env node
/**
 * build/nios-obe-align-patch.mjs — link four NIOS standards that were left
 * unlinked but map cleanly onto topics that already exist (alignment misses
 * found while auditing coverage). Idempotent, append-only.
 *
 * Run after the other nios-obe build scripts, then
 * `node scripts/manifest.mjs && node scripts/validate.mjs`.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));
const saveFile = (name, obj) => writeFileSync(resolve(DATA, name), JSON.stringify(obj, null, 2) + '\n');

// existing topic id → NIOS standard codes to add
const patches = {
  mt_GjZFr0xSIz: ['nios-obe-c:C105.L13'], // How Crops Are Grown ← C-105 Crop Cultivation
  mt_D3sDOaujQk: ['nios-obe-c:C105.L13'], // Agriculture in India ← C-105 Crop Cultivation
  mt_8lqspeGNuz: ['nios-obe-b:B104.L2', 'nios-obe-c:C104.L2'], // Word Processing Basics ← B/C advanced word processing
  mt_lC_Q5mSL_I: ['nios-obe-c:C103.L2'], // Numbers to 10,000 ← C-103 Whole Numbers
  mt_19j_5AuuQI: ['nios-obe-c:C103.L2'], // Numbers on a number line ← C-103 Whole Numbers
};

const topicsDoc = load('topics.json');
const stdDoc = load('curriculum-standards.json');
const validKeys = new Set(stdDoc.curricula.flatMap((c) => c.topics.map((s) => s.key)));
const byId = new Map(topicsDoc.topics.map((t) => [t.id, t]));

let added = 0, warnings = 0;
for (const [id, codes] of Object.entries(patches)) {
  const topic = byId.get(id);
  if (!topic) { console.error(`  ! target missing: ${id}`); warnings++; continue; }
  for (const key of codes) {
    if (!validKeys.has(key)) { console.error(`  ! unknown standard ${key}`); warnings++; continue; }
    if (!topic.standards.includes(key)) { topic.standards.push(key); added++; }
  }
}

saveFile('topics.json', topicsDoc);
console.log(`✓ alignment patch: ${added} topic→standard links added${warnings ? ` (${warnings} warnings)` : ''}.`);
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
