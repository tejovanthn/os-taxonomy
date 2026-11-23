#!/usr/bin/env node
/**
 * build/isc-history.mjs — ISC History, Classes XI–XII (ages 16–18).
 * Pure alignment onto the 16–18 History ladder built by ncert-hsec (World
 * History for XI; the source-based Themes in Indian History for XII). No new
 * topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI — World History
  s('HIS.C11.U1', 'XI', 'Early Societies', 'From the earliest humans to the first cities and civilisations.'),
  s('HIS.C11.U2', 'XI', 'Empires', 'The great empires — an empire across three continents, the central Islamic lands, and the nomadic empires.'),
  s('HIS.C11.U3', 'XI', 'Changing Traditions', 'The three orders of medieval Europe, changing cultural traditions, and the confrontation of cultures and displacement of indigenous peoples.'),
  s('HIS.C11.U4', 'XI', 'Paths to Modernisation', 'The Industrial Revolution and the paths to modernisation in East Asia.'),
  // XII — Themes in Indian History
  s('HIS.C12.U1', 'XII', 'Early India through Its Sources', 'Reconstructing early India from inscriptions, the Mahabharata and Buddhist remains such as Sanchi.'),
  s('HIS.C12.U2', 'XII', 'Medieval India through Its Sources', 'Agrarian relations in the Ain-i-Akbari, the Mughal court and its chronicles, the Bhakti and Sufi traditions, Hampi, and travellers’ accounts.'),
  s('HIS.C12.U3', 'XII', 'Modern India through Its Sources', 'Colonialism and rural society, the revolt of 1857 and its representations, colonial towns, Gandhi through contemporary eyes, Partition through oral sources, and the making of the constitution.'),
];

const alignments = {
  mt_EZoPzA2L0d: ['HIS.C11.U1'],
  mt_DfGngupvn5: ['HIS.C11.U2'], mt_zbTG43f25w: ['HIS.C11.U2'], mt_ncpg6CaeRt: ['HIS.C11.U2'],
  mt_b2x5PAwpWM: ['HIS.C11.U3'], mt_qDcAB4TCW3: ['HIS.C11.U3'], mt_GUxjGXkxDe: ['HIS.C11.U3'], mt_QWi0Eub64r: ['HIS.C11.U3'],
  mt_W5wwu4bqK0: ['HIS.C11.U4'], mt_Byn9hO7iKi: ['HIS.C11.U4'],
  mt_dfxFv6seqo: ['HIS.C12.U1'], mt_EZjJYc19rf: ['HIS.C12.U1'], mt_lHjjHdGaJZ: ['HIS.C12.U1'],
  mt_qsHSV8rdwD: ['HIS.C12.U2'], mt_vd9itHhZ82: ['HIS.C12.U2'], mt_PM0KCYxrLV: ['HIS.C12.U2'], mt_FWz7QDywm4: ['HIS.C12.U2'], mt_QyNBjSUmHn: ['HIS.C12.U2'],
  mt_rnZlSxOxfd: ['HIS.C12.U3'], mt_6paN3TBEao: ['HIS.C12.U3'], mt_0DULw9ivxF: ['HIS.C12.U3'], mt_9G6qAKdLsL: ['HIS.C12.U3'], mt_vqYJIj5UUr: ['HIS.C12.U3'], mt_c6KzmRPkbX: ['HIS.C12.U3'],
};

integrate({ subjectDoc: 'History (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
