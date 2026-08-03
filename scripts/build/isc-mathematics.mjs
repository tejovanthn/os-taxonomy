#!/usr/bin/env node
/**
 * build/isc-mathematics.mjs — ISC Mathematics, Classes XI–XII (ages 16–18).
 * Pure alignment onto the 16–18 Mathematics ladder built by ncert-hsec.
 * No new topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI
  s('MAT.C11.U1', 'XI', 'Sets', 'Sets, subsets and set operations.'),
  s('MAT.C11.U2', 'XI', 'Relations and Functions', 'Relations, functions and their graphs.'),
  s('MAT.C11.U3', 'XI', 'Trigonometric Functions', 'Trigonometric functions and the unit circle, and trigonometric identities and equations.'),
  s('MAT.C11.U4', 'XI', 'Mathematical Induction', 'The principle of mathematical induction.'),
  s('MAT.C11.U5', 'XI', 'Complex Numbers', 'Complex numbers and the Argand plane.'),
  s('MAT.C11.U6', 'XI', 'Linear Inequalities', 'Linear inequalities and their graphical solution.'),
  s('MAT.C11.U7', 'XI', 'Permutations and Combinations', 'The counting principles of permutations and combinations.'),
  s('MAT.C11.U8', 'XI', 'Binomial Theorem', 'The binomial theorem for a positive integral index.'),
  s('MAT.C11.U9', 'XI', 'Sequences and Series', 'Arithmetic and geometric progressions and series.'),
  s('MAT.C11.U10', 'XI', 'Straight Lines and Conic Sections', 'Straight lines and their equations, and the conic sections.'),
  s('MAT.C11.U11', 'XI', 'Introduction to Three-Dimensional Geometry', 'Coordinates in three dimensions.'),
  s('MAT.C11.U12', 'XI', 'Limits and Derivatives', 'Limits and the idea of a derivative.'),
  s('MAT.C11.U13', 'XI', 'Mathematical Reasoning', 'Mathematical reasoning and logical connectives.'),
  s('MAT.C11.U14', 'XI', 'Statistics and Probability', 'Measures of dispersion, and sample spaces and axiomatic probability.'),
  // XII
  s('MAT.C12.U1', 'XII', 'Relations and Functions', 'Types of relations and inverse functions, and inverse trigonometric functions.'),
  s('MAT.C12.U2', 'XII', 'Matrices and Determinants', 'Matrices and their operations, and determinants, adjoint, inverse and linear systems.'),
  s('MAT.C12.U3', 'XII', 'Continuity and Differentiability', 'Continuity and differentiability, and the techniques of differentiation.'),
  s('MAT.C12.U4', 'XII', 'Applications of Derivatives', 'The applications of derivatives.'),
  s('MAT.C12.U5', 'XII', 'Integrals and Their Applications', 'Integration and its techniques, definite integrals, and areas under and between curves.'),
  s('MAT.C12.U6', 'XII', 'Differential Equations', 'The formation and solution of differential equations.'),
  s('MAT.C12.U7', 'XII', 'Vectors and Three-Dimensional Geometry', 'Vectors and their products, and lines and planes in space.'),
  s('MAT.C12.U8', 'XII', 'Linear Programming', 'Linear programming problems and their graphical solution.'),
  s('MAT.C12.U9', 'XII', 'Probability', 'Conditional probability and Bayes’ theorem, and random variables and the binomial distribution.'),
];

const alignments = {
  mt_CXqMHB45fB: ['MAT.C11.U1'],
  mt_9rE4aUZ2rI: ['MAT.C11.U2'],
  mt_1bYQBWlJUc: ['MAT.C11.U3'], mt_V0XjyCDO1f: ['MAT.C11.U3'],
  mt_HKCYY309r6: ['MAT.C11.U4'],
  mt_iwsSy40Cz7: ['MAT.C11.U5'],
  mt_CbQHt4sEUv: ['MAT.C11.U6'],
  mt_fcUmPgxPAw: ['MAT.C11.U7'],
  mt_3sZRS9ghqF: ['MAT.C11.U8'],
  mt_UlEOUiLIt1: ['MAT.C11.U9'],
  mt_AYsuzJr4Fq: ['MAT.C11.U10'], mt_lOMVBkRwas: ['MAT.C11.U10'],
  mt_07GDWGBJ85: ['MAT.C11.U11'],
  mt_VHfWpad8qo: ['MAT.C11.U12'],
  mt_KuDXGCrPzb: ['MAT.C11.U13'],
  mt_idU3JPaQaN: ['MAT.C11.U14'], mt_6th44RdI9b: ['MAT.C11.U14'],
  mt_bngCO6T8R9: ['MAT.C12.U1'], mt_H1B9ZNQlUn: ['MAT.C12.U1'],
  mt_yCrineYUH8: ['MAT.C12.U2'], mt_gRAOMFvl7D: ['MAT.C12.U2'], mt_GP5yAS9SAn: ['MAT.C12.U2'],
  mt_LHazmL09hq: ['MAT.C12.U3'], mt_JOw8z6Cap0: ['MAT.C12.U3'],
  mt_9WLPabHUrv: ['MAT.C12.U4'],
  mt_fzvhHzjGLI: ['MAT.C12.U5'], mt_FyAANENFTb: ['MAT.C12.U5'], mt_rrHVj55hTE: ['MAT.C12.U5'],
  mt_xADrLjP7xB: ['MAT.C12.U6'],
  mt_tjPZDhac6f: ['MAT.C12.U7'], mt_9y1fpkAnNQ: ['MAT.C12.U7'],
  mt_XjNwXYy1xA: ['MAT.C12.U8'],
  mt_ygWtTuCRWo: ['MAT.C12.U9'], mt_WXBy9Q0sEW: ['MAT.C12.U9'],
};

integrate({ subjectDoc: 'Mathematics (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
