#!/usr/bin/env node
/**
 * build/isc-physics.mjs — ISC Physics, Classes XI–XII (ages 16–18).
 *
 * The Physics subject was built out densely at 16–18 by the ncert-hsec pass, and
 * ISC Physics covers the same senior syllabus, so this is a PURE ALIGNMENT pass:
 * every ISC unit maps onto Physics topics that already exist. No new topics are
 * minted. Marble-authored factual descriptions of the units — no CISCE text.
 * Idempotent.
 */

import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // ---- Class XI ----
  s('PHY.C11.U1', 'XI', 'Physical World and Measurement', 'Units and dimensions, dimensional analysis, and errors, precision and significant figures in measurement.'),
  s('PHY.C11.U2', 'XI', 'Kinematics', 'Motion in a straight line, vectors and their resolution, and projectile motion.'),
  s('PHY.C11.U3', 'XI', 'Laws of Motion', 'Newton’s laws, momentum and impulse, friction, and circular motion.'),
  s('PHY.C11.U4', 'XI', 'Work, Energy and Power', 'The work-energy theorem, conservation of mechanical energy, and elastic and inelastic collisions.'),
  s('PHY.C11.U5', 'XI', 'System of Particles and Rigid Body', 'Centre of mass, torque and angular momentum, and moment of inertia and rotational motion.'),
  s('PHY.C11.U6', 'XI', 'Gravitation', 'Kepler’s laws and universal gravitation, gravitational potential, escape speed and satellites.'),
  s('PHY.C11.U7', 'XI', 'Properties of Bulk Matter', 'Elasticity, fluid pressure and Pascal’s law, viscosity and Bernoulli’s theorem, and surface tension.'),
  s('PHY.C11.U8', 'XI', 'Heat and Thermodynamics', 'The laws of thermodynamics, calorimetry and latent heat, and conduction, convection and radiation.'),
  s('PHY.C11.U9', 'XI', 'Kinetic Theory of Gases', 'The behaviour of perfect gases and the kinetic theory of gases.'),
  s('PHY.C11.U10', 'XI', 'Oscillations and Waves', 'Simple harmonic motion, wave motion and superposition, standing waves and beats, and the Doppler effect.'),
  // ---- Class XII ----
  s('PHY.C12.U1', 'XII', 'Electrostatics', 'Coulomb’s law and the electric field, Gauss’s theorem, electric potential, and capacitors and dielectrics.'),
  s('PHY.C12.U2', 'XII', 'Current Electricity', 'Current as the drift of charge, resistivity and Ohm’s law, EMF and internal resistance, Kirchhoff’s laws, and the Wheatstone bridge and potentiometer.'),
  s('PHY.C12.U3', 'XII', 'Magnetic Effects of Current and Magnetism', 'The Biot-Savart and Ampère laws, the force on moving charges and conductors, the current loop as a magnetic dipole, and the earth’s magnetism and magnetic materials.'),
  s('PHY.C12.U4', 'XII', 'Electromagnetic Induction and Alternating Current', 'Faraday’s and Lenz’s laws, and alternating current, impedance and resonance.'),
  s('PHY.C12.U5', 'XII', 'Electromagnetic Waves', 'Electromagnetic waves and the electromagnetic spectrum.'),
  s('PHY.C12.U6', 'XII', 'Optics', 'Image formation by mirrors and lenses, total internal reflection and optical fibres, optical instruments, wave optics, and polarisation.'),
  s('PHY.C12.U7', 'XII', 'Dual Nature of Matter and Radiation; Atoms and Nuclei', 'The photoelectric effect and matter waves, the Rutherford and Bohr models, radioactivity, and binding energy, fission and fusion.'),
  s('PHY.C12.U8', 'XII', 'Electronic Devices', 'Semiconductors and the junction diode, the transistor, and logic gates.'),
];

