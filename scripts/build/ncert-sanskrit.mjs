#!/usr/bin/env node
/**
 * build/ncert-sanskrit.mjs — NCERT Sanskrit, Classes VI–VIII (upper primary,
 * ages ≈ 11–14). Pure alignment onto the existing Sanskrit subject: the
 * class-graded grammar progression (declensions by stem-class, lakaras 2→3→5,
 * sandhi/upasarga/pratyaya staging) maps onto the applied-grammar topics from
 * the NIOS integration. Descriptions are Marble-authored factual summaries
 * (no NCERT text). See scratchpad sec-ncert-sanskrit-extract.md. Idempotent.
 */

import { integrateNcert, mintNs } from './ncert.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} Sanskrit ${strand}`, description });

const standards = [
  s('SKT.C6.SKL', 'VI', 'Skills', 'Listening to and speaking simple Sanskrit; reading and copying simple sentences; first comprehension.'),
  s('SKT.C6.GRM', 'VI', 'Grammar', 'First declensions (a-, aa-, i-, u-stem words); first pronouns; numerals to twenty; present and future tense (लट्, लृट्); seventeen roots; basic avyayas.'),
  s('SKT.C7.SKL', 'VII', 'Skills', 'Comprehending short passages; guided speaking and recitation; writing short sentences and answers.'),
  s('SKT.C7.GRM', 'VII', 'Grammar', 'Further declensions (ऋ-stem, ई-stem and others); full pronoun forms; numerals to fifty; past tense added (लङ्); karaka introduced with upapada vibhaktis; the स्म usage; further roots and avyayas.'),
  s('SKT.C8.SKL', 'VIII', 'Skills', 'Independent reading of simple texts; sandhi-splitting; joining sentences with participial suffixes; free composition of simple sentences.'),
  s('SKT.C8.GRM', 'VIII', 'Grammar', 'Feminine ऋ-stem and consonant-stem declensions; all pronoun forms; numerals to one hundred; imperative and optative added (लोट्, विधिलिङ्) for five lakaras in all; vowel sandhi; upasargas; क्त्वा, ल्यप्, तुमुन् suffixes; karaka vs upapada distinction.'),
];

const NS = (x) => mintNs('nios-sec', x);
const alignments = Object.fromEntries([
  [NS('sa-listening'), ['SKT.C6.SKL']],
  [NS('sa-recitation'), ['SKT.C6.SKL', 'SKT.C7.SKL']],
  [NS('sa-reading'), ['SKT.C7.SKL', 'SKT.C8.SKL']],
  [NS('sa-writing'), ['SKT.C7.SKL', 'SKT.C8.SKL']],
  [NS('sa-declensions'), ['SKT.C6.GRM', 'SKT.C7.GRM', 'SKT.C8.GRM']],
  [NS('sa-conjugations'), ['SKT.C6.GRM', 'SKT.C7.GRM', 'SKT.C8.GRM']],
  [NS('sa-karaka'), ['SKT.C7.GRM', 'SKT.C8.GRM']],
  [NS('sa-sandhi'), ['SKT.C8.GRM']],
  [NS('sa-pratyaya'), ['SKT.C7.GRM', 'SKT.C8.GRM']],
  [NS('sa-upasarga-avyaya'), ['SKT.C6.GRM', 'SKT.C7.GRM', 'SKT.C8.GRM']],
]);

integrateNcert({ subjectDoc: 'Sanskrit (VI–VIII)', standards, alignments });
