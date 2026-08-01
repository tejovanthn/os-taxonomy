#!/usr/bin/env node
/**
 * build/cisce.mjs — shared helpers for the two CISCE (Council for the Indian
 * School Certificate Examinations) syllabuses:
 *   • ICSE — Indian Certificate of Secondary Education, Classes IX–X (ages 14–16)
 *   • ISC  — Indian School Certificate, Classes XI–XII (ages 16–18)
 *
 * One curriculum slug per board (`icse`, `isc`); each subject document appends
 * its standards through its own per-subject script, exactly as the ncert-hsec
 * family does. Class→age: Class n ≈ ages n+5 to n+6, so IX ≈ 14–15, X ≈ 15–16,
 * XI ≈ 16–17, XII ≈ 17–18.
 *
 * RIGHTS (red tier — see PROVENANCE.md): CISCE reserves all rights and permits
 * no reproduction of its syllabus text ("no part thereof may be reproduced …
 * without the prior written approval of the Council"). We ship NO CISCE text:
 * every standard carries a minted code plus a Marble-authored one-line FACTUAL
 * description of curriculum scope — a fact about the syllabus, not CISCE's
 * expression. Same posture as ncert-elem / ncert-sec / ncert-hsec.
 *
 * MINT NAMESPACES: `icse:` and `isc:` — distinct from every ncert-*, nios-* and
 * ksgh namespace. To reference a topic minted by another build family, mint with
 * THAT family's namespace (helpers `NCERT_SEC`, `NCERT_HSEC` below) or read the
 * literal id from data/topics.json.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (n) => JSON.parse(readFileSync(resolve(DATA, n), 'utf8'));
const saveFile = (n, o) => writeFileSync(resolve(DATA, n), JSON.stringify(o, null, 2) + '\n');
const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/** Deterministic mt_ id from a namespace + slug (same scheme as every build family). */
export const mintNs = (ns, slug) => {
  const h = createHash('sha256').update(`${ns}:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};

/** Cross-family reference helpers — mint an id in another build family's namespace. */
export const NCERT_SEC = (slug) => mintNs('ncert-sec', slug);
export const NCERT_HSEC = (slug) => mintNs('ncert-hsec', slug);

/**
 * makeBoard(SLUG, meta) → the per-board toolkit a subject script imports.
 * Returns { NS, mintId, s, topic, integrate }.
 *   - NS(slug)        : mint an id in THIS board's namespace (for intra-board edges by slug it is rarely needed; edges resolve slugs automatically)
 *   - mintId(slug)    : same as NS — the stable id a new topic will get
 *   - s(code,klass,strand,description) : a standard record
 *   - topic(subject)  : curried topic builder (see below)
 *   - integrate({...}): idempotent writer to the four data files
 */
export function makeBoard(SLUG, meta) {
  const mintId = (slug) => mintNs(SLUG, slug);

  const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

  // topic(subject)(slug, name, domain, [ageStart,ageEnd], type, description, [ev1,ev2,ev3], prompt, [codes])
  // `codes` are bare board codes; the SLUG prefix is added here unless the code already carries a namespace.
  const topic = (subject) => (slug, name, domain, [a, b], type, description, evidence, assessmentPrompt, codes) => ({
    _slug: slug, subject, name, domain, ageRangeStart: a, ageRangeEnd: b, type,
    description, evidence, assessmentPrompt,
    standards: codes.map((c) => (c.includes(':') ? c : `${SLUG}:${c}`)),
  });

  function integrate({ subjectDoc, standards, newTopics = [], alignments = {}, newEdges = [], newClusters = [] }) {
    const topicsDoc = load('topics.json');
    const depsDoc = load('dependencies.json');
    const stdDoc = load('curriculum-standards.json');
    const clustersDoc = load('clusters.json');
    const report = { standards: 0, aligned: 0, linksAdded: 0, topics: 0, edges: 0, clusters: 0, warnings: 0 };

    let cur = stdDoc.curricula.find((c) => c.slug === SLUG);
    if (!cur) {
      cur = { slug: SLUG, country: 'IN', name: meta.name, version: meta.version,
        sourceUrl: meta.sourceUrl, textIncluded: true, license: meta.license,
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
      if (topicId === prerequisiteId) { console.error(`  ! self-edge skipped: ${e.t}`); report.warnings++; continue; }
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
    console.log(`✓ ${SLUG.toUpperCase()} — ${subjectDoc}:`);
    console.log(`  standards added : ${report.standards}`);
    console.log(`  topics aligned  : ${report.aligned} (${report.linksAdded} links)`);
    console.log(`  new topics      : ${report.topics}`);
    console.log(`  new edges       : ${report.edges}`);
    console.log(`  new clusters    : ${report.clusters}`);
    if (report.warnings) console.log(`  warnings        : ${report.warnings}`);
    return report;
  }

  return { NS: mintId, mintId, s, topic, integrate };
}

/** The ICSE board (Classes IX–X, ages 14–16). */
export const icse = makeBoard('icse', {
  name: 'CISCE Indian Certificate of Secondary Education (ICSE), Classes IX–X',
  version: '2028',
  sourceUrl: 'https://cisce.org/regulations-and-syllabuses-icse-2028/',
  license: 'CISCE reserves all rights and permits no reproduction of its syllabus text; these records carry Marble-authored factual descriptions only (no CISCE text) — see PROVENANCE.md',
});

/** The ISC board (Classes XI–XII, ages 16–18). */
export const isc = makeBoard('isc', {
  name: 'CISCE Indian School Certificate (ISC), Classes XI–XII',
  version: '2028',
  sourceUrl: 'https://cisce.org/regulations-and-syllabus-isc-2028/',
  license: 'CISCE reserves all rights and permits no reproduction of its syllabus text; these records carry Marble-authored factual descriptions only (no CISCE text) — see PROVENANCE.md',
});
