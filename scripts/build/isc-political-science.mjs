#!/usr/bin/env node
/**
 * build/isc-political-science.mjs — ISC Political Science, Classes XI–XII
 * (ages 16–18). Pure alignment onto the 16–18 Political Science ladder built by
 * ncert-hsec. No new topics. Marble-authored unit descriptions — no CISCE text.
 * Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI — Political Theory
  s('POL.C11.U1', 'XI', 'Political Theory and Democracy', 'What political theory studies and what democracy is and why it matters.'),
  s('POL.C11.U2', 'XI', 'Freedom, Equality and Justice', 'Freedom and equality as political values, and social justice, rights and citizenship.'),
  s('POL.C11.U3', 'XI', 'Nation, Secularism and Peace', 'Nationalism, secularism and peace.'),
  s('POL.C11.U4', 'XI', 'The Indian Constitution', 'Why a constitution and how it was made, its rights, and its electoral, executive, legislative and judicial framework.'),
  // XII — Indian Politics and International Relations
  s('POL.C12.U1', 'XII', 'The Working of Indian Democracy', 'Federalism and local government, the constitution as a living document, and the challenges to and outcomes of Indian democracy.'),
  s('POL.C12.U2', 'XII', 'Politics in India Since Independence', 'The Nehru era and one-party dominance, the crisis and restoration of the constitutional order, and new social movements and coalition politics.'),
  s('POL.C12.U3', 'XII', 'Democracy, Diversity and Social Movements', 'Democracy and social divisions, and social movements and democratic struggle.'),
  s('POL.C12.U4', 'XII', 'International Relations', 'The Cold War and its end, US dominance and alternative centres of power, and global issues of security, environment and globalisation.'),
];

const alignments = {
  mt_t1uBA7rr5T: ['POL.C11.U1'], mt_DVIPdRFomK: ['POL.C11.U1'],
  mt_lH9rSugxUF: ['POL.C11.U2'], mt_9ETtHXiv6E: ['POL.C11.U2'],
  mt_Y6nfYkDI9L: ['POL.C11.U3'],
  mt_ZuJdtA1EKn: ['POL.C11.U4'], mt_J6da2ZapXO: ['POL.C11.U4'], mt_pYVpmVkNQE: ['POL.C11.U4'], mt_mbdVjWWkKD: ['POL.C11.U4'], mt_bOFA6RKIkA: ['POL.C11.U4'],
  mt_Px207pEzXC: ['POL.C12.U1'], mt_hBf4f826BU: ['POL.C12.U1'], mt_ShckiEBhhI: ['POL.C12.U1'], mt_Ta8uFk10YT: ['POL.C12.U1'],
  mt_JOcTqdHOi5: ['POL.C12.U2'], mt_p6w2yuyZdS: ['POL.C12.U2'], mt_ehFgYgVyXm: ['POL.C12.U2'],
  mt_OlqoeqrPis: ['POL.C12.U3'], mt_VrT09BUGOv: ['POL.C12.U3'],
  mt_FroXZca3Qp: ['POL.C12.U4'], mt_Rb1GeLKNDg: ['POL.C12.U4'], mt_xYCpkfK1Eu: ['POL.C12.U4'],
};

integrate({ subjectDoc: 'Political Science (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
