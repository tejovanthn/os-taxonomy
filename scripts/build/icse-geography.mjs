#!/usr/bin/env node
/**
 * build/icse-geography.mjs — ICSE Geography (52), Classes IX–X (ages 14–16).
 *
 * Geography of India is where the taxonomy is strongest at 14–16 (physiographic
 * divisions, drainage, soil, water, minerals, agriculture, industry, transport
 * all exist from ncert-sec / nios-sec), so the whole Class X India course
 * aligns. The mints are the Class IX physical geography of the WORLD — latitude
 * and longitude, the structure of the earth, the hydrosphere and the atmosphere,
 * and the natural regions — which the taxonomy carried only at 16–17, plus
 * topographical-map interpretation and India's climate and natural vegetation.
 * The senior (16–18) physical-geography topics reverse-anchor onto the new
 * 14–16 ones. Marble-authored factual descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const geo = topic('Geography');
const PG = 'Physical Geography', GI = 'Geography of India', GS = 'Geographical Skills';
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX: physical geography of the world ----
  s('GEO9.1', 'IX', 'Our World', 'The shape of the earth, the grid of latitude and longitude, and the earth’s rotation and revolution and their effects.'),
  s('GEO9.2', 'IX', 'Structure of the Earth', 'The layered interior of the earth, the three types of rock and the rock cycle, and volcanoes and earthquakes.'),
  s('GEO9.3', 'IX', 'Hydrosphere', 'The oceans and their relief, and the movements of ocean water — waves, tides and currents.'),
  s('GEO9.4', 'IX', 'Atmosphere', 'The composition and layers of the atmosphere, insolation and the heating of the earth, and the elements of weather.'),
  s('GEO9.5', 'IX', 'Pollution', 'The types, sources and effects of pollution of the air, water and land, and its control.'),
  s('GEO9.6', 'IX', 'Natural Regions of the World', 'The major natural regions of the world — equatorial, monsoon, desert, Mediterranean and others — and their climate, vegetation and life.'),
  s('GEO9.7', 'IX', 'Map Work', 'Locating the major natural regions, oceans, rivers, mountains and plateaus of the world on a map.'),
  // ---- Class X: geography of India ----
  s('GEO10.1', 'X', 'Interpretation of Topographical Maps', 'Reading a topographical map — its conventional signs, grid references, scale, contours and the interpretation of relief and land use.'),
  s('GEO10.2', 'X', 'Map of India: Physical Features', 'The location and extent of India and its physiographic divisions and drainage systems.'),
  s('GEO10.3', 'X', 'Climate', 'The monsoon climate of India — its mechanism, the seasons and the distribution of temperature and rainfall.'),
  s('GEO10.4', 'X', 'Soil Resources', 'The major soil types of India, their distribution and characteristics, and soil erosion and conservation.'),
  s('GEO10.5', 'X', 'Natural Vegetation', 'The types of natural vegetation of India, their distribution, and the importance and conservation of forests.'),
  s('GEO10.6', 'X', 'Water Resources', 'India’s water resources, the causes of water scarcity, and irrigation and rainwater harvesting.'),
  s('GEO10.7', 'X', 'Mineral and Energy Resources', 'The distribution of India’s minerals and its conventional and non-conventional sources of energy.'),
  s('GEO10.8', 'X', 'Agriculture', 'Indian agriculture — its types, the major crops and the conditions they need, and agricultural reform.'),
  s('GEO10.9', 'X', 'Manufacturing Industries', 'The major manufacturing industries of India, the factors in their location, and their impact.'),
  s('GEO10.10', 'X', 'Transport', 'The means of transport in India — road, rail, water and air — and their role in development.'),
  s('GEO10.11', 'X', 'Waste Management', 'The types and sources of waste and the methods of managing and disposing of it.'),
];

const newTopics = [
  // ---------------- Class IX: physical geography of the world ----------------
  geo('icse-geo-latitude-longitude', 'Latitude, Longitude and the Earth’s Motions', PG, IX, 'CONCEPTUAL',
    'Understand how the grid of latitude and longitude fixes any place on the globe, and how the earth’s daily rotation gives day and night while its yearly revolution and tilt give the seasons.',
    EV('Locates a place by its latitude and longitude', 'Explains day and night from the earth’s rotation', 'Explains the seasons from the earth’s revolution and tilt'),
    'Ask {{name}} how two numbers can pinpoint any place on the whole round earth.',
    ['GEO9.1']),
  geo('icse-geo-earth-structure', 'The Structure of the Earth and Its Rocks', PG, IX, 'CONCEPTUAL',
    'Understand the earth as layers from crust to core, the three families of rock and the rock cycle that turns one into another, and the volcanoes and earthquakes that reshape the surface.',
    EV('Names the layers of the earth’s interior', 'Distinguishes igneous, sedimentary and metamorphic rock', 'Explains what causes a volcano or an earthquake'),
    'Ask {{name}} what the ground beneath their feet is like all the way down to the centre of the earth.',
    ['GEO9.2']),
  geo('icse-geo-hydrosphere', 'The Hydrosphere: Oceans, Tides and Currents', PG, IX, 'CONCEPTUAL',
    'Understand the oceans as the great body of the hydrosphere, and the movements of their water — the daily rise and fall of tides and the vast currents that carry warm and cold water around the globe.',
    EV('Explains what causes ocean tides', 'Distinguishes a warm from a cold ocean current', 'Explains how currents affect the climate of a coast'),
    'Ask {{name}} why the sea rises and falls twice a day, everywhere, on time.',
    ['GEO9.3']),
  geo('icse-geo-atmosphere', 'The Atmosphere: Composition and Weather', PG, IX, 'CONCEPTUAL',
    'Understand the atmosphere as layers of gases that let the earth support life, how the sun’s heat drives it, and the elements — temperature, pressure, wind, humidity — that make up the weather.',
    EV('Names the main gases and layers of the atmosphere', 'Explains how the sun heats the earth and its air', 'Names the elements of weather'),
    'Ask {{name}} what the air is made of and why it keeps the earth neither too hot nor too cold.',
    ['GEO9.4']),
  geo('icse-geo-natural-regions', 'Natural Regions of the World', PG, IX, 'CONCEPTUAL',
    'Understand how the world divides into natural regions — equatorial, monsoon, desert, Mediterranean, tundra and the rest — each with its own climate, vegetation and way of life shaped by them.',
    EV('Names a major natural region and its climate', 'Links the vegetation of a region to its climate', 'Explains how the climate of a region shapes life there'),
    'Ask {{name}} why the plants, animals and people of a desert differ so utterly from those of a rainforest.',
    ['GEO9.6', 'GEO9.7']),
  // ---------------- Class X: geography of India ----------------
  geo('icse-geo-topographical-maps', 'Interpreting Topographical Maps', GS, X, 'PROCEDURAL',
    'Understand a topographical map as a detailed picture of a small area, and read its conventional signs, grid references, scale and contour lines to work out the relief, drainage and land use.',
    EV('Gives a grid reference and measures a distance using the scale', 'Reads relief from contour lines', 'Interprets land use and settlement from the map’s signs'),
    'Ask {{name}} how a flat map can show which way a hill slopes and how steep it is.',
    ['GEO10.1']),
  geo('icse-geo-india-climate', 'The Climate of India', GI, X, 'CONCEPTUAL',
    'Understand India’s monsoon climate — how the seasonal reversal of winds brings the rains on which the country depends, and how temperature and rainfall vary across its seasons and regions.',
    EV('Explains the mechanism of the monsoon', 'Describes the seasons of the Indian year', 'Explains why rainfall varies so widely across India'),
    'Ask {{name}} why almost the whole of India waits each year for the same few months of rain.',
    ['GEO10.3']),
  geo('icse-geo-natural-vegetation', 'Natural Vegetation of India', GI, X, 'CONCEPTUAL',
    'Understand how India’s natural vegetation changes with its climate and soil — from tropical forests to thorn scrub and mountain forests — and why conserving forests matters.',
    EV('Matches a type of natural vegetation to its climate', 'Names a forest type of India and where it grows', 'Explains why forests need to be conserved'),
    'Ask {{name}} why dense forest grows in one part of India and only thorny scrub in another.',
    ['GEO10.5']),
];

// Align ICSE units onto the existing 14–16 Geography of India ladder and Science.
const alignments = {
  'mt_mTpV-0rtkO': ['GEO9.5'],  // Earth's Atmosphere & CO2 (pollution)  — quoted: id has a hyphen
  mt_XNhQZ4pJ8M: ['GEO9.5'],    // Acid Rain, Ozone Depletion and Air Pollution
  mt_NckKLZ3uCE: ['GEO9.2'],    // The Rock Cycle
  mt_fD1VfjtgyP: ['GEO10.2'],   // India's Physiographic Divisions
  mt_pR11CACjaq: ['GEO10.2'],   // India's Drainage Systems
  mt_0cDJP7Fwwm: ['GEO10.4'],   // Soil Types and Land Degradation
  mt_60NMkDEKSh: ['GEO10.6'],   // Water Scarcity and Rainwater Harvesting
  mt_4Fa8k33D8O: ['GEO10.7'],   // Minerals and Energy Resources
  mt_tw2D2QDYvq: ['GEO10.8'],   // Indian Agriculture: Cropping Patterns and Reforms
  mt_WSbUSYwUen: ['GEO10.9'],   // Industrial Location, Pollution and Sustainable Development
  mt_TzdumFchh6: ['GEO10.10'],  // Transport, Communication and Trade in Development
  mt_MqjZhvyWVa: ['GEO9.5', 'GEO10.11'], // Waste and Its Management
};

const newEdges = [
  // World physical geography, anchored to Science and chained together.
  { t: 'icse-geo-earth-structure', p: 'mt_NckKLZ3uCE', strength: 'hard', reason: 'The structure of the earth builds on the rock cycle.' },
  { t: 'icse-geo-latitude-longitude', p: 'icse-geo-earth-structure', strength: 'soft', reason: 'Locating places presupposes a picture of the earth.' },
  { t: 'icse-geo-hydrosphere', p: 'icse-geo-earth-structure', strength: 'soft', reason: 'The oceans sit on the structure of the earth.' },
  { t: 'icse-geo-atmosphere', p: 'mt_mTpV-0rtkO', strength: 'hard', reason: 'The atmosphere builds on its composition and carbon dioxide.' },
  { t: 'icse-geo-natural-regions', p: 'icse-geo-atmosphere', strength: 'hard', reason: 'Natural regions are defined by their climate.' },
  { t: 'icse-geo-natural-regions', p: 'icse-geo-hydrosphere', strength: 'soft', reason: 'Ocean currents shape the climate of natural regions.' },
  { t: 'icse-geo-topographical-maps', p: 'icse-geo-latitude-longitude', strength: 'hard', reason: 'Map grids extend latitude and longitude to a local area.' },
  { t: 'icse-geo-topographical-maps', p: 'mt_fD1VfjtgyP', strength: 'soft', reason: 'A topographical map shows the physical features studied in India’s geography.' },
  { t: 'icse-geo-india-climate', p: 'icse-geo-atmosphere', strength: 'soft', reason: 'India’s climate applies the general study of the atmosphere.' },
  { t: 'icse-geo-india-climate', p: 'mt_fD1VfjtgyP', strength: 'soft', reason: 'India’s climate is shaped by its physiography.' },
  { t: 'icse-geo-natural-vegetation', p: 'icse-geo-india-climate', strength: 'hard', reason: 'Natural vegetation follows the climate.' },
  { t: 'icse-geo-natural-vegetation', p: 'mt_0cDJP7Fwwm', strength: 'soft', reason: 'Vegetation depends on the soil as well as the climate.' },
  // Reverse anchors: the senior (16–18) physical-geography topics build on these.
  { t: 'mt_SmW7FrTgNv', p: 'icse-geo-earth-structure', strength: 'hard', reason: 'The senior study of the earth’s interior builds on this.' },
  { t: 'mt_gbVahRRkFb', p: 'icse-geo-hydrosphere', strength: 'hard', reason: 'The senior study of the oceans builds on the hydrosphere.' },
  { t: 'mt_8ePOctDnob', p: 'icse-geo-atmosphere', strength: 'hard', reason: 'The senior study of the atmosphere and heat budget builds on this.' },
  { t: 'mt_98maGySwL4', p: 'icse-geo-topographical-maps', strength: 'soft', reason: 'The senior study of maps and projections builds on reading topographical maps.' },
];

const newClusters = [
  { subject: 'Geography', domain: PG, ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'Class IX geography looks at the physical earth as a whole. It starts with the planet itself — the grid of latitude and longitude that locates any place, and the spin and tilt that give day, night and the seasons — then works through the three great envelopes of the earth: the solid earth of rock, volcano and earthquake; the hydrosphere of oceans, tides and currents; and the atmosphere that makes the weather. It ends by drawing these together into the natural regions of the world, each with the climate, plants and life that belong to it.' },
];

integrate({ subjectDoc: 'Geography (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
