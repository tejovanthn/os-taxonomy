#!/usr/bin/env node
/**
 * build/nios-obe-bc.mjs — integrate NIOS Open Basic Education Levels 'B' and 'C'
 * into the taxonomy. Idempotent: safe to re-run. After running, regenerate the
 * manifest (`node scripts/manifest.mjs`) and validate (`node scripts/validate.mjs`).
 *
 * Sources (National Institute of Open Schooling, India):
 *   Level 'B' (Bleveleng.pdf): B-102 Environmental Studies, B-103 Mathematics,
 *     B-104 Basic Computer Skills.
 *   Level 'C' (Cleveleng.pdf): C-102 Social Science, C-103 Mathematics,
 *     C-104 Basic Computer Skills, C-105 Science.
 *
 * Grain: sub-topic codes for the EVS course (distinct topics); lesson codes for
 * the narrative Social Science/Science courses and for Maths/Computer.
 *
 * The big gap these levels fill is India-centric content: a full sweep of Indian
 * history (Indus Valley → freedom struggle), Indian geography, and civics/
 * governance — plus secondary-level Maths (HCF/LCM, interest, Vedic maths) and
 * intermediate computing (spreadsheets → networks → e-services).
 */

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'data');
const load = (name) => JSON.parse(readFileSync(resolve(DATA, name), 'utf8'));
const saveFile = (name, obj) => writeFileSync(resolve(DATA, name), JSON.stringify(obj, null, 2) + '\n');

