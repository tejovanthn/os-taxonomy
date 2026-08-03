#!/usr/bin/env node
/**
 * build/isc-biology.mjs — ISC Biology, Classes XI–XII (ages 16–18).
 * Pure alignment onto the dense 16–18 Biology ladder built by ncert-hsec.
 * No new topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI
  s('BIO.C11.U1', 'XI', 'Diversity of Living Organisms', 'The five kingdom classification, systematics and binomial nomenclature, and the major groups of plants and animals.'),
  s('BIO.C11.U2', 'XI', 'Structural Organisation in Plants and Animals', 'The morphology and anatomy of flowering plants, and the tissues and body organisation of animals.'),
  s('BIO.C11.U3', 'XI', 'Cell: Structure and Function', 'Cell organelles, the cell cycle and division, biomolecules, and enzymes.'),
  s('BIO.C11.U4', 'XI', 'Plant Physiology', 'Transport and mineral nutrition, transpiration, photosynthesis, respiration and plant growth regulators.'),
  s('BIO.C11.U5', 'XI', 'Human Physiology', 'Digestion, breathing, circulation, excretion, locomotion, and neural and endocrine coordination.'),
  // XII
  s('BIO.C12.U1', 'XII', 'Reproduction', 'Reproduction in flowering plants, human reproduction and the menstrual cycle, and reproductive health.'),
  s('BIO.C12.U2', 'XII', 'Genetics and Evolution', 'Mendelian inheritance and its deviations, linkage, sex-linked inheritance, the molecular basis of inheritance, and evolution.'),
  s('BIO.C12.U3', 'XII', 'Biology and Human Welfare', 'Immunity and disease, microbes and welfare, and animal husbandry and plant breeding.'),
  s('BIO.C12.U4', 'XII', 'Biotechnology', 'Recombinant DNA technology and genetically modified organisms.'),
  s('BIO.C12.U5', 'XII', 'Ecology and Environment', 'Ecosystems and energy flow, populations and communities, and biodiversity conservation.'),
];

const alignments = {
  // XI
  mt_vdLWeb4Jvk: ['BIO.C11.U1'], mt_XsbZcdaI62: ['BIO.C11.U1'], mt_55LopQHLtf: ['BIO.C11.U1'],
  mt_EQTcgpAVrm: ['BIO.C11.U2'], mt_9KEs6JLlCs: ['BIO.C11.U2'], mt_C2HnTJ1FPM: ['BIO.C11.U2'],
  mt_242QTzoZyx: ['BIO.C11.U3'], mt_BTpZFiW5Ge: ['BIO.C11.U3'], mt_QvFbpwUEQ2: ['BIO.C11.U3'], mt_LhRaUEB41L: ['BIO.C11.U3'],
  mt_IIdMDmzs7d: ['BIO.C11.U4'], mt_IwqexNZegJ: ['BIO.C11.U4'], mt_YBYjtjQDNM: ['BIO.C11.U4'], mt_jNhqBvzwG6: ['BIO.C11.U4'], mt_dEUqJmV7Ov: ['BIO.C11.U4'], mt_9DBB49pBl5: ['BIO.C11.U4'],
  mt_4QhFwz3Ddm: ['BIO.C11.U5'], mt_RGOmcz7mx4: ['BIO.C11.U5'], mt_KUDwWF9qwo: ['BIO.C11.U5'], mt_iuLF7rbFYo: ['BIO.C11.U5'], mt_MbmNlfOv7P: ['BIO.C11.U5'], mt_uYh7emXtEt: ['BIO.C11.U5'],
  // XII
  mt_idsH0UOsAP: ['BIO.C12.U1'], mt_VND4ucozJC: ['BIO.C12.U1'], mt_qrBIiPo3Yc: ['BIO.C12.U1'],
  mt_EmDPs3ZBwY: ['BIO.C12.U2'], mt_s3SZjIqK9f: ['BIO.C12.U2'], mt_pJeCKdMSGq: ['BIO.C12.U2'], mt_5NY2bkGiHf: ['BIO.C12.U2'], mt_7kKtb2ocFv: ['BIO.C12.U2'], mt_SCvKK1MHpx: ['BIO.C12.U2'], mt_yhGLKMsh3d: ['BIO.C12.U2'], mt_atK5D8zcdX: ['BIO.C12.U2'],
  mt_9S4hxDqOYT: ['BIO.C12.U3'], mt_ecWrNNlJeM: ['BIO.C12.U3'], mt_r12sfmIoPz: ['BIO.C12.U3'], mt_GzpXuzjrKA: ['BIO.C12.U3'],
  mt_3c7pkWp93Q: ['BIO.C12.U4'], mt_MRselUe41W: ['BIO.C12.U4'], mt_kRqkOzREhy: ['BIO.C12.U4'],
  mt_pT8cPGLRpq: ['BIO.C12.U5'], mt_B30AyRw53X: ['BIO.C12.U5'], mt_mxVwYQc2Ep: ['BIO.C12.U5'], mt_YKQXdSHU7f: ['BIO.C12.U5'],
};

integrate({ subjectDoc: 'Biology (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
