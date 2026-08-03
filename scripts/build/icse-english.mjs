#!/usr/bin/env node
/**
 * build/icse-english.mjs — ICSE English (01), Classes IX–X (ages 14–16).
 *
 * English has the taxonomy's richest ladder (reading comprehension, grammar,
 * writing composition, speaking), so this is strongly align-first: the Language
 * paper (composition, comprehension, grammar) and the analytical side of the
 * Literature paper (prose and poetry) all map onto topics that already exist.
 * Only two genuine gaps are minted: formal and informal letter writing, and the
 * close study of a Shakespeare play (the prescribed drama, The Merchant of
 * Venice). Marble-authored factual descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const eng = topic('English');
const AGE = [14, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // Paper 1 — Language
  s('ENG.COMP', 'IX–X', 'Composition', 'Writing a composition — descriptive, narrative, argumentative or discursive — planned, organised and expressed in accurate, appropriate English.'),
  s('ENG.LETTER', 'IX–X', 'Letter Writing', 'Writing formal and informal letters in the correct format, register and tone for the purpose and reader.'),
  s('ENG.COMPRE', 'IX–X', 'Comprehension', 'Reading an unseen passage and answering questions on its meaning, main idea and vocabulary, and summarising it.'),
  s('ENG.GRAMMAR', 'IX–X', 'Grammar', 'Accurate use of English grammar — tenses, voice, sentence structure, prepositions and the transformation of sentences.'),
  // Paper 2 — Literature
  s('ENG.DRAMA', 'IX–X', 'Drama (The Merchant of Venice)', 'The close study of a Shakespeare play — its plot, characters, themes and language.'),
  s('ENG.PROSE', 'IX–X', 'Prose (Short Stories)', 'The study of prescribed short stories — their plot, characters, setting and themes.'),
  s('ENG.POETRY', 'IX–X', 'Poetry', 'The study of prescribed poems — their meaning, form, imagery and the poet’s craft.'),
];

const newTopics = [
  eng('icse-eng-letter-writing', 'Formal and Informal Letter Writing', 'Writing Composition', AGE, 'PROCEDURAL',
    'Understand that a letter’s format, register and tone change with its purpose and reader — a formal application follows conventions an informal note to a friend does not — and write each correctly.',
    EV('Uses the correct format for a formal and an informal letter', 'Matches register and tone to the reader and purpose', 'Organises the body of a letter into clear, ordered points'),
    'Ask {{name}} how a letter asking a stranger for a job should differ from one inviting a friend to a party.',
    ['ENG.LETTER']),
  eng('icse-eng-shakespeare', 'Studying a Shakespeare Play', 'Reading Comprehension', AGE, 'CONCEPTUAL',
    'Understand how to study a Shakespeare play in full — following its plot, weighing its characters and their motives, tracing its themes, and reading its verse and imagery closely.',
    EV('Traces the plot and a subplot of the play', 'Analyses a major character and their motives', 'Explains a theme and supports it with the text'),
    'Ask {{name}} why a play written four hundred years ago still has something to say about mercy or greed today.',
    ['ENG.DRAMA']),
];

// Align ICSE English onto the existing English ladder (align-first).
const alignments = {
  // Composition
  mt_Qxyikkkzam: ['ENG.COMP'],   // Persuasive Writing
  mt_zCUIJLdK_s: ['ENG.COMP'],   // Developed Informational and Explanatory Writing
  mt_tn1rY9GbEZ: ['ENG.COMP'],   // Cohesion and Transitions Across Writing
  'mt_av-uRBrhwT': ['ENG.COMP'], // Planning, Revising and Editing Writing  (id has a hyphen)
  // Comprehension
  mt_II6iw4BmJI: ['ENG.COMPRE'], // Analysing Text Structure
  mt_dmFnJzxKwz: ['ENG.COMPRE'], // Using and Evaluating Textual Evidence
  mt_qZAQBsLwp3: ['ENG.COMPRE'], // Note-Making and Summarising
  // Grammar
  mt_T9IXrlxfx2: ['ENG.GRAMMAR'],  // Types of Sentences
  mt_N5tciHU8cE: ['ENG.GRAMMAR'],  // Verb Voice and Mood
  'mt_lsO9O-_eZH': ['ENG.GRAMMAR'],// Advanced Punctuation for Clarity  (id has a hyphen)
  mt_N5tiL3uIeq: ['ENG.GRAMMAR'],  // Grammar for Effect
  // Prose
  mt_Hqz5y_tWz2: ['ENG.PROSE'],  // Plot Structure and Character Development
  mt_x2sWtfTeYT: ['ENG.PROSE'],  // Narrative Perspective and Unreliable Narrators
  mt_wGxq92Na5g: ['ENG.PROSE'],  // Tracing Theme Across a Text
  // Poetry
  mt_aClzPBiS9k: ['ENG.POETRY'], // Poetic forms and conventions
  mt_DVSHx3YMkN: ['ENG.POETRY'], // Figurative Language and Literary Devices
};

const newEdges = [
  { t: 'icse-eng-letter-writing', p: 'mt_av-uRBrhwT', strength: 'hard', reason: 'A letter is planned, drafted and revised like any writing.' },
  { t: 'icse-eng-letter-writing', p: 'mt_tn1rY9GbEZ', strength: 'soft', reason: 'A letter’s body needs cohesion and clear transitions.' },
  { t: 'icse-eng-shakespeare', p: 'mt_tIi6L1n7kF', strength: 'hard', reason: 'Studying a play builds on understanding drama and performance.' },
  { t: 'icse-eng-shakespeare', p: 'mt_Hqz5y_tWz2', strength: 'soft', reason: 'A play is followed through its plot and characters.' },
  { t: 'icse-eng-shakespeare', p: 'mt_DVSHx3YMkN', strength: 'soft', reason: 'Reading Shakespeare’s verse draws on figurative language.' },
];

const newClusters = [];

integrate({ subjectDoc: 'English (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
