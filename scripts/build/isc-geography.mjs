#!/usr/bin/env node
/**
 * build/isc-geography.mjs — ISC Geography, Classes XI–XII (ages 16–18).
 * Pure alignment onto the 16–18 Geography ladder built by ncert-hsec. No new
 * topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI — Fundamentals of Physical Geography
  s('GEO.C11.U1', 'XI', 'Geography as a Discipline and Maps', 'The nature of geography and maps, scale and projections.'),
  s('GEO.C11.U2', 'XI', 'The Earth and Its Landforms', 'The interior of the earth, plate tectonics, weathering and mass wasting, and erosional and depositional landforms.'),
  s('GEO.C11.U3', 'XI', 'Climatology', 'The atmosphere and the heat budget, pressure, winds and circulation, and water in the atmosphere and world climates.'),
  s('GEO.C11.U4', 'XI', 'Oceanography and the Biosphere', 'The oceans and their movements, and the biosphere and ecosystems.'),
  // XII — Human Geography and Geography of India
  s('GEO.C12.U1', 'XII', 'Fundamentals of Human Geography', 'The nature of human geography, primary, secondary and tertiary activities, and settlements.'),
  s('GEO.C12.U2', 'XII', 'Population, Transport and Trade', 'World population and its change, transport and communication networks, and international trade.'),
  s('GEO.C12.U3', 'XII', 'India: Physical Environment and Resources', 'India’s physiography, drainage and climate, and its land, water, mineral and energy resources.'),
  s('GEO.C12.U4', 'XII', 'India: People and Economy', 'India’s population, agriculture and industry, and planning and sustainable development.'),
  s('GEO.C12.U5', 'XII', 'Geographical Techniques', 'Thematic mapping and spatial technology.'),
];

const alignments = {
  mt_NeX8lPumh2: ['GEO.C11.U1'], mt_98maGySwL4: ['GEO.C11.U1'],
  mt_SmW7FrTgNv: ['GEO.C11.U2'], mt_KuruNjvyzH: ['GEO.C11.U2'], mt_aE5EKdsO5G: ['GEO.C11.U2'], mt_FF77oYAD60: ['GEO.C11.U2'],
  mt_8ePOctDnob: ['GEO.C11.U3'], mt_9spvyVNCUt: ['GEO.C11.U3'], mt_tudzMGZA1X: ['GEO.C11.U3'],
  mt_gbVahRRkFb: ['GEO.C11.U4'], mt_qvNAGGEYQF: ['GEO.C11.U4'],
  mt_Aq9deJzI4a: ['GEO.C12.U1'], mt_Yol9DGVCer: ['GEO.C12.U1'], mt_B6GdIp18Qa: ['GEO.C12.U1'],
  mt_SyCN9DSCYC: ['GEO.C12.U2'], mt_oMDUdsGxtn: ['GEO.C12.U2'], mt_gCyrtxowzg: ['GEO.C12.U2'], mt_s1fjqdrCSj: ['GEO.C12.U2'],
  mt_EhjasI9BaW: ['GEO.C12.U3'], mt_M0LGSlUMG3: ['GEO.C12.U3'], mt_uQmrcsYGFG: ['GEO.C12.U3'],
  mt_GfgpKzl4wq: ['GEO.C12.U4'], mt_a7GPbUmpDN: ['GEO.C12.U4'], mt_tEPgFUrHZ1: ['GEO.C12.U4'],
  mt_q0O0KOH3zX: ['GEO.C12.U5'],
};

integrate({ subjectDoc: 'Geography (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
