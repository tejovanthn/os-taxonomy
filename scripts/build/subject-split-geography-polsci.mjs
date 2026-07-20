#!/usr/bin/env node
/**
 * build/subject-split-geography-polsci.mjs — promote Geography and Political
 * Science out of Social Studies into subjects of their own, from age 14.
 *
 * WHY AGE 14: Class IX is where NCERT itself stops teaching a single composite
 * Social Science and issues separate syllabus documents for History, Geography,
 * Political Science and Economics. The existing data agrees independently —
 * no Social Studies topic in the affected domains starts at 13, so the ladder
 * already had a clean break there. Below 14 the umbrella subject is right:
 * a nine-year-old learning about their neighbourhood is not doing geography as
 * a discipline. Above it, learners elect these subjects separately.
 *
 * This completes the pattern begun at XI–XII, where Physics, Chemistry and
 * Biology were split out of Science. History and Economics were already
 * subjects in their own right, so after this change all five components of
 * NCERT's Social Science exist as subjects at the senior level.
 *
 * Rule-based rather than a hard-coded id list, so it is idempotent AND correct
 * for any topic added to these domains later. Re-running reports zero changes.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (n) => JSON.parse(readFileSync(resolve(DATA, n), 'utf8'));
const save = (n, o) => writeFileSync(resolve(DATA, n), JSON.stringify(o, null, 2) + '\n');

const SPLIT_AGE = 14;

/** Domains that move, and the domain each becomes under its new subject. */
const GEOGRAPHY = {
  'Indian Geography': 'Geography of India',
  'Physical Geography': 'Physical Geography',
  'Human Geography': 'Human Geography',
  'Geographical Skills': 'Geographical Skills',
};
const POLITICAL_SCIENCE = {
  'Political Theory': 'Political Theory',
  'World Politics': 'World Politics',
  // Governance & Constitution splits by what the topic is actually about:
  // the constitutional framework itself, or the practice of Indian politics.
  'Governance & Constitution': null, // resolved per-topic below
};

/** Governance & Constitution topics that are about Indian political practice
 *  rather than the constitutional framework. Everything else in that domain
 *  becomes 'Indian Constitution'. */
const INDIAN_POLITICS = new Set([
  'Challenges to Indian Democracy',
  'Democracy and Social Divisions',
  'Outcomes of Democracy',
  'Social Movements and Democratic Struggle',
  'The Nehru Era: One-Party Dominance and Nation-Building',
  'Crisis and Restoration of the Constitutional Order',
  'New Social Movements and Coalition Politics',
]);

/** This one is political theory rather than constitutional description. */
const AS_POLITICAL_THEORY = new Set(['What Democracy Is and Why It Matters']);

function targetFor(topic) {
  if (topic.subject !== 'Social Studies' || topic.ageRangeStart < SPLIT_AGE) return null;
  if (GEOGRAPHY[topic.domain]) return { subject: 'Geography', domain: GEOGRAPHY[topic.domain] };
  if (topic.domain in POLITICAL_SCIENCE) {
    let domain = POLITICAL_SCIENCE[topic.domain];
    if (domain === null) {
      domain = AS_POLITICAL_THEORY.has(topic.name) ? 'Political Theory'
        : INDIAN_POLITICS.has(topic.name) ? 'Indian Politics'
        : 'Indian Constitution';
    }
    return { subject: 'Political Science', domain };
  }
  return null;
}

const topicsDoc = load('topics.json');
const clustersDoc = load('clusters.json');
const report = { topics: 0, clusters: 0, bySubject: {} };

for (const t of topicsDoc.topics) {
  const target = targetFor(t);
  if (!target) continue;
  t.subject = target.subject;
  t.domain = target.domain;
  report.topics++;
  report.bySubject[target.subject] = (report.bySubject[target.subject] || 0) + 1;
}

// Clusters carry subject + domain and must follow their topics. A Governance &
// Constitution cluster has no single topic to inherit from, so it is mapped
// explicitly rather than inferred.
const CLUSTER_DOMAIN = { ...GEOGRAPHY, 'Political Theory': 'Political Theory', 'World Politics': 'World Politics', 'Governance & Constitution': 'Indian Politics' };

for (const c of clustersDoc.clusters) {
  const target = targetFor({ subject: c.subject, domain: c.domain, ageRangeStart: c.ageRangeStart, name: '' });
  if (!target) continue;
  c.subject = target.subject;
  c.domain = CLUSTER_DOMAIN[c.domain];
  report.clusters++;
}
// Remapping a cluster's (subject, domain) can collide it with one already at that
// key — e.g. a source build re-emits the pre-migration Social Studies cluster,
// which then remaps onto the migrated Political Science cluster. Collapse such
// duplicates so the migration is idempotent no matter how often builds re-run.
const clusterSeen = new Set();
const beforeDedup = clustersDoc.clusters.length;
clustersDoc.clusters = clustersDoc.clusters.filter((c) => {
  const k = `${c.subject}|${c.domain}|${c.ageRangeStart}`;
  if (clusterSeen.has(k)) return false;
  clusterSeen.add(k);
  return true;
});
report.clustersDeduped = beforeDedup - clustersDoc.clusters.length;

topicsDoc.topicCount = topicsDoc.topics.length;
clustersDoc.clusterCount = clustersDoc.clusters.length;
save('topics.json', topicsDoc);
save('clusters.json', clustersDoc);

console.log('✓ Geography and Political Science split from Social Studies (age ≥ ' + SPLIT_AGE + '):');
console.log(`  topics moved    : ${report.topics} ${JSON.stringify(report.bySubject)}`);
console.log(`  clusters moved  : ${report.clusters}`);
if (report.clustersDeduped) console.log(`  duplicates cleared: ${report.clustersDeduped}`);
if (report.topics === 0 && report.clusters === 0 && !report.clustersDeduped) console.log('  (already applied — nothing to do)');
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
