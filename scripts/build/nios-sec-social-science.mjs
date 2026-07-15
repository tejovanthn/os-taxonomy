#!/usr/bin/env node
/**
 * build/nios-sec-social-science.mjs — NIOS Secondary Social Science (Code 213).
 * Almost entirely alignable to the existing India history/geography/civics work
 * (History + Social Studies subjects) plus world history. Mints only three
 * genuine gaps: modern world history, challenges to Indian democracy, and peace
 * & security. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Social Science', courseCode: '213' };
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('213.M1.L1', 'I. India and the World through the Ages', 'Ancient World', 'Ancient World', 'Understand the great civilisations and cultures of the ancient world.'),
  std('213.M1.L2', 'I. India and the World through the Ages', 'Medieval World', 'Medieval World', 'Understand the medieval world — its empires, faiths and cultures.'),
  std('213.M1.L3', 'I. India and the World through the Ages', 'Modern World – I', 'Modern World – I', 'Understand the making of the modern world — the Renaissance, revolutions and the rise of nation states.'),
  std('213.M1.L4', 'I. India and the World through the Ages', 'Modern World – II', 'Modern World – II', 'Understand the modern world — industrialisation, the world wars and decolonisation.'),
  std('213.M1.L5', 'I. India and the World through the Ages', 'Impact of British Rule in India', 'Impact of British Rule in India', 'Understand the impact of British rule on India’s economy and society.'),
  std('213.M1.L6', 'I. India and the World through the Ages', 'Religious and Social Reform Movements', 'Religious and Social Reform Movements', 'Understand the religious and social reform movements of modern India.'),
  std('213.M1.L7', 'I. India and the World through the Ages', 'Popular Resistance to British Rule', 'Popular Resistance to British Rule', 'Understand the popular uprisings against British rule, including the revolt of 1857.'),
  std('213.M1.L8', 'I. India and the World through the Ages', 'Indian National Movement', 'Indian National Movement', 'Understand the Indian national movement and the struggle for independence.'),
  std('213.M2.L9', 'II. India: Natural Environment and Resources', 'Physiography of India', 'Physiography of India', 'Understand the physical features of India — its mountains, plains, plateaus and coasts.'),
  std('213.M2.L10', 'II. India: Natural Environment and Resources', 'Climate', 'Climate', 'Understand India’s climate and the monsoon.'),
  std('213.M2.L11', 'II. India: Natural Environment and Resources', 'Bio-Diversity', 'Bio-Diversity', 'Understand India’s biodiversity — its forests, wildlife and the need for conservation.'),
  std('213.M2.L12', 'II. India: Natural Environment and Resources', 'Agriculture in India', 'Agriculture in India', 'Understand agriculture in India — its crops, seasons and importance.'),
  std('213.M2.L13', 'II. India: Natural Environment and Resources', 'Transport and Communication', 'Transport and Communication', 'Understand transport and communication in India and their role in development.'),
  std('213.M2.L14', 'II. India: Natural Environment and Resources', 'Population: Our Human Resource', 'Population: Our Human Resource', 'Understand India’s population as a human resource and the challenges of population growth.'),
  std('213.M3.L15', 'III. Democracy and its Values', 'Constitutional Values', 'Constitutional Values', 'Understand the values enshrined in the Indian Constitution.'),
  std('213.M3.L16', 'III. Democracy and its Values', 'Fundamental Rights', 'Fundamental Rights', 'Understand the fundamental rights of Indian citizens.'),
  std('213.M3.L17', 'III. Democracy and its Values', 'India: A Welfare State', 'India: A Welfare State', 'Understand India as a welfare state that works for the well-being of its people.'),
  std('213.M3.L18', 'III. Democracy and its Values', 'Local Government', 'Local Government', 'Understand local self-government in villages and towns.'),
  std('213.M3.L19', 'III. Democracy and its Values', 'Governance at the State Level', 'Governance at the State Level', 'Understand the structure and working of state government.'),
  std('213.M3.L20', 'III. Democracy and its Values', 'Governance at the Union Level', 'Governance at the Union Level', 'Understand the structure and working of the union (national) government.'),
  std('213.M3.L21', 'III. Democracy and its Values', 'Political Parties and Pressure Groups', 'Political Parties and Pressure Groups', 'Understand political parties and pressure groups in a democracy.'),
  std('213.M3.L22', 'III. Democracy and its Values', 'People’s Participation in Democracy', 'People’s Participation in Democracy', 'Understand how people participate in democracy through elections and civic action.'),
  std('213.M4.L23', 'IV. Contemporary India', 'Challenges to Indian Democracy', 'Challenges to Indian Democracy', 'Understand the challenges facing Indian democracy and how they can be addressed.'),
  std('213.M4.L24', 'IV. Contemporary India', 'National Integration', 'National Integration', 'Understand national integration and what holds a diverse India together.'),
  std('213.M4.L25', 'IV. Contemporary India', 'Socio-Economic Development', 'Socio-Economic Development', 'Understand socio-economic development and the schemes and issues involved.'),
  std('213.M4.L26', 'IV. Contemporary India', 'Environmental Concerns', 'Environmental Concerns', 'Understand environmental concerns and the need for sustainable development.'),
  std('213.M4.L27', 'IV. Contemporary India', 'Peace and Security', 'Peace and Security', 'Understand issues of peace and security in India and the world.'),
];

const alignments = Object.fromEntries([
  ['mt_JdAnBKIDnw', ['213.M1.L1']], ['mt_H4bLNkDrGJ', ['213.M1.L1', '213.M1.L2']], // ancient/medieval world
  ['mt_FUDkWnl03o', ['213.M1.L2']],                              // Delhi Sultanate ← Medieval World
  ['mt_gM1adZDGIy', ['213.M1.L5']],                              // British Rule in India ← Impact of British Rule
  ['mt_t6BQm5x5Su', ['213.M1.L6']],                              // Reform and Awakening ← Religious/Social Reform
  ['mt_urJm0eW3GK', ['213.M1.L7']],                              // Revolt of 1857 ← Popular Resistance
  ['mt_Jd2NQIbpjV', ['213.M1.L8']], ['mt_612ezPQBl1', ['213.M1.L8']], // Freedom Struggle + Congress ← National Movement
  ['mt_zniDXv3Ko3', ['213.M2.L9', '213.M2.L10']],                // Physical Features and Climate ← Physiography + Climate
  ['mt_RFilNlLL3T', ['213.M2.L11']],                             // Forests and Wildlife ← Bio-Diversity
  ['mt_D3sDOaujQk', ['213.M2.L12']],                             // Agriculture in India ← Agriculture
  ['mt_fwkPvwG8ET', ['213.M2.L13']],                             // How People and Goods Travel ← Transport
  ['mt_29aZtsWvgT', ['213.M2.L14']],                             // Population and Its Challenges ← Population
  ['mt_zFL9HpDF22', ['213.M3.L15']],                             // Constitution ← Constitutional Values
  ['mt_WaAVnaJ3Ne', ['213.M3.L16']],                             // Fundamental Rights ← Fundamental Rights
  ['mt_8SKBJJFzh1', ['213.M3.L17']],                             // Welfare Schemes ← Welfare State
  ['mt_FJZZUv2ewS', ['213.M3.L18']],                             // Panchayati Raj ← Local Government
  ['mt_iHCKCUdd4y', ['213.M3.L19']],                             // State Government ← Governance at State Level
  ['mt_Pzr7io8maf', ['213.M3.L20']], ['mt_yG7RDMJU9b', ['213.M3.L20']], // Legislature + Executive ← Governance at Union Level
  ['mt_ZfqyrBYcTZ', ['213.M3.L21']],                             // Political Parties ← Political Parties
  ['mt_Dx3DLwmuLq', ['213.M3.L22']],                             // Elections and Right to Vote ← People's Participation
  ['mt_sfHoytwSwm', ['213.M4.L24']],                             // Unity in Diversity ← National Integration
  ['mt_KraqV2LrXY', ['213.M4.L25']], ['mt_t1uflyWbd1', ['213.M4.L25']], // Socio-Cultural Issues + Dev Schemes ← Socio-Economic
  ['mt_YB0qF5KX9C', ['213.M4.L26']],                             // Human impact on environments ← Environmental Concerns
]);

const newTopics = [
  { _slug: 'ss-modern-world', subject: 'History', domain: 'Modern World', name: 'The Making of the Modern World', ageRangeStart: 14, ageRangeEnd: 16, type: 'CONCEPTUAL',
    description: 'Understand the forces that shaped the modern world — the Renaissance and scientific revolution, the great political and industrial revolutions, the world wars, and the wave of decolonisation that freed nations like India.',
    evidence: ['Name forces that shaped the modern world (revolutions, industrialisation)', 'Explain the significance of the world wars', 'Explain what decolonisation was'],
    assessmentPrompt: 'Can {{name}} explain some of the big changes that made the modern world — revolutions, industrialisation, the world wars, and nations winning independence?',
    standards: ['nios-sec-2020:213.M1.L3', 'nios-sec-2020:213.M1.L4'] },
  { _slug: 'ss-democracy-challenges', subject: 'Social Studies', domain: 'Governance & Constitution', name: 'Challenges to Indian Democracy', ageRangeStart: 14, ageRangeEnd: 16, type: 'CONCEPTUAL',
    description: 'Understand the challenges a large democracy like India faces — inequality, corruption, communalism and low participation — and how active, informed citizens help meet them.',
    evidence: ['Name a challenge facing Indian democracy', 'Explain why the challenge matters', 'Explain how citizens can help strengthen democracy'],
    assessmentPrompt: 'Can {{name}} describe a challenge facing India’s democracy and explain how citizens can help address it?',
    standards: ['nios-sec-2020:213.M4.L23'] },
  { _slug: 'ss-peace-security', subject: 'Social Studies', domain: 'Society & Development', name: 'Peace and Security in the World', ageRangeStart: 14, ageRangeEnd: 16, type: 'CONCEPTUAL',
    description: 'Understand why peace and security matter for nations and the world — the causes of conflict, the value of cooperation between countries, and the role of institutions that work for peace.',
    evidence: ['Explain why peace and security matter', 'Give an example of a cause of conflict', 'Explain how countries cooperate for peace'],
    assessmentPrompt: 'Can {{name}} explain why peace and security matter, and how countries work together to keep the peace?',
    standards: ['nios-sec-2020:213.M4.L27'] },
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const newEdges = [
  soft('ss-modern-world', 'mt_gM1adZDGIy', 'The modern world context frames British rule in India'),
  soft('ss-modern-world', 'mt_H4bLNkDrGJ', 'The modern world follows the medieval world'),
  soft('ss-democracy-challenges', 'mt_ECbqGTZYhL', 'Democracy’s challenges build on understanding how the government works'),
  soft('ss-democracy-challenges', 'mt_sfHoytwSwm', 'Communalism as a challenge builds on understanding unity in diversity'),
  soft('ss-peace-security', 'ss-modern-world', 'Peace and security are understood against the modern world of nations'),
  soft('ss-peace-security', 'mt_sfHoytwSwm', 'Peace within a nation builds on national unity in diversity'),
];

const newClusters = [
  { subject: 'History', domain: 'Modern World', ageRangeStart: 14, summary: 'Your teenager is learning how the modern world was made — the Renaissance and revolutions, industrialisation, the world wars, and how colonised nations like India won their freedom.' },
  { subject: 'Social Studies', domain: 'Governance & Constitution', ageRangeStart: 14, summary: 'Your teenager is thinking about the challenges a large democracy faces — inequality, corruption and communalism — and how active, informed citizens help meet them.' },
  { subject: 'Social Studies', domain: 'Society & Development', ageRangeStart: 14, summary: 'Your teenager is learning why peace and security matter for nations and the world, and how countries cooperate to keep the peace.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
