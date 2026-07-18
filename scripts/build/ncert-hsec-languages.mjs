#!/usr/bin/env node
/**
 * build/ncert-hsec-languages.mjs — NCERT English and Sanskrit, Classes XI–XII.
 *
 * Sanskrit is largely alignment: the existing ladder already carries What Kavya
 * Is, The Genres of Kavya, the Paninian Grammar domain and readings of Bhasa
 * and Bharavi at 13–16. Only literary history, metre and figures of speech were
 * genuinely missing. English gains the senior rungs above Functional Writing
 * and Note-Making.
 *
 * The Sanskrit XI–XII syllabus uses non-Unicode legacy Devanagari, so it was
 * recovered by OCR of 300 DPI renders (tesseract san+hin) cross-checked against
 * the page images. Urdu remains image-only and is not integrated.
 * Descriptions are Marble-authored factual scope summaries (no NCERT text).
 * Idempotent.
 */

import { integrateNcertHsec, s, topic } from './ncert-hsec.mjs';

const en = topic('English'), sa = topic('Sanskrit');
const XI = [16, 17], XII = [17, 18], BOTH = [16, 18];

const standards = [
  // ---- English ----
  s('ENG.C1112.CORE', 'XI–XII', 'English Core — Skills', 'Promoting higher-order language skills: listening to and comprehending extended discourse; speaking with fluency and appropriateness in formal and informal settings; reading with comprehension and inference; writing with organisation, coherence and control of register.'),
  s('ENG.C1112.LIT', 'XI–XII', 'English Core — Literary Appreciation', 'Reading and responding to prose, poetry and drama; appreciating theme, style and the creative use of language; forming and defending a personal response to a text.'),
  s('ENG.C1112.GRAM', 'XI–XII', 'English Core — Grammar and Usage', 'Consolidation of grammar in use rather than in isolation; accuracy in extended writing; appropriate register and the conventions of formal written English.'),
  s('ENG.C1112.EL1', 'XI–XII', 'English Elective — Literature', 'An anthology of short stories; a short novel in Indian writing in English; a selection of one-act plays; sustained critical engagement with each genre.'),
  s('ENG.C1112.EL2', 'XI–XII', 'English Elective — Grammar and Phonology', 'A book of grammar and phonology: the sound system of English, stress and intonation, and the systematic description of English structure.'),
  // ---- Sanskrit ----
  s('SAN.C1112.PATH', 'XI–XII', 'Sanskrit — Prescribed Text', 'One prescribed textbook for each class of about ten lessons, representing the major genres of Sanskrit literature — prose, verse and drama; explanation, contextual interpretation, summary and comprehension of the prescribed passages.'),
  s('SAN.C1112.ITIHASA', 'XI–XII', 'Sanskrit — History of Literature', 'A separate volume on the history of Sanskrit literature covering the various genres of Sanskrit vangmaya together with their principal authors and works, and brief introductions to the authors of the prescribed lessons.'),
  s('SAN.C1112.VYAK', 'XI–XII', 'Sanskrit — Grammar', 'Shabdarupa for vowel-ending nouns in all three genders, pronouns and numerals; dhaturupa for parasmaipada and atmanepada roots across the five lakaras; krit and taddhita suffixes; avyayas; vowel, consonant and visarga sandhi.'),
  s('SAN.C1112.CHAND', 'XI–XII', 'Sanskrit — Metre and Figures of Speech', 'Chandas — the principal Sanskrit metres and how a verse is scanned; alankara — the figures of speech of Sanskrit poetics and their identification in verse.'),
  s('SAN.C1112.RACH', 'XI–XII', 'Sanskrit — Composition', 'Translation into Sanskrit with attention to karaka and agreement; letters including applications and letters of greeting; unseen passage comprehension; paragraph writing and picture description on contemporary themes.'),
];

const EV = (a, b, c) => [a, b, c];

