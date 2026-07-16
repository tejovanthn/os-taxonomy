#!/usr/bin/env node
/**
 * build/nios-sec-crosslang.mjs — cross-language concept edges.
 *
 * The Indic language subjects deliberately take no SKILL prerequisites from
 * English (which language a child learns first depends on their medium of
 * instruction — neither direction is universally true). But language-NEUTRAL
 * concepts transfer whichever language hosts them first: reading as
 * meaning-making, the sentence, summarising, figurative language, poetic form.
 * Those concept topics live in the English subject (the dataset's original
 * language-skills home), so the Indic topics take SOFT support edges from
 * them, with reasons marked "Cross-language:". Idempotent.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (n) => JSON.parse(readFileSync(resolve(DATA, n), 'utf8'));
const save = (n, o) => writeFileSync(resolve(DATA, n), JSON.stringify(o, null, 2) + '\n');
const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const mintId = (slug) => { const h = createHash('sha256').update(`nios-sec:${slug}`).digest(); let s = ''; for (let i = 0; i < 10; i++) s += B62[h[i] % 62]; return `mt_${s}`; };

// Language-neutral concept topics (existing, in the English subject)
const READING_FOR_MEANING = 'mt_scBgiMKhG_'; // META: reading is meaning-making (English Thinking, 5-6)
const BUILDING_SENTENCES = 'mt_N8CpN1EJrP';  // words combine into sentences (Grammar & Punctuation, 4-6)
const PRECIS = 'mt_curkA82CmO';              // Writing a Précis (10-11)
const FIGURATIVE = 'mt_MlmIrLb_7x';          // Advanced Figurative Language (11-14)
const POETIC_FORMS = 'mt_aClzPBiS9k';        // Poetic forms and conventions (11-14)

const edges = [
  // Reading is meaning-making — transfers to reading in any language
  ['hi-reading-prose', READING_FOR_MEANING, 'Cross-language: reading as meaning-making transfers to reading Hindi'],
  ['te-reading-prose', READING_FOR_MEANING, 'Cross-language: reading as meaning-making transfers to reading Telugu'],
  ['kn-reading-prose', READING_FOR_MEANING, 'Cross-language: reading as meaning-making transfers to reading Kannada'],
  ['ta-reading-prose', READING_FOR_MEANING, 'Cross-language: reading as meaning-making transfers to reading Tamil'],
  ['sa-reading', READING_FOR_MEANING, 'Cross-language: reading as meaning-making transfers to reading Sanskrit'],
  // The concept of the sentence
  ['hi-sentence-structure', BUILDING_SENTENCES, 'Cross-language: the concept of a complete sentence transfers to Hindi sentence structure'],
  ['ta-sentence-speech', BUILDING_SENTENCES, 'Cross-language: the concept of a complete sentence transfers to Tamil sentence construction'],
  // Summarising as a concept
  ['hi-expressive-writing', PRECIS, 'Cross-language: the skill of summarising transfers to Hindi saar-lekhan'],
  ['kn-composition', PRECIS, 'Cross-language: the skill of summarising transfers to Kannada précis writing'],
  // Figurative language: upma IS simile, rupak IS metaphor
  ['hi-alankar', FIGURATIVE, 'Cross-language: simile and metaphor as concepts transfer to the Hindi alankaras (upma, rupak)'],
  // Poetic form as a concept
  ['hi-chhand', POETIC_FORMS, 'Cross-language: the concept of poetic form and metre transfers to Hindi chhand'],
];

const topicsDoc = load('topics.json');
const depsDoc = load('dependencies.json');
const ids = new Set(topicsDoc.topics.map((t) => t.id));
const seen = new Set(depsDoc.dependencies.map((d) => `${d.topicId}>${d.prerequisiteId}`));
let added = 0, warnings = 0;
for (const [slug, prereq, reason] of edges) {
  const topicId = mintId(slug);
  if (!ids.has(topicId)) { console.error(`  ! missing topic ${slug}`); warnings++; continue; }
  if (!ids.has(prereq)) { console.error(`  ! missing prerequisite ${prereq}`); warnings++; continue; }
  const k = `${topicId}>${prereq}`;
  if (seen.has(k)) continue;
  depsDoc.dependencies.push({ topicId, prerequisiteId: prereq, strength: 'soft', reason });
  seen.add(k); added++;
}
depsDoc.edgeCount = depsDoc.dependencies.length;
save('dependencies.json', depsDoc);
console.log(`✓ cross-language concept edges: ${added} added${warnings ? `, ${warnings} warnings` : ''}.`);
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
