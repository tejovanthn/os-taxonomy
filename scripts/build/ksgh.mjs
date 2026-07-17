#!/usr/bin/env node
/**
 * build/ksgh.mjs — shared helpers for the Karnataka State Dr. Gangubai Hangal
 * Music and Performing Arts University (Mysuru) graded music & dance
 * examination syllabus (musicuniversity.ac.in, "Syllabus-Copy.pdf", scanned
 * Kannada; recovered via OCR cross-checked against page images).
 *
 * One curriculum slug `ksgh-music-exams`; each stream (Carnatic, Hindustani,
 * Dance) appends its standards via its own script. The university states no
 * open license, so standard `data` carries ONLY Marble-authored English
 * summaries of the syllabus content — no verbatim source text. Levels:
 * Prathamika (primary ≈ 6-9), Madhyamika (middle ≈ 9-12), Vidwat-Purva
 * (≈ 12-15), Vidwat Antima (≈ 14-16) — ages by typical learning age.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (n) => JSON.parse(readFileSync(resolve(DATA, n), 'utf8'));
const saveFile = (n, o) => writeFileSync(resolve(DATA, n), JSON.stringify(o, null, 2) + '\n');

const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const mintId = (slug) => {
  const h = createHash('sha256').update(`ksgh:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};
export const mintNs = (ns, slug) => {
  const h = createHash('sha256').update(`${ns}:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};

export const SLUG = 'ksgh-music-exams';

export function integrateStream({ stream, standards, newTopics, alignments = {}, newEdges = [], newClusters = [] }) {
  const topicsDoc = load('topics.json');
  const depsDoc = load('dependencies.json');
  const stdDoc = load('curriculum-standards.json');
  const clustersDoc = load('clusters.json');
  const report = { standards: 0, aligned: 0, linksAdded: 0, topics: 0, edges: 0, clusters: 0, warnings: 0 };

  let cur = stdDoc.curricula.find((c) => c.slug === SLUG);
  if (!cur) {
    cur = { slug: SLUG, country: 'IN',
      name: 'Karnataka State Dr. Gangubai Hangal Music and Performing Arts University — Graded Music & Dance Examinations',
      version: '2025', sourceUrl: 'https://musicuniversity.ac.in/wp-content/uploads/2025/03/Syllabus-Copy.pdf',
      textIncluded: true,
      license: 'No open license stated by the university; standard descriptions are Marble-authored English summaries (no verbatim source text) — see PROVENANCE.md',
      topicCount: 0, topics: [] };
    stdDoc.curricula.push(cur);
  }
  const stdKeys = new Set(cur.topics.map((s) => s.key));
  for (const s of standards) {
    const key = `${SLUG}:${s.code}`;
    if (stdKeys.has(key)) continue;
    cur.topics.push({ key, code: s.code, data: { title: s.title, stream, level: s.level, paper: s.paper, description: s.description } });
    stdKeys.add(key); report.standards++;
  }
  cur.topicCount = cur.topics.length;
  stdDoc.curriculumCount = stdDoc.curricula.length;
  const validKeys = new Set(stdDoc.curricula.flatMap((c) => c.topics.map((s) => s.key)));

  const slugToId = Object.fromEntries(newTopics.map((t) => [t._slug, mintId(t._slug)]));
  const existingIds = new Set(topicsDoc.topics.map((t) => t.id));
  for (const t of newTopics) {
    const id = slugToId[t._slug];
    if (existingIds.has(id)) continue;
    for (const k of t.standards) if (!validKeys.has(k)) { console.error(`  ! ${t._slug} unknown standard ${k}`); report.warnings++; }
    topicsDoc.topics.push({ id, type: t.type, subject: t.subject, domain: t.domain, name: t.name, description: t.description, ageRangeStart: t.ageRangeStart, ageRangeEnd: t.ageRangeEnd, centrality: null, evidence: t.evidence, assessmentPrompt: t.assessmentPrompt, standards: t.standards });
    existingIds.add(id); report.topics++;
  }
  topicsDoc.topicCount = topicsDoc.topics.length;

  const byId = new Map(topicsDoc.topics.map((t) => [t.id, t]));
  for (const [topicId, codes] of Object.entries(alignments)) {
    const topic = byId.get(topicId);
    if (!topic) { console.error(`  ! alignment target missing: ${topicId}`); report.warnings++; continue; }
    let touched = false;
    for (const code of codes) {
      const key = code.includes(':') ? code : `${SLUG}:${code}`;
      if (!validKeys.has(key)) { console.error(`  ! unknown standard ${key}`); report.warnings++; continue; }
      if (!topic.standards.includes(key)) { topic.standards.push(key); report.linksAdded++; touched = true; }
    }
    if (touched) report.aligned++;
  }

  const resolveRef = (ref) => slugToId[ref] ?? ref;
  const edgeSeen = new Set(depsDoc.dependencies.map((d) => `${d.topicId}>${d.prerequisiteId}`));
  for (const e of newEdges) {
    const topicId = resolveRef(e.t), prerequisiteId = resolveRef(e.p);
    if (!byId.has(topicId)) { console.error(`  ! edge topicId missing: ${e.t}`); report.warnings++; continue; }
    if (!byId.has(prerequisiteId)) { console.error(`  ! edge prerequisiteId missing: ${e.p}`); report.warnings++; continue; }
    const k = `${topicId}>${prerequisiteId}`;
    if (edgeSeen.has(k)) continue;
    depsDoc.dependencies.push({ topicId, prerequisiteId, strength: e.strength, reason: e.reason });
    edgeSeen.add(k); report.edges++;
  }
  depsDoc.edgeCount = depsDoc.dependencies.length;

  const clusterSeen = new Set(clustersDoc.clusters.map((c) => `${c.subject}|${c.domain}|${c.ageRangeStart}`));
  for (const cl of newClusters) {
    const k = `${cl.subject}|${cl.domain}|${cl.ageRangeStart}`;
    if (clusterSeen.has(k)) continue;
    clustersDoc.clusters.push(cl); clusterSeen.add(k); report.clusters++;
  }
  clustersDoc.clusterCount = clustersDoc.clusters.length;

  saveFile('curriculum-standards.json', stdDoc);
  saveFile('topics.json', topicsDoc);
  saveFile('dependencies.json', depsDoc);
  saveFile('clusters.json', clustersDoc);
  console.log(`✓ KSGH graded exams — ${stream}:`);
  console.log(`  standards added : ${report.standards}`);
  console.log(`  topics aligned  : ${report.aligned} (${report.linksAdded} links)`);
  console.log(`  new topics      : ${report.topics}`);
  console.log(`  new edges       : ${report.edges}`);
  console.log(`  new clusters    : ${report.clusters}`);
  if (report.warnings) console.log(`  warnings        : ${report.warnings}`);
  console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
}
