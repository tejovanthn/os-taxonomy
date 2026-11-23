#!/usr/bin/env node
/**
 * build/isc-arts-home-science.mjs — ISC Home Science, Art and Music,
 * Classes XI–XII (ages 16–18).
 *
 * These three subjects have no distinct 16–18 micro-topics in the taxonomy —
 * their coverage tops out at 14–16 (Home Science and Art from the ICSE pass,
 * Music from the KSGH graded exams and the ICSE Western-Music mints). ISC's
 * senior units cover the same content areas at greater depth, so they align onto
 * those existing topics as the taxonomy's representation of the subject rather
 * than duplicating it. No new topics. Marble-authored unit descriptions — no
 * CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const run = (subjectDoc, standards, alignments) =>
  integrate({ subjectDoc, standards, newTopics: [], alignments, newEdges: [], newClusters: [] });

// ---- Home Science ----
run('Home Science (XI–XII)', [
  s('HSC.C11.U1', 'XI', 'Food, Nutrition and Health', 'The functions of food, nutrients and balanced diets, deficiency diseases, and food safety.'),
  s('HSC.C11.U2', 'XI', 'Human Development', 'Growth and development, play in early childhood, and childhood health and immunisation.'),
  s('HSC.C11.U3', 'XI', 'Resource and Home Management', 'Managing family resources, consumer education, and the management of the home.'),
  s('HSC.C12.U1', 'XII', 'Textiles and Clothing', 'Textile fibres and fabric construction, and the selection and care of clothing.'),
  s('HSC.C12.U2', 'XII', 'Health and First Aid', 'Home nursing and first aid, and the prevention of disease.'),
  s('HSC.C12.U3', 'XII', 'Communication and Extension', 'The communication process and interpersonal communication skills.'),
], {
  mt_2OnbhZ02fK: ['HSC.C11.U1'], mt_0hJPBXS3nE: ['HSC.C11.U1'], mt_fA4uM3f9IX: ['HSC.C11.U1'], mt_reuQF6QDDo: ['HSC.C11.U1'], mt_H3f0rwBuKf: ['HSC.C11.U1'],
  mt_uWgNCbC6Hy: ['HSC.C11.U2'], mt_ZdgKaFiP82: ['HSC.C11.U2'], mt_OrQmx2SuTo: ['HSC.C11.U2'],
  mt_CYEyqYYkNn: ['HSC.C11.U3'], mt_Jh5MCyRTh7: ['HSC.C11.U3'], mt_BXXo6aACXZ: ['HSC.C11.U3'], mt_PWH2Kou0mK: ['HSC.C11.U3'],
  mt_pE3Mruczmm: ['HSC.C12.U1'], mt_hdqEjg9ipG: ['HSC.C12.U1'], mt_KN6c2I9QuB: ['HSC.C12.U1'],
  mt_89nBn38YvO: ['HSC.C12.U2'],
  mt_9PClrcGdFl: ['HSC.C12.U3'], mt_dUhO5xkNFI: ['HSC.C12.U3'],
});

// ---- Art ----
run('Art (XI–XII)', [
  s('ART.C11.U1', 'XI', 'Drawing and Painting', 'Observational drawing, tonal modelling, perspective, and the study of natural forms and landscape.'),
  s('ART.C11.U2', 'XI', 'Composition and Colour', 'Original imaginative composition and colour schemes and harmony.'),
  s('ART.C12.U1', 'XII', 'Applied and Graphic Art', 'Designing for a purpose, lettering and calligraphy, and decorative pattern.'),
  s('ART.C12.U2', 'XII', 'Crafts and Media', 'Printmaking and working in three dimensions.'),
], {
  mt_nw1NP5vdxr: ['ART.C11.U1'], mt_bMBUxa3ZqT: ['ART.C11.U1'], mt_9dnb6Co9nH: ['ART.C11.U1'], mt_r1oJRyQV7V: ['ART.C11.U1'], mt_qax1om0RWq: ['ART.C11.U1'],
  mt_ifiEP7bFiW: ['ART.C11.U2'], mt_jHUAFFKAoj: ['ART.C11.U2'],
  mt_HH1iGY2HH2: ['ART.C12.U1'], mt_4szmk3N9Ps: ['ART.C12.U1'], mt_BOvhV3mfsx: ['ART.C12.U1'],
  mt_DGXoX2gluf: ['ART.C12.U2'], mt_T4DaenhQ7G: ['ART.C12.U2'],
});

// ---- Music ----
run('Music (XI–XII)', [
  s('MUS.C11.U1', 'XI', 'Indian Music', 'The theory and practice of Indian classical music — ragas, talas and the concert forms.'),
  s('MUS.C12.U1', 'XII', 'Western Music', 'The theory and practice of Western music — staff notation, scales, harmony and performance.'),
], {
  mt_tEcnltwtuz: ['MUS.C11.U1'], mt_FrbFaRvafB: ['MUS.C11.U1'], mt_Cb5qBmZwH8: ['MUS.C11.U1'], mt_Kpc84FlHIt: ['MUS.C11.U1'],
  mt_OivTCuxbwx: ['MUS.C12.U1'], mt_rVEXPpTUW8: ['MUS.C12.U1'], mt_u1EZz0nfFc: ['MUS.C12.U1'],
});
