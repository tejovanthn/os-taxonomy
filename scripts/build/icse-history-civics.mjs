#!/usr/bin/env node
/**
 * build/icse-history-civics.mjs — ICSE History & Civics (52), Classes IX–X
 * (ages 14–16). This one paper covers two of our subjects: the Civics half maps
 * to **Political Science**, the History half to **History**.
 *
 * Civics: Political Science already has the constitution basics at 14–16 but the
 * institutions of government (legislature, executive, judiciary, elections,
 * local government) only at 16–17, so those are minted at 14–16 and the senior
 * topics reverse-anchor onto them.
 *
 * History: the national movement and modern Europe already exist at 14–16 and
 * align; the ancient and medieval Indian civilisations exist but pitched at
 * 9–13, and ICSE revisits them as a senior survey — those units align to the
 * existing topics as shared coverage. Only the genuinely absent surveys are
 * minted: Jainism and Buddhism, the Sangam Age, and the contemporary world.
 * Marble-authored factual descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const pol = topic('Political Science'), hist = topic('History');
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Civics, Class IX ----
  s('HCG9.1', 'IX', 'Our Constitution', 'The making of the Indian Constitution, its preamble and salient features, and the fundamental rights and duties of citizens.'),
  s('HCG9.2', 'IX', 'Elections', 'The importance of elections in a democracy, the electoral process, and the role of the Election Commission.'),
  s('HCG9.3', 'IX', 'Local Self-Government', 'Rural and urban local self-government — the panchayati raj system and the municipal bodies — and their functions.'),
  // ---- Civics, Class X ----
  s('HCG10.1', 'X', 'The Union Legislature', 'The composition and functions of Parliament — the Lok Sabha and the Rajya Sabha — and how a law is made.'),
  s('HCG10.2', 'X', 'The Union Executive', 'The President, the Vice-President, the Prime Minister and the Council of Ministers, and their powers and functions.'),
  s('HCG10.3', 'X', 'The Judiciary', 'The Supreme Court and the High Courts, their composition and jurisdiction, and the independence of the judiciary.'),
  // ---- History, Class IX ----
  s('HCG9.4', 'IX', 'The Harappan Civilisation', 'The town planning, economy and features of the Indus Valley civilisation and the theories of its decline.'),
  s('HCG9.5', 'IX', 'The Vedic Period', 'Early and later Vedic society, polity, economy and religion.'),
  s('HCG9.6', 'IX', 'Jainism and Buddhism', 'The rise, teachings and spread of Jainism and Buddhism and their causes and impact.'),
  s('HCG9.7', 'IX', 'The Mauryan Empire', 'The Mauryan empire, the administration of Chandragupta and Ashoka’s dhamma.'),
  s('HCG9.8', 'IX', 'The Sangam Age', 'The Sangam age of the far south — its kingdoms, society, economy and literature.'),
  s('HCG9.9', 'IX', 'The Age of the Guptas', 'The Gupta empire and the achievements of its age in learning, science and the arts.'),
  s('HCG9.10', 'IX', 'Medieval India', 'The Delhi Sultanate and the Mughal empire — their administration, society and culture.'),
  s('HCG9.11', 'IX', 'The Modern Age in Europe', 'The Renaissance and Reformation and the revolutions that made the modern age.'),
  // ---- History, Class X ----
  s('HCG10.4', 'X', 'The Indian National Movement (1857–1917)', 'The revolt of 1857, the founding of the Indian National Congress and the early and assertive nationalists.'),
  s('HCG10.5', 'X', 'The Mass Phase of the National Movement (1915–1947)', 'Gandhi and the mass movements — Non-Cooperation, Civil Disobedience and Quit India — and Partition and independence.'),
  s('HCG10.6', 'X', 'The Contemporary World', 'The two world wars, the United Nations, the Cold War and the Non-Aligned Movement.'),
];

const newTopics = [
  // ---------------- Civics → Political Science ----------------
  pol('icse-pol-elections', 'Elections and the Electoral Process', 'Indian Constitution', IX, 'CONCEPTUAL',
    'Understand why free and fair elections are the heart of a democracy, how the electoral process runs from constituencies to counting, and why an independent Election Commission conducts it.',
    EV('Explains why elections are essential to democracy', 'Outlines the stages of the electoral process', 'Explains the role of the Election Commission'),
    'Ask {{name}} why a country is only called democratic if its elections are free and fair.',
    ['HCG9.2']),
  pol('icse-pol-local-government', 'Local Self-Government', 'Indian Constitution', IX, 'CONCEPTUAL',
    'Understand how democracy reaches the village and the town through local self-government — the panchayati raj in the countryside and the municipal bodies in the cities — and what each does.',
    EV('Distinguishes rural from urban local government', 'Names a tier of the panchayati raj system', 'Explains a function of a local body'),
    'Ask {{name}} who fixes the street lights and the drains, and how those people are chosen.',
    ['HCG9.3']),
  pol('icse-pol-union-legislature', 'The Union Legislature: Parliament', 'Indian Constitution', X, 'CONCEPTUAL',
    'Understand Parliament as the law-making body of the Union — the elected Lok Sabha and the Rajya Sabha of the states — and how a bill becomes a law.',
    EV('Distinguishes the Lok Sabha from the Rajya Sabha', 'Outlines how a bill becomes a law', 'Explains a function of Parliament beyond making laws'),
    'Ask {{name}} why India has two houses of Parliament rather than one.',
    ['HCG10.1']),
  pol('icse-pol-union-executive', 'The Union Executive', 'Indian Constitution', X, 'CONCEPTUAL',
    'Understand the executive that governs the Union — the President as constitutional head and the Prime Minister and Council of Ministers who hold the real power and answer to Parliament.',
    EV('Distinguishes the President’s role from the Prime Minister’s', 'Explains why the Council of Ministers is responsible to the Lok Sabha', 'Names a power of the Union executive'),
    'Ask {{name}} who really runs the country — the President who signs the laws, or the Prime Minister?',
    ['HCG10.2']),
  pol('icse-pol-judiciary', 'The Judiciary', 'Indian Constitution', X, 'CONCEPTUAL',
    'Understand the courts as the third branch of the state — the Supreme Court and the High Courts — and why their independence from government is what lets them protect rights and check power.',
    EV('Outlines the structure of the Supreme Court and High Courts', 'Explains the independence of the judiciary and why it matters', 'Explains judicial review or the protection of rights'),
    'Ask {{name}} why the judges who might rule against the government must not be controlled by it.',
    ['HCG10.3']),
  // ---------------- History ----------------
  hist('icse-hist-jainism-buddhism', 'Jainism and Buddhism', 'Ancient India', IX, 'CONCEPTUAL',
    'Understand why Jainism and Buddhism arose in the sixth century BCE as responses to Vedic ritual and social order, what each taught, and how far they spread.',
    EV('Explains the causes of the rise of Jainism and Buddhism', 'States a core teaching of each', 'Explains how Buddhism spread beyond India'),
    'Ask {{name}} why two new religions of peace and simplicity took hold in an age of Vedic sacrifice.',
    ['HCG9.6']),
  hist('icse-hist-sangam-age', 'The Sangam Age', 'Ancient India', IX, 'CONCEPTUAL',
    'Understand the Sangam age of the far south — the Chera, Chola and Pandya kingdoms, its trade and society, and the Sangam literature that is its great record.',
    EV('Names the three kingdoms of the Sangam age', 'Describes the society or economy of the Sangam age', 'Explains what Sangam literature tells us'),
    'Ask {{name}} how we know about a southern age two thousand years ago mostly from its poetry.',
    ['HCG9.8']),
  hist('icse-hist-contemporary-world', 'The Contemporary World', 'World History', X, 'CONCEPTUAL',
    'Understand the shape of the world after the two world wars — the founding of the United Nations to keep peace, the Cold War that divided it, and India’s Non-Aligned path between the blocs.',
    EV('Explains why the United Nations was founded', 'Explains what the Cold War was', 'Explains the Non-Aligned Movement and India’s role in it'),
    'Ask {{name}} how the world split into two armed camps without the great powers ever directly fighting.',
    ['HCG10.6']),
];

// Align ICSE units onto existing Political Science and History topics.
const alignments = {
  // Civics
  mt_DLCwoOPIc8: ['HCG9.1'],   // The Making of the Indian Constitution
  // History — ancient/medieval India (existing topics are junior; shared coverage)
  mt_9UT0aF8Fmn: ['HCG9.4'],   // The Indus Valley Civilisation
  mt_jgJMDA0GTY: ['HCG9.5'],   // The Vedic Age
  mt_SBHKtfCzu3: ['HCG9.7'],   // The Maurya Empire and Ashoka
  mt_EpCX1FgGqv: ['HCG9.9'],   // The Gupta Age
  mt_FUDkWnl03o: ['HCG9.10'],  // The Delhi Sultanate
  mt_fvAz0QwV5b: ['HCG9.10'],  // The Mughal Empire
  mt_sVnzpPPhUg: ['HCG9.11'],  // The Making of the Modern World
  mt_7P4EsEbQpI: ['HCG9.11'],  // Revolutions and the Modern Age
  // History — the national movement (already at 14–16)
  mt_urJm0eW3GK: ['HCG10.4'],  // The Revolt of 1857
  mt_612ezPQBl1: ['HCG10.4'],  // The Indian National Congress
  mt_XgBJu5fJiR: ['HCG10.4'],  // Movements for Freedom
  mt_TgwyJZNdub: ['HCG10.5'],  // Non-Cooperation and the Khilafat Movement
  mt_fdcwmJM9aA: ['HCG10.5'],  // Civil Disobedience and the Salt Satyagraha
  mt_l5qTBqqvyr: ['HCG10.5'],  // Peasants, Workers and Tribals in the Freedom Movement
  mt_lJfcDibOG1: ['HCG10.5'],  // Partition and Independence, 1947
};

const newEdges = [
  // Civics institutions anchored to the constitution; senior topics reverse-anchor onto them.
  { t: 'icse-pol-elections', p: 'mt_DLCwoOPIc8', strength: 'hard', reason: 'Elections are conducted under the constitution.' },
  { t: 'icse-pol-local-government', p: 'mt_DLCwoOPIc8', strength: 'soft', reason: 'Local government is a tier of the constitutional order.' },
  { t: 'icse-pol-union-legislature', p: 'mt_DLCwoOPIc8', strength: 'hard', reason: 'Parliament is established by the constitution.' },
  { t: 'icse-pol-union-executive', p: 'icse-pol-union-legislature', strength: 'hard', reason: 'The Council of Ministers is drawn from and answerable to Parliament.' },
  { t: 'icse-pol-judiciary', p: 'mt_DLCwoOPIc8', strength: 'hard', reason: 'The judiciary interprets and guards the constitution.' },
  { t: 'mt_pYVpmVkNQE', p: 'icse-pol-elections', strength: 'hard', reason: 'The senior study of electoral systems builds on elections.' },
  { t: 'mt_Px207pEzXC', p: 'icse-pol-local-government', strength: 'hard', reason: 'The senior study of local government builds on this.' },
  { t: 'mt_mbdVjWWkKD', p: 'icse-pol-union-legislature', strength: 'hard', reason: 'The senior study of the legislature builds on Parliament.' },
  { t: 'mt_mbdVjWWkKD', p: 'icse-pol-union-executive', strength: 'soft', reason: 'The senior study of the executive builds on this.' },
  { t: 'mt_bOFA6RKIkA', p: 'icse-pol-judiciary', strength: 'hard', reason: 'The senior study of the judiciary and the rule of law builds on this.' },
  // History mints anchored to the existing ladder.
  { t: 'icse-hist-jainism-buddhism', p: 'mt_jgJMDA0GTY', strength: 'soft', reason: 'Jainism and Buddhism arose against the later Vedic order.' },
  { t: 'icse-hist-sangam-age', p: 'mt_SBHKtfCzu3', strength: 'soft', reason: 'The Sangam age is contemporary with the Mauryan north.' },
  { t: 'icse-hist-contemporary-world', p: 'mt_7P4EsEbQpI', strength: 'hard', reason: 'The contemporary world follows the revolutions of the modern age.' },
  { t: 'icse-hist-contemporary-world', p: 'mt_lJfcDibOG1', strength: 'soft', reason: 'India entered the contemporary world at independence.' },
];

const newClusters = [
  { subject: 'Political Science', domain: 'Indian Constitution', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Having met the constitution itself, the learner now studies the institutions it creates — the machinery of the Union government. Parliament, in two houses, makes the laws; the executive, headed for form’s sake by the President but run by the Prime Minister and the Council of Ministers, carries them out and answers to Parliament for it; and the judiciary, deliberately kept independent, interprets the laws and guards the constitution against both. The three together, each checking the others, are how a democracy governs without letting any one part rule.' },
];

integrate({ subjectDoc: 'History & Civics (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