// Pure alignment onto the existing 16–18 Physics ladder.
const alignments = {
  // XI
  mt_BYHEPQZS6E: ['PHY.C11.U1'], mt_4YpQduN0f6: ['PHY.C11.U1'],
  mt_t3g9uQ1xav: ['PHY.C11.U2'], mt_SVZ61nPdgi: ['PHY.C11.U2'], mt_rfqKf4dDlt: ['PHY.C11.U2'],
  mt_wkuoeBbgZx: ['PHY.C11.U3'], mt_x0d1BB8kSk: ['PHY.C11.U3'], mt_UOxhtisIUm: ['PHY.C11.U3'],
  mt_VLhHmLpYE3: ['PHY.C11.U4'], mt_6pcaTflnnx: ['PHY.C11.U4'], mt_UgYIfSkfzy: ['PHY.C11.U4'],
  mt_D4yJOQ2TNi: ['PHY.C11.U5'], mt_0QrCiQ6LVS: ['PHY.C11.U5'], mt_aRnaa8ttKe: ['PHY.C11.U5'],
  mt_aF7WMjev8J: ['PHY.C11.U6'], mt_hw0bYvM2zS: ['PHY.C11.U6'],
  mt_U77mH9oAXL: ['PHY.C11.U7'], mt_IEPUqrJpmk: ['PHY.C11.U7'], mt_4jBdH4Jdjt: ['PHY.C11.U7'], mt_xhjf5488oe: ['PHY.C11.U7'],
  mt_dtEKMxiQHK: ['PHY.C11.U8'], mt_yiQHDbhpH5: ['PHY.C11.U8'], mt_gObcpLdJ4h: ['PHY.C11.U8'],
  mt_7Z1yWAFCrL: ['PHY.C11.U9'],
  mt_rqzBHiLWPc: ['PHY.C11.U10'], mt_RU4ERyXzz3: ['PHY.C11.U10'], mt_P1P1CeyQSF: ['PHY.C11.U10'], mt_OvUr1NB5mL: ['PHY.C11.U10'],
  // XII
  mt_Thvs20Cw9w: ['PHY.C12.U1'], mt_11kfdQV3Es: ['PHY.C12.U1'], mt_lwnEn0hACe: ['PHY.C12.U1'], mt_8m75UPJdOG: ['PHY.C12.U1'],
  mt_HENBAXC4SV: ['PHY.C12.U2'], mt_vLOMfLHK7e: ['PHY.C12.U2'], mt_tgCunGLwoJ: ['PHY.C12.U2'], mt_ef0TU0P8l5: ['PHY.C12.U2'], mt_PhsT13hNR7: ['PHY.C12.U2'],
  mt_fVaqWGwfp9: ['PHY.C12.U3'], mt_81hMdjmRZu: ['PHY.C12.U3'], mt_0DUD3CpR56: ['PHY.C12.U3'], mt_JmiIqglyxj: ['PHY.C12.U3'],
  mt_8sTAMpsOnw: ['PHY.C12.U4'], mt_3td5lJ0pR1: ['PHY.C12.U4'],
  mt_xAuR9mF16Q: ['PHY.C12.U5'],
  mt_sdHNUFpkPX: ['PHY.C12.U6'], mt_t0rTN2z6fx: ['PHY.C12.U6'], mt_G8TwCUQcuj: ['PHY.C12.U6'], mt_7k5YtzyXpR: ['PHY.C12.U6'], mt_7z3905ACr5: ['PHY.C12.U6'],
  mt_q8Lf0ddMQP: ['PHY.C12.U7'], mt_6BEU0BGn8i: ['PHY.C12.U7'], mt_MUNTBTfIIE: ['PHY.C12.U7'], mt_4cc1RD9vYd: ['PHY.C12.U7'],
  mt_hME090vOaH: ['PHY.C12.U8'], mt_WR1hBi2yuS: ['PHY.C12.U8'], mt_JDUB7RyyLd: ['PHY.C12.U8'],
};

integrate({ subjectDoc: 'Physics (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