const newTopics = [
  // ---------------- English ----------------
  en('eng-critical-appreciation', 'Critical Appreciation of Literary Texts', 'Reading Comprehension', BOTH, 'CONCEPTUAL',
    'Read a literary text closely enough to say how it achieves its effect, supporting an interpretation with evidence from the text rather than asserting a personal reaction.',
    EV('Identifies how a writer’s choices create a particular effect', 'Supports an interpretation with quoted evidence', 'Distinguishes an argued reading from an unsupported opinion'),
    'Ask {{name}} not whether they liked a poem but how it made them feel that way.',
    ['ENG.C1112.LIT']),
  en('eng-reading-novel-drama', 'Reading the Novel and Drama Critically', 'Reading Comprehension', BOTH, 'CONCEPTUAL',
    'Follow structure, characterisation and voice across a long work, and understand how the demands of drama — performance, staging, dialogue alone — differ from those of prose fiction.',
    EV('Traces the development of a character across a whole work', 'Explains how a dramatist conveys what a novelist could narrate', 'Relates a work’s structure to its effect on the reader or audience'),
    'Ask {{name}} how a playwright shows what a character is thinking when there is no narrator to say it.',
    ['ENG.C1112.EL1']),
  en('eng-extended-argumentative-writing', 'Extended Argumentative and Analytical Writing', 'Writing Composition', BOTH, 'PROCEDURAL',
    'Sustain an argument across a long piece of writing, organising evidence, anticipating objections and maintaining a consistent register throughout.',
    EV('Structures an extended argument with a clear line of reasoning', 'Anticipates and answers a counter-argument', 'Sustains an appropriate register across a long piece'),
    'Ask {{name}} to argue a case they disagree with, and to answer the strongest objection to it.',
    ['ENG.C1112.CORE', 'ENG.C1112.GRAM']),
  en('eng-phonology-stress-intonation', 'English Phonology, Stress and Intonation', 'Speaking & Listening', BOTH, 'LANGUAGE',
    'Understand the sound system of English, how stress and intonation carry meaning beyond the words, and why the same sentence can mean different things when said differently.',
    EV('Identifies the stressed syllable in a word and its effect on meaning', 'Explains how intonation changes the force of an utterance', 'Recognises that spelling and pronunciation diverge systematically in English'),
    'Ask {{name}} to say "I never said she took it" stressing a different word each time, and note how the meaning shifts.',
    ['ENG.C1112.EL2']),
  en('eng-academic-professional-communication', 'Academic and Professional Communication', 'Writing Composition', BOTH, 'PROCEDURAL',
    'Produce the written and spoken forms adult and academic life demands — reports, proposals, applications and presentations — matching form and register to purpose and audience.',
    EV('Selects the appropriate form and register for a stated audience', 'Writes a structured report or proposal', 'Delivers a prepared presentation with appropriate signposting'),
    'Ask {{name}} to write the same request as an email to a friend and as a formal application, and to say what changed.',
    ['ENG.C1112.CORE']),
  // ---------------- Sanskrit ----------------
  sa('san-history-of-literature', 'The History of Sanskrit Literature', 'Literature', BOTH, 'CONCEPTUAL',
    'Understand the sweep of Sanskrit literature across its genres and periods, and be able to place a major author or work in its tradition and approximate time.',
    EV('Names the principal genres of Sanskrit literature and a work in each', 'Places a major author in period and tradition', 'Explains how one genre developed out of or against another'),
    'Ask {{name}} which came first, the epics or the classical plays, and how the later writers used the earlier stories.',
    ['SAN.C1112.ITIHASA']),
  sa('san-chandas-metre', 'Chandas: Sanskrit Metre', 'Literature', BOTH, 'LANGUAGE',
    'Understand that Sanskrit verse is composed in metres defined by patterns of light and heavy syllables, and scan a verse to identify the metre it is written in.',
    EV('Marks the light and heavy syllables of a line', 'Identifies a common metre such as anushtubh from its pattern', 'Explains why metre aids memorisation and oral transmission'),
    'Ask {{name}} to clap the rhythm of a shloka and work out how many syllables each line holds.',
    ['SAN.C1112.CHAND']),
  sa('san-alankara-figures', 'Alankara: Sanskrit Figures of Speech', 'Literature', BOTH, 'LANGUAGE',
    'Understand the figures of speech Sanskrit poetics names and classifies, distinguishing those working through sound from those working through meaning, and identify them in verse.',
    EV('Distinguishes a sound-based from a meaning-based figure', 'Identifies a common alankara such as upama or rupaka in a verse', 'Explains what a figure adds to the plain sense of a line'),
    'Ask {{name}} what a poet gains by saying a face *is* the moon rather than that it is *like* the moon.',
    ['SAN.C1112.CHAND']),
];

