#!/usr/bin/env node
/**
 * build/ncert-hindi.mjs — NCERT Hindi (mother tongue), Classes I–V. The primary
 * Hindi ladder the taxonomy lacked. Standards follow the source's own banding
 * (Classes 1–2 and 3–5 for skills; per-class grammar for 3/4/5). Mints the
 * primary-literacy topics missing beneath the existing Hindi subject (varnamala,
 * akshara writing, early grammar) and aligns the existing Hindi topics to the
 * bands. Descriptions are Marble-authored factual summaries (no NCERT text).
 * See scratchpad sec-ncert-hindi-extract.md. Idempotent.
 */

import { integrateNcert, mintNs } from './ncert.mjs';

const H = 'Hindi';
const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Hindi ${strand} (Classes ${klass})`, description });

const standards = [
  s('HIN.C12.ORAL', 'I–II', 'Listening & Speaking', 'Listening to and telling stories and rhymes; conversing naturally about one’s world; enjoying wordplay.'),
  s('HIN.C12.RDG', 'I–II', 'Reading', 'Learning the varnamala and matras; decoding words; reading first sentences and short texts with meaning.'),
  s('HIN.C12.WRT', 'I–II', 'Writing', 'Forming the aksharas; writing words and first sentences; drawing-and-writing expression.'),
  s('HIN.C35.ORAL', 'III–V', 'Listening & Speaking', 'Discussing, describing and narrating with growing clarity; listening critically.'),
  s('HIN.C35.RDG', 'III–V', 'Reading', 'Reading fluently and silently with comprehension across story, poem and information texts; using books independently.'),
  s('HIN.C35.WRT', 'III–V', 'Writing', 'Writing paragraphs, letters, descriptions and short compositions with correct spelling and punctuation.'),
  s('HIN.C3.GRM', 'III', 'Grammar', 'First grammar in use — naming words, gender and number, action words, simple punctuation.'),
  s('HIN.C4.GRM', 'IV', 'Grammar', 'Pronouns and adjectives in use; tense in simple sentences; joining words; punctuation extended.'),
  s('HIN.C5.GRM', 'V', 'Grammar', 'Word formation; synonyms, antonyms and multiple meanings; idiomatic expressions; fuller sentence grammar.'),
];

const K = (c) => `ncert-elem:${c}`;
const T = (_slug, domain, name, a0, a1, type, description, evidence, assessmentPrompt, stds) =>
  ({ _slug, subject: H, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards: stds.map(K) });

const newTopics = [
  T('hi-varnamala', 'Reading', 'The Varnamala and Matras', 5, 7, 'LANGUAGE',
    'Learn the Hindi varnamala — the vowels and consonants in their ordered families — and the matras that join them, decoding aksharas into words.',
    ['Recognise and sound the letters of the varnamala', 'Read words built with matras', 'Decode simple unfamiliar words'],
    'Can {{name}} sound out the Hindi letters and read words built with matras?', ['HIN.C12.RDG']),
  T('hi-first-reading', 'Reading', 'First Reading in Hindi', 6, 8, 'LANGUAGE',
    'Read first sentences and short Hindi texts — rhymes, little stories — with meaning, moving from sounding-out to understanding.',
    ['Read a short Hindi text aloud', 'Tell what a read sentence means', 'Follow a short story read independently'],
    'Can {{name}} read a short Hindi story or rhyme and tell you what it says?', ['HIN.C12.RDG']),
  T('hi-akshara-writing', 'Writing', 'Writing the Aksharas', 5, 7, 'PROCEDURAL',
    'Form the Hindi aksharas correctly — with the shirorekha (headline) — and write words and first sentences.',
    ['Form aksharas legibly with the headline', 'Write words with matras correctly', 'Write a first complete sentence'],
    'Can {{name}} write Hindi letters and words neatly along the headline, up to a full sentence?', ['HIN.C12.WRT']),
  T('hi-early-grammar', 'Grammar', 'First Hindi Grammar', 8, 10, 'LANGUAGE',
    'Meet Hindi grammar in use — naming words (संज्ञा), gender (लिंग) and number (वचन), pronouns and action words, and the first punctuation.',
    ['Identify sangya, sarvanam and kriya in sentences', 'Use ling and vachan agreement correctly', 'Use full stop and question mark correctly'],
    'Can {{name}} spot naming words and action words in Hindi, and match gender and number correctly?', ['HIN.C3.GRM', 'HIN.C4.GRM']),
];

const NS = (x) => mintNs('nios-sec', x);
const alignments = Object.fromEntries([
  [NS('hi-listening'), ['HIN.C12.ORAL', 'HIN.C35.ORAL']],
  [NS('hi-speaking'), ['HIN.C12.ORAL', 'HIN.C35.ORAL']],
  [NS('hi-reading-prose'), ['HIN.C35.RDG']],
  [NS('hi-reading-poetry'), ['HIN.C35.RDG']],
  [NS('hi-functional-writing'), ['HIN.C35.WRT']],
  [NS('hi-expressive-writing'), ['HIN.C35.WRT']],
  [NS('hi-sentence-structure'), ['HIN.C4.GRM', 'HIN.C5.GRM']],
  [NS('hi-word-formation'), ['HIN.C5.GRM']],
  [NS('hi-word-types'), ['HIN.C5.GRM']],
  [NS('hi-idioms'), ['HIN.C5.GRM']],
]);

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  soft('hi-varnamala', 'mt_F978c32kDr', 'Cross-language: the concept that letters stand for sounds transfers to the varnamala'),
  hard('hi-first-reading', 'hi-varnamala', 'Reading words presupposes decoding the aksharas'),
  hard('hi-akshara-writing', 'hi-varnamala', 'Writing the aksharas builds on recognising them'),
  soft('hi-early-grammar', 'hi-first-reading', 'Grammar is met inside the sentences being read'),
  hard(NS('hi-reading-prose'), 'hi-first-reading', 'Reading prose builds on first reading'),
  hard(NS('hi-sentence-structure'), 'hi-early-grammar', 'Sentence structure builds on the first grammar in use'),
  soft(NS('hi-functional-writing'), 'hi-akshara-writing', 'Purposeful writing builds on the mechanics of writing'),
];

const newClusters = [
  { subject: H, domain: 'Reading', ageRangeStart: 5, summary: 'Your child is learning to read Hindi — the varnamala and matras, sounding out words, and their first sentences and stories.' },
  { subject: H, domain: 'Writing', ageRangeStart: 5, summary: 'Your child is learning to write Hindi — forming the aksharas along the headline, then words and first sentences.' },
  { subject: H, domain: 'Grammar', ageRangeStart: 8, summary: 'Your child is meeting Hindi grammar in use — naming words, gender and number, action words and first punctuation.' },
];

integrateNcert({ subjectDoc: 'Hindi (I–V)', standards, newTopics, alignments, newEdges, newClusters });
