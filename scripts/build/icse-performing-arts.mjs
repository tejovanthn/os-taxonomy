#!/usr/bin/env node
/**
 * build/icse-performing-arts.mjs — ICSE Performing Arts (62), Classes IX–X
 * (ages 14–16). Candidates choose one stream: Hindustani Music, Carnatic Music,
 * Western Music, Indian Dance or Drama.
 *
 * Three of the streams map onto subjects with rich existing ladders (from the
 * KSGH graded-examination pass): Hindustani and Carnatic music → **Music**,
 * Indian Dance → **Dance**. Those align. **Western Music** has no home in the
 * taxonomy, so it is minted as a new `Western Music` domain under Music. The
 * **Drama** stream maps to no existing subject (there is no Drama/Theatre
 * subject) and is DEFERRED, like the ISC-only new subjects — integrating it
 * would mean creating a new subject, which the user has deprioritised.
 * Marble-authored factual descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const mus = topic('Music');
const WM = 'Western Music';
const AGE = [14, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  s('PA.HM.T', 'IX–X', 'Hindustani Music: Theory', 'The theory of Hindustani music — ragas and their grammar, the thaat system, the vocal forms, notation and the history of the tradition.'),
  s('PA.HM.P', 'IX–X', 'Hindustani Music: Practical', 'The practical performance of Hindustani music — alankars, a khayal in a prescribed raga, and the ornaments of the style.'),
  s('PA.CM.T', 'IX–X', 'Carnatic Music: Theory', 'The theory of Carnatic music — raga lakshana, the melakarta scheme, the shrutis, notation and the treatises and history of the tradition.'),
  s('PA.CM.P', 'IX–X', 'Carnatic Music: Practical', 'The practical performance of Carnatic music — the items of a kacheri including varnam, kriti and pallavi.'),
  s('PA.ID.T', 'IX–X', 'Indian Dance: Theory', 'The theory of a classical Indian dance — its technique and abhinaya, rasa theory, and its history and treatises.'),
  s('PA.ID.P', 'IX–X', 'Indian Dance: Practical', 'The practical performance of a classical Indian dance — the adavus, the hand gestures and the items of the repertoire.'),
  s('PA.WM.T', 'IX–X', 'Western Music: Theory', 'The theory of Western music — staff notation, scales and key signatures, intervals, chords and simple harmony.'),
  s('PA.WM.P', 'IX–X', 'Western Music: Practical', 'The practical performance of Western music — playing or singing a prescribed piece with correct pitch, rhythm and expression.'),
];

const newTopics = [
  mus('icse-wm-notation', 'Western Staff Notation', WM, AGE, 'REPRESENTATIONAL',
    'Understand the Western staff as a grid of five lines on which pitch is written by position and duration by note shape, so that a melody can be read and written by any musician.',
    EV('Reads pitches from the treble or bass staff', 'Writes the rhythm of a phrase in standard note values', 'Interprets a key signature and time signature'),
    'Ask {{name}} how a row of dots on five lines can tell a musician exactly what to play.',
    ['PA.WM.T']),
  mus('icse-wm-harmony', 'Scales, Intervals and Harmony', WM, AGE, 'CONCEPTUAL',
    'Understand how Western music is built from scales and the intervals between notes, and how notes sounded together form the chords and harmony that support a melody.',
    EV('Builds a major or minor scale', 'Names the interval between two notes', 'Builds a simple triad and explains its role in harmony'),
    'Ask {{name}} why some notes sounded together please the ear and others clash.',
    ['PA.WM.T']),
  mus('icse-wm-performance', 'Western Music Performance', WM, AGE, 'PROCEDURAL',
    'Develop the skill of performing a prescribed piece of Western music — singing or on an instrument — with accurate pitch and rhythm and musical expression.',
    EV('Performs a prescribed piece with correct pitch and rhythm', 'Keeps time and follows the dynamics of the piece', 'Plays or sings with control and expression'),
    'Can {{name}} play or sing a piece so it is not just the right notes but real music?',
    ['PA.WM.P']),
];

// Align the Hindustani, Carnatic and Indian Dance streams onto the existing
// Music and Dance ladders (from the KSGH graded examinations).
const alignments = {
  // Hindustani Music
  mt_OJdk5cjFc5: ['PA.HM.T'],  // The Thaat System
  mt_DLlA8eRAbK: ['PA.HM.T'],  // Hindustani Ragas and Forms
  mt_dIoZAsEo60: ['PA.HM.T'],  // Bhatkhande and Paluskar Notation
  mt_zuoIWNDLly: ['PA.HM.P'],  // The Art of Taan
  mt_DdSeJT46GX: ['PA.HM.P'],  // The Bada Khayal
  // Carnatic Music
  mt_8xUzdI05j3: ['PA.CM.T'],  // Raga Lakshana Study
  mt_2zZTQy61Ed: ['PA.CM.T'],  // The 22 Shrutis
  mt_EpHdDAJUEz: ['PA.CM.T'],  // Writing Music: Carnatic Notation
  mt_tEcnltwtuz: ['PA.CM.P'],  // Pallavi Singing
  mt_FrbFaRvafB: ['PA.CM.P'],  // The Carnatic Kacheri
  // Indian Dance
  mt_kfB7ScBRlH: ['PA.ID.T'],  // Rasa Theory and Nayaka-Nayika Bhava
  mt_jl1v8FSnEj: ['PA.ID.T'],  // The Iconographic Hastas
  mt_6YbQ2E1En5: ['PA.ID.P'],  // The Advanced Adavu Families
  mt_O0bldGx9Ij: ['PA.ID.P'],  // The Expanding Repertoire
  mt_kXcnyA1y1Y: ['PA.ID.P'],  // Building the Margam
};

const newEdges = [
  { t: 'icse-wm-notation', p: 'mt_dIoZAsEo60', strength: 'soft', reason: 'Staff notation is the Western counterpart of the Indian notation systems.' },
  { t: 'icse-wm-harmony', p: 'icse-wm-notation', strength: 'hard', reason: 'Harmony is written and read in staff notation.' },
  { t: 'icse-wm-performance', p: 'icse-wm-notation', strength: 'hard', reason: 'Performing from a score requires reading notation.' },
  { t: 'icse-wm-performance', p: 'icse-wm-harmony', strength: 'soft', reason: 'Expressive performance draws on an understanding of harmony.' },
];

const newClusters = [
  { subject: 'Music', domain: WM, ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'Western music is written down in a way anyone trained can read: the staff of five lines, where a note’s height is its pitch and its shape is its length. On that foundation the learner builds scales and the intervals between notes, and the chords and harmony that turn a bare tune into full music — and then puts it into practice, performing a prescribed piece with the right notes, steady time and real expression.' },
];

integrate({ subjectDoc: 'Performing Arts (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
