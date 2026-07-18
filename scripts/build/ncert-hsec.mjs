#!/usr/bin/env node
/**
 * build/ncert-hsec.mjs — shared helpers for the NCERT Syllabus for Higher
 * Secondary Classes XI–XII (NCF 2005; Volume II of ncert.nic.in/pdf/syllabus/,
 * distributed as vol2_hsl.zip). One curriculum slug `ncert-hsec`; each subject
 * document appends standards via its own script.
 *
 * This is the pass that raises the taxonomy's age ceiling from 16 to 18.
 * Class→age: Class n ≈ ages n+5 to n+6, so Class XI ≈ 16–17, Class XII ≈ 17–18.
 *
 * SUBJECT DECISIONS (user call, 2026-07-18): Physics, Chemistry, Biology and
 * Sociology become subjects in their own right rather than domains under
 * Science / Social Studies, matching how they are elected at this stage and
 * following the precedent of Economics, Business Studies and Accountancy, which
 * already occupy only the senior band. Science therefore tops out at 16 and the
 * senior science ladders hang off it by cross-subject prerequisite edges.
 *
 * RIGHTS: identical posture to `ncert-elem` and `ncert-sec`. NCERT prohibits
 * reproduction of its content and its e-content license bars adaptation or
 * summarisation of NCERT text without written permission. We ship NO NCERT
 * text: standards carry minted codes plus Marble-authored one-line FACTUAL
 * descriptions of curriculum scope. See PROVENANCE.md.
 *
 * MINT NAMESPACE: `ncert-hsec:` — distinct from `ncert-sec:`, `ncert:`
 * (ncert-elem), `nios-sec:`, `nios-obe:`, `nios-obe-a:` and `ksgh:`. To
 * reference a topic minted by another build family, use mintNs with THAT
 * family's namespace, or read the literal id from data/topics.json.
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
export const mintId = (slug) => mintNs('ncert-hsec', slug);
export const SLUG = 'ncert-hsec';

/** Standard shorthand: s(code, class, strand, description). */
export const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

/**
 * Topic shorthand. Keeps the per-subject scripts readable:
 *   t(slug, name, domain, [ageStart, ageEnd], type, description, [ev1,ev2,ev3], prompt, [codes])
 * `codes` are bare ncert-hsec codes; the SLUG prefix is added here.
 */
export const topic = (subject) => (slug, name, domain, [a, b], type, description, evidence, assessmentPrompt, codes) => ({
  _slug: slug, subject, name, domain, ageRangeStart: a, ageRangeEnd: b, type,
  description, evidence, assessmentPrompt,
  standards: codes.map((c) => (c.includes(':') ? c : `${SLUG}:${c}`)),
});

export function integrateNcertHsec({ subjectDoc, standards, newTopics = [], alignments = {}, newEdges = [], newClusters = [] }) {
  const topicsDoc = load('topics.json');
  const depsDoc = load('dependencies.json');
  const stdDoc = load('curriculum-standards.json');
  const clustersDoc = load('clusters.json');
  const report = { standards: 0, aligned: 0, linksAdded: 0, topics: 0, edges: 0, clusters: 0, warnings: 0 };

  let cur = stdDoc.curricula.find((c) => c.slug === SLUG);
  if (!cur) {
    cur = { slug: SLUG, country: 'IN',
      name: 'NCERT Syllabus for Higher Secondary Classes XI–XII (NCF 2005)',
      version: '2005', sourceUrl: 'https://ncert.nic.in/syllabus.php',
      textIncluded: true,
      license: 'NCERT permits no reproduction of its text; these records carry Marble-authored factual descriptions only (no NCERT text) — see PROVENANCE.md',
      topicCount: 0, topics: [] };
    stdDoc.curricula.push(cur);
  }
  const stdKeys = new Set(cur.topics.map((x) => x.key));
  for (const st of standards) {
    const key = `${SLUG}:${st.code}`;
    if (stdKeys.has(key)) continue;
    cur.topics.push({ key, code: st.code, data: { title: st.title, subject: subjectDoc, class: st.klass, strand: st.strand, description: st.description } });
    stdKeys.add(key); report.standards++;
  }
  cur.topicCount = cur.topics.length;
  stdDoc.curriculumCount = stdDoc.curricula.length;
  const validKeys = new Set(stdDoc.curricula.flatMap((c) => c.topics.map((x) => x.key)));

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
    const t = byId.get(topicId);
    if (!t) { console.error(`  ! alignment target missing: ${topicId}`); report.warnings++; continue; }
    let touched = false;
    for (const code of codes) {
      const key = code.includes(':') ? code : `${SLUG}:${code}`;
      if (!validKeys.has(key)) { console.error(`  ! unknown standard ${key}`); report.warnings++; continue; }
      if (!t.standards.includes(key)) { t.standards.push(key); report.linksAdded++; touched = true; }
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
  console.log(`✓ NCERT higher secondary XI–XII — ${subjectDoc}:`);
  console.log(`  standards added : ${report.standards}`);
  console.log(`  topics aligned  : ${report.aligned} (${report.linksAdded} links)`);
  console.log(`  new topics      : ${report.topics}`);
  console.log(`  new edges       : ${report.edges}`);
  console.log(`  new clusters    : ${report.clusters}`);
  if (report.warnings) console.log(`  warnings        : ${report.warnings}`);
}
