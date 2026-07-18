#!/usr/bin/env node
/**
 * build/ncert-sec.mjs — shared helpers for the NCERT Syllabus for Secondary
 * Classes IX–X (NCF 2005; Volume II of ncert.nic.in/pdf/syllabus/, distributed
 * as vol2_hsl.zip). One curriculum slug `ncert-sec`; each subject document
 * appends standards via its own script.
 *
 * SCOPE: Classes IX–X only. The same volume carries Classes XI–XII, which sit
 * above this taxonomy's age ceiling and are deliberately out of scope — see
 * STATE.md for the follow-up plan.
 *
 * RIGHTS: identical posture to `ncert-elem`. NCERT prohibits reproduction of
 * its content and its e-content license bars adaptation or summarisation of
 * NCERT text without written permission. We therefore ship NO NCERT text:
 * standards carry minted codes plus Marble-authored one-line FACTUAL
 * descriptions of curriculum scope (facts about what a class covers, not
 * NCERT's expression). See PROVENANCE.md.
 *
 * Class→age: Class n ≈ ages n+5 to n+6, so Class IX ≈ 14–15, Class X ≈ 15–16.
 *
 * MINT NAMESPACE: `ncert-sec:` — distinct from `ncert:` (ncert-elem),
 * `nios-sec:`, `nios-obe:`, `nios-obe-a:` and `ksgh:`. To reference a topic
 * minted by another build family, use mintNs with THAT family's namespace, or
 * (safer) reference the literal id from data/topics.json.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (n) => JSON.parse(readFileSync(resolve(DATA, n), 'utf8'));
const saveFile = (n, o) => writeFileSync(resolve(DATA, n), JSON.stringify(o, null, 2) + '\n');
const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const mintNs = (ns, slug) => { const h = createHash('sha256').update(`${ns}:${slug}`).digest(); let s = ''; for (let i = 0; i < 10; i++) s += B62[h[i] % 62]; return `mt_${s}`; };
export const mintId = (slug) => mintNs('ncert-sec', slug);
export const SLUG = 'ncert-sec';

export function integrateNcertSec({ subjectDoc, standards, newTopics = [], alignments = {}, newEdges = [], newClusters = [] }) {
  const topicsDoc = load('topics.json');
  const depsDoc = load('dependencies.json');
  const stdDoc = load('curriculum-standards.json');
  const clustersDoc = load('clusters.json');
  const report = { standards: 0, aligned: 0, linksAdded: 0, topics: 0, edges: 0, clusters: 0, warnings: 0 };

  let cur = stdDoc.curricula.find((c) => c.slug === SLUG);
  if (!cur) {
    cur = { slug: SLUG, country: 'IN',
      name: 'NCERT Syllabus for Secondary Classes IX–X (NCF 2005)',
      version: '2005', sourceUrl: 'https://ncert.nic.in/syllabus.php',
      textIncluded: true,
      license: 'NCERT permits no reproduction of its text; these records carry Marble-authored factual descriptions only (no NCERT text) — see PROVENANCE.md',
      topicCount: 0, topics: [] };
    stdDoc.curricula.push(cur);
  }
  const stdKeys = new Set(cur.topics.map((s) => s.key));
  for (const s of standards) {
    const key = `${SLUG}:${s.code}`;
    if (stdKeys.has(key)) continue;
    cur.topics.push({ key, code: s.code, data: { title: s.title, subject: subjectDoc, class: s.klass, strand: s.strand, description: s.description } });
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
    if (!byId.has(topicId) || !byId.has(prerequisiteId)) { console.error(`  ! edge endpoint missing: ${e.t} / ${e.p}`); report.warnings++; continue; }
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
  console.log(`✓ NCERT secondary IX–X — ${subjectDoc}:`);
  console.log(`  standards added : ${report.standards}`);
  console.log(`  topics aligned  : ${report.aligned} (${report.linksAdded} links)`);
  console.log(`  new topics      : ${report.topics}`);
  console.log(`  new edges       : ${report.edges}`);
  console.log(`  new clusters    : ${report.clusters}`);
  if (report.warnings) console.log(`  warnings        : ${report.warnings}`);
  console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
}
