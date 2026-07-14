#!/usr/bin/env node
/**
 * manifest.mjs — regenerate data/manifest.json from the current data files.
 *
 * The dataset ships a manifest of counts + SHA-256 checksums that
 * scripts/validate.mjs enforces. Any edit to the data files must be followed
 * by regenerating the manifest, or validation fails on a checksum mismatch.
 * Run this after editing data/, then run validate.mjs.
 *
 *   node scripts/manifest.mjs
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = resolve(ROOT, 'data');
const bytesOf = (name) => readFileSync(resolve(DATA, name));
const load = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));

const topics = load('topics.json');
const deps = load('dependencies.json');
const standards = load('curriculum-standards.json');
const clusters = load('clusters.json');

const topicsBySubject = {};
for (const t of topics.topics) topicsBySubject[t.subject] = (topicsBySubject[t.subject] ?? 0) + 1;
const bySubjectSorted = Object.fromEntries(Object.keys(topicsBySubject).sort().map((k) => [k, topicsBySubject[k]]));

const curriculumStandards = standards.curricula.reduce((n, c) => n + c.topics.length, 0);
const topicStandardLinks = topics.topics.reduce((n, t) => n + t.standards.length, 0);

const DATA_FILES = ['topics.json', 'dependencies.json', 'curriculum-standards.json', 'clusters.json'];
const files = {};
for (const name of DATA_FILES) {
  const bytes = bytesOf(name);
  files[name] = { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
}

const prev = load('manifest.json');
const manifest = {
  dataset: prev.dataset,
  taxonomyVersion: prev.taxonomyVersion,
  generatedAt: new Date().toISOString(),
  codesOnlySources: standards.codesOnlySources ?? prev.codesOnlySources,
  counts: {
    topics: topics.topics.length,
    topicsBySubject: bySubjectSorted,
    dependencies: deps.dependencies.length,
    curricula: standards.curricula.length,
    curriculumStandards,
    topicStandardLinks,
    clusters: clusters.clusters.length,
  },
  files,
  excluded: prev.excluded,
};

writeFileSync(resolve(DATA, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(
  `✓ manifest regenerated — ${manifest.counts.topics} topics, ${manifest.counts.dependencies} dependencies, ` +
    `${manifest.counts.curriculumStandards} standards, ${manifest.counts.topicStandardLinks} topic→standard links, ` +
    `${manifest.counts.clusters} clusters.`,
);
