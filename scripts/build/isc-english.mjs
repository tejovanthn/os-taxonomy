#!/usr/bin/env node
/**
 * build/isc-english.mjs — ISC English, Classes XI–XII (ages 16–18).
 * Pure alignment onto the existing English ladder (the 16–18 rungs plus the
 * 14–16 rungs the syllabus continues to draw on). No new topics. Marble-authored
 * unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // Paper 1 — English Language
  s('ENG.C11.LANG', 'XI–XII', 'English Language: Composition', 'Directed and extended composition — argumentative, analytical and discursive — and academic and professional communication.'),
  s('ENG.C11.COMPRE', 'XI–XII', 'English Language: Comprehension', 'Reading an unseen passage and answering questions on it, and note-making and summarising.'),
  // Paper 2 — Literature in English
  s('ENG.C11.PROSE', 'XI–XII', 'Literature: Prose and Poetry', 'The critical appreciation of prescribed prose and poetry.'),
  s('ENG.C11.DRAMA', 'XI–XII', 'Literature: Drama and the Novel', 'The critical reading of a prescribed drama and novel.'),
  s('ENG.C11.SPEAK', 'XI–XII', 'Speaking and Listening', 'Spoken English — phonology, stress and intonation — and speaking in formal settings.'),
];

const alignments = {
  mt_9qlNt1mKl7: ['ENG.C11.LANG'], mt_l5tFDkePm6: ['ENG.C11.LANG'],
  mt_qZAQBsLwp3: ['ENG.C11.COMPRE'],
  mt_BAZzcDukTZ: ['ENG.C11.PROSE'],
  mt_FGvziGUANc: ['ENG.C11.DRAMA'],
  mt_JrjlqetaRr: ['ENG.C11.SPEAK'], mt_ctlZpQx3Wd: ['ENG.C11.SPEAK'],
};

integrate({ subjectDoc: 'English (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
