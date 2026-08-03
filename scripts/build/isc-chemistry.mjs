#!/usr/bin/env node
/**
 * build/isc-chemistry.mjs — ISC Chemistry, Classes XI–XII (ages 16–18).
 * Pure alignment onto the dense 16–18 Chemistry ladder built by ncert-hsec.
 * No new topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI
  s('CHE.C11.U1', 'XI', 'Some Basic Concepts of Chemistry', 'The mole concept, stoichiometry and reacting masses.'),
  s('CHE.C11.U2', 'XI', 'Structure of Atom', 'The quantum atom, orbitals and quantum numbers, and electronic configuration.'),
  s('CHE.C11.U3', 'XI', 'Periodic Table and Periodicity', 'The periodic classification and the trends in atomic properties.'),
  s('CHE.C11.U4', 'XI', 'Chemical Bonding and Molecular Structure', 'Ionic and covalent bonding, VSEPR theory, and hybridisation and valence bond theory.'),
  s('CHE.C11.U5', 'XI', 'States of Matter', 'The gas laws and the ideal gas equation, real gases, and intermolecular forces and hydrogen bonding.'),
  s('CHE.C11.U6', 'XI', 'Chemical Thermodynamics', 'Enthalpy and Hess’s law, and entropy, free energy and spontaneity.'),
  s('CHE.C11.U7', 'XI', 'Equilibrium', 'Chemical equilibrium and Le Chatelier’s principle, ionic equilibrium and the pH scale, and buffers and solubility.'),
  s('CHE.C11.U8', 'XI', 'Redox Reactions', 'Oxidation number and the balancing of redox reactions.'),
  s('CHE.C11.U9', 'XI', 'Hydrogen', 'Hydrogen and its compounds.'),
  s('CHE.C11.U10', 'XI', 's-Block Elements', 'The alkali and alkaline earth metals.'),
  s('CHE.C11.U11', 'XI', 'p-Block Elements (Groups 13–14)', 'The boron and carbon families.'),
  s('CHE.C11.U12', 'XI', 'Organic Chemistry: Basic Principles', 'IUPAC nomenclature, and electronic effects and reaction intermediates.'),
  s('CHE.C11.U13', 'XI', 'Hydrocarbons', 'Alkanes, alkenes, alkynes, and benzene and aromaticity.'),
  s('CHE.C11.U14', 'XI', 'Environmental Chemistry', 'Environmental chemistry and green chemistry.'),
  // XII
  s('CHE.C12.U1', 'XII', 'The Solid State', 'The solid state and unit cells.'),
  s('CHE.C12.U2', 'XII', 'Solutions', 'Solutions and colligative properties.'),
  s('CHE.C12.U3', 'XII', 'Electrochemistry', 'Electrochemical cells and the Nernst equation, electrolysis and conductance, and corrosion.'),
  s('CHE.C12.U4', 'XII', 'Chemical Kinetics', 'Rate laws and order, and collision theory, activation energy and catalysis.'),
  s('CHE.C12.U5', 'XII', 'Surface Chemistry', 'Adsorption and the colloidal state.'),
  s('CHE.C12.U6', 'XII', 'General Principles of Metallurgy', 'The principles of the extraction of metals.'),
  s('CHE.C12.U7', 'XII', 'p-Block Elements (Groups 15–18)', 'The nitrogen, oxygen, halogen and noble-gas families.'),
  s('CHE.C12.U8', 'XII', 'd- and f-Block Elements', 'The transition and inner-transition elements.'),
  s('CHE.C12.U9', 'XII', 'Coordination Compounds', 'Coordination compounds and their bonding.'),
  s('CHE.C12.U10', 'XII', 'Haloalkanes and Haloarenes', 'Haloalkanes and nucleophilic substitution.'),
  s('CHE.C12.U11', 'XII', 'Alcohols, Phenols and Ethers', 'Alcohols and phenols, and ethers.'),
  s('CHE.C12.U12', 'XII', 'Aldehydes, Ketones and Carboxylic Acids', 'Aldehydes and ketones and nucleophilic addition, and carboxylic acids.'),
  s('CHE.C12.U13', 'XII', 'Organic Compounds Containing Nitrogen', 'Amines and diazonium salts.'),
  s('CHE.C12.U14', 'XII', 'Biomolecules', 'Carbohydrates, proteins and enzymes, and nucleic acids and vitamins.'),
  s('CHE.C12.U15', 'XII', 'Polymers', 'The classes and preparation of polymers.'),
  s('CHE.C12.U16', 'XII', 'Chemistry in Everyday Life', 'Chemistry in everyday life — drugs, food and cleansing agents.'),
];

const alignments = {
  mt_MPlojUG33N: ['CHE.C11.U1'],
  mt_gdWHQduH6o: ['CHE.C11.U2'], mt_JO7ZdwoJli: ['CHE.C11.U2'],
  mt_JEYmJUXPn6: ['CHE.C11.U3'],
  mt_TW7VUyCiBI: ['CHE.C11.U4'], mt_bH2dNb59ml: ['CHE.C11.U4'], mt_j4aLtBDPiM: ['CHE.C11.U4'],
  mt_RMLacbaTPr: ['CHE.C11.U5'], mt_YE863C0gHZ: ['CHE.C11.U5'], mt_KAenhScCp1: ['CHE.C11.U5'],
  mt_IRu53AItu4: ['CHE.C11.U6'], mt_tmdzqsU1WE: ['CHE.C11.U6'],
  mt_SDCd5grBpQ: ['CHE.C11.U7'], mt_Nep5PcwnGk: ['CHE.C11.U7'], mt_EugwSoQuhA: ['CHE.C11.U7'],
  mt_jFeQ7T89LS: ['CHE.C11.U8'],
  mt_paCmQCya6m: ['CHE.C11.U9'],
  mt_DAyAvIcrn1: ['CHE.C11.U10'],
  mt_b3XzejLzAW: ['CHE.C11.U11'],
  mt_RTNQKgrFO5: ['CHE.C11.U12'], mt_qR0V7rZq47: ['CHE.C11.U12'],
  mt_n2sBudvjSK: ['CHE.C11.U13'], mt_UFUIAwwwEb: ['CHE.C11.U13'], mt_y8XEnbzNlH: ['CHE.C11.U13'], mt_ZTEAKAuuO7: ['CHE.C11.U13'],
  mt_aQJnEk0FVv: ['CHE.C11.U14'],
  mt_98IA97d6yn: ['CHE.C12.U1'],
  mt_q2kGHTJH5s: ['CHE.C12.U2'],
  mt_k24UxiIFWO: ['CHE.C12.U3'], mt_YHqOwdvJ4x: ['CHE.C12.U3'], mt_hZ1N6xE82i: ['CHE.C12.U3'],
  mt_X26ncid7bv: ['CHE.C12.U4'], mt_2sqSvuu0Mn: ['CHE.C12.U4'],
  mt_80Sb9JI1Es: ['CHE.C12.U5'],
  mt_64BcOrxkJT: ['CHE.C12.U6'],
  mt_Q0HIafyT5M: ['CHE.C12.U7'],
  mt_mrAQiMCvDM: ['CHE.C12.U8'],
  mt_AfPcEJE9Mx: ['CHE.C12.U9'],
  mt_0xSs0MkMgO: ['CHE.C12.U10'],
  mt_Lq4yHFNmu8: ['CHE.C12.U11'], mt_z6xYOgCzfA: ['CHE.C12.U11'],
  mt_8unSEOrpKD: ['CHE.C12.U12'], mt_o9ofT2PXze: ['CHE.C12.U12'],
  mt_QEOHAzSDBJ: ['CHE.C12.U13'],
  mt_7wcloflGqV: ['CHE.C12.U14'], mt_bmYWs89ulB: ['CHE.C12.U14'], mt_xVNifHi31g: ['CHE.C12.U14'],
  mt_BJnhjrrORk: ['CHE.C12.U15'],
  mt_bDFUpEwNnz: ['CHE.C12.U16'],
};

integrate({ subjectDoc: 'Chemistry (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
