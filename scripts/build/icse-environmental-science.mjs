#!/usr/bin/env node
/**
 * build/icse-environmental-science.mjs — ICSE Environmental Science (66),
 * Classes IX–X (ages 14–16).
 *
 * The 2028 ICSE Environmental Science syllabus is a modern sustainability course
 * built around the "triple planetary crisis" — climate change, pollution and
 * biodiversity loss — and how a society transitions to sustainability. Much of
 * its content already exists in the taxonomy: biodiversity, climate change and
 * net zero, air pollution (minted for ICSE Chemistry), waste, renewable energy
 * and recycling all align. The mints are the framings the syllabus adds — the
 * earth as an environmental system, India's environmental heritage, sustainable
 * development, the interlinked crisis itself, the transition to a sustainable
 * society, and the green economy and green skills. These land in a new Science
 * domain `Environment & Sustainability`. Marble-authored factual descriptions —
 * no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const sci = topic('Science');
const ES = 'Environment & Sustainability';
const IX = [14, 15], X = [15, 16], IXX = [14, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('EVS9.1', 'IX', 'Our Planet Earth', 'The earth as a system of interacting spheres — the lithosphere, hydrosphere, atmosphere and biosphere — and how life depends on their balance.'),
  s('EVS9.2', 'IX', 'Diversity of Life', 'The variety of life on earth, why biodiversity matters, and the threats it faces.'),
  s('EVS9.3', 'IX', 'India’s Environmental Heritage', 'India’s traditions of living with nature, its constitutional values on the environment, and the conservation movements that draw on them.'),
  s('EVS9.4', 'IX', 'The Trajectory of Human Development', 'How human development has grown from need to greed, and the meaning of sustainable development against unsustainable growth.'),
  s('EVS9.5', 'IX', 'Consequences of Unsustainable Development', 'The environmental degradation — pollution, resource depletion and waste — that unsustainable development leaves behind, through real cases.'),
  s('EVS9.6', 'IX', 'Introduction to the Triple Planetary Crisis', 'The three linked crises of the planet — climate change, pollution and biodiversity loss — and why they are understood together.'),
  s('EVS9.7', 'IX', 'Transition to a Sustainable Society', 'What a sustainable society looks like and the shifts in living, energy and consumption needed to reach it.'),
  s('EVS9.8', 'IX', 'Sustainable Handprint Actions', 'Positive handprint actions a person can take at home, school and in the neighbourhood to reduce their environmental footprint.'),
  // ---- Class X ----
  s('EVS10.1', 'X', 'Interlinkages of the Triple Planetary Crisis', 'How climate change, pollution and biodiversity loss drive and worsen one another.'),
  s('EVS10.2', 'X', 'Addressing Environmental Pollution', 'The types and sources of pollution and the measures — technical, legal and personal — that address it.'),
  s('EVS10.3', 'X', 'Addressing Biodiversity Loss', 'The causes of biodiversity loss and the conservation of species and habitats that answers it.'),
  s('EVS10.4', 'X', 'Addressing Climate Change', 'The causes and impacts of climate change and the mitigation and adaptation — including the path to net zero — that address it.'),
  s('EVS10.5', 'X', 'Redesigning Social and Economic Systems', 'Rethinking economies towards sustainability — the circular economy, green growth and the redesign of production and consumption.'),
  s('EVS10.6', 'X', 'Sustainable Practices and Innovations', 'Sustainable practices and innovations — renewable energy, recycling, efficiency and green technology.'),
  s('EVS10.7', 'X', 'Green Skills Development', 'The green skills and careers a sustainable economy needs.'),
];

const newTopics = [
  sci('icse-evs-earth-system', 'The Earth as an Environmental System', ES, IX, 'CONCEPTUAL',
    'Understand the earth as four interacting spheres — the rock of the lithosphere, the water of the hydrosphere, the air of the atmosphere and the life of the biosphere — whose balance makes the planet habitable.',
    EV('Names the four spheres of the earth', 'Explains how two spheres interact', 'Explains why life depends on the balance between them'),
    'Ask {{name}} how the air, the water, the rock and the living things of the earth all depend on one another.',
    ['EVS9.1']),
  sci('icse-evs-india-heritage', 'India’s Environmental Heritage', ES, IX, 'CONCEPTUAL',
    'Understand how India’s traditions, its constitutional duties and movements such as Chipko express a long practice of living with and protecting nature.',
    EV('Describes a traditional Indian practice of conserving nature', 'Names a constitutional value or duty on the environment', 'Describes an Indian conservation movement and its aim'),
    'Ask {{name}} how communities in India have protected forests and rivers long before the word “environment” was common.',
    ['EVS9.3']),
  sci('icse-evs-sustainable-development', 'Sustainable Development', ES, IX, 'CONCEPTUAL',
    'Understand sustainable development as meeting today’s needs without robbing future generations, and how the drive from need to greed has pushed development past what the planet can sustain.',
    EV('Defines sustainable development', 'Distinguishes sustainable from unsustainable growth', 'Gives an example of development exceeding an environmental limit'),
    'Ask {{name}} whether a country can keep growing richer forever on a planet of limited size.',
    ['EVS9.4', 'EVS9.5']),
  sci('icse-evs-triple-crisis', 'The Triple Planetary Crisis', ES, IX, 'CONCEPTUAL',
    'Understand the three linked crises facing the planet — climate change, pollution and biodiversity loss — and why they are studied together, each driving and worsening the others.',
    EV('Names the three parts of the triple planetary crisis', 'Explains how one crisis worsens another', 'Explains why the three are addressed together'),
    'Ask {{name}} how a warming climate, dirty air and vanishing wildlife are really one problem, not three.',
    ['EVS9.6', 'EVS10.1']),
  sci('icse-evs-sustainable-society', 'Building a Sustainable Society', ES, IXX, 'CONCEPTUAL',
    'Understand what a sustainable society requires — cleaner energy, less waste, wiser consumption — and the positive handprint actions a person can take at home, school and in the neighbourhood.',
    EV('Describes a feature of a sustainable society', 'Names a handprint action and its benefit', 'Explains the difference between a footprint and a handprint'),
    'Ask {{name}} what they could actually do this week to leave the environment better rather than worse.',
    ['EVS9.7', 'EVS9.8']),
  sci('icse-evs-green-economy', 'The Green Economy and Green Skills', ES, X, 'CONCEPTUAL',
    'Understand how economies are being redesigned for sustainability — the circular economy that reuses rather than discards — and the green skills and careers such a shift will need.',
    EV('Explains the idea of a circular economy', 'Contrasts green growth with ordinary growth', 'Names a green skill or career and why it is needed'),
    'Ask {{name}} what new kinds of jobs a world trying to live within its means will need.',
    ['EVS10.5', 'EVS10.7']),
];

// Environmental Science is a survey that reuses existing ecology, climate and
// pollution content — align-first, mint only the sustainability framings.
const alignments = {
  mt_44HkROUnzE: ['EVS9.2', 'EVS10.3'], // The Biodiversity Crisis
  mt_pWwV_8OgXD: ['EVS10.3'],           // Protecting Endangered Animals
  mt_XNhQZ4pJ8M: ['EVS10.2'], // Acid Rain, Ozone Depletion and Air Pollution (minted for ICSE Chemistry)
  mt_MqjZhvyWVa: ['EVS10.2'], // Waste and Its Management
  mt_Wzj1RETm9A: ['EVS10.4'],           // Net Zero & Energy Transition
  'mt_mTpV-0rtkO': ['EVS10.4'],         // Earth's Atmosphere & CO2
  mt_w2A8D76ymp: ['EVS10.6'],           // Renewable vs non-renewable energy
  mt_0e5rZxbAeR: ['EVS9.8', 'EVS10.6'], // Finite Resources & Recycling
};

const newEdges = [
  { t: 'icse-evs-earth-system', p: 'mt_mTpV-0rtkO', strength: 'soft', reason: 'The atmosphere is one of the earth’s interacting spheres.' },
  { t: 'icse-evs-sustainable-development', p: 'mt_0e5rZxbAeR', strength: 'hard', reason: 'Sustainability rests on the limits of finite resources.' },
  { t: 'icse-evs-sustainable-development', p: 'mt_w2A8D76ymp', strength: 'soft', reason: 'Sustainable development turns on renewable versus non-renewable energy.' },
  { t: 'icse-evs-india-heritage', p: 'icse-evs-sustainable-development', strength: 'soft', reason: 'India’s traditions are early practice of sustainable living.' },
  { t: 'icse-evs-triple-crisis', p: 'mt_Wzj1RETm9A', strength: 'hard', reason: 'Climate change is one arm of the triple planetary crisis.' },
  { t: 'icse-evs-triple-crisis', p: 'mt_44HkROUnzE', strength: 'hard', reason: 'Biodiversity loss is one arm of the triple planetary crisis.' },
  { t: 'icse-evs-triple-crisis', p: 'mt_XNhQZ4pJ8M', strength: 'hard', reason: 'Pollution is one arm of the triple planetary crisis.' },
  { t: 'icse-evs-sustainable-society', p: 'icse-evs-triple-crisis', strength: 'hard', reason: 'A sustainable society is the response to the crisis.' },
  { t: 'icse-evs-sustainable-society', p: 'mt_0e5rZxbAeR', strength: 'soft', reason: 'Reducing and recycling waste is a handprint action.' },
  { t: 'icse-evs-green-economy', p: 'icse-evs-sustainable-society', strength: 'hard', reason: 'The green economy is how a sustainable society is organised.' },
  { t: 'icse-evs-green-economy', p: 'icse-evs-sustainable-development', strength: 'soft', reason: 'Green growth is sustainable development applied to the economy.' },
];

const newClusters = [
  { subject: 'Science', domain: ES, ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'Environmental Science steps back to see the planet whole. Class IX opens with the earth as four interacting spheres — rock, water, air and life — whose balance makes the world habitable, and with India’s long heritage of living with nature. It then names the problem: development that has run from need to greed, its consequences in pollution and lost resources, and the triple planetary crisis of climate change, pollution and biodiversity loss that ties them together. It closes on hope — what a sustainable society looks like and the handprint actions a young person can take today.' },
  { subject: 'Science', domain: ES, ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X turns from naming the crisis to addressing it. Each arm of the triple planetary crisis is taken in turn — pollution, biodiversity loss and climate change — with the technical, legal and personal measures that answer it, including the path to net zero. The course then looks at redesigning the economy itself: the circular economy that reuses instead of discarding, green growth, and the green skills and careers a sustainable world will need.' },
];

integrate({ subjectDoc: 'Environmental Science (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
