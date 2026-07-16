#!/usr/bin/env node
/**
 * build/nios-sec-ages.mjs — age-correction pass over the NIOS Secondary mints.
 *
 * The language, Sanskrit-stream, Music and Visual Arts topics were originally
 * stamped with the NIOS course admission age (14+, it being open schooling for
 * adults/teens). But the taxonomy models when children TYPICALLY learn things:
 * mother-tongue reading begins ~6–8, Veda adhyayana traditionally begins after
 * brahmopadesham (~8–9), music arambam is ~6–8, and story literature like the
 * Panchatantra is childhood material. This pass sets typical learning ages,
 * keeping genuinely advanced content (Paninian derivation, Advaita, mahakavya)
 * at the senior bands. Re-keys the affected clusters to the new bands.
 * Run after all nios-sec-* builds. Idempotent.
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

// slug → [ageRangeStart, ageRangeEnd] (typical learning ages)
const ages = {
  // Hindi
  'hi-listening': [6, 9], 'hi-speaking': [6, 9], 'hi-reading-prose': [8, 11], 'hi-reading-poetry': [8, 11],
  'hi-functional-writing': [9, 12], 'hi-expressive-writing': [10, 13], 'hi-word-formation': [10, 13],
  'hi-word-types': [11, 14], 'hi-sentence-structure': [9, 12], 'hi-idioms': [9, 12],
  'hi-chhand': [11, 14], 'hi-alankar': [11, 14], 'hi-roles-of-hindi': [11, 14],
  // Sanskrit (language)
  'sa-listening': [8, 11], 'sa-recitation': [8, 11], 'sa-reading': [10, 13], 'sa-literature': [12, 14],
  'sa-writing': [10, 13], 'sa-sandhi': [11, 14], 'sa-declensions': [10, 13], 'sa-conjugations': [10, 13],
  'sa-samasa': [12, 14], 'sa-pratyaya': [12, 14], 'sa-karaka': [11, 14], 'sa-upasarga-avyaya': [11, 14],
  // Telugu
  'te-reading-poetry': [9, 12], 'te-reading-prose': [8, 11], 'te-extensive-reading': [9, 12],
  'te-expressing': [8, 11], 'te-culture': [10, 13],
  // Kannada
  'kn-listening-speaking': [6, 9], 'kn-reading-prose': [8, 11], 'kn-reading-poetry': [9, 12],
  'kn-functional-writing': [9, 12], 'kn-composition': [10, 13], 'kn-culture': [10, 13],
  // Tamil
  'ta-reading-poetry': [10, 13], 'ta-reading-prose': [8, 11], 'ta-functional-tamil': [9, 12],
  'ta-sounds': [6, 9], 'ta-vocabulary': [9, 12], 'ta-sentence-speech': [10, 13],
  'ta-creative': [10, 13], 'ta-classical-language': [10, 13],
  // Veda Adhyayan (arambam after brahmopadesham ~8–9)
  'veda-what-is': [8, 10], 'veda-preservation': [8, 11], 'veda-commentators': [12, 14],
  'veda-yajna-deities': [9, 12], 'veda-suktas-nature': [9, 12], 'veda-suktas-varuna-yama': [10, 13],
  'veda-shunahshepa': [10, 13], 'veda-prakriya': [13, 16],
  // Sanskrit Vyakarna (formal Paninian study — later)
  'vyk-sutra-system': [11, 14], 'vyk-maheshvara': [11, 14], 'vyk-samjna': [12, 15], 'vyk-paribhasha': [12, 15],
  'vyk-vowel-sandhi': [12, 15], 'vyk-consonant-sandhi': [12, 15], 'vyk-subanta-vowel': [12, 15],
  'vyk-subanta-consonant': [13, 16], 'vyk-karaka-sutras': [13, 16], 'vyk-upapada': [13, 16], 'vyk-krdanta': [13, 16],
  // Bharatiya Darshan (introductions earlier; Advaita depth stays senior)
  'dar-what-is': [12, 14], 'dar-map-of-learning': [12, 14], 'dar-astika-nastika': [12, 15],
  'dar-charvaka': [13, 16], 'dar-buddhist-jain': [12, 15], 'dar-nyaya-vaisheshika': [13, 16],
  'dar-sankhya-yoga': [13, 16], 'dar-mimamsa': [13, 16], 'dar-vedanta-schools': [13, 16],
  'dar-advaita-brahman': [14, 16], 'dar-advaita-maya-jiva': [14, 16], 'dar-advaita-moksha': [14, 16],
  // Sanskrit Sahitya (subhashitas and tales are childhood material)
  'sah-subhashita': [10, 13], 'sah-prahelika': [10, 13], 'sah-katha': [9, 12],
  'sah-what-is-kavya': [13, 16], 'sah-kavya-genres': [13, 16], 'sah-ramayana': [11, 14],
  'sah-karnabharam': [13, 16], 'sah-kiratarjuniyam': [13, 16],
  // Music (arambam ~6–8; geetam→varnam progression through childhood)
  'mus-shruti-svara': [6, 9], 'mus-raga': [8, 11], 'mus-tala': [6, 9], 'mus-hindustani-forms': [10, 13],
  'mus-notation-voice': [8, 11], 'mus-thaat': [11, 14], 'mus-hindustani-vocal': [10, 13],
  'mus-carnatic-gamaka': [8, 11], 'mus-carnatic-forms': [9, 12], 'mus-carnatic-composers': [9, 12],
  // Visual Arts (elements and colour are primary-age content)
  'va-what-is-painting': [6, 9], 'va-elements': [7, 10], 'va-colour': [6, 9], 'va-composition': [9, 12],
  'va-drawing': [7, 10], 'va-compositions': [10, 13], 'va-modern-indian-art': [11, 14], 'va-contemporary-art': [12, 15],
};

// (subject, domain) cluster re-keys: old start → new start
const clusterMoves = [
  ['Hindi', 'Speaking & Listening', 6], ['Hindi', 'Reading', 8], ['Hindi', 'Writing', 9],
  ['Hindi', 'Grammar', 9], ['Hindi', 'Literature', 11], ['Hindi', 'Language & Society', 11],
  ['Sanskrit', 'Speaking & Listening', 8], ['Sanskrit', 'Reading', 10], ['Sanskrit', 'Writing', 10],
  ['Sanskrit', 'Grammar', 10], ['Sanskrit', 'Vedic Studies', 8], ['Sanskrit', 'Paninian Grammar', 11],
  ['Telugu', 'Reading', 8], ['Telugu', 'Speaking & Writing', 8], ['Telugu', 'Language & Society', 10],
  ['Kannada', 'Speaking & Listening', 6], ['Kannada', 'Reading', 8], ['Kannada', 'Writing', 9], ['Kannada', 'Language & Society', 10],
  ['Tamil', 'Reading', 8], ['Tamil', 'Writing', 9], ['Tamil', 'Grammar', 6], ['Tamil', 'Language & Society', 10],
  ['Music', 'Fundamentals of Indian Music', 6], ['Music', 'Hindustani Music', 8], ['Music', 'Carnatic Music', 8],
  ['Visual Arts', 'Understanding Art', 6], ['Visual Arts', 'Elements & Principles', 6],
  ['Visual Arts', 'Drawing & Composition', 7], ['Visual Arts', 'Indian Art Traditions', 11],
  ['Indian Culture & Heritage', 'Indian Philosophy', 12],
];

const topicsDoc = load('topics.json');
const clustersDoc = load('clusters.json');
const byId = new Map(topicsDoc.topics.map((t) => [t.id, t]));
let reAged = 0, unchanged = 0, missing = 0, clustersMoved = 0;

for (const [slug, [a0, a1]] of Object.entries(ages)) {
  const t = byId.get(mintId(slug));
  if (!t) { console.error(`  ! missing topic for slug ${slug}`); missing++; continue; }
  if (t.ageRangeStart === a0 && t.ageRangeEnd === a1) { unchanged++; continue; }
  t.ageRangeStart = a0; t.ageRangeEnd = a1; reAged++;
}

for (const [subject, domain, newStart] of clusterMoves) {
  const c = clustersDoc.clusters.find((x) => x.subject === subject && x.domain === domain);
  if (!c) { console.error(`  ! missing cluster ${subject}/${domain}`); missing++; continue; }
  if (c.ageRangeStart !== newStart) { c.ageRangeStart = newStart; clustersMoved++; }
  if (newStart <= 12 && c.summary.startsWith('Your teenager')) {
    c.summary = c.summary.replace(/^Your teenager/, 'Your child'); clustersMoved++;
  }
}

save('topics.json', topicsDoc);
save('clusters.json', clustersDoc);
console.log(`✓ age correction: ${reAged} topics re-aged (${unchanged} already correct), ${clustersMoved} cluster changes${missing ? `, ${missing} MISSING` : ''}.`);
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
