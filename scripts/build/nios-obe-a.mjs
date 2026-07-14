#!/usr/bin/env node
/**
 * build/nios-obe-a.mjs — integrate NIOS Open Basic Education Level 'A' into the
 * taxonomy. Idempotent: safe to re-run. After running, regenerate the manifest
 * (`node scripts/manifest.mjs`) and validate (`node scripts/validate.mjs`).
 *
 * Source: National Institute of Open Schooling (NIOS), Open Basic Education
 * (Adult) Level 'A' — three courses in one document (Aleveleng.pdf):
 *   A-102 Environmental Study · A-103 Mathematics · A-104 Basic Computer Skills
 *
 * What it does:
 *   1. Adds curriculum `nios-obe-a` (full standard text) to curriculum-standards.
 *   2. Links existing micro-topics to the NIOS standards they already teach.
 *   3. Mints new micro-topics for content the taxonomy did not cover — a new
 *      "Social Studies" subject (Indian civics/culture), a "Computer Basics"
 *      domain under Computing, and a handful of Science hygiene/EVS topics.
 *   4. Wires the new topics into the prerequisite DAG.
 *   5. Adds parent-friendly clusters for the new (subject, domain, age) bands.
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));
const save = (name, obj) => writeFileSync(resolve(DATA, name), JSON.stringify(obj, null, 2) + '\n');

// Stable, collision-checked id from a slug (so re-runs don't duplicate topics).
const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const mintId = (slug) => {
  const h = createHash('sha256').update(`nios-obe-a:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};

// ---------------------------------------------------------------------------
// 1. The NIOS Level 'A' curriculum standards (full text — NIOS Copyright
//    Statement permits reproduction with acknowledgment; see PROVENANCE.md).
// ---------------------------------------------------------------------------
const SLUG = 'nios-obe-a';
const LEVEL = "Level 'A'";
const std = (code, course, courseCode, lesson, title, description) => ({
  key: `${SLUG}:${code}`,
  code,
  data: { title, level: LEVEL, course, courseCode, lesson, description },
});

const EVS = 'Environmental Study';
const MATH = 'Mathematics';
const COMP = 'Basic Computer Skills';

const niosStandards = [
  // --- A-102 Environmental Study (sub-topic grain) ---
  std('A102.L1.1', EVS, 'A-102', 'Lesson 1: The Concept of Family & Kinship Relations', 'The Concept of Family', 'Understand the concept of a family and its role in a person’s life.'),
  std('A102.L1.2', EVS, 'A-102', 'Lesson 1: The Concept of Family & Kinship Relations', 'Importance of Kinship', 'Understand the importance of kinship and the ties between relatives.'),
  std('A102.L1.3', EVS, 'A-102', 'Lesson 1: The Concept of Family & Kinship Relations', 'Respect for Women in Society', 'Appreciate the need for respect for women in society.'),
  std('A102.L1.4', EVS, 'A-102', 'Lesson 1: The Concept of Family & Kinship Relations', 'Sensitivity towards Persons with Disability and the Elderly', 'Be sensitive and respectfully helpful towards persons with disability and the elderly.'),
  std('A102.L2.1', EVS, 'A-102', 'Lesson 2: Our Social Environ', 'Respect for Different Occupations', 'Respect different occupations and the people involved in them.'),
  std('A102.L2.2', EVS, 'A-102', 'Lesson 2: Our Social Environ', 'Public Conveniences in the Vicinity', 'Identify public conveniences available in the vicinity.'),
  std('A102.L2.3', EVS, 'A-102', 'Lesson 2: Our Social Environ', 'Role of Family, Neighbourhood and Community', 'Understand the role of family, neighbourhood and community in social development.'),
  std('A102.L3.1', EVS, 'A-102', 'Lesson 3: Our Festivals and Celebrations', 'Significance of Social & National Festivals', 'Understand the significance of social and national festivals.'),
  std('A102.L4.1', EVS, 'A-102', 'Lesson 4: The Concept of Environ', 'Features of the Environ', 'Describe the features of the environment.'),
  std('A102.L4.2', EVS, 'A-102', 'Lesson 4: The Concept of Environ', 'Material and Living Environ', 'Distinguish between the material and the living environment.'),
  std('A102.L4.3', EVS, 'A-102', 'Lesson 4: The Concept of Environ', 'Categorization of Objects by their Qualities', 'Categorize objects on the basis of their qualities — living (animals & plants) and non-living (natural/manmade).'),
  std('A102.L4.4', EVS, 'A-102', 'Lesson 4: The Concept of Environ', 'Qualities of General Plants & Animals', 'Describe the qualities of common plants and animals.'),
  std('A102.L5.1', EVS, 'A-102', 'Lesson 5: Conservation of Environ', 'Useful Animals', 'Identify useful animals — milch cattle; animals reared for meat, eggs, wool and silk; animals used to transport goods and people; and pet animals.'),
  std('A102.L5.2', EVS, 'A-102', 'Lesson 5: Conservation of Environ', 'Parts and Uses of Plants; Food Chain', 'Name the main parts of plants (roots, trunk, stem, leaves, flower, fruit) and their various uses; understand environmental balance, the food chain and the food net.'),
  std('A102.L5.3', EVS, 'A-102', 'Lesson 5: Conservation of Environ', 'Conservation of Water, Forest and Land', 'Understand the significance of water, forest and land, and the need for their conservation.'),
  std('A102.L6.1', EVS, 'A-102', 'Lesson 6: The Sun, Moon, Stars, Night-Day & Seasons', 'The Sun, Moon and Stars', 'Describe the Sun, Moon and stars, their importance and their relation with each other; recognise and dispel myths and superstitions related to them.'),
  std('A102.L6.2', EVS, 'A-102', 'Lesson 6: The Sun, Moon, Stars, Night-Day & Seasons', 'Cycle of Night-Day and Change of Seasons', 'Scientifically explain the cycle of night and day and the change of seasons.'),
  std('A102.L7.1', EVS, 'A-102', 'Lesson 7: Our Basic Necessities', 'Basic Necessities for Human Life', 'Understand the importance and maintenance of the basic necessities for human life — food, water, air, clothes and shelter.'),
  std('A102.L8.1', EVS, 'A-102', 'Lesson 8: Food', 'Importance of Food for the Body', 'Understand the importance of food for the body — a source of energy for work and sustenance, for growth and repair, and a shield against diseases and germs.'),
  std('A102.L8.2', EVS, 'A-102', 'Lesson 8: Food', 'Nutrients in Food and their Sources', 'Identify the different nutrients in food and their sources.'),
  std('A102.L8.3', EVS, 'A-102', 'Lesson 8: Food', 'Balanced Diet', 'Explain what a balanced diet is and its benefits.'),
  std('A102.L8.4', EVS, 'A-102', 'Lesson 8: Food', 'Food Hygiene, Upkeep & Safety', 'Practise food hygiene, upkeep and safety.'),
  std('A102.L8.5', EVS, 'A-102', 'Lesson 8: Food', 'Drinking Water — Sources and Purification', 'Understand the importance of water for a healthy body, the sources of water and the ways of water purification.'),
  std('A102.L9.1', EVS, 'A-102', 'Lesson 9: Health & Hygiene of External Organs', 'External Organs of the Human Body', 'Know the external organs of the human body — hair, eyes, ears, nose, mouth, teeth, hands and legs, skin and private parts — and their importance.'),
  std('A102.L9.2', EVS, 'A-102', 'Lesson 9: Health & Hygiene of External Organs', 'Health, Hygiene and Safety of External Organs', 'Follow health, hygiene and safety measures for the external organs.'),
  std('A102.L10.1', EVS, 'A-102', 'Lesson 10: Transportation & Communication', 'Importance and Development of Transportation', 'Understand the importance of transportation and its sequential development.'),
  std('A102.L10.2', EVS, 'A-102', 'Lesson 10: Transportation & Communication', 'Modes of Transport', 'Identify and use different modes of transport — road, rail, water and pipeline transport.'),
  std('A102.L10.3', EVS, 'A-102', 'Lesson 10: Transportation & Communication', 'Ways of Transportation and their Significance', 'Describe various ways of transportation and their significance.'),
  std('A102.L10.4', EVS, 'A-102', 'Lesson 10: Transportation & Communication', 'Communication through Signs', 'Understand communication through various signs in humans and animals and its significance.'),
  std('A102.L11.1', EVS, 'A-102', 'Lesson 11: National Symbols', 'National Symbols of India', 'Understand the significance of the national flag, national emblem, Indian currency, national animal, national flower and national game.'),
  std('A102.L11.2', EVS, 'A-102', 'Lesson 11: National Symbols', 'National Anthem, National Song and National Unity', 'Understand the national anthem and national song and their role in national unity.'),
  std('A102.L11.3', EVS, 'A-102', 'Lesson 11: National Symbols', 'Significance of National Festivals', 'Understand the significance of national festivals.'),
  std('A102.L12.1', EVS, 'A-102', 'Lesson 12: Our Social-Economic Environ', 'Concept and Significance of Globalisation', 'Understand the concept and significance of globalisation.'),
  std('A102.L12.2', EVS, 'A-102', 'Lesson 12: Our Social-Economic Environ', 'Right to Education', 'Explain the Right to Education — its introduction and major features.'),
  std('A102.L12.3', EVS, 'A-102', 'Lesson 12: Our Social-Economic Environ', 'Right to Information', 'Explain the Right to Information — its introduction, major features, and the fee and rules for providing information.'),
  std('A102.L12.4', EVS, 'A-102', 'Lesson 12: Our Social-Economic Environ', 'MNREGA', 'Explain the Mahatma Gandhi National Rural Employment Guarantee Act (MNREGA) — the rules of employment, compensation of labour, and facilities at the workplace.'),
  // --- A-103 Mathematics (lesson grain) ---
  std('A103.L1', MATH, 'A-103', 'Lesson 1', 'Learning Numbers — Reading, Writing, Making & Recognizing', 'Read, write, make and recognise numbers from 1 to 1000 in numerals and words; understand the value of each digit by its place in a two-, three- or four-digit number; and order three-digit numbers in ascending and descending order.'),
  std('A103.L2', MATH, 'A-103', 'Lesson 2', 'Addition & Subtraction of Numbers', 'Add and subtract single-, two- and three-digit numbers, with and without carrying and borrowing; and apply simple addition and subtraction to money and everyday situations.'),
  std('A103.L3', MATH, 'A-103', 'Lesson 3', 'Multiplication', 'Understand multiplication as repeated addition; know the multiplication tables of 1 to 10; and multiply single-, two- and three-digit numbers where the product is less than 1000.'),
  std('A103.L4', MATH, 'A-103', 'Lesson 4', 'Division', 'Understand division as repeated subtraction; divide two- and three-digit numbers by a one-digit number; and appreciate the use of division in daily life.'),
  std('A103.L5', MATH, 'A-103', 'Lesson 5', 'Fractions', 'Understand equal portions of an object as parts of a whole; read, write and understand fractions; and appreciate their use in daily life.'),
  std('A103.L6', MATH, 'A-103', 'Lesson 6', 'Mensuration', 'Measure length in centimetres, metres and kilometres; weight in grams and kilograms; and liquids in millilitres and litres.'),
  std('A103.L7', MATH, 'A-103', 'Lesson 7', 'Geometrical Structures', 'Understand the meaning and use of geometry and its basic units; recognise rectangles, squares and triangles on a plane surface and solid objects; understand volume; and draw lines and geometrical designs using instruments.'),
  // --- A-104 Basic Computer Skills (lesson grain) ---
  std('A104.L1', COMP, 'A-104', 'Lesson 1', 'Introduction to Computer', 'Understand what a computer is, its qualities, uses, development and types; start and shut down a computer; and take precautions for its maintenance and upkeep.'),
  std('A104.L2', COMP, 'A-104', 'Lesson 2', 'Functioning of Computer', 'Understand computer hardware and software, the different kinds of software used in computers, and the languages and vocabulary of computers.'),
  std('A104.L3', COMP, 'A-104', 'Lesson 3', 'Input, Output & Storage Devices', 'Recognise input devices and their types, output devices and their types, printers, speakers and plotters.'),
  std('A104.L4', COMP, 'A-104', 'Lesson 4', 'Operating System', 'Understand what an operating system is, work on it, identify the parts of the desktop, and make files and folders.'),
  std('A104.L5', COMP, 'A-104', 'Lesson 5', 'Paint, Brush & Computer Games', 'Open a paint/brush application, use its tools to make and colour pictures, save and open files, and play games on a computer.'),
  std('A104.L6', COMP, 'A-104', 'Lesson 6', 'Word Processing', 'Open and close a word-processing programme; type text, correct and format it, save it as a file or document, and open existing files.'),
];

const niosCurriculum = {
  slug: SLUG,
  country: 'IN',
  name: "NIOS Open Basic Education (Adult) — Level 'A'",
  version: '2023',
  sourceUrl: 'https://nios.ac.in/media/documents/Aleveleng.pdf',
  textIncluded: true,
  license: 'NIOS Copyright Statement — reproduction permitted with prominent acknowledgment; see PROVENANCE.md',
  topicCount: niosStandards.length,
  topics: niosStandards,
};

// ---------------------------------------------------------------------------
// 2. Alignment — existing topic id → NIOS standard codes it already teaches.
// ---------------------------------------------------------------------------
const alignments = {
  // A-103 Mathematics
  mt_VFsuftfvYM: ['A103.L1'], mt_98c2qwEF7Q: ['A103.L1'], mt_AQcVRBddko: ['A103.L1'],
  mt_jY7uf0Cb7o: ['A103.L1'], mt_M2v1A9OEuM: ['A103.L1'], mt_x8TshvbbQT: ['A103.L1'], mt_fR0UtsSREU: ['A103.L1'],
  mt_ewmuMMPAzP: ['A103.L2'], mt_SrrsLiJkr3: ['A103.L2'], mt_6J1wmCWf41: ['A103.L2'], mt_AF2BeFQwfX: ['A103.L2'],
  mt_PZ909yPrEC: ['A103.L3'], mt_wh3UqnWsa7: ['A103.L3'], mt_HhuSDxwDNM: ['A103.L3'], mt_18fK9sQdIz: ['A103.L3'], mt_gtTl3R5buH: ['A103.L3'],
  mt_LpSuPgL31x: ['A103.L4'], 'mt_iNdrM2-oJf': ['A103.L4'], mt_DyGBW3ZHh3: ['A103.L4'], 'mt_p-nbe0w_lf': ['A103.L4'],
  mt_MyGblah2yY: ['A103.L5'], mt_vKcxX6iNOA: ['A103.L5'], 'mt_-hTTat0mBR': ['A103.L5'], mt_xACS3rWWDp: ['A103.L5'], mt_idbKDrf9qZ: ['A103.L5'],
  mt_skYly2Qm01: ['A103.L6'], mt_e4x3l2JeLI: ['A103.L6'], mt_zd0YkB3xNj: ['A103.L6'], 'mt_-af65bxfdp': ['A103.L6'], mt_jHv4BgRK8B: ['A103.L6'], mt_d8al9JcajP: ['A103.L6'],
  mt_KJeEeTutJI: ['A103.L7'], mt_vJUa62bxeR: ['A103.L7'], mt_Qcp2d_kuta: ['A103.L7'], mt_UooUHC_V7U: ['A103.L7'], mt_6xNmQLzuqm: ['A103.L7'], 'mt_NSC3LT_-ch': ['A103.L7'],
  // A-102 Environmental Study — links to existing Science / PSD / Life Skills topics
  'mt_mDp-1vlL3R': ['A102.L1.3'], mt_2oswCNuapH: ['A102.L1.3'],
  mt_lAvS72LOUO: ['A102.L1.4'], mt_S7UTAhptLi: ['A102.L1.4'], 'mt_OJVkWvIaM_': ['A102.L1.4'],
  mt_asRwlPZXC3: ['A102.L2.1'], mt_RgQxPddV8v: ['A102.L2.1'],
  mt_Fw0bbM1e_g: ['A102.L4.1'], mt_cM8YS6NXqi: ['A102.L4.1'],
  mt_Sa48W7KXB5: ['A102.L4.2', 'A102.L4.3'], mt_zexbopQjG0: ['A102.L4.2'], mt_5r47Pvstyn: ['A102.L4.3'],
  mt_zVLOm6U7bh: ['A102.L4.4'], mt_j7cer_Nmor: ['A102.L4.4'], 'mt_fDoE-pL6Jv': ['A102.L4.4'], mt_xT6jPzyj92: ['A102.L4.4', 'A102.L5.2'],
  mt_6xsEXxKdUX: ['A102.L5.2'], mt_EygMHKs8Ed: ['A102.L5.2'], 'mt_oB-L8EVdIP': ['A102.L5.2'],
  mt_deexfCHU9m: ['A102.L5.3'], mt_YB0qF5KX9C: ['A102.L5.3'],
  mt_XlyF294bPR: ['A102.L6.1'], 'mt_fk33IEGP-T': ['A102.L6.1', 'A102.L6.2'], 'mt_u3Y3Tb-G_n': ['A102.L6.1'],
  'mt_q15w--Fb5H': ['A102.L6.2'], mt_go5i87u2b9: ['A102.L6.2'], mt_K0mZxY2AM8: ['A102.L6.2'],
  mt_L1469gt34A: ['A102.L7.1'], mt_cxJRc15osy: ['A102.L7.1', 'A102.L8.1'], mt_Dj2xr8CoI0: ['A102.L7.1'],
  mt_E1wR8IfCV6: ['A102.L8.1'],
  mt_QhLAeAlHI0: ['A102.L8.2', 'A102.L8.3'], mt_sDmrVCfzqt: ['A102.L8.2'],
  mt_4k3HGahK2k: ['A102.L8.4'],
  mt_nRF_VRntrW: ['A102.L8.5'],
  mt_83gRQ9OPkc: ['A102.L9.1'], mt_nwSWPTENmv: ['A102.L9.1'], mt_I047mKeeaq: ['A102.L9.1'],
  mt_q3vRl4dddK: ['A102.L9.2'],
  mt_wHN14Unk7h: ['A102.L10.4'],
  mt_0Rx1ISxXFE: ['A102.L12.1'], mt_5XLhiqmocP: ['A102.L12.1'],
  // A-104 Basic Computer Skills — the one existing computing topic that overlaps
  mt_XbGfVhfiUz: ['A104.L1'],
};

// ---------------------------------------------------------------------------
// 3. New micro-topics (authored in house voice; {{name}} in assessmentPrompt).
//    `_slug` drives the stable id and edge references; it is stripped on write.
// ---------------------------------------------------------------------------
const SS = 'Social Studies';
const newTopics = [
  // ---- Social Studies / Family & Community ----
  { _slug: 'what-makes-a-family', type: 'CONCEPTUAL', subject: SS, domain: 'Family & Community', name: 'What Makes a Family',
    description: 'Understand what a family is — a group of people connected by birth, marriage, or care who live together and look after one another — and that families come in many shapes and sizes.',
    ageRangeStart: 5, ageRangeEnd: 7,
    evidence: ['Name the members of their own family and how each is related to them', 'Recognise that families differ — some large, some small, some with grandparents or one parent', 'Explain one way family members help and care for each other'],
    assessmentPrompt: 'Can {{name}} tell you who is in their family and how each person is related to them — and understand that other children’s families might look different from theirs?',
    standards: ['nios-obe-a:A102.L1.1'] },
  { _slug: 'kinship-and-relatives', type: 'CONCEPTUAL', subject: SS, domain: 'Family & Community', name: 'Kinship and Relatives',
    description: 'Understand kinship — the wider web of relatives beyond the household, such as grandparents, aunts, uncles and cousins — and why these ties matter for support and belonging.',
    ageRangeStart: 5, ageRangeEnd: 7,
    evidence: ['Use kinship words correctly — grandmother, uncle, aunt, cousin', 'Trace a simple relationship (e.g. “my father’s sister is my aunt”)', 'Give an example of how relatives help each other at times like festivals or illness'],
    assessmentPrompt: 'When {{name}} talks about relatives beyond their home — like an aunt, uncle, or cousin — do they understand how those people are connected to them and why staying in touch matters?',
    standards: ['nios-obe-a:A102.L1.2'] },
  { _slug: 'neighbourhood-and-community', type: 'CONCEPTUAL', subject: SS, domain: 'Family & Community', name: 'Our Neighbourhood and Community',
    description: 'Understand that beyond the family is a neighbourhood and community — the people living and working nearby — and that a community develops through the shared roles of families, neighbours and local groups.',
    ageRangeStart: 6, ageRangeEnd: 8,
    evidence: ['Describe their own neighbourhood and name some people in it', 'Explain how neighbours help one another', 'Give an example of families and community working together for a shared purpose'],
    assessmentPrompt: 'Can {{name}} describe the neighbourhood they live in and give an example of how neighbours or the wider community help each other?',
    standards: ['nios-obe-a:A102.L2.3'] },
  { _slug: 'public-services', type: 'CONCEPTUAL', subject: SS, domain: 'Family & Community', name: 'Public Services in Our Neighbourhood',
    description: 'Know the public conveniences and services found in a neighbourhood — such as schools, hospitals, post offices, water taps, parks and public transport stops — and understand that they are shared by everyone and should be looked after.',
    ageRangeStart: 6, ageRangeEnd: 8,
    evidence: ['Name several public services in their area and say what each is for', 'Explain that public services are shared and paid for by the community', 'Describe one way people should look after a shared public facility'],
    assessmentPrompt: 'Can {{name}} point out shared public places near home — like a school, clinic, or park — explain what they are for, and say why everyone should help keep them clean and working?',
    standards: ['nios-obe-a:A102.L2.2'] },
  // ---- Social Studies / Culture & Nation ----
  { _slug: 'festivals-we-celebrate', type: 'CONCEPTUAL', subject: SS, domain: 'Culture & Nation', name: 'Festivals We Celebrate',
    description: 'Understand that festivals are shared celebrations that bring families and communities together, that different communities celebrate different festivals, and that each festival has its own meaning and customs.',
    ageRangeStart: 5, ageRangeEnd: 7,
    evidence: ['Name festivals their family or community celebrates and describe what people do', 'Recognise that other communities celebrate different festivals', 'Explain that a festival has a reason or meaning behind the celebration'],
    assessmentPrompt: 'Can {{name}} tell you about a festival their family celebrates — what happens and why — and understand that other families might celebrate different festivals?',
    standards: ['nios-obe-a:A102.L3.1'] },
  { _slug: 'national-symbols-india', type: 'CONCEPTUAL', subject: SS, domain: 'Culture & Nation', name: 'National Symbols of India',
    description: 'Recognise the national symbols of India — the national flag, national emblem, currency, national animal, national flower and national game — and understand that the national anthem and national song stand for the country and help bring people together.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Identify the national flag and describe its colours and the wheel at its centre', 'Name several national symbols of India and what each represents', 'Explain that the national anthem is sung with respect and stands for the whole country'],
    assessmentPrompt: 'Can {{name}} recognise India’s flag and name a few other national symbols — like the national animal or anthem — and explain that these stand for the country and are treated with respect?',
    standards: ['nios-obe-a:A102.L11.1', 'nios-obe-a:A102.L11.2'] },
  { _slug: 'national-festivals-india', type: 'CONCEPTUAL', subject: SS, domain: 'Culture & Nation', name: 'National Festivals of India',
    description: 'Understand the national festivals of India — Independence Day, Republic Day and Gandhi Jayanti — what each one remembers, and how they are marked across the whole country rather than by one community.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Name the three national festivals and roughly when they fall', 'Explain what each national festival remembers or honours', 'Distinguish a national festival (celebrated by the whole country) from a community festival'],
    assessmentPrompt: 'Can {{name}} name India’s national festivals like Independence Day and Republic Day, say what each one remembers, and explain how they are different from festivals only some families celebrate?',
    standards: ['nios-obe-a:A102.L11.3'] },
  // ---- Social Studies / Transport & Communication ----
  { _slug: 'transport-travel', type: 'CONCEPTUAL', subject: SS, domain: 'Transport & Communication', name: 'How People and Goods Travel',
    description: 'Understand that people and goods move from place to place using different modes of transport — road, rail, water and pipeline — that transport has developed over time from walking and animals to modern vehicles, and that each mode suits different needs.',
    ageRangeStart: 6, ageRangeEnd: 8,
    evidence: ['Name modes of transport and sort them into road, rail, water and air', 'Give an example of goods or people best carried by a particular mode', 'Describe how transport has changed over time'],
    assessmentPrompt: 'Can {{name}} name different ways people and goods travel — by road, rail, water — and explain why you might choose one over another for a particular journey?',
    standards: ['nios-obe-a:A102.L10.1', 'nios-obe-a:A102.L10.2', 'nios-obe-a:A102.L10.3'] },
  { _slug: 'ways-we-communicate', type: 'CONCEPTUAL', subject: SS, domain: 'Transport & Communication', name: 'Ways We Communicate',
    description: 'Understand that communication is how people share messages and information — through speech, writing, signs and signals, letters, telephones and the internet — and that both humans and animals use signs to communicate.',
    ageRangeStart: 6, ageRangeEnd: 8,
    evidence: ['Name several ways people send messages to one another', 'Give an example of communicating with a sign or signal rather than words', 'Recognise that animals also communicate using sounds and signals'],
    assessmentPrompt: 'Can {{name}} describe different ways people send messages to each other — talking, writing, phones — and give an example of a sign or signal that carries a message without words?',
    standards: ['nios-obe-a:A102.L10.4'] },
  // ---- Social Studies / Civic Life & Rights ----
  { _slug: 'right-to-education', type: 'CONCEPTUAL', subject: SS, domain: 'Civic Life & Rights', name: 'Right to Education and Child Rights',
    description: 'Understand that every child has a right to education and to be cared for and protected, that these rights are backed by law, and that rights come with responsibilities towards oneself and others.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain that every child has a right to go to school', 'Name a few basic rights that all children share', 'Describe a responsibility that goes alongside a right'],
    assessmentPrompt: 'Does {{name}} understand that every child has the right to an education and to be kept safe — and that having rights also means having responsibilities towards others?',
    standards: ['nios-obe-a:A102.L12.2'] },
  { _slug: 'right-to-information', type: 'CONCEPTUAL', subject: SS, domain: 'Civic Life & Rights', name: 'Right to Information',
    description: 'Understand that citizens have a right to ask for and receive information about how the government works, that this openness helps hold those in power to account, and that there are rules for how such information is requested.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what the Right to Information means in simple terms', 'Give a reason why being able to ask the government questions matters', 'Describe, in outline, how someone might request official information'],
    assessmentPrompt: 'Can {{name}} explain why citizens being able to ask the government for information helps keep things fair and honest — and roughly how someone would go about requesting it?',
    standards: ['nios-obe-a:A102.L12.3'] },
  { _slug: 'welfare-schemes', type: 'CONCEPTUAL', subject: SS, domain: 'Civic Life & Rights', name: 'Government Support and Welfare Schemes',
    description: 'Understand that governments run schemes to support people — such as guaranteed work, food, or education programmes — that these are funded by taxes, and that schemes like MNREGA aim to give people fair opportunities and a basic livelihood.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain that the government provides support and services funded by taxes', 'Give an example of a welfare scheme and who it is meant to help', 'Describe why a guaranteed-work or food scheme can matter for a family'],
    assessmentPrompt: 'Can {{name}} explain that the government runs schemes — paid for by taxes — to help people who need work, food or support, and give an example of who such a scheme is meant to help?',
    standards: ['nios-obe-a:A102.L12.4'] },
  // ---- Science / Matter & Materials ----
  { _slug: 'natural-and-man-made', type: 'CONCEPTUAL', subject: 'Science', domain: 'Matter & Materials', name: 'Natural and Man-Made Things',
    description: 'Sort the things around us into those that occur in nature (rocks, water, plants, animals) and those that people make (buildings, tools, clothes), and understand that many made things are built from natural materials.',
    ageRangeStart: 5, ageRangeEnd: 7,
    evidence: ['Sort familiar objects into natural and man-made', 'Give an example of a man-made thing built from a natural material (e.g. a wooden chair from a tree)', 'Explain the difference between something that grew or formed in nature and something a person made'],
    assessmentPrompt: 'Can {{name}} look around and sort things into ones that come from nature and ones that people have made — and notice that many made things start from natural materials?',
    standards: ['nios-obe-a:A102.L4.3'] },
  // ---- Science / Animals of the World ----
  { _slug: 'animals-that-help-us', type: 'CONCEPTUAL', subject: 'Science', domain: 'Animals of the World', name: 'Animals That Help Us',
    description: 'Know that people keep and care for many useful animals — cattle for milk; animals reared for eggs, wool and silk; animals that carry people and goods; and pets for company — and that in return these animals need food, shelter and kind treatment.',
    ageRangeStart: 5, ageRangeEnd: 7,
    evidence: ['Name useful animals and say what each provides (milk, eggs, wool, transport, company)', 'Match a product like milk, eggs or wool to the animal it comes from', 'Explain that useful animals must be fed, sheltered and treated kindly'],
    assessmentPrompt: 'Can {{name}} name some animals that help people — for milk, eggs, wool, carrying loads, or company — and explain that these animals need to be looked after in return?',
    standards: ['nios-obe-a:A102.L5.1'] },
  // ---- Science / Organisms & Life Processes ----
  { _slug: 'uses-of-plants', type: 'CONCEPTUAL', subject: 'Science', domain: 'Organisms & Life Processes', name: 'Uses of Plants',
    description: 'Understand that plants are useful to people and animals in many ways — as food (fruits, vegetables, grains), and as sources of wood, cloth fibres, medicines and shade — and that this is a reason to grow and protect them.',
    ageRangeStart: 5, ageRangeEnd: 7,
    evidence: ['Name foods that come from plants', 'Give a non-food use of plants (wood, cloth, medicine, shade)', 'Explain one reason why plants are worth growing and protecting'],
    assessmentPrompt: 'Can {{name}} give examples of how plants are useful — foods we eat and things like wood or cloth — and explain why that means we should look after them?',
    standards: ['nios-obe-a:A102.L5.2'] },
  // ---- Science / The Human Body ----
  { _slug: 'personal-hygiene', type: 'PROCEDURAL', subject: 'Science', domain: 'The Human Body', name: 'Keeping Clean: Personal Hygiene',
    description: 'Look after the external parts of the body through everyday hygiene — washing hands, bathing, brushing teeth, keeping hair, nails, eyes, ears and skin clean — and understand that cleanliness helps keep germs and illness away.',
    ageRangeStart: 5, ageRangeEnd: 7,
    evidence: ['Describe daily hygiene habits and when to do them (e.g. wash hands before eating)', 'Explain that keeping clean helps keep germs and illness away', 'Demonstrate or describe correct handwashing and tooth-brushing'],
    assessmentPrompt: 'Does {{name}} know the everyday ways to keep their body clean — washing hands before eating, brushing teeth, bathing — and understand that this helps keep germs and illness away?',
    standards: ['nios-obe-a:A102.L9.2'] },
  { _slug: 'safe-food-clean-water', type: 'CONCEPTUAL', subject: 'Science', domain: 'The Human Body', name: 'Safe Food and Clean Water',
    description: 'Understand that food must be kept clean and fresh and that drinking water should be clean and safe — that dirty food or water can carry germs and make us ill — and know simple ways to keep food safe and to make water safe to drink, such as boiling or filtering.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Explain why food should be covered, washed and stored properly', 'Describe how unsafe food or water can make people ill', 'Name a way to make water safe to drink (boiling, filtering, safe storage)'],
    assessmentPrompt: 'Can {{name}} explain why food needs to be kept clean and fresh and water needs to be safe to drink — and name a way to make water safe, like boiling it?',
    standards: ['nios-obe-a:A102.L8.4', 'nios-obe-a:A102.L8.5'] },
  // ---- Computing / Computer Basics ----
  { _slug: 'parts-of-a-computer', type: 'CONCEPTUAL', subject: 'Computing', domain: 'Computer Basics', name: 'Parts of a Computer',
    description: 'Recognise and name the main parts of a computer — the monitor (screen), keyboard, mouse and the box or unit that does the processing — and know what each part is for.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Point to and name the monitor, keyboard, mouse and main unit', 'Say what each main part is used for', 'Recognise a computer among other machines and devices'],
    assessmentPrompt: 'Can {{name}} point to and name the main parts of a computer — screen, keyboard, mouse — and say what each one is for?',
    standards: ['nios-obe-a:A104.L1'] },
  { _slug: 'start-shutdown-computer', type: 'PROCEDURAL', subject: 'Computing', domain: 'Computer Basics', name: 'Starting and Shutting Down a Computer',
    description: 'Turn a computer on and shut it down correctly using the proper steps, and understand why shutting down properly (rather than switching off at the wall) protects the computer and your work.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Start a computer and wait for it to be ready', 'Shut it down using the correct steps rather than pulling the power', 'Explain why shutting down properly matters'],
    assessmentPrompt: 'Can {{name}} switch a computer on and shut it down the proper way — and explain why that’s better than just pulling out the plug?',
    standards: ['nios-obe-a:A104.L1'] },
  { _slug: 'hardware-and-software', type: 'CONCEPTUAL', subject: 'Computing', domain: 'Computer Basics', name: 'Hardware and Software',
    description: 'Understand the difference between hardware (the physical parts you can touch) and software (the programs that tell the computer what to do), and that a computer needs both to work.',
    ageRangeStart: 8, ageRangeEnd: 10,
    evidence: ['Classify examples as hardware or software', 'Explain that software is a set of instructions the computer follows', 'Give an example of a program (software) and what it does'],
    assessmentPrompt: 'Can {{name}} explain the difference between the parts of a computer you can touch (hardware) and the programs that run on it (software), and give an example of each?',
    standards: ['nios-obe-a:A104.L2'] },
  { _slug: 'io-storage-devices', type: 'CONCEPTUAL', subject: 'Computing', domain: 'Computer Basics', name: 'Input, Output and Storage Devices',
    description: 'Understand that input devices (keyboard, mouse, microphone) put information into a computer, output devices (screen, printer, speaker) get information out, and storage devices (disk, USB drive) keep information for later.',
    ageRangeStart: 8, ageRangeEnd: 10,
    evidence: ['Sort devices into input, output and storage', 'Explain what each group of devices does', 'Give an example of a device that stores information to use later'],
    assessmentPrompt: 'Can {{name}} sort computer devices into ones that put information in (input), get it out (output), or store it for later — and give an example of each?',
    standards: ['nios-obe-a:A104.L3'] },
  { _slug: 'using-operating-system', type: 'PROCEDURAL', subject: 'Computing', domain: 'Computer Basics', name: 'Using an Operating System',
    description: 'Find your way around a computer’s desktop — recognise icons, open and close programs, and create and organise files and folders — understanding that the operating system is the software that lets you control the computer.',
    ageRangeStart: 8, ageRangeEnd: 10,
    evidence: ['Identify parts of the desktop and open a program from it', 'Create a folder and save a file into it', 'Explain that the operating system is what lets you use the computer'],
    assessmentPrompt: 'Can {{name}} find their way around a computer’s desktop — open a program, and make a folder to keep files in?',
    standards: ['nios-obe-a:A104.L4'] },
  { _slug: 'drawing-with-paint', type: 'PROCEDURAL', subject: 'Computing', domain: 'Computer Basics', name: 'Drawing with Paint',
    description: 'Use a simple paint program to draw and colour pictures with its tools, and save, open and close your work — building confidence in controlling the mouse and screen.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Open a paint program and use brush, colour and shape tools', 'Make and colour a picture', 'Save the picture and open it again later'],
    assessmentPrompt: 'Can {{name}} open a drawing program, make a colourful picture with its tools, and save it so they can open it again later?',
    standards: ['nios-obe-a:A104.L5'] },
  { _slug: 'word-processing-basics', type: 'PROCEDURAL', subject: 'Computing', domain: 'Computer Basics', name: 'Word Processing Basics',
    description: 'Use a word-processing program to type text, correct mistakes, do simple formatting, and save the document as a file — and open an existing document again.',
    ageRangeStart: 8, ageRangeEnd: 10,
    evidence: ['Open a word processor and type a few sentences', 'Correct and make simple formatting changes to the text', 'Save the document and open an existing one'],
    assessmentPrompt: 'Can {{name}} type some text in a word processor, fix mistakes and tidy it up, and save the document so it can be opened again?',
    standards: ['nios-obe-a:A104.L6'] },
];

// ---------------------------------------------------------------------------
// 4. New prerequisite edges. `t`/`p` may be a new-topic _slug or an existing id.
// ---------------------------------------------------------------------------
const newEdges = [
  { t: 'kinship-and-relatives', p: 'what-makes-a-family', strength: 'hard', reason: 'Kinship terms build on first understanding what a family is' },
  { t: 'neighbourhood-and-community', p: 'what-makes-a-family', strength: 'hard', reason: 'The community extends outward from the family unit' },
  { t: 'public-services', p: 'neighbourhood-and-community', strength: 'hard', reason: 'Locating shared public services assumes a concept of the neighbourhood' },
  { t: 'national-festivals-india', p: 'festivals-we-celebrate', strength: 'hard', reason: 'National festivals are a specific kind of the festivals already understood' },
  { t: 'national-festivals-india', p: 'national-symbols-india', strength: 'soft', reason: 'National festivals celebrate the nation represented by its symbols' },
  { t: 'national-symbols-india', p: 'neighbourhood-and-community', strength: 'soft', reason: 'National identity extends the child’s sense of community to the whole country' },
  { t: 'transport-travel', p: 'neighbourhood-and-community', strength: 'soft', reason: 'Transport connects the neighbourhood to wider places' },
  { t: 'ways-we-communicate', p: 'neighbourhood-and-community', strength: 'soft', reason: 'Communication links people across the community and beyond' },
  { t: 'right-to-education', p: 'mt_rkrG2w7WXI', strength: 'hard', reason: 'Understanding rights builds on understanding that rules and agreements exist' },
  { t: 'right-to-education', p: 'mt_h_shhH-6DC', strength: 'hard', reason: 'Child rights are a specific case of community rights and responsibilities' },
  { t: 'right-to-information', p: 'right-to-education', strength: 'soft', reason: 'The right to information extends the idea of legally-backed rights' },
  { t: 'welfare-schemes', p: 'mt_cSz7XTxVAx', strength: 'hard', reason: 'Welfare schemes are funded by taxes and deliver public services' },
  { t: 'welfare-schemes', p: 'right-to-information', strength: 'soft', reason: 'Understanding government schemes builds on knowing how citizens access official information' },
  { t: 'natural-and-man-made', p: 'mt_5r47Pvstyn', strength: 'soft', reason: 'Sorting natural from made things builds on distinguishing objects from their materials' },
  { t: 'natural-and-man-made', p: 'mt_Sa48W7KXB5', strength: 'soft', reason: 'Classifying the wider world extends the living/dead/never-alive distinction' },
  { t: 'animals-that-help-us', p: 'mt_zVLOm6U7bh', strength: 'hard', reason: 'Naming common animals precedes learning how they are useful to people' },
  { t: 'uses-of-plants', p: 'mt_xT6jPzyj92', strength: 'hard', reason: 'Knowing the parts of a plant precedes understanding their uses' },
  { t: 'uses-of-plants', p: 'mt_j7cer_Nmor', strength: 'soft', reason: 'Recognising common plants supports learning what they are used for' },
  { t: 'personal-hygiene', p: 'mt_83gRQ9OPkc', strength: 'hard', reason: 'Caring for the body’s external parts assumes being able to name them' },
  { t: 'personal-hygiene', p: 'mt_cxJRc15osy', strength: 'soft', reason: 'Hygiene is part of meeting the body’s basic needs' },
  { t: 'safe-food-clean-water', p: 'personal-hygiene', strength: 'soft', reason: 'Food and water hygiene extends everyday personal hygiene habits' },
  { t: 'safe-food-clean-water', p: 'mt_QhLAeAlHI0', strength: 'soft', reason: 'Food safety complements knowing what makes a balanced, healthy diet' },
  { t: 'parts-of-a-computer', p: 'mt_XbGfVhfiUz', strength: 'hard', reason: 'Naming a computer’s parts builds on knowing what computers are and where they are used' },
  { t: 'start-shutdown-computer', p: 'parts-of-a-computer', strength: 'hard', reason: 'Operating a computer assumes recognising its parts' },
  { t: 'hardware-and-software', p: 'parts-of-a-computer', strength: 'hard', reason: 'The hardware/software distinction builds on knowing the physical parts' },
  { t: 'io-storage-devices', p: 'parts-of-a-computer', strength: 'hard', reason: 'Classifying devices builds on recognising a computer’s parts' },
  { t: 'io-storage-devices', p: 'hardware-and-software', strength: 'soft', reason: 'Devices are hardware, so the hardware/software idea helps organise them' },
  { t: 'using-operating-system', p: 'start-shutdown-computer', strength: 'hard', reason: 'Using the operating system assumes being able to start the computer' },
  { t: 'using-operating-system', p: 'hardware-and-software', strength: 'soft', reason: 'The operating system is the software that controls the hardware' },
  { t: 'drawing-with-paint', p: 'using-operating-system', strength: 'hard', reason: 'Opening a paint program requires basic operating-system navigation' },
  { t: 'word-processing-basics', p: 'using-operating-system', strength: 'hard', reason: 'Word processing requires opening programs and saving files through the operating system' },
];

// ---------------------------------------------------------------------------
// 5. New clusters for the new (subject, domain, ageRangeStart) bands.
// ---------------------------------------------------------------------------
const newClusters = [
  { subject: SS, domain: 'Family & Community', ageRangeStart: 5, summary: 'Your child is learning about the people closest to them — what a family is, how relatives are connected, and that families come in many shapes. It’s the first step in understanding how people belong together.' },
  { subject: SS, domain: 'Family & Community', ageRangeStart: 6, summary: 'Your child is looking beyond the family to the neighbourhood and community — the people who live and work nearby, the shared places like schools and clinics, and how neighbours help one another.' },
  { subject: SS, domain: 'Culture & Nation', ageRangeStart: 5, summary: 'Your child is learning that festivals bring families and communities together, that different communities celebrate different festivals, and that each celebration has its own meaning.' },
  { subject: SS, domain: 'Culture & Nation', ageRangeStart: 7, summary: 'Your child is getting to know the symbols and festivals of their country — the national flag, emblem and anthem, and national festivals like Independence Day — and what these shared things stand for.' },
  { subject: SS, domain: 'Transport & Communication', ageRangeStart: 6, summary: 'Your child is learning how people and goods travel — by road, rail and water — and the many ways people communicate, from talking and writing to signs, phones and the internet.' },
  { subject: SS, domain: 'Civic Life & Rights', ageRangeStart: 9, summary: 'Your child is beginning to understand their place as a citizen — that every child has a right to education and to be kept safe, and that rights come alongside responsibilities to others.' },
  { subject: SS, domain: 'Civic Life & Rights', ageRangeStart: 11, summary: 'Your child is learning how citizens and government relate — the right to ask for official information, and how government schemes funded by taxes support people who need work, food or opportunity.' },
  { subject: 'Computing', domain: 'Computer Basics', ageRangeStart: 7, summary: 'Your child is getting to know a computer — naming its main parts, turning it on and off properly, and starting to draw and create with simple programs.' },
  { subject: 'Computing', domain: 'Computer Basics', ageRangeStart: 8, summary: 'Your child is building practical computer skills — telling hardware from software, sorting input, output and storage devices, finding their way around the desktop, and typing and saving documents.' },
];

// ===========================================================================
// Apply (idempotent).
// ===========================================================================
const topicsDoc = load('topics.json');
const depsDoc = load('dependencies.json');
const stdDoc = load('curriculum-standards.json');
const clustersDoc = load('clusters.json');

const report = { standards: 0, aligned: 0, linksAdded: 0, topics: 0, edges: 0, clusters: 0 };

// 1. curriculum standards
if (!stdDoc.curricula.some((c) => c.slug === SLUG)) {
  stdDoc.curricula.push(niosCurriculum);
  report.standards = niosStandards.length;
}
stdDoc.curriculumCount = stdDoc.curricula.length;

// resolve slug -> id for new topics
const slugToId = Object.fromEntries(newTopics.map((t) => [t._slug, mintId(t._slug)]));
const resolveRef = (ref) => slugToId[ref] ?? ref;

// 3. new topics (before alignment so their ids exist for validation of edges)
const existingIds = new Set(topicsDoc.topics.map((t) => t.id));
for (const t of newTopics) {
  const id = slugToId[t._slug];
  if (existingIds.has(id)) continue;
  const { _slug, ...rest } = t;
  topicsDoc.topics.push({ id, type: rest.type, subject: rest.subject, domain: rest.domain, name: rest.name, description: rest.description, ageRangeStart: rest.ageRangeStart, ageRangeEnd: rest.ageRangeEnd, centrality: null, evidence: rest.evidence, assessmentPrompt: rest.assessmentPrompt, standards: rest.standards });
  existingIds.add(id);
  report.topics++;
}
topicsDoc.topicCount = topicsDoc.topics.length;

// 2. alignment — add standard keys to existing topics (dedup, preserve order)
const byId = new Map(topicsDoc.topics.map((t) => [t.id, t]));
for (const [topicId, codes] of Object.entries(alignments)) {
  const topic = byId.get(topicId);
  if (!topic) { console.error(`  ! alignment target missing: ${topicId}`); continue; }
  let touched = false;
  for (const code of codes) {
    const key = `${SLUG}:${code}`;
    if (!topic.standards.includes(key)) { topic.standards.push(key); report.linksAdded++; touched = true; }
  }
  if (touched) report.aligned++;
}

// 4. new edges
const edgeSeen = new Set(depsDoc.dependencies.map((d) => `${d.topicId}>${d.prerequisiteId}`));
for (const e of newEdges) {
  const topicId = resolveRef(e.t);
  const prerequisiteId = resolveRef(e.p);
  const k = `${topicId}>${prerequisiteId}`;
  if (edgeSeen.has(k)) continue;
  depsDoc.dependencies.push({ topicId, prerequisiteId, strength: e.strength, reason: e.reason });
  edgeSeen.add(k);
  report.edges++;
}
depsDoc.edgeCount = depsDoc.dependencies.length;

// 5. new clusters
const clusterSeen = new Set(clustersDoc.clusters.map((c) => `${c.subject}|${c.domain}|${c.ageRangeStart}`));
for (const c of newClusters) {
  const k = `${c.subject}|${c.domain}|${c.ageRangeStart}`;
  if (clusterSeen.has(k)) continue;
  clustersDoc.clusters.push(c);
  clusterSeen.add(k);
  report.clusters++;
}
clustersDoc.clusterCount = clustersDoc.clusters.length;

save('curriculum-standards.json', stdDoc);
save('topics.json', topicsDoc);
save('dependencies.json', depsDoc);
save('clusters.json', clustersDoc);

console.log('✓ NIOS OBE Level A integrated:');
console.log(`  standards added : ${report.standards}`);
console.log(`  topics aligned  : ${report.aligned} (${report.linksAdded} new topic→standard links)`);
console.log(`  new topics      : ${report.topics}`);
console.log(`  new edges       : ${report.edges}`);
console.log(`  new clusters    : ${report.clusters}`);
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
