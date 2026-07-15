#!/usr/bin/env node
/**
 * build/nios-sec-home-science.mjs — NIOS Secondary Home Science (Code 216) → a
 * new "Home Science" subject across its five components (food & nutrition,
 * textiles & clothing, resource management, human development, health). Aligns
 * the overlaps with existing Science/Life Skills/PSD topics; mints the
 * home-science-specific content. Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Home Science', courseCode: '216' };
const HS = 'Home Science';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('216.M1.L1', 'I. Foundations', 'What is Home Science', 'What is Home Science', 'Understand home science as the study of managing a home and family well — spanning food, clothing, resources, health and human development.'),
  std('216.M2.L2', 'II. Food and Nutrition', 'Food and Nutrients', 'Food and Nutrients', 'Understand food, its functions, and the nutrients it provides.'),
  std('216.M2.L3', 'II. Food and Nutrition', 'Balanced Diet and Meal Planning', 'Balanced Diet and Meal Planning', 'Understand a balanced diet and how to plan meals for the family across life stages.'),
  std('216.M2.L4', 'II. Food and Nutrition', 'Food Safety and Preservation', 'Food Safety and Preservation', 'Understand food hygiene, safety, and methods of preserving food.'),
  std('216.M3.L5', 'III. Textiles and Clothing', 'Fibres and Fabrics', 'Fibres and Fabrics', 'Understand fibres and fabrics and their properties.'),
  std('216.M3.L6', 'III. Textiles and Clothing', 'Selection and Care of Clothing', 'Selection and Care of Clothing', 'Understand how to select clothing and care for it — washing, storage and repair.'),
  std('216.M4.L7', 'IV. Resource Management', 'Managing Family Resources', 'Managing Family Resources', 'Understand how to manage family resources — money, time, energy and space.'),
  std('216.M4.L8', 'IV. Resource Management', 'Consumer Education', 'Consumer Education', 'Understand consumer education — making wise purchases and knowing consumer rights.'),
  std('216.M5.L9', 'V. Human Development', 'Growth and Development', 'Growth and Development', 'Understand the growth and development of children and the needs of each stage.'),
  std('216.M5.L10', 'V. Human Development', 'The Family and its Relationships', 'The Family and its Relationships', 'Understand the family, its life stages, and healthy relationships within it.'),
  std('216.M6.L11', 'VI. Health and Hygiene', 'Personal and Family Health', 'Personal and Family Health', 'Understand personal and family health, hygiene and sanitation.'),
  std('216.M6.L12', 'VI. Health and Hygiene', 'First Aid and Home Nursing', 'First Aid and Home Nursing', 'Understand basic first aid and caring for the sick at home.'),
];

const alignments = Object.fromEntries([
  ['mt_QhLAeAlHI0', ['216.M2.L2', '216.M2.L3']],  // Balanced Diet & Food Groups ← Food & Nutrients + Meal Planning
  ['mt_sDmrVCfzqt', ['216.M2.L2']],               // Nutrients in a Healthy Diet ← Food and Nutrients
  ['mt_Km5iZqQ8Vi', ['216.M2.L4']],               // Safe Food and Clean Water ← Food Safety
  ['mt_bKvMdYmfbn', ['216.M3.L5']],               // Fibres and Fabrics ← Fibres and Fabrics
  ['mt_r1hw-KenpK', ['216.M4.L7']],               // Financial Planning ← Managing Resources
  ['mt_uof32CdhYK', ['216.M6.L11']],              // Keeping Clean: Personal Hygiene ← Personal & Family Health
]);

const T = (_slug, domain, name, a0, a1, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: HS, domain, name, ageRangeStart: a0, ageRangeEnd: a1, type: 'CONCEPTUAL', description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('hs-what-is', 'Foundations', 'What Is Home Science', 13, 15,
    'Understand home science as the practical study of running a home and caring for a family well — bringing together food and nutrition, clothing, managing resources, health, and how people grow and relate.',
    ['Explain what home science studies', 'Name its main components', 'Explain how it is both an art and a science'],
    'Can {{name}} explain what home science is — the skills and knowledge for running a home and caring for a family well?', ['nios-sec-2020:216.M1.L1']),
  T('hs-meal-planning', 'Food & Nutrition', 'Balanced Diet and Meal Planning', 14, 16,
    'Understand how to plan balanced meals for a family — combining foods to meet everyone’s nutritional needs across different ages, budgets and life stages.',
    ['Plan a balanced meal from the food groups', 'Explain how nutritional needs differ by age or life stage', 'Plan a nutritious meal within a budget'],
    'Can {{name}} plan a balanced meal that meets a family’s needs, taking account of different ages and a budget?', ['nios-sec-2020:216.M2.L3']),
  T('hs-food-preservation', 'Food & Nutrition', 'Food Safety and Preservation', 14, 16,
    'Understand how to keep food safe and make it last — hygienic handling, and preservation methods such as drying, salting, refrigeration, canning and pickling.',
    ['Explain hygienic food handling', 'Name several methods of preserving food', 'Explain how preservation prevents spoilage'],
    'Can {{name}} explain how to keep food safe and make it last, naming methods like drying, refrigeration or pickling?', ['nios-sec-2020:216.M2.L4']),
  T('hs-clothing-care', 'Textiles & Clothing', 'Selection and Care of Clothing', 14, 16,
    'Understand how to choose clothing for different needs, seasons and occasions, and how to care for it — washing, drying, ironing, storing and simple repairs.',
    ['Explain factors in selecting clothing', 'Describe how to care for a fabric (washing, storage)', 'Explain how good care makes clothes last'],
    'Can {{name}} explain how to choose suitable clothing and look after it so it lasts?', ['nios-sec-2020:216.M3.L6']),
  T('hs-resource-management', 'Resource Management', 'Managing Family Resources', 14, 16,
    'Understand how a family manages its resources — money, time, energy and space — through planning, budgeting and organising, to meet its needs and goals.',
    ['Name the resources a family manages', 'Explain the steps of managing a resource (plan, use, evaluate)', 'Give an example of budgeting time or money'],
    'Can {{name}} explain how a family manages its money, time and space through planning and budgeting?', ['nios-sec-2020:216.M4.L7']),
  T('hs-consumer-education', 'Resource Management', 'Consumer Education', 14, 16,
    'Understand how to be a wise consumer — comparing products, reading labels, avoiding waste and misleading claims, and knowing one’s consumer rights.',
    ['Explain how to compare products before buying', 'Explain the value of reading labels', 'Name a consumer right'],
    'Can {{name}} explain how to shop wisely — comparing products, reading labels, and knowing their rights as a consumer?', ['nios-sec-2020:216.M4.L8']),
  T('hs-child-development', 'Human Development', 'Growth and Development of Children', 13, 15,
    'Understand how children grow and develop — physically, mentally, emotionally and socially — through infancy and childhood, and the care and needs of each stage.',
    ['Describe areas of child development', 'Explain the needs of a stage of childhood', 'Explain why early care matters for development'],
    'Can {{name}} describe how children grow and develop, and what they need at different stages?', ['nios-sec-2020:216.M5.L9']),
  T('hs-family-relationships', 'Human Development', 'The Family and its Relationships', 13, 15,
    'Understand the family — its types and life stages — and the relationships within it, and how care, communication and shared responsibility make a happy home.',
    ['Describe types of family and their life stages', 'Explain what makes family relationships healthy', 'Give an example of shared responsibility in a family'],
    'Can {{name}} explain what makes for healthy family relationships and a happy home?', ['nios-sec-2020:216.M5.L10']),
  T('hs-first-aid', 'Health & Hygiene', 'First Aid and Home Nursing', 14, 16,
    'Understand basic first aid for common emergencies — cuts, burns, choking and fainting — and simple care of a sick person at home.',
    ['Describe first aid for a common injury', 'Explain what a first-aid kit should contain', 'Describe simple care for someone unwell at home'],
    'Can {{name}} give basic first aid for something like a cut or burn, and help care for someone who is unwell at home?', ['nios-sec-2020:216.M6.L12']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  hard('hs-meal-planning', 'mt_QhLAeAlHI0', 'Meal planning builds on knowing about a balanced diet'),
  soft('hs-food-preservation', 'mt_Km5iZqQ8Vi', 'Food preservation builds on food safety'),
  soft('hs-clothing-care', 'mt_bKvMdYmfbn', 'Caring for clothing builds on knowing about fibres and fabrics'),
  soft('hs-resource-management', 'mt_r1hw-KenpK', 'Managing family resources builds on financial planning'),
  hard('hs-consumer-education', 'hs-resource-management', 'Consumer education is part of managing resources'),
  soft('hs-family-relationships', 'hs-child-development', 'Family relationships include raising and caring for children'),
  soft('hs-first-aid', 'mt_uof32CdhYK', 'Home health care builds on personal hygiene'),
  soft('hs-what-is', 'mt_QhLAeAlHI0', 'Home science includes nutrition and diet'),
];

const B = (domain, ageRangeStart, summary) => ({ subject: HS, domain, ageRangeStart, summary });
const newClusters = [
  B('Foundations', 13, 'Your teenager is learning what home science is — the practical knowledge for running a home and caring for a family, spanning food, clothing, resources, health and human development.'),
  B('Food & Nutrition', 14, 'Your teenager is learning to plan balanced family meals across ages and budgets, and to keep food safe and preserved.'),
  B('Textiles & Clothing', 14, 'Your teenager is learning how to select clothing for different needs and how to care for it so it lasts.'),
  B('Resource Management', 14, 'Your teenager is learning to manage a family’s resources — money, time and space — and to be a wise, informed consumer.'),
  B('Human Development', 13, 'Your teenager is learning how children grow and develop, and what makes for healthy family relationships and a happy home.'),
  B('Health & Hygiene', 14, 'Your teenager is learning basic first aid and how to care for a sick person at home.'),
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
