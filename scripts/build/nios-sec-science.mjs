#!/usr/bin/env node
/**
 * build/nios-sec-science.mjs — NIOS Secondary Science and Technology (Code 212).
 * Very align-heavy: 25 lessons across ~7 modules, most already covered by the
 * existing Science topics (matter, forces, energy, circuits, light, sound,
 * cells, life processes, heredity). Mints the secondary gaps: atoms/molecules,
 * atomic structure, chemical bonding, balancing equations, describing motion,
 * Newton's laws, work & power, and hormones. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Science and Technology', courseCode: '212' };
const S = 'Science';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('212.M1.L1', 'I. Measurement in Science', 'Measurement in Science and Technology', 'Measurement in Science and Technology', 'Understand physical quantities, their units, and correct ways of measuring and expressing them.'),
  std('212.M2.L2', 'II. Matter in our Surroundings', 'Matter in our Surroundings', 'Matter in our Surroundings', 'Understand matter, its states, and how it changes state.'),
  std('212.M2.L3', 'II. Matter in our Surroundings', 'Atoms and Molecules', 'Atoms and Molecules', 'Understand that matter is made of atoms and molecules, and the idea of elements and compounds.'),
  std('212.M2.L4', 'II. Matter in our Surroundings', 'Chemical Reaction and Equations', 'Chemical Reaction and Equations', 'Understand chemical reactions and how to write and balance chemical equations.'),
  std('212.M2.L5', 'II. Matter in our Surroundings', 'Atomic Structure', 'Atomic Structure', 'Understand the structure of the atom — protons, neutrons and electrons — and the arrangement of electrons.'),
  std('212.M2.L6', 'II. Matter in our Surroundings', 'Periodic Classification of Elements', 'Periodic Classification of Elements', 'Understand how elements are arranged in the periodic table and the patterns it reveals.'),
  std('212.M2.L7', 'II. Matter in our Surroundings', 'Chemical Bonding', 'Chemical Bonding', 'Understand how atoms join by chemical bonds — ionic and covalent bonding.'),
  std('212.M2.L8', 'II. Matter in our Surroundings', 'Acids, Bases and Salts', 'Acids, Bases and Salts', 'Understand acids, bases and salts, the pH scale, and their reactions.'),
  std('212.M3.L9', 'III. Moving Things', 'Motion and its Description', 'Motion and its Description', 'Understand and describe motion — distance, displacement, speed, velocity and acceleration.'),
  std('212.M3.L10', 'III. Moving Things', 'Force and Motion', 'Force and Motion', 'Understand force and its effects, and Newton’s laws of motion.'),
  std('212.M3.L11', 'III. Moving Things', 'Gravitation', 'Gravitation', 'Understand gravitation and the force of gravity between objects.'),
  std('212.M4.L12', 'IV. Energy', 'Sources of Energy', 'Sources of Energy', 'Understand the different sources of energy, renewable and non-renewable.'),
  std('212.M4.L13', 'IV. Energy', 'Work and Energy', 'Work and Energy', 'Understand work, energy and power and the relationships between them.'),
  std('212.M4.L14', 'IV. Energy', 'Thermal Energy', 'Thermal Energy', 'Understand heat and its transfer by conduction, convection and radiation.'),
  std('212.M4.L15', 'IV. Energy', 'Light Energy', 'Light Energy', 'Understand light — reflection, refraction, lenses and the formation of images.'),
  std('212.M4.L16', 'IV. Energy', 'Electrical Energy', 'Electrical Energy', 'Understand electric current, potential difference, resistance and simple circuits.'),
  std('212.M4.L17', 'IV. Energy', 'Magnetic Effect of Electric Current', 'Magnetic Effect of Electric Current', 'Understand the magnetic effect of electric current and its applications.'),
  std('212.M4.L18', 'IV. Energy', 'Sound', 'Sound', 'Understand sound — how it is produced, travels and is heard.'),
  std('212.M5.L19', 'V. The Living World', 'Classification of Living Organisms', 'Classification of Living Organisms', 'Understand how living organisms are classified into groups.'),
  std('212.M5.L20', 'V. The Living World', 'History of Life on Earth', 'History of Life on Earth', 'Understand how life on Earth has changed over time and the evidence for it.'),
  std('212.M5.L21', 'V. The Living World', 'Building Blocks of Life – Cell', 'Building Blocks of Life – Cell', 'Understand the cell as the basic unit of life and its structures.'),
  std('212.M5.L22', 'V. The Living World', 'Life Processes – I: Nutrition and Respiration', 'Life Processes – I: Nutrition and Respiration', 'Understand the life processes of nutrition and respiration in plants and animals.'),
  std('212.M5.L23', 'V. The Living World', 'Life Processes – II: Control and Coordination', 'Life Processes – II: Control and Coordination', 'Understand control and coordination in organisms — the nervous system and hormones.'),
  std('212.M5.L24', 'V. The Living World', 'Life Processes – III: Reproduction', 'Life Processes – III: Reproduction', 'Understand reproduction in plants and animals.'),
  std('212.M5.L25', 'V. The Living World', 'Heredity', 'Heredity', 'Understand heredity — how traits are passed from parents to offspring.'),
];

const alignments = Object.fromEntries([
  ['mt_nUnowllzaN', ['212.M1.L1']],                               // Measuring accurately ← Measurement
  ['mt_YQkUdIHO8L', ['212.M2.L2']], ['mt_b6kZgqolEd', ['212.M2.L2']], // Solids/Liquids/Gases + Particle Model ← Matter
  ['mt_v0K6GRi4ZL', ['212.M2.L4']],                               // Types of Chemical Reaction ← Reactions & Equations
  ['mt_wfEfQuHOG-', ['212.M2.L6']],                               // The Periodic Table ← Periodic Classification
  ['mt_AN2kJE6I0s', ['212.M2.L8']],                               // Acids, Alkalis & pH ← Acids, Bases and Salts
  ['mt_lcf8lx-LkZ', ['212.M3.L10']],                              // Contact & Non-Contact Forces ← Force and Motion
  ['mt_oLjz18CxDg', ['212.M3.L11']],                              // Universal Gravitation ← Gravitation
  ['mt_w2A8D76ymp', ['212.M4.L12']],                              // Renewable vs non-renewable ← Sources of Energy
  ['mt_Jvg_r4yWaY', ['212.M4.L13']],                              // Energy stores and transfers ← Work and Energy
  ['mt_ySnOkVIu22', ['212.M4.L14']],                              // Conduction/convection/radiation ← Thermal Energy
  ['mt_PifbJOuXrG', ['212.M4.L15']],                              // Reflection & Refraction ← Light Energy
  ['mt_H3ZDK0EYNV', ['212.M4.L16']], ['mt_loEMaQ8kFA', ['212.M4.L16']], // Ohm's Law + Series/parallel ← Electrical Energy
  ['mt__7BVYUN180', ['212.M4.L17']],                              // Motors & the Motor Effect ← Magnetic Effect
  ['mt_DQk9oDE7gr', ['212.M4.L18']],                              // How Sound Waves Travel ← Sound
  ['mt_IY3KwGLZgk', ['212.M5.L19']],                              // Classifying Organisms ← Classification
  ['mt_gTDqxYkLs9', ['212.M5.L20']],                              // Life Changed Over Time ← History of Life
  ['mt_VfA4xo4kUv', ['212.M5.L21']],                              // Cells Under the Microscope ← Cell
  ['mt_zM5vu31jgl', ['212.M5.L22']],                              // Photosynthesis ← Life Processes I
  ['mt_qzbgwaUQOA', ['212.M5.L23']],                              // The Nervous System ← Control and Coordination
  ['mt_tQkCzRcWG7', ['212.M5.L24']],                              // Human Reproduction ← Reproduction
  ['mt_0sELh0MYWb', ['212.M5.L25']],                              // DNA & Genes ← Heredity
]);

const T = (_slug, domain, name, a0, a1, type, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: S, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type, description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('sci-atoms-molecules', 'Matter & Materials', 'Atoms and Molecules', 13, 15, 'CONCEPTUAL',
    'Understand that all matter is made of tiny particles called atoms, that atoms join to form molecules, and that elements are made of one kind of atom while compounds combine different atoms.',
    ['Explain that matter is made of atoms', 'Distinguish an element from a compound', 'Explain how atoms combine to form molecules'],
    'Can {{name}} explain that everything is made of atoms, and the difference between an element and a compound?', ['nios-sec-2020:212.M2.L3']),
  T('sci-atomic-structure', 'Matter & Materials', 'Atomic Structure', 14, 16, 'CONCEPTUAL',
    'Understand the structure of the atom — a nucleus of protons and neutrons surrounded by electrons in shells — and how this structure explains an element’s identity.',
    ['Name the three sub-atomic particles and their charges', 'Explain that the number of protons defines the element', 'Describe how electrons are arranged in shells'],
    'Can {{name}} describe what an atom is made of — protons, neutrons and electrons — and how they are arranged?', ['nios-sec-2020:212.M2.L5']),
  T('sci-balancing-equations', 'Matter & Materials', 'Balancing Chemical Equations', 14, 16, 'PROCEDURAL',
    'Understand that a chemical equation represents a reaction and must be balanced — the same number of each kind of atom on both sides — because matter is conserved.',
    ['Explain why a chemical equation must be balanced', 'Balance a simple chemical equation', 'Relate balancing to the conservation of mass'],
    'Can {{name}} balance a simple chemical equation, and explain why the atoms must match on both sides?', ['nios-sec-2020:212.M2.L4']),
  T('sci-chemical-bonding', 'Matter & Materials', 'Chemical Bonding', 14, 16, 'CONCEPTUAL',
    'Understand how atoms join together through chemical bonds — ionic bonds (transferring electrons) and covalent bonds (sharing electrons) — to form stable compounds.',
    ['Explain why atoms form bonds', 'Distinguish ionic from covalent bonding', 'Give an example of an ionically and a covalently bonded substance'],
    'Can {{name}} explain how atoms bond — by sharing or transferring electrons — to make compounds?', ['nios-sec-2020:212.M2.L7']),
  T('sci-describing-motion', 'Forces & Motion', 'Describing Motion', 13, 15, 'CONCEPTUAL',
    'Understand how to describe motion precisely — distance and displacement, speed and velocity, and acceleration — and read distance-time and speed-time graphs.',
    ['Distinguish speed from velocity and distance from displacement', 'Calculate speed from distance and time', 'Read a distance-time or speed-time graph'],
    'Can {{name}} describe how fast something moves — using speed and velocity — and read a distance-time graph?', ['nios-sec-2020:212.M3.L9']),
  T('sci-newtons-laws', 'Forces & Motion', "Newton's Laws of Motion", 14, 16, 'CONCEPTUAL',
    'Understand Newton’s three laws of motion — inertia, the link between force, mass and acceleration (F = ma), and action and reaction — and how they explain everyday movement.',
    ['State Newton’s three laws of motion in simple terms', 'Apply F = ma to a simple situation', 'Give an everyday example of action and reaction'],
    'Can {{name}} explain Newton’s laws of motion — including that force equals mass times acceleration?', ['nios-sec-2020:212.M3.L10']),
  T('sci-work-power', 'Energy', 'Work, Energy and Power', 14, 16, 'CONCEPTUAL',
    'Understand the scientific meaning of work (force times distance), its link to energy transfer, and power as the rate of doing work — and calculate each.',
    ['Define work as force times distance', 'Explain that doing work transfers energy', 'Explain power as the rate of doing work'],
    'Can {{name}} explain what "work" means in science, and how it relates to energy and power?', ['nios-sec-2020:212.M4.L13']),
  T('sci-hormones', 'The Human Body', 'Hormones and the Endocrine System', 14, 16, 'CONCEPTUAL',
    'Understand that hormones are chemical messengers made by glands, that they travel in the blood to control processes like growth and blood sugar, and that they work alongside the nervous system to coordinate the body.',
    ['Explain that hormones are chemical messengers from glands', 'Give an example of a hormone and what it controls', 'Explain how hormones and nerves together coordinate the body'],
    'Can {{name}} explain how hormones act as chemical messengers to control things like growth, working alongside the nervous system?', ['nios-sec-2020:212.M5.L23']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  hard('sci-atoms-molecules', 'mt_b6kZgqolEd', 'Atoms and molecules build on the particle model of matter'),
  hard('sci-atomic-structure', 'sci-atoms-molecules', 'Atomic structure builds on knowing matter is made of atoms'),
  hard('sci-chemical-bonding', 'sci-atomic-structure', 'Bonding builds on the arrangement of electrons in atoms'),
  hard('sci-balancing-equations', 'mt_v0K6GRi4ZL', 'Balancing equations builds on understanding chemical reactions'),
  soft('sci-balancing-equations', 'sci-atoms-molecules', 'Balancing counts atoms, which builds on atoms and molecules'),
  soft('sci-describing-motion', 'mt_lcf8lx-LkZ', 'Describing motion builds on understanding forces'),
  hard('sci-newtons-laws', 'sci-describing-motion', 'Newton’s laws build on describing motion'),
  hard('sci-work-power', 'mt_Jvg_r4yWaY', 'Work and power build on energy stores and transfers'),
  soft('sci-hormones', 'mt_qzbgwaUQOA', 'Hormonal control complements the nervous system'),
];

const newClusters = [
  { subject: S, domain: 'Matter & Materials', ageRangeStart: 13, summary: 'Your teenager is learning that all matter is built from atoms and molecules — the difference between elements and compounds — the foundation of chemistry.' },
  { subject: S, domain: 'Matter & Materials', ageRangeStart: 14, summary: 'Your teenager is studying secondary chemistry — the structure of the atom, how atoms bond into compounds, and how to balance chemical equations.' },
  { subject: S, domain: 'Forces & Motion', ageRangeStart: 13, summary: 'Your teenager is learning to describe motion precisely — speed, velocity and acceleration — and to read distance-time and speed-time graphs.' },
  { subject: S, domain: 'Forces & Motion', ageRangeStart: 14, summary: 'Your teenager is learning Newton’s laws of motion — how force, mass and acceleration relate, and why every action has a reaction.' },
  { subject: S, domain: 'Energy', ageRangeStart: 14, summary: 'Your teenager is learning the scientific meaning of work, energy and power, and how to calculate them.' },
  { subject: S, domain: 'The Human Body', ageRangeStart: 14, summary: 'Your teenager is learning how the body is coordinated by hormones — chemical messengers from glands — working alongside the nervous system.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
