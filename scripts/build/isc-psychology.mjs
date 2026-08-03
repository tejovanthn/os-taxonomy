#!/usr/bin/env node
/**
 * build/isc-psychology.mjs — ISC Psychology, Classes XI–XII (ages 16–18).
 * Pure alignment onto the 16–18 Psychology ladder built by ncert-hsec. No new
 * topics. Marble-authored unit descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // XI
  s('PSY.C11.U1', 'XI', 'What is Psychology and Its Methods', 'Psychology as a discipline and the methods of psychological enquiry.'),
  s('PSY.C11.U2', 'XI', 'Bases of Behaviour', 'The biological bases of behaviour, and culture, socialisation and behaviour.'),
  s('PSY.C11.U3', 'XI', 'Human Development', 'Development across the life span and the challenges of adolescence.'),
  s('PSY.C11.U4', 'XI', 'Sensory, Attentional and Perceptual Processes', 'Sensation and perception, and selective and sustained attention.'),
  s('PSY.C11.U5', 'XI', 'Learning, Memory and Thinking', 'Learning and conditioning, human memory and forgetting, thinking and problem solving, and language and thought.'),
  s('PSY.C11.U6', 'XI', 'Motivation and Emotion', 'The processes of motivation and emotion.'),
  // XII
  s('PSY.C12.U1', 'XII', 'Intelligence and Individual Differences', 'Intelligence and its assessment, and special abilities, aptitude and creativity.'),
  s('PSY.C12.U2', 'XII', 'Self and Personality', 'The self and its cultural shaping, and theories of personality.'),
  s('PSY.C12.U3', 'XII', 'Mental Health and Disorders', 'Stress, coping and well-being, psychological disorders, and therapeutic approaches.'),
  s('PSY.C12.U4', 'XII', 'Social Psychology', 'Attitudes and prejudice, social cognition, conformity and obedience, and group processes.'),
  s('PSY.C12.U5', 'XII', 'Applying Psychology', 'Developing psychological skills, environmental psychology, and psychology applied to social problems.'),
];

const alignments = {
  mt_wmnNEDR2L3: ['PSY.C11.U1'], mt_UUC1B6rv5W: ['PSY.C11.U1'],
  mt_8s0eGdc0oQ: ['PSY.C11.U2'], mt_vT0njZ0z9y: ['PSY.C11.U2'],
  mt_ntST0A5T4f: ['PSY.C11.U3'], mt_X56AyLU5J5: ['PSY.C11.U3'],
  mt_c3ARSwTYib: ['PSY.C11.U4'], mt_Jgo02Qd49H: ['PSY.C11.U4'],
  mt_PZWQJWJpGD: ['PSY.C11.U5'], mt_35hrRlgjSd: ['PSY.C11.U5'], mt_GCT1wHTTxa: ['PSY.C11.U5'], mt_0j1sBb1Lvm: ['PSY.C11.U5'],
  mt_tIn5s9aMbZ: ['PSY.C11.U6'],
  mt_hyJ37Ly0MM: ['PSY.C12.U1'], mt_UWAM23lVXu: ['PSY.C12.U1'],
  mt_jRMLYs1dQ3: ['PSY.C12.U2'], mt_tSN54DFdbx: ['PSY.C12.U2'],
  mt_9gHf2Eh3aq: ['PSY.C12.U3'], mt_egPukwV209: ['PSY.C12.U3'], mt_MxnPJi8Gzk: ['PSY.C12.U3'],
  mt_x7sgXfvwpQ: ['PSY.C12.U4'], mt_cU4PxHUXuq: ['PSY.C12.U4'], mt_sCb1GHCPDk: ['PSY.C12.U4'], mt_HsVCCet8lx: ['PSY.C12.U4'],
  mt_zb0DiAhZVr: ['PSY.C12.U5'], mt_kgie8N4G4q: ['PSY.C12.U5'], mt_8TKaIliclO: ['PSY.C12.U5'],
};

integrate({ subjectDoc: 'Psychology (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
