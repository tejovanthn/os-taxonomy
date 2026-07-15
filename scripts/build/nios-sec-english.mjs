#!/usr/bin/env node
/**
 * build/nios-sec-english.mjs — NIOS Secondary English (Code 202). The course is
 * a skills syllabus (listening, speaking, reading, writing, grammar, vocabulary,
 * literary appreciation, study skills) around a prescribed reader. Individual
 * anthology texts are not micro-topics; the transferable skills map onto the
 * existing English subject. Aligns the skill areas and mints three secondary
 * gaps: functional writing, note-making & summarising, and formal speaking.
 * Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'English', courseCode: '202' };
const EN = 'English';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('202.LSC', 'Listening', 'Listening Comprehension', 'Listening Comprehension', 'Listen to understand — getting the gist and specific information from talks, dialogues and media, and following instructions and directions.'),
  std('202.SPK', 'Speaking', 'Speaking', 'Speaking', 'Speak clearly and appropriately in different situations — conversations, discussions, describing, narrating and presenting.'),
  std('202.RDG', 'Reading', 'Reading Comprehension', 'Reading Comprehension', 'Read a range of texts with understanding — grasping meaning, drawing inferences, and evaluating arguments and points of view.'),
  std('202.WRT', 'Writing', 'Writing', 'Writing', 'Write clearly and appropriately for different purposes — planning, drafting, revising and editing coherent texts.'),
  std('202.GRM', 'Grammar', 'Grammar and Usage', 'Grammar and Usage', 'Use grammar accurately — tenses, voice, parts of speech, and sentence structure — in speech and writing.'),
  std('202.VOC', 'Vocabulary', 'Vocabulary', 'Vocabulary', 'Build and use a wide vocabulary, including academic and figurative language.'),
  std('202.LIT', 'Literary Appreciation', 'Literary Appreciation', 'Literary Appreciation', 'Read and appreciate prose, poetry and drama — understanding theme, character, and the writer’s use of language.'),
  std('202.STU', 'Study Skills', 'Study Skills', 'Study Skills', 'Use study skills — note-making, summarising, and using references and dictionaries — to learn independently.'),
];

const alignments = Object.fromEntries([
  ['mt_bkvB7QYKwg', ['202.SPK']], ['mt_LNYTNpJOGT', ['202.SPK', '202.LSC']], // Adapting Speech / Building on Others ← Speaking + Listening
  ['mt_gMSFymQlrW', ['202.RDG']], ['mt_k-V37x3zsF', ['202.RDG']],            // Evaluating Arguments / How authors support ← Reading
  ['mt_av-uRBrhwT', ['202.WRT']], ['mt_ZxdfRbwkKM', ['202.WRT']],            // Planning/Revising / Evidence-Based ← Writing
  ['mt_gbTyzvnWzr', ['202.GRM']], ['mt_8bIXVKTdtK', ['202.GRM']],            // Active/passive / Abstract nouns ← Grammar
  ['mt_OLwNsTI6C7', ['202.VOC']], ['mt_MlmIrLb_7x', ['202.VOC']],            // Academic Vocab / Figurative ← Vocabulary
  ['mt_aClzPBiS9k', ['202.LIT']], ['mt_sdmm_m60qX', ['202.LIT']],            // Poetic forms / Literary Evidence ← Literary Appreciation
]);

const T = (_slug, domain, name, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: EN, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('eng-functional-writing', 'Writing Composition', 'Functional Writing', 'PROCEDURAL',
    'Write practical, real-world texts in the right format — formal and informal letters, applications, reports, notices and emails — using the conventions each type expects.',
    ['Write a formal letter or application in the correct format', 'Write a notice or report suited to its purpose and audience', 'Explain how format and tone differ across functional texts'],
    'Can {{name}} write a formal letter, application or notice in the right format for its purpose?', ['nios-sec-2020:202.WRT']),
  T('eng-note-making', 'Reading Comprehension', 'Note-Making and Summarising', 'PROCEDURAL',
    'Read a text and capture its key points as organised notes, and write a concise summary in your own words — skills for studying and for handling information.',
    ['Pick out the main points of a text', 'Organise points into structured notes', 'Write a short summary of a passage in your own words'],
    'Can {{name}} read a passage and make clear notes on its main points, and write a short summary in their own words?', ['nios-sec-2020:202.STU']),
  T('eng-formal-speaking', 'Speaking & Listening', 'Speaking in Formal Settings', 'PROCEDURAL',
    'Speak effectively in formal situations — taking part in a discussion or debate, giving a short prepared talk or presentation, and adjusting language for a formal audience.',
    ['Contribute relevantly to a discussion or debate', 'Give a short prepared talk on a topic', 'Use language and tone suited to a formal setting'],
    'Can {{name}} take part in a discussion or give a short prepared talk, using language suited to a formal setting?', ['nios-sec-2020:202.SPK']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const newEdges = [
  soft('eng-functional-writing', 'mt_av-uRBrhwT', 'Functional writing builds on planning, revising and editing writing'),
  soft('eng-note-making', 'mt_gMSFymQlrW', 'Note-making and summarising build on evaluating and understanding texts'),
  soft('eng-formal-speaking', 'mt_bkvB7QYKwg', 'Formal speaking builds on adapting speech to context'),
  soft('eng-formal-speaking', 'mt_LNYTNpJOGT', 'Formal discussion builds on building on others in discussions'),
];

const newClusters = [
  { subject: EN, domain: 'Writing Composition', ageRangeStart: 14, summary: 'Your teenager is learning functional writing — formal letters, applications, reports and notices — using the right format and tone for each real-world purpose.' },
  { subject: EN, domain: 'Reading Comprehension', ageRangeStart: 14, summary: 'Your teenager is building study skills — making organised notes from what they read and writing concise summaries in their own words.' },
  { subject: EN, domain: 'Speaking & Listening', ageRangeStart: 14, summary: 'Your teenager is learning to speak in formal settings — taking part in discussions and debates and giving short prepared talks.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
