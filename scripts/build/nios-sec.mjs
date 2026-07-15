#!/usr/bin/env node
/**
 * build/nios-sec.mjs — shared helpers + curriculum scaffolding for the NIOS
 * Secondary curriculum 2020 (seccurriculum2020.pdf, classes 9-10, age 14-16).
 *
 * Each subject is integrated by its own script (nios-sec-<subject>.mjs) that
 * imports these helpers. They all share ONE curriculum slug, `nios-sec-2020`;
 * each subject appends its standards to that curriculum (created on first run).
 *
 * Full text under the NIOS Copyright Statement (see PROVENANCE.md). Standard
 * code grain = `<courseCode>.M<module>.L<lesson>` (e.g. `222.M1.L1`).
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
export const load = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));
export const saveFile = (name, obj) => writeFileSync(resolve(DATA, name), JSON.stringify(obj, null, 2) + '\n');

const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const mintId = (slug) => {
  const h = createHash('sha256').update(`nios-sec:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};

export const SLUG = 'nios-sec-2020';
const LICENSE = 'NIOS Copyright Statement — reproduction permitted with prominent acknowledgment; see PROVENANCE.md';

/**
 * Apply one subject's integration to the data files (idempotent, append-only).
 * @param subject   {name, courseCode}
 * @param standards array of {code, module, lesson, title, description}
 * @param newTopics array of authored topic objects with `_slug`
 * @param alignments map: existing topic id -> [standard codes to append]
 * @param newEdges   array of {t, p, strength, reason} (t/p are _slug or existing id)
 * @param newClusters array of {subject, domain, ageRangeStart, summary}
 */
export function integrateSubject({ subject, standards, newTopics, alignments = {}, newEdges = [], newClusters = [] }) {
  const topicsDoc = load('topics.json');
  const depsDoc = load('dependencies.json');
  const stdDoc = load('curriculum-standards.json');
  const clustersDoc = load('clusters.json');
  const report = { standards: 0, aligned: 0, linksAdded: 0, topics: 0, edges: 0, clusters: 0, warnings: 0 };

  // 1. curriculum entry (create once) + append this subject's standards
  let cur = stdDoc.curricula.find((c) => c.slug === SLUG);
  if (!cur) {
    cur = { slug: SLUG, country: 'IN', name: 'NIOS Secondary Curriculum 2020',
      version: '2020', sourceUrl: 'https://nios.ac.in/media/documents/seccurriculum2020.pdf',
      textIncluded: true, license: LICENSE, topicCount: 0, topics: [] };
    stdDoc.curricula.push(cur);
  }
  const stdKeys = new Set(cur.topics.map((s) => s.key));
  for (const s of standards) {
    const key = `${SLUG}:${s.code}`;
    if (stdKeys.has(key)) continue;
    cur.topics.push({ key, code: s.code, data: { title: s.title, level: 'Secondary', subject: subject.name, courseCode: subject.courseCode, module: s.module, lesson: s.lesson, description: s.description } });
    stdKeys.add(key); report.standards++;
  }
  cur.topicCount = cur.topics.length;
  stdDoc.curriculumCount = stdDoc.curricula.length;
  const validKeys = new Set(stdDoc.curricula.flatMap((c) => c.topics.map((s) => s.key)));

  // 2. new topics
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

  // 3. alignments (append-only)
  const byId = new Map(topicsDoc.topics.map((t) => [t.id, t]));
  for (const [topicId, codes] of Object.entries(alignments)) {
    const topic = byId.get(topicId);
    if (!topic) { console.error(`  ! alignment target missing: ${topicId}`); report.warnings++; continue; }
    let touched = false;
    for (const code of codes) {
      const key = code.startsWith(`${SLUG}:`) ? code : `${SLUG}:${code}`;
      if (!validKeys.has(key)) { console.error(`  ! alignment unknown standard ${key}`); report.warnings++; continue; }
      if (!topic.standards.includes(key)) { topic.standards.push(key); report.linksAdded++; touched = true; }
    }
    if (touched) report.aligned++;
  }

  // 4. edges
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

  // 5. clusters
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
  console.log(`✓ NIOS Secondary — ${subject.name}:`);
  console.log(`  standards added : ${report.standards}`);
  console.log(`  topics aligned  : ${report.aligned} (${report.linksAdded} links)`);
  console.log(`  new topics      : ${report.topics}`);
  console.log(`  new edges       : ${report.edges}`);
  console.log(`  new clusters    : ${report.clusters}`);
  if (report.warnings) console.log(`  warnings        : ${report.warnings}`);
  console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
}