const B62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// Shared namespace so a slug maps to the same id regardless of which level mints it.
const mintId = (slug) => {
  const h = createHash('sha256').update(`nios-obe:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};

// ---------------------------------------------------------------------------
// Curriculum standards.
// ---------------------------------------------------------------------------
const LEVEL_B = "Level 'B'";
const LEVEL_C = "Level 'C'";
const mk = (slug) => (code, course, courseCode, lesson, title, description) => ({
  key: `${slug}:${code}`, code,
  data: { title, level: slug === 'nios-obe-b' ? LEVEL_B : LEVEL_C, course, courseCode, lesson, description },
});
const b = mk('nios-obe-b');
const c = mk('nios-obe-c');

const EVS = 'Environmental Studies', MATH = 'Mathematics', COMP = 'Basic Computer Skills', SOC = 'Social Science', SCI = 'Science';

const bStandards = [
  // B-102 Environmental Studies (sub-topic grain)
  b('B102.L1.1', EVS, 'B-102', 'Lesson 1: Conservation and Respect of Indian Cultural & Natural Heritage', "India's composite culture", "Understand the significance of India's composite culture and the necessity of protecting it."),
  b('B102.L1.2', EVS, 'B-102', 'Lesson 1: Conservation and Respect of Indian Cultural & Natural Heritage', 'Historical heritage', 'Appreciate the importance of India’s historical heritage and its conservation.'),
  b('B102.L1.3', EVS, 'B-102', 'Lesson 1: Conservation and Respect of Indian Cultural & Natural Heritage', 'Natural resources of India', 'Know India’s natural resources — forests, flora and fauna, water and mineral resources — their importance and conservation.'),
  b('B102.L2.1', EVS, 'B-102', 'Lesson 2: Peace, Unity and Cultural Amalgamation', 'Diversity in India', 'Describe the linguistic, cultural and social diversity of India.'),
  b('B102.L2.2', EVS, 'B-102', 'Lesson 2: Peace, Unity and Cultural Amalgamation', 'Unity amidst diversity', 'Recognise the threads of unity that run through India’s diversity.'),
  b('B102.L2.3', EVS, 'B-102', 'Lesson 2: Peace, Unity and Cultural Amalgamation', 'Importance of peace and unity', 'Understand the importance of peace and unity and our responsibility towards them.'),
  b('B102.L2.4', EVS, 'B-102', 'Lesson 2: Peace, Unity and Cultural Amalgamation', 'Peace policies of Ashoka and Akbar', 'Learn about the peace, unity and goodwill policies of emperors Ashoka and Akbar.'),
  b('B102.L3.1', EVS, 'B-102', 'Lesson 3: Our Social Concerns', 'The small family', 'Understand the concept and importance of the small family (family planning) and our responsibility.'),
  b('B102.L3.2', EVS, 'B-102', 'Lesson 3: Our Social Concerns', 'Education and the female child', 'Appreciate the importance of education and of educating the female child.'),
  b('B102.L3.3', EVS, 'B-102', 'Lesson 3: Our Social Concerns', 'Gender equality and women’s rights', 'Understand the necessity of gender equality, the reasons for inequality, and the laws for women’s rights and empowerment.'),
  b('B102.L3.4', EVS, 'B-102', 'Lesson 3: Our Social Concerns', 'Dowry and its prohibition', 'Understand the causes and ill effects of the dowry system and the Dowry Prohibition Act, 1961.'),
  b('B102.L4.1', EVS, 'B-102', 'Lesson 4: Our Freedom Struggle', 'Establishment of British rule', 'Learn how British rule was established in India and the era of subjugation that followed.'),
  b('B102.L4.2', EVS, 'B-102', 'Lesson 4: Our Freedom Struggle', 'The freedom movement', 'Learn about the freedom movement, important revolutionaries, their struggle and the attainment of freedom.'),
  b('B102.L5.1', EVS, 'B-102', 'Lesson 5: States of India and their Natural Features', 'States and Union Territories', 'Identify the states and union territories of India.'),
  b('B102.L5.2', EVS, 'B-102', 'Lesson 5: States of India and their Natural Features', 'India on the world map', "Locate India on the world map and describe its natural features and resources."),
  b('B102.L5.3', EVS, 'B-102', 'Lesson 5: States of India and their Natural Features', 'Crops and plants of India', 'Describe the various crops and plants of India.'),
  b('B102.L6.1', EVS, 'B-102', 'Lesson 6: Our Community and Public Administration', 'Indian democracy and governance', 'Identify the democratic mode of governance in India — the legislature, executive and judiciary.'),
  b('B102.L6.2', EVS, 'B-102', 'Lesson 6: Our Community and Public Administration', 'Rural public administration', 'Understand rural public administration — the village, area and district panchayats, their constitution, function and tenure.'),
  b('B102.L6.3', EVS, 'B-102', 'Lesson 6: Our Community and Public Administration', 'Urban public administration', 'Understand urban public administration — city administration, municipal councils and commissions, their constitution, function and tenure.'),
  b('B102.L7.1', EVS, 'B-102', 'Lesson 7: Plant and Animal Life', 'Interdependence and the food chain', 'Understand the interdependence between plants and animals and the food chain.'),
  b('B102.L7.2', EVS, 'B-102', 'Lesson 7: Plant and Animal Life', 'Natural equilibrium', 'Understand the importance of natural equilibrium and the ill effects of imbalance in nature.'),
  b('B102.L7.3', EVS, 'B-102', 'Lesson 7: Plant and Animal Life', 'Conservation of forests and wildlife', 'Understand the conservation of the environment, forests and wild animals.'),
  b('B102.L8.1', EVS, 'B-102', 'Lesson 8: Soil and Crops', 'Soil and crops', 'Understand the significance of soil, the types of soil and the crops cultivated in them.'),
  b('B102.L8.2', EVS, 'B-102', 'Lesson 8: Soil and Crops', 'Agricultural activities', 'Describe the important activities of cultivation — preparing the land, sowing, seed protection, weeding, irrigation, manures and fertilizers, crop protection and harvest.'),
  b('B102.L8.3', EVS, 'B-102', 'Lesson 8: Soil and Crops', 'Rabi, Kharif and Zaid crops', 'Know the crops grown in particular seasons — Rabi, Kharif and Zaid.'),
  b('B102.L9.1', EVS, 'B-102', 'Lesson 9: Soil & Forest Conservation', 'Soil erosion', 'Understand soil erosion, its ill effects, its causes and preventive measures.'),
  b('B102.L9.2', EVS, 'B-102', 'Lesson 9: Soil & Forest Conservation', 'Forests and erosion', 'Understand the role of forest conservation in preventing soil erosion.'),
  b('B102.L9.3', EVS, 'B-102', 'Lesson 9: Soil & Forest Conservation', 'Soil pollution', 'Understand the ill effects of soil pollution, its causes and preventive measures, with reference to bio-agriculture.'),
  b('B102.L10.1', EVS, 'B-102', 'Lesson 10: Sources of Energy', 'Need for energy', 'Understand the need and importance of energy.'),
  b('B102.L10.2', EVS, 'B-102', 'Lesson 10: Sources of Energy', 'Exhaustible and non-exhaustible sources', 'Distinguish between exhaustible and non-exhaustible sources of energy.'),
  b('B102.L10.3', EVS, 'B-102', 'Lesson 10: Sources of Energy', 'Types of energy', 'Know the types of energy — from food, solar, wind, water, bio, electrical and magnetic energy.'),
  b('B102.L10.4', EVS, 'B-102', 'Lesson 10: Sources of Energy', 'Alternative energy and conservation', 'Understand the use of alternative sources of energy and measures for saving energy.'),
  b('B102.L11.1', EVS, 'B-102', 'Lesson 11: Solar System & the Earth', 'Solar system, planets and satellites', 'Describe the solar system, its planets and satellites and their qualities.'),
  b('B102.L11.2', EVS, 'B-102', 'Lesson 11: Solar System & the Earth', 'Phases of the Moon', 'Understand the phases of the Moon and the cycle of dates in accordance with them.'),
  b('B102.L11.3', EVS, 'B-102', 'Lesson 11: Solar System & the Earth', 'Natural and artificial satellites', 'Distinguish between natural and artificial satellites and understand the significance and utility of artificial satellites.'),
  b('B102.L11.4', EVS, 'B-102', 'Lesson 11: Solar System & the Earth', 'Latitude, longitude and time', 'Understand the Earth’s lines of longitude and latitude and how time is known on the basis of latitude.'),
  b('B102.L11.5', EVS, 'B-102', 'Lesson 11: Solar System & the Earth', 'Day-night cycle and seasons', 'Understand the expansion and contraction of the day-night cycle and the positions of 21 June, 22 December, 21 March and 23 September.'),
  b('B102.L12.1', EVS, 'B-102', 'Lesson 12: Food & Health', 'Deficiency diseases', 'Diagnose and prevent deficiency diseases — anaemia, kwashiorkor, marasmus, night blindness, goitre, slow mental development and beriberi.'),
  b('B102.L12.2', EVS, 'B-102', 'Lesson 12: Food & Health', 'Inexpensive nutritious food', 'Identify inexpensive nutritious food and conditions in which food intake should be carefully monitored.'),
  b('B102.L12.3', EVS, 'B-102', 'Lesson 12: Food & Health', 'Storage of food', 'Know methods of storing food items — drying and cooling, with spices and oil, with chemicals, by cooking, freezing and storing in boxes.'),
  b('B102.L13.1', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Internal organs overview', 'Know the internal organs of the human body and their importance.'),
  b('B102.L13.2', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Skeleton and muscles', 'Know the main parts of the skeleton and their functions, and the types and functions of muscles.'),
  b('B102.L13.3', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Digestive system', 'Know the digestive system — mouth, food pipe, stomach, small and large intestine, rectum and liver — and their functions.'),
  b('B102.L13.4', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Lungs', 'Understand the structure, functions and significance of the lungs.'),
  b('B102.L13.5', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Heart', 'Understand the structure, functions and significance of the heart.'),
  b('B102.L13.6', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Kidneys', 'Understand the structure, functions and significance of the kidneys.'),
  b('B102.L13.7', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Brain', 'Understand the structure, functions and significance of the brain.'),
  b('B102.L13.8', EVS, 'B-102', 'Lesson 13: Internal Organs of Human Body', 'Reproductive organs', 'Understand the structure, functions and significance of the reproductive organs in the human male and female.'),
  b('B102.L14.1', EVS, 'B-102', 'Lesson 14: Common Diseases', 'Contagious and non-contagious diseases', 'Distinguish between contagious (communicable) and non-contagious diseases.'),
  b('B102.L14.2', EVS, 'B-102', 'Lesson 14: Common Diseases', 'Communicable diseases', 'Know the symptoms, causes and prevention of major communicable diseases — diarrhoea, malaria, cholera, dengue, elephantiasis, typhoid, tuberculosis, common cold, influenza, pneumonia and HIV-AIDS.'),
  b('B102.L14.3', EVS, 'B-102', 'Lesson 14: Common Diseases', 'Non-communicable diseases', 'Know the symptoms, causes and prevention of some non-communicable diseases — heart attack, diabetes and cancer.'),
  b('B102.L14.4', EVS, 'B-102', 'Lesson 14: Common Diseases', 'Preventing disease', 'Know the main preventive measures against disease — hygiene, care around communicable patients, vaccination, and avoiding tobacco, alcohol and drugs.'),
  b('B102.L15.1', EVS, 'B-102', 'Lesson 15: Disposal of Waste Material', 'Categories of waste', 'Identify the categories of waste materials.'),
  b('B102.L15.2', EVS, 'B-102', 'Lesson 15: Disposal of Waste Material', 'Disposing of waste', 'Dispose of waste by its nature, using separate bins for biodegradable and non-biodegradable waste.'),
  b('B102.L15.3', EVS, 'B-102', 'Lesson 15: Disposal of Waste Material', 'A clean environment', 'Understand that keeping a clean environment is our shared responsibility.'),
  // B-103 Mathematics (lesson grain)
  b('B103.L1', MATH, 'B-103', 'Lesson 1', 'Numbers', 'Read and write numbers from 1001 up to one crore in figures and words; understand place value and expanded form; compare and order numbers; and make the smallest and largest numbers from given digits.'),
  b('B103.L2', MATH, 'B-103', 'Lesson 2', 'Addition, Subtraction, Multiplication & Division', 'Add, subtract, multiply and divide numbers of up to three digits, and solve everyday problems using the four operations.'),
  b('B103.L3', MATH, 'B-103', 'Lesson 3', 'Fractions', 'Read, write and picture fractions; find equivalent fractions and lowest terms; compare and order fractions; convert between mixed and improper fractions; add, subtract, multiply and divide fractions; and solve everyday problems.'),
  b('B103.L4', MATH, 'B-103', 'Lesson 4', 'Decimals', 'Understand decimals; convert between fractions and decimals; compare and order decimals; carry out the four operations with decimals; convert decimals to percentages; and use decimals in everyday life.'),
  b('B103.L5', MATH, 'B-103', 'Lesson 5', 'Mensuration', 'Use units of length, weight, capacity, heat and time and Indian currency; and solve everyday problems involving measurement.'),
  b('B103.L6', MATH, 'B-103', 'Lesson 6', 'Perimeter, Area and Volume', 'Understand and find the perimeter and area of plane figures and the volume of solid structures.'),
  b('B103.L7', MATH, 'B-103', 'Lesson 7', 'Geometry', 'Recognise curves, line segments and rays; identify and compare angles; draw and measure angles with a protractor; draw circles and know their parts; and recognise parallel and non-parallel lines.'),
  b('B103.L8', MATH, 'B-103', 'Lesson 8', 'Statistics', 'Understand what data is and why it is needed; collect and manage data; represent it pictorially; and analyse it to draw results.'),
  // B-104 Basic Computer Skills (lesson grain)
  b('B104.L1', COMP, 'B-104', 'Lesson 1', 'Revision', 'Revise the computer and its uses, its parts and operating systems, and making and sending documents.'),
  b('B104.L2', COMP, 'B-104', 'Lesson 2', 'Word Processing: Specialties', 'Make tables in a word processor and fill them; change fonts; type documents in Hindi and other languages; and send a document to many people (mail merge).'),
  b('B104.L3', COMP, 'B-104', 'Lesson 3', 'Spreadsheet', 'Understand and make a spreadsheet, its parts, and the mathematical formulae and equations available in it; fill and correct data.'),
  b('B104.L4', COMP, 'B-104', 'Lesson 4', 'Presentation', 'Make presentations — inserting pictures, graphs and text, formatting, editing and sequencing slides.'),
  b('B104.L5', COMP, 'B-104', 'Lesson 5', 'Internet and Its Benefits', 'Understand the internet and its benefits; connect to it; use the World Wide Web, websites and webpages; and collect information and read online newspapers.'),
  b('B104.L6', COMP, 'B-104', 'Lesson 6', 'Computer Security', 'Understand the need for computer and internet security, rules for making and keeping passwords, and protection from computer viruses.'),
  b('B104.L7', COMP, 'B-104', 'Lesson 7', 'E-Mail', 'Understand email and email addresses; the difference between post and email; and creating an account, using an address book, and sending messages with attachments.'),
];

const cStandards = [
  // C-102 Social Science (lesson grain)
  c('C102.L1', SOC, 'C-102', 'Lesson 1', 'Evolution of Human Civilization', 'Trace the evolution of human civilization — ancient society and life, early beliefs, the Indus Valley Civilization, the rise of urban life, and the beginnings of agriculture.'),
  c('C102.L2', SOC, 'C-102', 'Lesson 2', 'The Vedic Civilization', 'Understand the Vedic civilization — the Vedas; social, economic and political systems of the Vedic age; and the Ramayana and Mahabharata period.'),
  c('C102.L3', SOC, 'C-102', 'Lesson 3', 'Life during the Post-Vedic Age', 'Learn about the post-Vedic age — the janapadas and mahajanapadas, the Nanda dynasty, and the Maurya Empire.'),
  c('C102.L4', SOC, 'C-102', 'Lesson 4', 'Advent of the Medieval Age', 'Learn about the Gupta dynasty and Kanishka, the reign of Harshavardhana, and the southern kingdoms of the Cholas, Cheras and Pandyas.'),
  c('C102.L5', SOC, 'C-102', 'Lesson 5', 'The Delhi Sultanate', 'Learn about the arrival of the Arabs and Islam in India and the Delhi Sultanate — the Slave Dynasty and its economic, agricultural, market and cultural reforms.'),
  c('C102.L6', SOC, 'C-102', 'Lesson 6', 'The Mughals, the Marathas and the Rajputs', 'Learn about the Mughal Empire and its achievements, the Maratha Empire, and the history of the Rajputs and their relations with the Mughals.'),
  c('C102.L7', SOC, 'C-102', 'Lesson 7', 'The British Rule', 'Learn about the arrival of the East India Company, the expansion of British rule, the 19th-century social, educational and religious reforms, and the first war of independence in 1857.'),
  c('C102.L8', SOC, 'C-102', 'Lesson 8', 'Freedom Struggle', 'Learn about the national freedom struggle, its impact, and the situation in post-independence India.'),
  c('C102.L9', SOC, 'C-102', 'Lesson 9', 'Physical Features of India', 'Describe the physical features of India — its expanse, climate and monsoon, natural resources, soils and their conservation, water resources, and forest resources.'),
  c('C102.L10', SOC, 'C-102', 'Lesson 10', 'Minerals and Energy Resources', 'Know India’s mineral and energy resources — traditional sources (coal, petroleum, atomic energy) and non-traditional sources (solar, wind).'),
  c('C102.L11', SOC, 'C-102', 'Lesson 11', 'Agriculture in India', 'Understand the types of agriculture in India, the major food and cash crops, the Rabi, Kharif and Zaid seasons, and the factors that affect agriculture.'),
  c('C102.L12', SOC, 'C-102', 'Lesson 12', 'Our Industries', 'Understand industries and their types and the development of industry in India — small-scale, cottage, medium and heavy industry.'),
  c('C102.L13', SOC, 'C-102', 'Lesson 13', 'Transportation and Communication', 'Describe the modes of transportation — road, rail and air — and the tele-communication revolution.'),
  c('C102.L14', SOC, 'C-102', 'Lesson 14', 'Population Explosion and Control', 'Understand the social and economic impact of population explosion and the ways of controlling population — birth rate, death rate and sex ratio.'),
  c('C102.L15', SOC, 'C-102', 'Lesson 15', 'Financial Life', 'Understand financial life and needs, the division of labour, the inclusion of women in economic growth, and the market-centric economy.'),
  c('C102.L16', SOC, 'C-102', 'Lesson 16', 'Nature of Governance Systems', 'Understand the need for government and the state, and the types of governance — monarchy, fascism, colonialism and democracy.'),
  c('C102.L17', SOC, 'C-102', 'Lesson 17', 'The Indian Constitution', 'Understand the features of the Indian Constitution, fundamental rights and duties, and parliamentary democracy — the legislature and executive.'),
  c('C102.L18', SOC, 'C-102', 'Lesson 18', 'State Government', 'Understand the state legislature (assembly and council) and executive (governor, chief minister and council of ministers) — their organisation, powers and functioning.'),
  c('C102.L19', SOC, 'C-102', 'Lesson 19', 'Democracy and Local Self-Governance', 'Understand the nature of democracy and its fundamental ingredients — the constitution, fundamental rights, universal adult franchise, political parties and elections — and local self-governance through the tri-level Panchayati Raj and urban bodies.'),
  c('C102.L20', SOC, 'C-102', 'Lesson 20', 'India on the Path of Progress', 'Learn about national development schemes — Swachh Bharat Abhiyan, Clean Ganga, Skill India and Digital India.'),
  // C-103 Mathematics (lesson grain)
  c('C103.L1', MATH, 'C-103', 'Module 1, Lesson 1', 'Natural and Whole Numbers', 'Understand natural and whole numbers, their properties, factors and multiples; prime and co-prime numbers; prime factorisation; and finding HCF and LCM by factorisation and division, and the divisibility rules.'),
  c('C103.L2', MATH, 'C-103', 'Module 1, Lesson 2', 'Whole Numbers', 'Plot whole numbers on the number line, add and subtract on it, and understand the properties and operations of whole numbers.'),
  c('C103.L3', MATH, 'C-103', 'Module 1, Lesson 3', 'Squares and Square Roots, Cubes and Cube Roots', 'Understand squares and square roots and cubes and cube roots, and find them by prime factorisation and the division method.'),
  c('C103.L4', MATH, 'C-103', 'Module 2, Lesson 4', 'Introduction to Algebra', 'Understand variables and constants, algebraic terms, and the addition, subtraction and multiplication of algebraic expressions.'),
  c('C103.L5', MATH, 'C-103', 'Module 2, Lesson 5', 'Algebraic Expressions and Operations', 'Understand algebraic expressions, their types and value, and their addition, subtraction, multiplication and division.'),
  c('C103.L6', MATH, 'C-103', 'Module 2, Lesson 6', 'Linear Equations in One Variable', 'Understand and solve linear equations in one variable.'),
  c('C103.L7', MATH, 'C-103', 'Module 3, Lesson 7', 'Ratio and Proportion', 'Understand ratio, proportion and its types, the unitary method, and problems of time and work and time and distance.'),
  c('C103.L8', MATH, 'C-103', 'Module 3, Lesson 8', 'Percentage and its Applications', 'Understand percentage as a fraction, convert between them, and solve problems of profit and loss and discount.'),
  c('C103.L9', MATH, 'C-103', 'Module 3, Lesson 9', 'Simple and Compound Interest', 'Understand and calculate simple interest and compound interest and the difference between them.'),
  c('C103.L10', MATH, 'C-103', 'Module 4, Lesson 10', 'Fundamental Concepts of Geometry', 'Understand points, lines and surfaces, line segments and rays, open and closed figures, and the use of geometrical instruments.'),
  c('C103.L11', MATH, 'C-103', 'Module 4, Lesson 11', 'Angles and Parallel Lines', 'Understand angles and their measurement, draw angles of given measures, and understand parallel and perpendicular lines.'),
  c('C103.L12', MATH, 'C-103', 'Module 4, Lesson 12', 'Triangles and their Types', 'Understand triangles and their parts, the angle-sum property, types of triangle, and the Pythagoras theorem for right-angled triangles.'),
  c('C103.L13', MATH, 'C-103', 'Module 4, Lesson 13', 'Quadrilaterals and their Types', 'Understand quadrilaterals and their parts, the angle sum, and the trapezium, rectangle, square and rhombus.'),
  c('C103.L14', MATH, 'C-103', 'Module 4, Lesson 14', 'Circle', 'Understand the parts of a circle, draw a circle, and understand chords and the angle in a semicircle.'),
  c('C103.L15', MATH, 'C-103', 'Module 4, Lesson 15', 'Congruent and Similar Figures', 'Understand congruence and the SSS, SAS, ASA and RHS rules, and the concept of similarity.'),
  c('C103.L16', MATH, 'C-103', 'Module 5, Lesson 16', 'Area of Plane Figures', 'Find the area of triangles, rectangles, squares, parallelograms and trapeziums, and the circumference and area of a circle.'),
  c('C103.L17', MATH, 'C-103', 'Module 5, Lesson 17', 'Volume of Solids', 'Understand the dimensions of cubes and cuboids and find their surface area and volume.'),
  c('C103.L18', MATH, 'C-103', 'Module 5, Lesson 18', 'Introduction to Statistics', 'Collect, present and classify data; and read, draw and interpret bar graphs and pie charts.'),
  c('C103.L19', MATH, 'C-103', 'Module 6, Lesson 19', 'Introduction to Vedic Mathematics', 'Understand the importance, formulae (sutras) and meaning of Vedic mathematics, including vinculum numbers and formulae for addition and subtraction.'),
  c('C103.L20', MATH, 'C-103', 'Module 6, Lesson 20', 'Applications of Vedic Mathematics', 'Apply Vedic mathematics sutras — such as Ekanyunena Purvena, Ekadhikena, Nikhilam and Urdhva-Tiryagbhyam — for rapid multiplication and squaring.'),
  // C-104 Basic Computer Skills (lesson grain)
  c('C104.L1', COMP, 'C-104', 'Lesson 1', 'Revision', 'Revise the computer, operating system, word processing, spreadsheet, presentation, computer security, internet and email.'),
  c('C104.L2', COMP, 'C-104', 'Lesson 2', 'Word Processing', 'Use tabs and indentation, page setup, print preview, printing and word art to make documents orderly and attractive.'),
  c('C104.L3', COMP, 'C-104', 'Lesson 3', 'Spreadsheet', 'Insert and use types of charts, and basic formulae and functions in a spreadsheet.'),
  c('C104.L4', COMP, 'C-104', 'Lesson 4', 'Presentation', 'Make presentations using templates, insert audio and video clips, and use slide transitions and animation.'),
  c('C104.L5', COMP, 'C-104', 'Lesson 5', 'Computer Network', 'Understand computer networks, their uses and types, network tools and connections.'),
  c('C104.L6', COMP, 'C-104', 'Lesson 6', 'Internet', 'Understand the internet and its benefits — categories of websites, video conferencing, social networking, e-governance, e-commerce, chatting and instant messaging.'),
  c('C104.L7', COMP, 'C-104', 'Lesson 7', 'Multimedia', 'Understand the elements, scope and instruments of multimedia.'),
  c('C104.L8', COMP, 'C-104', 'Lesson 8', 'Internet Banking', 'Understand e-banking, its types and benefits, and the precautions to take while making online transactions.'),
  c('C104.L9', COMP, 'C-104', 'Lesson 9', 'Job Prospects in the Computer Sector', 'Understand the availability of jobs in the computer sector and searching for jobs using computers and the internet.'),
  // C-105 Science (lesson grain)
  c('C105.L1', SCI, 'C-105', 'Module 1: Living World', 'What is Science', 'Understand the concept of science, scientific outlook, the relation between science and technology, and the contribution of Indian scientists.'),
  c('C105.L2', SCI, 'C-105', 'Module 1: Living World', 'Living Beings and their Environment', 'Understand the characteristics of living beings, the structure of the cell, the difference between plant and animal cells, and habitats and adaptation.'),
  c('C105.L3', SCI, 'C-105', 'Module 1: Living World', 'Plant and Animal Kingdom', 'Classify plants and recognise the structure and functions of their parts; understand the diversity of animals, types of movement, and the human skeletal system.'),
  c('C105.L4', SCI, 'C-105', 'Module 1: Living World', 'Life Processes I: Respiration, Circulation & Excretion', 'Understand respiration, the circulatory system and blood, and the excretory system in humans and other organisms and in plants.'),
  c('C105.L5', SCI, 'C-105', 'Module 1: Living World', 'Life Processes II: Reproduction', 'Understand asexual and sexual reproduction, reproduction in humans, heredity, and reproduction in plants.'),
  c('C105.L6', SCI, 'C-105', 'Module 2: Matter', 'Types of Matter I', 'Understand the states of matter, solubility, solutions, and methods of separating mixtures (filtration, sedimentation, distillation, crystallisation and more).'),
  c('C105.L7', SCI, 'C-105', 'Module 2: Matter', 'Types of Matter II', 'Understand metals and non-metals, their physical properties and reactions.'),
  c('C105.L8', SCI, 'C-105', 'Module 2: Matter', 'How Things Change', 'Understand physical and chemical changes, types of chemical reaction, and acids and bases and their indicators.'),
  c('C105.L9', SCI, 'C-105', 'Module 2: Matter', 'Fibres and Clothes', 'Understand natural and artificial fibres, their sources (cotton, wool, silk, synthetics) and their properties and uses.'),
  c('C105.L10', SCI, 'C-105', 'Module 2: Matter', 'Heat', 'Understand heat, the thermometer, the transfer of heat by conduction, convection and radiation, and combustion and fuels.'),
  c('C105.L11', SCI, 'C-105', 'Module 3: Food', 'Nourishment for Plants and Animals', 'Understand autotrophic and heterotrophic nutrition, photosynthesis, the modes of heterotrophic nutrition, and human digestion.'),
  c('C105.L12', SCI, 'C-105', 'Module 3: Food', 'Microorganisms', 'Understand the types of microorganisms, beneficial and harmful microorganisms, the nitrogen cycle, and diseases they cause.'),
  c('C105.L13', SCI, 'C-105', 'Module 3: Food', 'Crop Cultivation', 'Understand the types of crops and the stages of cultivation — preparing soil, sowing, fertilising, irrigation, weeding, harvesting and storage.'),
  c('C105.L14', SCI, 'C-105', 'Module 4: How Things Work', 'Magnetism, Electric Current and Circuits', 'Understand magnets and their properties, electric circuits, conductors and insulators, and the magnetic effect of electricity.'),
  c('C105.L15', SCI, 'C-105', 'Module 5: Objects in Motion', 'Objects in Motion, Pressure and Friction', 'Understand motion, force, pressure and atmospheric pressure, and the factors affecting friction and its benefits and harms.'),
  c('C105.L16', SCI, 'C-105', 'Module 5: Objects in Motion', 'Sound', 'Understand how sound is produced by vibration, how it travels through different media, and noise pollution and its control.'),
  c('C105.L17', SCI, 'C-105', 'Module 6: Natural Phenomena', 'Light', 'Understand the propagation of light; transparent, translucent and opaque objects; reflection and images; lenses; and the structure and defects of the eye.'),
  c('C105.L18', SCI, 'C-105', 'Module 6: Natural Phenomena', 'Natural Phenomena and Disaster Management', 'Understand natural phenomena and calamities and their management.'),
  c('C105.L19', SCI, 'C-105', 'Module 7: Natural Resources', 'Natural Resources I: Physical', 'Understand physical resources — air, water, soil, coal and petroleum; the water cycle; air and water pollution and its control; rainwater harvesting; and the formation and judicious use of fossil fuels.'),
  c('C105.L20', SCI, 'C-105', 'Module 7: Natural Resources', 'Natural Resources II: Biological', 'Understand the importance of forests, flora and fauna, biodiversity, and the conservation of forests and biodiversity.'),
  c('C105.L21', SCI, 'C-105', 'Module 7: Natural Resources', 'Waste Management and Swachh Bharat', 'Understand waste and its harmful accumulation, the process of waste management (reduce, recycle, reuse), sewage management, and the Swachh Bharat (Clean India) drive.'),
];

const bCurriculum = {
  slug: 'nios-obe-b', country: 'IN', name: "NIOS Open Basic Education (Adult) — Level 'B'",
  version: '2023', sourceUrl: 'https://nios.ac.in/media/documents/Bleveleng.pdf',
  textIncluded: true,
  license: 'NIOS Copyright Statement — reproduction permitted with prominent acknowledgment; see PROVENANCE.md',
  topicCount: bStandards.length, topics: bStandards,
};
const cCurriculum = {
  slug: 'nios-obe-c', country: 'IN', name: "NIOS Open Basic Education (Adult) — Level 'C'",
  version: '2023', sourceUrl: 'https://nios.ac.in/media/documents/Cleveleng.pdf',
  textIncluded: true,
  license: 'NIOS Copyright Statement — reproduction permitted with prominent acknowledgment; see PROVENANCE.md',
  topicCount: cStandards.length, topics: cStandards,
};

// ---------------------------------------------------------------------------
// New micro-topics (authored). `_slug` drives the stable id + edge references.
// ---------------------------------------------------------------------------
const HIST = 'History', SS = 'Social Studies', SCIENCE = 'Science', MATHS = 'Mathematics', COMPUTING = 'Computing';
const T = (o) => o; // identity, for readability
const newTopics = [
  // ===== History / Ancient India =====
  T({ _slug: 'india-indus-valley', type: 'CONCEPTUAL', subject: HIST, domain: 'Ancient India', name: 'The Indus Valley Civilisation',
    description: 'Understand that one of the world’s earliest cities grew up along the Indus and Saraswati rivers over 4,000 years ago — with planned streets, drains, granaries and trade at cities like Harappa and Mohenjo-daro.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Locate the Indus Valley Civilisation in time and place', 'Describe features of its planned cities (drainage, brick houses, the Great Bath)', 'Explain what artefacts and seals tell us about its trade and daily life'],
    assessmentPrompt: 'Can {{name}} describe the Indus Valley cities — their planned streets and drains — and explain how we know about a civilisation with no readable writing?',
    standards: ['nios-obe-c:C102.L1'] }),
  T({ _slug: 'india-vedic-age', type: 'CONCEPTUAL', subject: HIST, domain: 'Ancient India', name: 'The Vedic Age',
    description: 'Understand the Vedic age that followed — when the Vedas were composed, and the society, economy and beliefs of the period reflected in the great epics, the Ramayana and Mahabharata.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain what the Vedas are and why they matter as a source', 'Describe features of Vedic society and economy', 'Recognise the Ramayana and Mahabharata as texts of this period'],
    assessmentPrompt: 'Can {{name}} explain what the Vedas are and describe what life was like in the Vedic age?',
    standards: ['nios-obe-c:C102.L2'] }),
  T({ _slug: 'india-maurya-empire', type: 'CONCEPTUAL', subject: HIST, domain: 'Ancient India', name: 'The Maurya Empire and Ashoka',
    description: 'Understand how the Maurya Empire, growing from the mahajanapadas and the Nanda dynasty, united much of the subcontinent — and how the emperor Ashoka, after the Kalinga war, spread a message of peace and non-violence.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain how the Maurya Empire rose to power', 'Describe Ashoka’s change of heart after Kalinga and his policy of peace', 'Recognise Ashoka’s pillars and edicts as historical sources'],
    assessmentPrompt: 'Can {{name}} tell the story of Ashoka — how a powerful emperor turned to peace after a terrible war — and why the Maurya Empire mattered?',
    standards: ['nios-obe-c:C102.L3'] }),
  T({ _slug: 'india-gupta-age', type: 'CONCEPTUAL', subject: HIST, domain: 'Ancient India', name: 'The Gupta Age',
    description: 'Understand the Gupta age and the reign of Harshavardhana — often called a golden age for its achievements in art, science, mathematics and learning — and place Kanishka in the same broad era.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain why the Gupta age is called a golden age', 'Give examples of achievements in science, mathematics or art', 'Place the Guptas and Harshavardhana in the sweep of Indian history'],
    assessmentPrompt: 'Can {{name}} explain why the Gupta age is remembered as a golden age and give an example of what was achieved then?',
    standards: ['nios-obe-c:C102.L4'] }),
  T({ _slug: 'india-south-kingdoms', type: 'CONCEPTUAL', subject: HIST, domain: 'Ancient India', name: 'Kingdoms of Southern India',
    description: 'Understand that powerful kingdoms flourished in the south of the subcontinent — the Cholas, Cheras and Pandyas — known for temple building, trade across the seas, and rich literature.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Name the Chola, Chera and Pandya kingdoms and locate them in the south', 'Describe an achievement such as sea trade or temple building', 'Recognise that Indian history includes powerful southern kingdoms, not only northern empires'],
    assessmentPrompt: 'Can {{name}} name some kingdoms of southern India and describe what they were known for, like trade or temples?',
    standards: ['nios-obe-c:C102.L4'] }),
  // ===== History / Medieval India =====
  T({ _slug: 'india-delhi-sultanate', type: 'CONCEPTUAL', subject: HIST, domain: 'Medieval India', name: 'The Delhi Sultanate',
    description: 'Understand how, after the arrival of Arab and Turkish rulers, the Delhi Sultanate governed much of northern India — introducing new systems of administration, agriculture, markets, art and architecture.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain how the Delhi Sultanate came to power', 'Describe a reform or feature of its rule (markets, administration, architecture)', 'Place the Sultanate between the ancient kingdoms and the Mughals'],
    assessmentPrompt: 'Can {{name}} explain what the Delhi Sultanate was and describe one way it changed how northern India was governed?',
    standards: ['nios-obe-c:C102.L5'] }),
  T({ _slug: 'india-mughal-empire', type: 'CONCEPTUAL', subject: HIST, domain: 'Medieval India', name: 'The Mughal Empire',
    description: 'Understand the Mughal Empire — its founding, its powerful emperors, and its lasting achievements in administration, art, architecture (like the Taj Mahal) and culture — including Akbar’s policies of tolerance.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain how the Mughal Empire was founded and grew', 'Give examples of Mughal achievements in art and architecture', "Describe Akbar’s policy of religious tolerance"],
    assessmentPrompt: 'Can {{name}} describe the Mughal Empire — a famous building it left behind, and why a ruler like Akbar is remembered?',
    standards: ['nios-obe-c:C102.L6'] }),
  T({ _slug: 'india-marathas-rajputs', type: 'CONCEPTUAL', subject: HIST, domain: 'Medieval India', name: 'The Marathas and the Rajputs',
    description: 'Understand the Maratha Empire and the Rajput kingdoms — their rise, their relationships (sometimes conflict, sometimes alliance) with the Mughals, and their place in the story of medieval India.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Identify the Marathas and Rajputs as powers of medieval India', 'Describe their changing relations with the Mughal Empire', 'Give an example of a Maratha or Rajput leader or achievement'],
    assessmentPrompt: 'Can {{name}} explain who the Marathas and Rajputs were and how they related to the Mughals — sometimes fighting, sometimes allying?',
    standards: ['nios-obe-c:C102.L6'] }),
  // ===== History / Modern India =====
  T({ _slug: 'india-british-rule', type: 'CONCEPTUAL', subject: HIST, domain: 'Modern India', name: 'British Rule in India',
    description: 'Understand how the British East India Company arrived to trade, gradually took political control, and how British rule reshaped India’s economy, agriculture and society — leading up to the revolt of 1857.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain how a trading company came to rule much of India', 'Describe an effect of British rule on India’s economy or society', 'Identify the 1857 revolt as a turning point'],
    assessmentPrompt: 'Can {{name}} explain how the British came to India to trade but ended up ruling it — and describe one way British rule affected ordinary people?',
    standards: ['nios-obe-b:B102.L4.1', 'nios-obe-c:C102.L7'] }),
  T({ _slug: 'india-freedom-struggle', type: 'CONCEPTUAL', subject: HIST, domain: 'Modern India', name: "India's Freedom Struggle",
    description: 'Understand the long struggle for India’s independence — the leaders and revolutionaries, the mass movements, and the ideas of freedom and self-rule that led to independence in 1947.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Name key figures of the freedom struggle and describe their contribution', 'Explain the difference between mass non-violent movements and armed revolution', 'Explain the significance of 1947'],
    assessmentPrompt: 'Can {{name}} describe how India won its freedom — naming a leader or two and explaining what they stood for?',
    standards: ['nios-obe-b:B102.L4.2', 'nios-obe-c:C102.L8'] }),
  T({ _slug: 'india-social-reform', type: 'CONCEPTUAL', subject: HIST, domain: 'Modern India', name: 'Reform and Awakening in 19th-Century India',
    description: 'Understand the social, educational and religious reform movements of 19th-century India — how reformers worked against social evils and for education, and how this awakening fed into the national movement.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what a social reform movement is', 'Give an example of a reform (against a social evil, or for education)', 'Connect the reform movements to the growth of national feeling'],
    assessmentPrompt: 'Can {{name}} explain how 19th-century reformers tried to change society for the better, and give an example?',
    standards: ['nios-obe-c:C102.L7'] }),
  // ===== Social Studies / Indian Geography =====
  T({ _slug: 'india-states-uts', type: 'CONCEPTUAL', subject: SS, domain: 'Indian Geography', name: 'States and Union Territories of India',
    description: 'Understand that India is a large country made up of many states and union territories, each with its own capital, languages and character, and locate India on the world map.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain that India is divided into states and union territories', 'Locate India on a world or Asia map', 'Name several states and their approximate locations'],
    assessmentPrompt: 'Can {{name}} explain that India is made of many states and union territories, and point to India on a world map?',
    standards: ['nios-obe-b:B102.L5.1'] }),
  T({ _slug: 'india-physical-features', type: 'CONCEPTUAL', subject: SS, domain: 'Indian Geography', name: "India's Physical Features and Climate",
    description: 'Understand India’s major physical features — the Himalayas, plains, plateaus, deserts and coasts — and how the monsoon shapes its climate and seasons.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Name major physical features of India (mountains, plains, coasts)', 'Explain what the monsoon is and why it matters', 'Relate climate and seasons to physical geography'],
    assessmentPrompt: 'Can {{name}} describe India’s main physical features — like the Himalayas and the plains — and explain what the monsoon brings?',
    standards: ['nios-obe-b:B102.L5.2', 'nios-obe-c:C102.L9'] }),
  T({ _slug: 'india-natural-resources', type: 'CONCEPTUAL', subject: SS, domain: 'Indian Geography', name: 'Natural Resources of India',
    description: 'Understand India’s natural resources — forests, water, soils, minerals and energy sources (both traditional like coal and petroleum, and non-traditional like solar and wind) — and why they must be conserved.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Name several natural resources of India', 'Distinguish traditional from non-traditional energy sources', 'Explain why resources need to be conserved'],
    assessmentPrompt: 'Can {{name}} name some of India’s natural resources and explain why they need to be used carefully and conserved?',
    standards: ['nios-obe-b:B102.L1.3', 'nios-obe-c:C102.L10'] }),
  T({ _slug: 'india-agriculture', type: 'CONCEPTUAL', subject: SS, domain: 'Indian Geography', name: 'Agriculture in India',
    description: 'Understand farming in India — the main food and cash crops, the Rabi, Kharif and Zaid growing seasons, the stages of cultivation from sowing to harvest, and the factors (like rainfall) that affect a harvest.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Name major Indian crops and classify some as food or cash crops', 'Explain the Rabi, Kharif and Zaid seasons', 'Describe the main stages of growing a crop'],
    assessmentPrompt: 'Can {{name}} explain how crops are grown in India across the seasons — and name some of the main crops?',
    standards: ['nios-obe-b:B102.L5.3', 'nios-obe-b:B102.L8.1', 'nios-obe-b:B102.L8.2', 'nios-obe-b:B102.L8.3', 'nios-obe-c:C102.L11'] }),
  T({ _slug: 'india-industries', type: 'CONCEPTUAL', subject: SS, domain: 'Indian Geography', name: 'Industries in India',
    description: 'Understand what industries are and their types — from cottage and small-scale to heavy industry — and how industry in India has developed from ancient crafts to the modern day.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain what an industry is and give types (cottage, small-scale, heavy)', 'Give an example of an Indian industry', 'Describe how industry has changed over time'],
    assessmentPrompt: 'Can {{name}} explain what industries are, give different types, and describe how they turn raw materials into useful goods?',
    standards: ['nios-obe-c:C102.L12'] }),
  // ===== Social Studies / Governance & Constitution =====
  T({ _slug: 'india-democracy-government', type: 'CONCEPTUAL', subject: SS, domain: 'Governance & Constitution', name: 'Indian Democracy and Government',
    description: 'Understand that India is a democracy governed by the people’s representatives, and that government has three parts — the legislature that makes laws, the executive that carries them out, and the judiciary that interprets them.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain what democracy means', 'Name the three organs of government and what each does', 'Explain why power is divided between them'],
    assessmentPrompt: 'Can {{name}} explain that India is a democracy and name the three parts of government — one that makes laws, one that carries them out, one that judges?',
    standards: ['nios-obe-b:B102.L6.1', 'nios-obe-c:C102.L16', 'nios-obe-c:C102.L17', 'nios-obe-c:C102.L18'] }),
  T({ _slug: 'india-constitution', type: 'CONCEPTUAL', subject: SS, domain: 'Governance & Constitution', name: 'The Constitution of India: Rights and Duties',
    description: 'Understand that the Constitution is the highest set of rules for the country, that it grants citizens fundamental rights (like equality and freedom) and sets out fundamental duties, and how these shape everyday life.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what a constitution is and why a country needs one', 'Name a few fundamental rights of Indian citizens', 'Give an example of a fundamental duty'],
    assessmentPrompt: 'Can {{name}} explain what the Constitution is, and name a right it gives citizens and a duty it asks of them?',
    standards: ['nios-obe-c:C102.L17'] }),
  T({ _slug: 'india-local-government', type: 'CONCEPTUAL', subject: SS, domain: 'Governance & Constitution', name: 'Local Self-Government: Panchayati Raj',
    description: 'Understand how India governs itself locally — the tri-level Panchayati Raj system in villages (gram, block and district panchayats) and municipal bodies in towns and cities — and how these bring decisions close to people.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain what local self-government is', 'Describe the three levels of the Panchayati Raj system', 'Explain how local government differs from state and national government'],
    assessmentPrompt: 'Can {{name}} explain how a village or town runs its own local affairs through panchayats or municipal councils?',
    standards: ['nios-obe-b:B102.L6.2', 'nios-obe-b:B102.L6.3', 'nios-obe-c:C102.L19'] }),
  T({ _slug: 'india-elections-voting', type: 'CONCEPTUAL', subject: SS, domain: 'Governance & Constitution', name: 'Elections and the Right to Vote',
    description: 'Understand how democracy works through elections — universal adult franchise (every adult’s equal vote), political parties, and why voting is both a right and a responsibility that keeps democracy strong.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what an election is and what universal adult franchise means', 'Explain why every vote counts equally', 'Explain why voting is a responsibility, not only a right'],
    assessmentPrompt: 'Can {{name}} explain how elections let people choose their government, and why every adult’s single vote matters?',
    standards: ['nios-obe-c:C102.L19'] }),
  // ===== Social Studies / Society & Development =====
  T({ _slug: 'india-unity-diversity', type: 'CONCEPTUAL', subject: SS, domain: 'Society & Development', name: 'Unity in Diversity',
    description: 'Understand that India is home to many languages, religions, cultures and traditions, that this diversity is a strength, and that shared values and a shared nation bind people together — as leaders like Ashoka and Akbar recognised.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Give examples of India’s linguistic, religious and cultural diversity', 'Explain what unites people across this diversity', 'Explain why respecting differences keeps a society peaceful'],
    assessmentPrompt: 'Can {{name}} explain how India can have so many languages and cultures and still be one country — and why that diversity is a strength?',
    standards: ['nios-obe-b:B102.L1.1', 'nios-obe-b:B102.L2.1', 'nios-obe-b:B102.L2.2', 'nios-obe-b:B102.L2.3', 'nios-obe-b:B102.L2.4'] }),
  T({ _slug: 'india-social-equality', type: 'CONCEPTUAL', subject: SS, domain: 'Society & Development', name: 'Gender Equality and Social Reform',
    description: 'Understand that a fair society treats girls and boys, women and men as equals — that education for all (including girls) matters, and that harmful practices like the dowry system are wrong and against the law.',
    ageRangeStart: 10, ageRangeEnd: 12,
    evidence: ['Explain what gender equality means and why it is fair', 'Explain why educating girls matters', 'Recognise that harmful social practices like dowry are wrong and illegal'],
    assessmentPrompt: 'Can {{name}} explain why girls and boys deserve equal chances — in education and in life — and that harmful old customs like dowry are against the law?',
    standards: ['nios-obe-b:B102.L3.1', 'nios-obe-b:B102.L3.2', 'nios-obe-b:B102.L3.3', 'nios-obe-b:B102.L3.4'] }),
  T({ _slug: 'india-population', type: 'CONCEPTUAL', subject: SS, domain: 'Society & Development', name: 'Population and Its Challenges',
    description: 'Understand what population growth means for a country — its social and economic effects — and the ideas of birth rate, death rate and sex ratio, and why a balanced, healthy population matters.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what population growth is', 'Describe an effect of rapid population growth on resources or services', 'Explain birth rate, death rate and sex ratio in simple terms'],
    assessmentPrompt: 'Can {{name}} explain why a country’s population size matters — how fast growth can strain resources like schools, water and jobs?',
    standards: ['nios-obe-c:C102.L14'] }),
  T({ _slug: 'india-development-schemes', type: 'CONCEPTUAL', subject: SS, domain: 'Society & Development', name: 'National Development Schemes',
    description: 'Understand major national schemes that aim to improve life for all — Swachh Bharat (Clean India), Clean Ganga, Skill India and Digital India — what each aims to do, and the role every citizen plays.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Name national development schemes and what each aims to achieve', 'Explain why cleanliness, skills or digital access help a country develop', 'Describe how an individual can contribute to such a scheme'],
    assessmentPrompt: 'Can {{name}} name a national scheme like Swachh Bharat or Digital India, explain its goal, and say how an ordinary person can help?',
    standards: ['nios-obe-c:C102.L20'] }),
  // ===== Science gaps =====
  T({ _slug: 'kidneys-excretion', type: 'CONCEPTUAL', subject: SCIENCE, domain: 'The Human Body', name: 'Kidneys and Excretion',
    description: 'Understand that the body must remove the waste made by its cells, and that the kidneys filter the blood to make urine — the excretory system that keeps the body clean inside.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain why the body needs to remove waste', 'Describe what the kidneys do (filter blood, make urine)', 'Name the main parts of the excretory system'],
    assessmentPrompt: 'Can {{name}} explain what the kidneys do — cleaning the blood and removing waste as urine — and why that matters?',
    standards: ['nios-obe-b:B102.L13.6', 'nios-obe-c:C105.L4'] }),
  T({ _slug: 'communicable-diseases', type: 'CONCEPTUAL', subject: SCIENCE, domain: 'The Human Body', name: 'Communicable and Non-Communicable Diseases',
    description: 'Understand the difference between communicable diseases that spread from person to person (like the cold, malaria or tuberculosis) and non-communicable diseases that do not (like diabetes or heart disease), and how good habits and vaccination help prevent illness.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Distinguish communicable from non-communicable diseases with examples', 'Explain how communicable diseases spread', 'Describe ways to prevent disease (hygiene, vaccination, avoiding harmful substances)'],
    assessmentPrompt: 'Can {{name}} explain the difference between a disease that spreads from person to person and one that does not — and name ways to stay healthy?',
    standards: ['nios-obe-b:B102.L12.1', 'nios-obe-b:B102.L14.1', 'nios-obe-b:B102.L14.2', 'nios-obe-b:B102.L14.3', 'nios-obe-b:B102.L14.4'] }),
  T({ _slug: 'fibres-and-fabrics', type: 'CONCEPTUAL', subject: SCIENCE, domain: 'Matter & Materials', name: 'Fibres and Fabrics',
    description: 'Understand that cloth is made from fibres — some natural, from plants (cotton, jute) and animals (wool, silk), and some synthetic (nylon, polyester) — and that different fibres suit different uses.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Sort fibres into natural and synthetic', 'Match a natural fibre to its plant or animal source (cotton, wool, silk)', 'Explain why a fibre’s properties make it suitable for a particular use'],
    assessmentPrompt: 'Can {{name}} explain that cloth is made from fibres — some from plants or animals like cotton and wool, some made in factories — and match a fibre to where it comes from?',
    standards: ['nios-obe-c:C105.L9'] }),
  T({ _slug: 'waste-management', type: 'CONCEPTUAL', subject: SCIENCE, domain: 'Ecosystems & Habitats', name: 'Waste and Its Management',
    description: 'Understand that we produce different kinds of waste, that biodegradable and non-biodegradable waste should be separated, and that reducing, reusing and recycling — the aim of drives like Swachh Bharat — keeps the environment clean.',
    ageRangeStart: 7, ageRangeEnd: 9,
    evidence: ['Sort waste into biodegradable and non-biodegradable', 'Explain the idea of reduce, reuse and recycle', 'Explain why separating and managing waste protects the environment'],
    assessmentPrompt: 'Can {{name}} sort waste into what will rot away and what will not, and explain how reducing, reusing and recycling keep our surroundings clean?',
    standards: ['nios-obe-b:B102.L15.1', 'nios-obe-b:B102.L15.2', 'nios-obe-b:B102.L15.3', 'nios-obe-c:C105.L21'] }),
  // ===== Mathematics gaps =====
  T({ _slug: 'hcf-and-lcm', type: 'PROCEDURAL', subject: MATHS, domain: 'Multiplication & Division', name: 'HCF and LCM',
    description: 'Find the highest common factor (HCF) and lowest common multiple (LCM) of numbers — by listing factors and multiples and by prime factorisation — and use them to solve problems.',
    ageRangeStart: 10, ageRangeEnd: 11,
    evidence: ['Find the HCF of two numbers by listing factors and by prime factorisation', 'Find the LCM of two numbers', 'Use HCF or LCM to solve a word problem'],
    assessmentPrompt: 'Can {{name}} find the highest common factor and lowest common multiple of two numbers, and use them to solve a problem?',
    standards: ['nios-obe-c:C103.L1'] }),
  T({ _slug: 'square-cube-roots', type: 'PROCEDURAL', subject: MATHS, domain: 'Number Representation & Place Value', name: 'Square Roots and Cube Roots',
    description: 'Understand square roots and cube roots as the inverse of squaring and cubing, and find them for perfect squares and cubes using prime factorisation and the division method.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain a square root and cube root as inverse operations', 'Find the square root of a perfect square by prime factorisation', 'Find the cube root of a perfect cube'],
    assessmentPrompt: 'Can {{name}} explain what a square root is and find the square root of a perfect square like 144?',
    standards: ['nios-obe-c:C103.L3'] }),
  T({ _slug: 'simple-compound-interest', type: 'PROCEDURAL', subject: MATHS, domain: 'Ratio & Proportion', name: 'Simple and Compound Interest',
    description: 'Understand interest as the cost of borrowing or the reward for saving money, calculate simple interest, and understand how compound interest differs by adding interest onto interest.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what interest is in everyday terms', 'Calculate simple interest given principal, rate and time', 'Explain the difference between simple and compound interest'],
    assessmentPrompt: 'Can {{name}} work out the simple interest on a sum of money, and explain how compound interest is different?',
    standards: ['nios-obe-c:C103.L9'] }),
  T({ _slug: 'vedic-mathematics', type: 'PROCEDURAL', subject: MATHS, domain: 'Mathematical Thinking', name: 'Vedic Mathematics',
    description: 'Understand Vedic mathematics as a system of quick mental-calculation methods based on short rules (sutras) — such as methods for fast multiplication and squaring — an Indian mathematical tradition.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what Vedic mathematics is and that it uses short rules (sutras)', 'Apply a Vedic sutra to multiply or square numbers quickly', 'Check a Vedic-method answer against the ordinary method'],
    assessmentPrompt: 'Can {{name}} use a Vedic maths shortcut to multiply or square numbers quickly, and check that it gives the same answer as the usual method?',
    standards: ['nios-obe-c:C103.L19', 'nios-obe-c:C103.L20'] }),
  T({ _slug: 'pie-charts', type: 'REPRESENTATIONAL', subject: MATHS, domain: 'Data & Statistics', name: 'Pie Charts',
    description: 'Read and draw pie charts — circular graphs where each slice shows a part of the whole — and understand when a pie chart is a good way to show data.',
    ageRangeStart: 10, ageRangeEnd: 11,
    evidence: ['Read information from a pie chart', 'Explain that the whole circle represents the total and each slice a part', 'Choose a pie chart as an appropriate display for part-of-whole data'],
    assessmentPrompt: 'Can {{name}} read a pie chart — understanding that the whole circle is the total and each slice is a part of it?',
    standards: ['nios-obe-c:C103.L18'] }),
  // ===== Computing / Computer Basics (intermediate) =====
  T({ _slug: 'spreadsheets-basics', type: 'PROCEDURAL', subject: COMPUTING, domain: 'Computer Basics', name: 'Working with Spreadsheets',
    description: 'Use a spreadsheet to enter data into rows and columns, use simple formulae and functions to calculate, and make charts from the data.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Enter and correct data in a spreadsheet’s rows and columns', 'Use a simple formula or function to calculate a result', 'Make a chart from spreadsheet data'],
    assessmentPrompt: 'Can {{name}} put numbers into a spreadsheet and use a formula to add them up automatically?',
    standards: ['nios-obe-b:B104.L3', 'nios-obe-c:C104.L3'] }),
  T({ _slug: 'making-presentations', type: 'PROCEDURAL', subject: COMPUTING, domain: 'Computer Basics', name: 'Making Presentations',
    description: 'Make a slide presentation — adding text, pictures and charts, formatting slides, sequencing them, and using templates, transitions and simple animation.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Create slides with text and images', 'Order slides into a sensible sequence', 'Apply a template, transition or animation'],
    assessmentPrompt: 'Can {{name}} make a short slideshow with text and pictures, arranged in a sensible order?',
    standards: ['nios-obe-b:B104.L4', 'nios-obe-c:C104.L4'] }),
  T({ _slug: 'the-internet', type: 'CONCEPTUAL', subject: COMPUTING, domain: 'Computer Basics', name: 'The Internet and the Web',
    description: 'Understand that the internet connects computers around the world, that the World Wide Web is made of websites and webpages, and how to connect, open websites and find information.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain in simple terms what the internet and the web are', 'Open a website and find information on it', 'Distinguish a website from a webpage'],
    assessmentPrompt: 'Can {{name}} explain what the internet is, and open a website to look something up?',
    standards: ['nios-obe-b:B104.L5', 'nios-obe-c:C104.L6'] }),
  T({ _slug: 'email-basics', type: 'PROCEDURAL', subject: COMPUTING, domain: 'Computer Basics', name: 'Sending Email',
    description: 'Understand what email is and how an email address works, and send and receive messages — including attaching a file — understanding how email differs from ordinary post.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain what an email address is', 'Send an email message and attach a file', 'Explain how email differs from ordinary post'],
    assessmentPrompt: 'Can {{name}} explain how an email address works and send a message with a file attached?',
    standards: ['nios-obe-b:B104.L7'] }),
  T({ _slug: 'online-safety-security', type: 'CONCEPTUAL', subject: COMPUTING, domain: 'Computer Basics', name: 'Online Safety and Computer Security',
    description: 'Understand why computers and internet use need protection — making and keeping strong passwords, recognising the danger of computer viruses, and taking simple steps to stay safe online.',
    ageRangeStart: 9, ageRangeEnd: 11,
    evidence: ['Explain why passwords should be strong and kept private', 'Explain what a computer virus is and how to reduce the risk', 'Describe a simple habit for staying safe online'],
    assessmentPrompt: 'Can {{name}} explain why a strong, private password matters and what a computer virus is?',
    standards: ['nios-obe-b:B104.L6'] }),
  T({ _slug: 'computer-networks', type: 'CONCEPTUAL', subject: COMPUTING, domain: 'Computer Basics', name: 'Computer Networks',
    description: 'Understand that a network connects computers so they can share information and resources, the main types of network, and the tools and connections that link them — the idea behind the internet itself.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Explain what a computer network is and why it is useful', 'Name types of network (e.g. local and wide-area)', 'Explain that the internet is a very large network of networks'],
    assessmentPrompt: 'Can {{name}} explain what a computer network is and why connecting computers together is useful?',
    standards: ['nios-obe-c:C104.L5'] }),
  T({ _slug: 'multimedia-basics', type: 'CONCEPTUAL', subject: COMPUTING, domain: 'Computer Basics', name: 'Multimedia',
    description: 'Understand multimedia as the combination of text, images, sound, animation and video, where it is used (education, entertainment, marketing), and the devices that play it.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['List the elements of multimedia', 'Give examples of where multimedia is used', 'Name devices used to play or create multimedia'],
    assessmentPrompt: 'Can {{name}} explain what multimedia is — combining text, sound, pictures and video — and give an example of where it’s used?',
    standards: ['nios-obe-c:C104.L7'] }),
  T({ _slug: 'internet-services', type: 'CONCEPTUAL', subject: COMPUTING, domain: 'Computer Basics', name: 'Online Services: Banking and E-commerce',
    description: 'Understand everyday online services — internet banking, e-commerce, e-governance, video conferencing and social networking — their benefits, and the precautions needed to use them safely.',
    ageRangeStart: 11, ageRangeEnd: 13,
    evidence: ['Give examples of online services (banking, shopping, government services)', 'Explain a benefit of an online service', 'Describe a precaution for using online banking or shopping safely'],
    assessmentPrompt: 'Can {{name}} explain how services like online banking or shopping work, and name a precaution for using them safely?',
    standards: ['nios-obe-c:C104.L6', 'nios-obe-c:C104.L8'] }),
];

// ---------------------------------------------------------------------------
// Alignment — existing topic id → standard codes it already teaches.
// ---------------------------------------------------------------------------
const alignments = Object.fromEntries([
  // --- B-103 Mathematics ---
  ['mt_XNmGwNggdU', ['nios-obe-b:B103.L1']], ['mt_Gag_h98jWP', ['nios-obe-b:B103.L1']], ['mt_Ac7oMWhyPw', ['nios-obe-b:B103.L1']],
  ['mt_M1tnXqmYbn', ['nios-obe-b:B103.L2']], ['mt_wPgpMJ0-PA', ['nios-obe-b:B103.L2']], ['mt_LlMl2PbaZe', ['nios-obe-b:B103.L2']],
  ['mt_gNUE4B3vuk', ['nios-obe-b:B103.L3']], ['mt_b7T-CjOYUR', ['nios-obe-b:B103.L3']], ['mt_SBkTGjiZjZ', ['nios-obe-b:B103.L3']],
  ['mt__casygEB85', ['nios-obe-b:B103.L4']], ['mt_4K1dr204Hi', ['nios-obe-b:B103.L4']], ['mt_W17Kbwm0-u', ['nios-obe-b:B103.L4', 'nios-obe-c:C103.L8']],
  ['mt_SqhXQhAEUf', ['nios-obe-b:B103.L5']], ['mt_2VpdPjvewx', ['nios-obe-b:B103.L5']],
  ['mt_ML5t7n2-U8', ['nios-obe-b:B103.L6', 'nios-obe-c:C103.L16']], ['mt_svFa6_mjO_', ['nios-obe-b:B103.L6', 'nios-obe-c:C103.L16']],
  ['mt_hdrMoiTgqu', ['nios-obe-b:B103.L7']], ['mt_Jf8xcX4UTq', ['nios-obe-b:B103.L7', 'nios-obe-c:C103.L11']], ['mt_xq3YHZ2zeR', ['nios-obe-b:B103.L7', 'nios-obe-c:C103.L14']],
  ['mt_H6LlpWgEYS', ['nios-obe-b:B103.L8', 'nios-obe-c:C103.L18']], ['mt_ChjMU2GDJa', ['nios-obe-b:B103.L8', 'nios-obe-c:C103.L18']], ['mt_Cqm8iy48UI', ['nios-obe-b:B103.L8']],
  // --- B-104 / C-104 Basic Computer Skills (revision lessons link to Level A basics) ---
  ['mt_XbGfVhfiUz', ['nios-obe-b:B104.L1', 'nios-obe-c:C104.L1']],
  // --- C-103 Mathematics ---
  ['mt_FHIAv6dfhU', ['nios-obe-c:C103.L1']], ['mt_xhoOWnhtHq', ['nios-obe-c:C103.L1']], ['mt_y1XCVsIelg', ['nios-obe-c:C103.L1']],
  ['mt_hCVPYlF-7Y', ['nios-obe-c:C103.L3']],
  ['mt_KwdjWEmMNo', ['nios-obe-c:C103.L4']], ['mt_nNNVrLqPW3', ['nios-obe-c:C103.L4']],
  ['mt_FX4a2Q8XXN', ['nios-obe-c:C103.L5']], ['mt_uESbzWCZIq', ['nios-obe-c:C103.L5']],
  ['mt_QhFEDyIwSO', ['nios-obe-c:C103.L6']],
  ['mt_XWSGuFW7It', ['nios-obe-c:C103.L7']], ['mt_h0gJcSuwdL', ['nios-obe-c:C103.L7']], ['mt_5mIcmKRCgA', ['nios-obe-c:C103.L7']],
  ['mt_PNSyfH56eQ', ['nios-obe-c:C103.L8']], ['mt_ALUrJpY0cZ', ['nios-obe-c:C103.L8']],
  ['mt_QysgF57dxh', ['nios-obe-c:C103.L10']], ['mt_u23IGDxOpk', ['nios-obe-c:C103.L11']],
  ['mt_tAJH5BrpOx', ['nios-obe-c:C103.L12']], ['mt_DNYQLahbfa', ['nios-obe-c:C103.L12', 'nios-obe-c:C103.L13']],
  ['mt_1badik7iKJ', ['nios-obe-c:C103.L15']], ['mt_2OtRUM_0zW', ['nios-obe-c:C103.L15']],
  ['mt_6xNmQLzuqm', ['nios-obe-c:C103.L16']],
  ['mt_NSC3LT_-ch', ['nios-obe-c:C103.L17']],
  // --- B-102 Environmental Studies → existing Science / PSD ---
  ['mt_DkzsZdyaL2', ['nios-obe-b:B102.L2.1']],
  ['mt_oB-L8EVdIP', ['nios-obe-b:B102.L7.1']], ['mt_EygMHKs8Ed', ['nios-obe-b:B102.L7.1']], ['mt_URTJbS3hhs', ['nios-obe-b:B102.L7.2', 'nios-obe-c:C105.L20']],
  ['mt_deexfCHU9m', ['nios-obe-b:B102.L7.3']], ['mt_pWwV_8OgXD', ['nios-obe-b:B102.L7.3', 'nios-obe-c:C105.L20']], ['mt_YB0qF5KX9C', ['nios-obe-b:B102.L9.3', 'nios-obe-c:C105.L19']],
  ['mt_yhhprm7dZK', ['nios-obe-b:B102.L8.1']], ['mt_vAP_A986IQ', ['nios-obe-b:B102.L9.1']], ['mt_m6UaSmrQVG', ['nios-obe-b:B102.L9.1', 'nios-obe-b:B102.L9.2']],
  ['mt_akBotspaf2', ['nios-obe-b:B102.L10.1', 'nios-obe-b:B102.L10.3']], ['mt_w2A8D76ymp', ['nios-obe-b:B102.L10.2', 'nios-obe-b:B102.L10.4']], ['mt_VI5kdtf28e', ['nios-obe-b:B102.L10.2', 'nios-obe-c:C105.L19']],
  ['mt_5l7iGkf1Tp', ['nios-obe-b:B102.L11.1']], ['mt_33RrpbceZE', ['nios-obe-b:B102.L11.1']], ['mt_4V-vYhFUcm', ['nios-obe-b:B102.L11.2']],
  ['mt_aulwq39aj8', ['nios-obe-b:B102.L11.3']], ['mt_q15w--Fb5H', ['nios-obe-b:B102.L11.4', 'nios-obe-b:B102.L11.5']], ['mt_lFiDFPkVmH', ['nios-obe-b:B102.L11.5']],
  ['mt_NZHFcEtTyI', ['nios-obe-b:B102.L12.1']], ['mt_sDmrVCfzqt', ['nios-obe-b:B102.L12.2']], ['mt_Km5iZqQ8Vi', ['nios-obe-b:B102.L12.3']],
  ['mt_C7FNeIDGc6', ['nios-obe-b:B102.L13.1']], ['mt_K8DJzqbksM', ['nios-obe-b:B102.L13.1', 'nios-obe-c:C105.L3']],
  ['mt_OMmiuv9ZLH', ['nios-obe-b:B102.L13.2', 'nios-obe-c:C105.L3']], ['mt_6N-4TqCleR', ['nios-obe-b:B102.L13.2']],
  ['mt_JpQUM1129q', ['nios-obe-b:B102.L13.3', 'nios-obe-c:C105.L11']], ['mt_zPDDJLAl-J', ['nios-obe-b:B102.L13.4', 'nios-obe-c:C105.L4']],
  ['mt_g_M4Vh_pK7', ['nios-obe-b:B102.L13.5', 'nios-obe-c:C105.L4']], ['mt_qzbgwaUQOA', ['nios-obe-b:B102.L13.7', 'nios-obe-c:C105.L4']],
  ['mt_pu2mmK27UA', ['nios-obe-b:B102.L13.8', 'nios-obe-c:C105.L5']], ['mt_tQkCzRcWG7', ['nios-obe-b:B102.L13.8', 'nios-obe-c:C105.L5']],
  ['mt_LkOMijDvL7', ['nios-obe-b:B102.L14.4']], ['mt_1VIE8FlZvL', ['nios-obe-b:B102.L14.2', 'nios-obe-c:C105.L12']],
  // --- C-102 Social Science → existing (transport/finance) ---
  ['mt_f4c1NeL3Fv', ['nios-obe-c:C102.L13']], ['mt_0Rx1ISxXFE', ['nios-obe-c:C102.L15']], ['mt_udgPy5oAvR', ['nios-obe-c:C102.L15']],
  ['mt_cSz7XTxVAx', ['nios-obe-c:C102.L15']], ['mt_h_shhH-6DC', ['nios-obe-c:C102.L17']],
  // --- C-105 Science → existing Science ---
  ['mt_vJO5Bxk4z-', ['nios-obe-c:C105.L1']], ['mt_cM8YS6NXqi', ['nios-obe-c:C105.L2']], ['mt_LRzjbo1Fn6', ['nios-obe-c:C105.L2']],
  ['mt_VfA4xo4kUv', ['nios-obe-c:C105.L2']], ['mt_fhqBH9scsU', ['nios-obe-c:C105.L2']],
  ['mt_xT6jPzyj92', ['nios-obe-c:C105.L3']], ['mt_6xsEXxKdUX', ['nios-obe-c:C105.L3']], ['mt_IY3KwGLZgk', ['nios-obe-c:C105.L3']],
  ['mt_zM5vu31jgl', ['nios-obe-c:C105.L11']],
  ['mt_g9RcQOhU5d', ['nios-obe-c:C105.L12']],
  ['mt_YQkUdIHO8L', ['nios-obe-c:C105.L6']], ['mt_Mf-T-fYRLX', ['nios-obe-c:C105.L6']], ['mt_2b6CB0w3Yx', ['nios-obe-c:C105.L6']], ['mt_U_tJvy3cbB', ['nios-obe-c:C105.L6']],
  ['mt_Sc_SorJhXW', ['nios-obe-c:C105.L7']], ['mt_1hgck6ucII', ['nios-obe-c:C105.L8']], ['mt_AN2kJE6I0s', ['nios-obe-c:C105.L8']], ['mt_v0K6GRi4ZL', ['nios-obe-c:C105.L8']],
  ['mt_PrWc-HZzDl', ['nios-obe-c:C105.L10']], ['mt_ySnOkVIu22', ['nios-obe-c:C105.L10']], ['mt_Pl-nsjYGZ3', ['nios-obe-c:C105.L10']],
  ['mt_DA7-JYRvtP', ['nios-obe-c:C105.L14']], ['mt_d-EKO-pKkP', ['nios-obe-c:C105.L14']], ['mt_jgNB2752b9', ['nios-obe-c:C105.L14']], ['mt_9NvuqZKNiV', ['nios-obe-c:C105.L14']],
  ['mt_lcf8lx-LkZ', ['nios-obe-c:C105.L15']], ['mt_-p_xp4hMvh', ['nios-obe-c:C105.L15']], ['mt_fkwcCB5px7', ['nios-obe-c:C105.L15']],
  ['mt_VBl1T1sFCM', ['nios-obe-c:C105.L16']], ['mt_DQk9oDE7gr', ['nios-obe-c:C105.L16']],
  ['mt_gLy3ZgZWiN', ['nios-obe-c:C105.L17']], ['mt_6w2g7aoPgz', ['nios-obe-c:C105.L17']], ['mt_-gkJdxJUQT', ['nios-obe-c:C105.L17']], ['mt_p6frRFuxS6', ['nios-obe-c:C105.L17']],
  ['mt_z7AJZapsJj', ['nios-obe-c:C105.L18']], ['mt_cpDpjJaE5u', ['nios-obe-c:C105.L18']], ['mt_edaoZRkK6M', ['nios-obe-c:C105.L18']],
  ['mt_V2lNzEex_a', ['nios-obe-c:C105.L19']],
  ['mt_44HkROUnzE', ['nios-obe-c:C105.L20']],
]);

// ---------------------------------------------------------------------------
// New prerequisite edges. `t`/`p` may be a new-topic _slug or an existing id.
// ---------------------------------------------------------------------------
const newEdges = [
  // Indian history chronology (each era builds on the previous)
  { t: 'india-vedic-age', p: 'india-indus-valley', strength: 'soft', reason: 'The Vedic age follows the Indus Valley Civilisation in the story of ancient India' },
  { t: 'india-maurya-empire', p: 'india-vedic-age', strength: 'soft', reason: 'The Maurya Empire arises after the Vedic and later-Vedic periods' },
  { t: 'india-gupta-age', p: 'india-maurya-empire', strength: 'soft', reason: 'The Gupta age follows the Maurya Empire in chronology' },
  { t: 'india-south-kingdoms', p: 'india-maurya-empire', strength: 'soft', reason: 'The southern kingdoms are studied alongside the post-Mauryan north' },
  { t: 'india-delhi-sultanate', p: 'india-gupta-age', strength: 'soft', reason: 'Medieval rule begins after the ancient empires' },
  { t: 'india-mughal-empire', p: 'india-delhi-sultanate', strength: 'soft', reason: 'The Mughals follow the Delhi Sultanate' },
  { t: 'india-marathas-rajputs', p: 'india-mughal-empire', strength: 'soft', reason: 'The Marathas and Rajputs are understood through their relations with the Mughals' },
  { t: 'india-british-rule', p: 'india-mughal-empire', strength: 'soft', reason: 'British rule expands as Mughal power declines' },
  { t: 'india-social-reform', p: 'india-british-rule', strength: 'hard', reason: '19th-century reform movements arise under British rule' },
  { t: 'india-freedom-struggle', p: 'india-british-rule', strength: 'hard', reason: 'The freedom struggle is a response to British rule' },
  { t: 'india-freedom-struggle', p: 'india-social-reform', strength: 'soft', reason: 'The reform awakening fed national feeling and the freedom movement' },
  // History needs a sense of time; borrow the History-domain timelines skill
  { t: 'india-indus-valley', p: 'mt_C3eNLQJlgt', strength: 'soft', reason: 'Placing a civilisation in time builds on reading historical timelines' },
  // Indian geography
  { t: 'india-physical-features', p: 'india-states-uts', strength: 'soft', reason: 'Physical geography builds on knowing the country and its extent' },
  { t: 'india-natural-resources', p: 'india-physical-features', strength: 'soft', reason: 'Resources are distributed across the physical landscape' },
  { t: 'india-agriculture', p: 'india-physical-features', strength: 'hard', reason: 'Farming depends on climate, soil and the monsoon' },
  { t: 'india-agriculture', p: 'mt_yhhprm7dZK', strength: 'soft', reason: 'Understanding crops builds on knowing about soil' },
  { t: 'india-industries', p: 'india-natural-resources', strength: 'soft', reason: 'Industries process natural resources' },
  // Governance
  { t: 'india-democracy-government', p: 'mt_h_shhH-6DC', strength: 'soft', reason: 'Understanding government builds on community rights and responsibilities' },
  { t: 'india-constitution', p: 'india-democracy-government', strength: 'hard', reason: 'The Constitution defines how the democracy and its government work' },
  { t: 'india-constitution', p: 'right-to-education', strength: 'soft', reason: 'Fundamental rights generalise specific rights like the right to education' },
  { t: 'india-local-government', p: 'india-democracy-government', strength: 'hard', reason: 'Local self-government is one layer of the democratic system' },
  { t: 'india-elections-voting', p: 'india-democracy-government', strength: 'hard', reason: 'Elections are how a democracy chooses its government' },
  { t: 'india-elections-voting', p: 'india-constitution', strength: 'soft', reason: 'Universal adult franchise is guaranteed by the Constitution' },
  // Society & development
  { t: 'india-unity-diversity', p: 'mt_DkzsZdyaL2', strength: 'soft', reason: 'Unity in diversity builds on understanding many cultures and traditions' },
  { t: 'india-social-equality', p: 'mt_mDp-1vlL3R', strength: 'hard', reason: 'Gender equality builds on the idea of fairness and equality' },
  { t: 'india-social-equality', p: 'right-to-education', strength: 'soft', reason: 'Educating every child, including girls, applies the right to education' },
  { t: 'india-population', p: 'india-states-uts', strength: 'soft', reason: 'Population is understood in the context of the country and its resources' },
  { t: 'india-development-schemes', p: 'welfare-schemes', strength: 'soft', reason: 'National development schemes are a specific case of government support' },
  { t: 'india-development-schemes', p: 'waste-management', strength: 'soft', reason: 'Swachh Bharat applies the idea of managing waste at national scale' },
  // Science gaps
  { t: 'kidneys-excretion', p: 'mt_C7FNeIDGc6', strength: 'hard', reason: 'Excretion is understood through cells, tissues and organs' },
  { t: 'kidneys-excretion', p: 'mt_g_M4Vh_pK7', strength: 'soft', reason: 'The kidneys filter the blood the heart circulates' },
  { t: 'communicable-diseases', p: 'mt_4JpMXUIxeD', strength: 'hard', reason: 'Understanding disease builds on knowing the immune system' },
  { t: 'communicable-diseases', p: 'mt_uof32CdhYK', strength: 'soft', reason: 'Preventing communicable disease builds on personal hygiene' },
  { t: 'fibres-and-fabrics', p: 'mt_ZAJvTcroFO', strength: 'soft', reason: 'Fibres and fabrics build on naming everyday materials' },
  { t: 'fibres-and-fabrics', p: 'animals-that-help-us', strength: 'soft', reason: 'Wool and silk come from the useful animals already studied' },
  { t: 'waste-management', p: 'mt_deexfCHU9m', strength: 'soft', reason: 'Managing waste builds on reducing human impact on the environment' },
  { t: 'waste-management', p: 'natural-and-man-made', strength: 'soft', reason: 'Sorting biodegradable from non-biodegradable extends natural vs man-made' },
  // Maths gaps
  { t: 'hcf-and-lcm', p: 'mt_FHIAv6dfhU', strength: 'hard', reason: 'HCF and LCM build on factors, multiples and primes' },
  { t: 'square-cube-roots', p: 'mt_hCVPYlF-7Y', strength: 'hard', reason: 'Roots are the inverse of square and cube numbers' },
  { t: 'square-cube-roots', p: 'hcf-and-lcm', strength: 'soft', reason: 'Prime factorisation used for roots is practised finding HCF and LCM' },
  { t: 'simple-compound-interest', p: 'mt_PNSyfH56eQ', strength: 'hard', reason: 'Interest calculations build on calculating percentages' },
  { t: 'simple-compound-interest', p: 'mt_bAy4dmP1-A', strength: 'soft', reason: 'Interest formalises the everyday idea of borrowing and debt' },
  { t: 'vedic-mathematics', p: 'mt_18fK9sQdIz', strength: 'soft', reason: 'Vedic multiplication shortcuts build on standard written multiplication' },
  { t: 'pie-charts', p: 'mt_H6LlpWgEYS', strength: 'soft', reason: 'Reading pie charts builds on reading bar graphs' },
  { t: 'pie-charts', p: 'mt_ZM9mhHsyYZ', strength: 'soft', reason: 'Pie-chart slices as parts of a whole build on understanding percentages' },
  // Computing (intermediate builds on Level A basics)
  { t: 'spreadsheets-basics', p: 'using-operating-system', strength: 'hard', reason: 'Using a spreadsheet application requires basic operating-system skills' },
  { t: 'spreadsheets-basics', p: 'mt_glPPG-kTQY', strength: 'soft', reason: 'Spreadsheet formulae build on everyday arithmetic' },
  { t: 'making-presentations', p: 'word-processing-basics', strength: 'soft', reason: 'Making slides builds on typing and formatting text' },
  { t: 'the-internet', p: 'using-operating-system', strength: 'hard', reason: 'Browsing the web requires basic operating-system skills' },
  { t: 'email-basics', p: 'the-internet', strength: 'hard', reason: 'Email is sent and received over the internet' },
  { t: 'online-safety-security', p: 'the-internet', strength: 'hard', reason: 'Online safety concerns arise once you use the internet' },
  { t: 'computer-networks', p: 'the-internet', strength: 'soft', reason: 'The internet is the most familiar example of a computer network' },
  { t: 'multimedia-basics', p: 'making-presentations', strength: 'soft', reason: 'Multimedia extends the text, image and video used in presentations' },
  { t: 'internet-services', p: 'online-safety-security', strength: 'hard', reason: 'Safe use of online banking and shopping depends on online-safety habits' },
  { t: 'internet-services', p: 'welfare-schemes', strength: 'soft', reason: 'E-governance delivers government services and schemes online' },
];

// ---------------------------------------------------------------------------
// New clusters for new (subject, domain, ageRangeStart) bands.
// ---------------------------------------------------------------------------
const newClusters = [
  { subject: HIST, domain: 'Ancient India', ageRangeStart: 9, summary: 'Your child is exploring the deep past of the Indian subcontinent — the planned cities of the Indus Valley, the Vedic age, and the Maurya Empire and emperor Ashoka.' },
  { subject: HIST, domain: 'Ancient India', ageRangeStart: 10, summary: 'Your child is learning about the golden Gupta age and the powerful kingdoms of southern India — their achievements in art, science, trade and temple-building.' },
  { subject: HIST, domain: 'Medieval India', ageRangeStart: 10, summary: 'Your child is learning about medieval India — the Delhi Sultanate, the Mughal Empire and its art and architecture, and the Marathas and Rajputs.' },
  { subject: HIST, domain: 'Modern India', ageRangeStart: 10, summary: 'Your child is learning how the British came to trade and stayed to rule, and how that reshaped India — the groundwork for the freedom struggle.' },
  { subject: HIST, domain: 'Modern India', ageRangeStart: 11, summary: 'Your child is learning about the reform movements and the long freedom struggle that led to India’s independence in 1947.' },
  { subject: SS, domain: 'Indian Geography', ageRangeStart: 9, summary: 'Your child is getting to know India as a place — its states, its physical features and monsoon climate, and how its farming works across the seasons.' },
  { subject: SS, domain: 'Indian Geography', ageRangeStart: 10, summary: 'Your child is learning about India’s natural resources and industries — where materials and energy come from, and how they are turned into useful goods.' },
  { subject: SS, domain: 'Governance & Constitution', ageRangeStart: 10, summary: 'Your child is learning how India governs itself — democracy, the three organs of government, and local self-government through panchayats and municipal bodies.' },
  { subject: SS, domain: 'Governance & Constitution', ageRangeStart: 11, summary: 'Your child is learning about the Constitution — the rights and duties of citizens — and how elections and the equal right to vote keep a democracy strong.' },
  { subject: SS, domain: 'Society & Development', ageRangeStart: 9, summary: 'Your child is learning what holds a diverse country together — how India’s many languages, faiths and cultures can be a shared strength.' },
  { subject: SS, domain: 'Society & Development', ageRangeStart: 10, summary: 'Your child is learning about fairness in society — gender equality, education for all, and why harmful old customs are wrong and against the law.' },
  { subject: SS, domain: 'Society & Development', ageRangeStart: 11, summary: 'Your child is learning about the challenges a country works on together — a growing population, and national schemes like Swachh Bharat and Digital India that every citizen can support.' },
  { subject: COMPUTING, domain: 'Computer Basics', ageRangeStart: 9, summary: 'Your child is building everyday computing skills — spreadsheets and presentations, using the internet and email, and staying safe and secure online.' },
  { subject: COMPUTING, domain: 'Computer Basics', ageRangeStart: 11, summary: 'Your child is learning how computers connect and serve us — networks, multimedia, and online services like banking and e-commerce, used safely.' },
];

// ===========================================================================
// Apply (idempotent).
// ===========================================================================
const topicsDoc = load('topics.json');
const depsDoc = load('dependencies.json');
const stdDoc = load('curriculum-standards.json');
const clustersDoc = load('clusters.json');

const report = { standards: 0, aligned: 0, linksAdded: 0, topics: 0, edges: 0, clusters: 0, warnings: 0 };

for (const cur of [bCurriculum, cCurriculum]) {
  if (!stdDoc.curricula.some((x) => x.slug === cur.slug)) { stdDoc.curricula.push(cur); report.standards += cur.topics.length; }
}
stdDoc.curriculumCount = stdDoc.curricula.length;
const validStandardKeys = new Set(stdDoc.curricula.flatMap((c) => c.topics.map((t) => t.key)));

const slugToId = Object.fromEntries(newTopics.map((t) => [t._slug, mintId(t._slug)]));
// Some edges reference topics minted by the Level A build (scripts/build/nios-obe-a.mjs),
// whose ids were derived under the `nios-obe-a` namespace. Resolve those the same way.
const A_SLUGS = new Set(['right-to-education', 'welfare-schemes', 'animals-that-help-us', 'natural-and-man-made', 'using-operating-system', 'word-processing-basics', 'personal-hygiene']);
const mintIdNs = (ns, slug) => {
  const h = createHash('sha256').update(`${ns}:${slug}`).digest();
  let s = '';
  for (let i = 0; i < 10; i++) s += B62[h[i] % 62];
  return `mt_${s}`;
};
const resolveRef = (ref) => slugToId[ref] ?? (A_SLUGS.has(ref) ? mintIdNs('nios-obe-a', ref) : ref);

const existingIds = new Set(topicsDoc.topics.map((t) => t.id));
for (const t of newTopics) {
  const id = slugToId[t._slug];
  if (existingIds.has(id)) continue;
  for (const k of t.standards) if (!validStandardKeys.has(k)) { console.error(`  ! new topic ${t._slug} references unknown standard ${k}`); report.warnings++; }
  topicsDoc.topics.push({ id, type: t.type, subject: t.subject, domain: t.domain, name: t.name, description: t.description, ageRangeStart: t.ageRangeStart, ageRangeEnd: t.ageRangeEnd, centrality: null, evidence: t.evidence, assessmentPrompt: t.assessmentPrompt, standards: t.standards });
  existingIds.add(id);
  report.topics++;
}
topicsDoc.topicCount = topicsDoc.topics.length;

const byId = new Map(topicsDoc.topics.map((t) => [t.id, t]));
for (const [topicId, codes] of Object.entries(alignments)) {
  const topic = byId.get(topicId);
  if (!topic) { if (codes.length) { console.error(`  ! alignment target missing: ${topicId}`); report.warnings++; } continue; }
  let touched = false;
  for (const key of codes) {
    if (!validStandardKeys.has(key)) { console.error(`  ! alignment references unknown standard ${key}`); report.warnings++; continue; }
    if (!topic.standards.includes(key)) { topic.standards.push(key); report.linksAdded++; touched = true; }
  }
  if (touched) report.aligned++;
}

const edgeSeen = new Set(depsDoc.dependencies.map((d) => `${d.topicId}>${d.prerequisiteId}`));
for (const e of newEdges) {
  const topicId = resolveRef(e.t), prerequisiteId = resolveRef(e.p);
  if (!byId.has(topicId)) { console.error(`  ! edge topicId missing: ${e.t}`); report.warnings++; continue; }
  if (!byId.has(prerequisiteId)) { console.error(`  ! edge prerequisiteId missing: ${e.p}`); report.warnings++; continue; }
  const k = `${topicId}>${prerequisiteId}`;
  if (edgeSeen.has(k)) continue;
  depsDoc.dependencies.push({ topicId, prerequisiteId, strength: e.strength, reason: e.reason });
  edgeSeen.add(k);
  report.edges++;
}
depsDoc.edgeCount = depsDoc.dependencies.length;

const clusterSeen = new Set(clustersDoc.clusters.map((c) => `${c.subject}|${c.domain}|${c.ageRangeStart}`));
for (const cl of newClusters) {
  const k = `${cl.subject}|${cl.domain}|${cl.ageRangeStart}`;
  if (clusterSeen.has(k)) continue;
  clustersDoc.clusters.push(cl); clusterSeen.add(k); report.clusters++;
}
clustersDoc.clusterCount = clustersDoc.clusters.length;

saveFile('curriculum-standards.json', stdDoc);
saveFile('topics.json', topicsDoc);
saveFile('dependencies.json', depsDoc);
saveFile('clusters.json', clustersDoc);

console.log('✓ NIOS OBE Levels B & C integrated:');
console.log(`  standards added : ${report.standards}`);
console.log(`  topics aligned  : ${report.aligned} (${report.linksAdded} new topic→standard links)`);
console.log(`  new topics      : ${report.topics}`);
console.log(`  new edges       : ${report.edges}`);
console.log(`  new clusters    : ${report.clusters}`);
if (report.warnings) console.log(`  warnings        : ${report.warnings} (see above)`);
console.log('Next: node scripts/manifest.mjs && node scripts/validate.mjs');
