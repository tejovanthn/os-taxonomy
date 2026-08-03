#!/usr/bin/env node
/**
 * build/isc-sociology.mjs — ISC Sociology, Classes XI–XII (ages 16–18).
 * Pure alignment onto the 16–18 Sociology ladder built by ncert-hsec. No new
 * topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI — Introducing Sociology / Understanding Society
  s('SOC.C11.U1', 'XI', 'Sociology and Society', 'What sociology studies, the sociological imagination, and society, social structure and social processes.'),
  s('SOC.C11.U2', 'XI', 'Basic Concepts', 'Social groups, status and role, culture and socialisation, and social control and deviance.'),
  s('SOC.C11.U3', 'XI', 'Social Institutions', 'The family, religion, education, and political and economic institutions.'),
  s('SOC.C11.U4', 'XI', 'Social Stratification', 'Social stratification by class, caste, race and gender.'),
  s('SOC.C11.U5', 'XI', 'Social Change and Order', 'Social change and its types, and social order, authority and law.'),
  s('SOC.C11.U6', 'XI', 'Sociological Thought and Methods', 'The founding thinkers Marx, Durkheim and Weber, Indian sociologists, and sociological research methods.'),
  // XII — Indian Society / Social Change and Development in India
  s('SOC.C12.U1', 'XII', 'Structure of Indian Society', 'The demographic structure of Indian society, and the caste system, tribal society and inequality.'),
  s('SOC.C12.U2', 'XII', 'Social Institutions and Diversity', 'The market as a social institution, and the challenges of communalism, regionalism and diversity.'),
  s('SOC.C12.U3', 'XII', 'Structural and Cultural Change', 'Colonialism and its legacy, industrialisation and urbanisation, and Sanskritisation, Westernisation and secularisation.'),
  s('SOC.C12.U4', 'XII', 'Change and Development in Rural and Urban India', 'The constitution as an instrument of change, land reforms and the green revolution, and life in village, town and city.'),
  s('SOC.C12.U5', 'XII', 'Globalisation and Social Change', 'Liberalisation and class change, media and globalisation, social movements, the struggle for women’s equality, and ecology and society.'),
];

const alignments = {
  mt_XkVGpY4xSd: ['SOC.C11.U1'], mt_OL72TaSPnb: ['SOC.C11.U1'], mt_nJhd3cF5Q5: ['SOC.C11.U1'],
  mt_cYvwc8SLXA: ['SOC.C11.U2'], mt_NEsZ73N545: ['SOC.C11.U2'], mt_6nZPDaYcRw: ['SOC.C11.U2'], mt_hPlJ4FMZnf: ['SOC.C11.U2'], mt_JCj1HVxjHe: ['SOC.C11.U2'],
  mt_XPAbBUa7SX: ['SOC.C11.U3'], mt_GSjZBiGcXm: ['SOC.C11.U3'], mt_iEGOBz4m7g: ['SOC.C11.U3'], mt_C7TmnFPBLy: ['SOC.C11.U3'],
  mt_wI1bqEs1aZ: ['SOC.C11.U4'],
  mt_KEE3xOZmbs: ['SOC.C11.U5'], mt_zxNUl0OAZB: ['SOC.C11.U5'],
  mt_tWrPcEaddI: ['SOC.C11.U6'], mt_FeWuS5wQRR: ['SOC.C11.U6'], mt_4rLC670Xsy: ['SOC.C11.U6'],
  mt_r6FnJ3PIbX: ['SOC.C12.U1'], mt_N6Bq2bSGVA: ['SOC.C12.U1'], mt_UdGGr4oUhS: ['SOC.C12.U1'], mt_3bSwu2z1zM: ['SOC.C12.U1'],
  mt_moLWCF06Oz: ['SOC.C12.U2'], mt_TSI1SYkpxd: ['SOC.C12.U2'],
  mt_JezGcH7nV2: ['SOC.C12.U3'], mt_1Vjk9nQkMH: ['SOC.C12.U3'], mt_3FY2watbhU: ['SOC.C12.U3'],
  mt_gbzJ8ArJ8W: ['SOC.C12.U4'], mt_8o3KqapEPz: ['SOC.C12.U4'], mt_cfZAQONCFJ: ['SOC.C12.U4'],
  mt_K7EgaRL4Fl: ['SOC.C12.U5'], mt_JBTqxKB1FM: ['SOC.C12.U5'], mt_BKcTBFbZbB: ['SOC.C12.U5'], mt_vVPEodQG45: ['SOC.C12.U5'], mt_XewXurwsAx: ['SOC.C12.U5'],
};

integrate({ subjectDoc: 'Sociology (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