const alignments = {
  // English — the existing senior ladder carries the core skills
  'mt_ctlZpQx3Wd': ['ENG.C1112.CORE'],                      // Speaking in Formal Settings
  'mt_qZAQBsLwp3': ['ENG.C1112.CORE'],                      // Note-Making and Summarising
  'mt_IGrGGt7lKf': ['ENG.C1112.CORE'],                      // Functional Writing
  'mt_Qcsl1Z1x0l': ['ENG.C1112.CORE'],                      // Research & Source Evaluation
  'mt_gMSFymQlrW': ['ENG.C1112.LIT'],                       // Evaluating Arguments in Non-Fiction
  'mt_aClzPBiS9k': ['ENG.C1112.LIT'],                       // Poetic forms and conventions
  'mt_tIi6L1n7kF': ['ENG.C1112.EL1'],                       // Understanding drama and performance
  'mt_x2sWtfTeYT': ['ENG.C1112.EL1'],                       // Narrative Perspective and Unreliable Narrators
  'mt_DVSHx3YMkN': ['ENG.C1112.LIT'],                       // Figurative Language and Literary Devices
  'mt_HCweOHWSiu': ['ENG.C1112.GRAM'],                      // Literary and Language Terminology
  'mt_N5tiL3uIeq': ['ENG.C1112.GRAM'],                      // Grammar for Effect
  'mt_S2fP8rUwrl': ['ENG.C1112.GRAM'],                      // Standard English
  // Sanskrit — the existing ladder already carries text, genre and grammar
  'mt_wr4lGfBof9': ['SAN.C1112.PATH'],                      // Sanskrit Literature: Prose, Poetry and Drama
  'mt_gv6rIiSwds': ['SAN.C1112.PATH', 'SAN.C1112.ITIHASA'], // What Kavya Is
  'mt_FfhuGCif9n': ['SAN.C1112.ITIHASA'],                   // The Genres of Kavya
  'mt_YqgEmP5Nhl': ['SAN.C1112.PATH'],                      // Bhasa's Karnabharam
  'mt_aNdAnLHCQJ': ['SAN.C1112.PATH'],                      // Bharavi's Kiratarjuniyam
  'mt_ffG9xKHE3f': ['SAN.C1112.VYAK'],                      // Sanskrit Noun Declensions
  'mt_mrLZFWQnrE': ['SAN.C1112.VYAK'],                      // Sanskrit Verb Conjugations
  'mt_ovWwgKINxC': ['SAN.C1112.VYAK'],                      // Sanskrit Sandhi
  'mt_xCtoz4vJDT': ['SAN.C1112.VYAK'],                      // Sanskrit Suffixes (Pratyaya)
  'mt_DD0RtlfilI': ['SAN.C1112.VYAK'],                      // Prefixes and Indeclinables
  'mt_VDcBe3oTmz': ['SAN.C1112.RACH'],                      // Karaka: Sanskrit Case Relations
  'mt_ICjqSvbPjw': ['SAN.C1112.VYAK'],                      // Deriving Consonant-Stem and Pronoun Forms
  'mt_D6aNogterc': ['SAN.C1112.VYAK'],                      // Krdanta: Deriving Words from Roots
};

const newEdges = [
  { t: 'eng-critical-appreciation', p: 'mt_DVSHx3YMkN', strength: 'hard', reason: 'Critical appreciation builds on recognising literary devices.' },
  { t: 'eng-critical-appreciation', p: 'mt_dmFnJzxKwz', strength: 'hard', reason: 'An argued reading depends on using textual evidence.' },
  { t: 'eng-reading-novel-drama', p: 'mt_tIi6L1n7kF', strength: 'hard', reason: 'Builds on understanding drama and performance.' },
  { t: 'eng-reading-novel-drama', p: 'eng-critical-appreciation', strength: 'hard', reason: 'Sustained reading of a long work applies critical appreciation.' },
  { t: 'eng-extended-argumentative-writing', p: 'mt_Qxyikkkzam', strength: 'hard', reason: 'Extended argument builds on persuasive writing.' },
  { t: 'eng-extended-argumentative-writing', p: 'mt_tn1rY9GbEZ', strength: 'hard', reason: 'A long piece depends on cohesion across paragraphs.' },
  { t: 'eng-phonology-stress-intonation', p: 'mt_ctlZpQx3Wd', strength: 'soft', reason: 'Phonological control supports speaking in formal settings.' },
  { t: 'eng-academic-professional-communication', p: 'mt_IGrGGt7lKf', strength: 'hard', reason: 'Professional forms build on functional writing.' },
  { t: 'eng-academic-professional-communication', p: 'eng-extended-argumentative-writing', strength: 'soft', reason: 'Reports and proposals sustain argument at length.' },
  { t: 'san-history-of-literature', p: 'mt_FfhuGCif9n', strength: 'hard', reason: 'Literary history builds on the genres of kavya.' },
  { t: 'san-history-of-literature', p: 'mt_gv6rIiSwds', strength: 'hard', reason: 'Placing works in tradition builds on what kavya is.' },
  { t: 'san-chandas-metre', p: 'mt_GHG799MyNB', strength: 'hard', reason: 'Scanning a verse builds on reciting Sanskrit correctly.' },
  { t: 'san-alankara-figures', p: 'mt_gv6rIiSwds', strength: 'hard', reason: 'Figures of speech are the ornaments kavya is defined by.' },
  { t: 'san-alankara-figures', p: 'san-chandas-metre', strength: 'soft', reason: 'Metre and figure are the two formal systems of Sanskrit poetics.' },
];

integrateNcertHsec({ subjectDoc: 'English and Sanskrit (XI–XII)', standards, newTopics, alignments, newEdges });
