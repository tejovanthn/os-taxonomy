#!/usr/bin/env node
/**
 * build/nios-sec-business-studies.mjs — NIOS Secondary Business Studies (Code
 * 215) → a new "Business Studies" subject. ~20 lessons; a few overlap existing
 * Life Skills (advertising, entrepreneurship, banking), the rest are minted.
 * Idempotent.
 */

import { integrateSubject } from './nios-sec.mjs';

const subject = { name: 'Business Studies', courseCode: '215' };
const BS = 'Business Studies';
const std = (code, module, lesson, title, description) => ({ code, module, lesson, title, description });

const standards = [
  std('215.M1.L1', 'I. Foundations of Business', 'Nature and Scope of Business', 'Nature and Scope of Business', 'Understand what business is, its nature, objectives and scope.'),
  std('215.M1.L2', 'I. Foundations of Business', 'Industry and Commerce', 'Industry and Commerce', 'Understand industry and commerce and how they relate within business.'),
  std('215.M2.L3', 'II. Forms of Business Organisation', 'Sole Proprietorship and Partnership', 'Sole Proprietorship and Partnership', 'Understand sole proprietorship and partnership as forms of business ownership.'),
  std('215.M2.L4', 'II. Forms of Business Organisation', 'Companies and Cooperative Societies', 'Companies and Cooperative Societies', 'Understand companies and cooperative societies as forms of business organisation.'),
  std('215.M3.L5', 'III. Business Services', 'Transport Services', 'Transport Services', 'Understand the role of transport services in business.'),
  std('215.M3.L6', 'III. Business Services', 'Warehousing Services', 'Warehousing Services', 'Understand the role of warehousing in business.'),
  std('215.M3.L7', 'III. Business Services', 'Communication Services', 'Communication Services', 'Understand communication services and their role in business.'),
  std('215.M3.L8', 'III. Business Services', 'Postal and Courier Services', 'Postal and Courier Services', 'Understand postal and courier services used by business.'),
  std('215.M3.L9', 'III. Business Services', 'Banking Services', 'Banking Services', 'Understand the banking services a business uses.'),
  std('215.M3.L10', 'III. Business Services', 'Insurance', 'Insurance', 'Understand insurance and how it manages business risk.'),
  std('215.M3.L11', 'III. Business Services', 'Outsourcing', 'Outsourcing', 'Understand outsourcing and why businesses use it.'),
  std('215.M4.L12', 'IV. Trade and Marketing', 'Purchase and Sale', 'Purchase and Sale', 'Understand the processes of purchase and sale in business.'),
  std('215.M4.L13', 'IV. Trade and Marketing', 'Channels of Distribution', 'Channels of Distribution', 'Understand how goods move from producer to consumer through channels of distribution.'),
  std('215.M4.L14', 'IV. Trade and Marketing', 'Retail Trade', 'Retail Trade', 'Understand retail trade and its types.'),
  std('215.M4.L15', 'IV. Trade and Marketing', 'Advertising', 'Advertising', 'Understand advertising and its role in marketing.'),
  std('215.M4.L16', 'IV. Trade and Marketing', 'Sales Promotion and Publicity', 'Sales Promotion and Publicity', 'Understand sales promotion and publicity.'),
  std('215.M5.L17', 'V. Consumer Protection', 'Consumer Rights', 'Consumer Rights', 'Understand the rights of consumers.'),
  std('215.M5.L18', 'V. Consumer Protection', 'Consumer Protection', 'Consumer Protection', 'Understand how consumers are protected and how to seek redress.'),
  std('215.M6.L19', 'VI. Career and Enterprise', 'Choosing a Career', 'Choosing a Career', 'Understand how to choose a career suited to one’s interests and abilities.'),
  std('215.M6.L20', 'VI. Career and Enterprise', 'Entrepreneurship', 'Entrepreneurship', 'Understand entrepreneurship — starting and running one’s own business.'),
];

const alignments = Object.fromEntries([
  ['mt_My0OL6fhGL', ['215.M4.L15']],   // Advertising & Spending ← Advertising
  ['mt_uSUqTjOl8m', ['215.M3.L9']],    // Banks & Saving ← Banking Services
  ['mt_RTwmvr9R7V', ['215.M6.L20']], ['mt_bAYy0ytbfC', ['215.M6.L20']], ['mt_rxJ2O_9Lkr', ['215.M6.L20']], // entrepreneurship
]);

const T = (_slug, domain, name, description, evidence, assessmentPrompt, standards) =>
  ({ _slug, subject: BS, domain, name, ageRangeStart: 14, ageRangeEnd: 16, type: 'CONCEPTUAL', description, evidence, assessmentPrompt, standards });

const newTopics = [
  T('bs-nature-of-business', 'Foundations of Business', 'Nature and Scope of Business',
    'Understand business as an activity of producing or buying and selling goods and services to earn a profit and meet people’s needs, and the range of activities it covers.',
    ['Define business and its main objective', 'Distinguish business from other human activities', 'Give examples of the scope of business activity'],
    'Can {{name}} explain what business is — producing or trading goods and services for profit — and what it covers?', ['nios-sec-2020:215.M1.L1']),
  T('bs-industry-commerce', 'Foundations of Business', 'Industry and Commerce',
    'Understand that business has two arms — industry (making goods and providing services) and commerce (trade and the services that support it, like transport and banking).',
    ['Distinguish industry from commerce', 'Explain what commerce includes beyond buying and selling', 'Give an example of each'],
    'Can {{name}} explain the difference between industry (making things) and commerce (trading and the services that support it)?', ['nios-sec-2020:215.M1.L2']),
  T('bs-sole-partnership', 'Forms of Business Organisation', 'Sole Proprietorship and Partnership',
    'Understand two simple forms of business ownership — the sole proprietorship (one owner) and the partnership (owned by two or more) — and their advantages and drawbacks.',
    ['Explain what a sole proprietorship is', 'Explain what a partnership is', 'Give an advantage and a drawback of each'],
    'Can {{name}} explain the difference between a business owned by one person and one owned by partners?', ['nios-sec-2020:215.M2.L3']),
  T('bs-companies-coops', 'Forms of Business Organisation', 'Companies and Cooperative Societies',
    'Understand larger forms of business organisation — the company, owned by shareholders, and the cooperative society, owned and run by its members for their mutual benefit.',
    ['Explain what a company is and who owns it', 'Explain what a cooperative society is', 'Compare a company with a cooperative'],
    'Can {{name}} explain what a company is (owned by shareholders) and how a cooperative is different?', ['nios-sec-2020:215.M2.L4']),
  T('bs-transport-warehousing', 'Business Services', 'Transport and Warehousing',
    'Understand two services that support trade — transport, which moves goods from where they are made to where they are needed, and warehousing, which stores them until they are needed.',
    ['Explain how transport supports business', 'Explain the purpose of warehousing', 'Explain how both bridge production and consumption'],
    'Can {{name}} explain how transport and warehousing help goods get from the factory to the customer at the right time?', ['nios-sec-2020:215.M3.L5', 'nios-sec-2020:215.M3.L6']),
  T('bs-communication-services', 'Business Services', 'Communication and Postal Services',
    'Understand the communication, postal and courier services that let a business exchange information and send documents and goods — from post to phone to the internet.',
    ['Name communication services a business uses', 'Explain the role of postal and courier services', 'Explain why fast communication matters in business'],
    'Can {{name}} explain how communication and postal services help a business keep in touch and send things?', ['nios-sec-2020:215.M3.L7', 'nios-sec-2020:215.M3.L8']),
  T('bs-banking-insurance', 'Business Services', 'Banking and Insurance Services',
    'Understand two financial services businesses rely on — banking, which handles money, payments and loans, and insurance, which protects against risks and losses.',
    ['Explain banking services a business uses', 'Explain how insurance manages risk', 'Give an example of a risk a business insures against'],
    'Can {{name}} explain how banks help businesses handle money, and how insurance protects them against losses?', ['nios-sec-2020:215.M3.L9', 'nios-sec-2020:215.M3.L10']),
  T('bs-outsourcing', 'Business Services', 'Outsourcing',
    'Understand outsourcing — when a business hires an outside firm to do work (like payroll, IT or a call centre) rather than doing it itself — and why it can save cost and add expertise.',
    ['Explain what outsourcing means', 'Give an example of work a business might outsource', 'Explain a benefit and a risk of outsourcing'],
    'Can {{name}} explain what outsourcing is and why a business might pay another firm to do some of its work?', ['nios-sec-2020:215.M3.L11']),
  T('bs-trade-distribution', 'Trade and Marketing', 'Trade and Channels of Distribution',
    'Understand how goods reach customers — the buying and selling of trade, and the channels of distribution (producer → wholesaler → retailer → consumer) that move goods along the way.',
    ['Explain the process of purchase and sale', 'Describe a channel of distribution', 'Explain the role of wholesalers and retailers'],
    'Can {{name}} explain how goods travel from the producer to the customer through wholesalers and retailers?', ['nios-sec-2020:215.M4.L12', 'nios-sec-2020:215.M4.L13']),
  T('bs-retail', 'Trade and Marketing', 'Retail Trade',
    'Understand retail trade — selling goods in small quantities directly to consumers — and its different forms, from small shops and markets to supermarkets and online stores.',
    ['Explain what retail trade is', 'Name different types of retailer', 'Explain the role of the retailer for the consumer'],
    'Can {{name}} explain what retail trade is and give examples of different kinds of shops and sellers?', ['nios-sec-2020:215.M4.L14']),
  T('bs-advertising-promotion', 'Trade and Marketing', 'Advertising and Sales Promotion',
    'Understand how businesses make people aware of and want their products — advertising (paid messages) and sales promotion (offers, discounts and publicity) — and the difference between them.',
    ['Explain the purpose of advertising', 'Give an example of a sales promotion', 'Distinguish advertising from sales promotion'],
    'Can {{name}} explain how businesses use advertising and special offers to get people to buy their products?', ['nios-sec-2020:215.M4.L15', 'nios-sec-2020:215.M4.L16']),
  T('bs-consumer-protection', 'Consumer Protection', 'Consumer Rights and Protection',
    'Understand that consumers have rights — to safety, information, choice and to be heard — and that laws and bodies protect them and give a way to seek redress when wronged.',
    ['Name several consumer rights', 'Explain why consumer protection is needed', 'Describe how a consumer can seek redress'],
    'Can {{name}} explain what rights a consumer has and what they can do if a product or service treats them unfairly?', ['nios-sec-2020:215.M5.L17', 'nios-sec-2020:215.M5.L18']),
  T('bs-choosing-career', 'Career and Enterprise', 'Choosing a Career',
    'Understand how to choose a career — matching one’s interests, aptitudes and values to the opportunities and requirements of different kinds of work.',
    ['Explain what to consider when choosing a career', 'Match interests and aptitudes to a kind of work', 'Explain why planning a career matters'],
    'Can {{name}} explain how someone chooses a career that fits their interests and strengths?', ['nios-sec-2020:215.M6.L19']),
];

const soft = (t, p, reason) => ({ t, p, strength: 'soft', reason });
const hard = (t, p, reason) => ({ t, p, strength: 'hard', reason });
const newEdges = [
  hard('bs-industry-commerce', 'bs-nature-of-business', 'Industry and commerce build on knowing what business is'),
  hard('bs-sole-partnership', 'bs-nature-of-business', 'Forms of ownership build on the idea of business'),
  soft('bs-companies-coops', 'bs-sole-partnership', 'Companies and cooperatives extend the simpler forms of ownership'),
  soft('bs-transport-warehousing', 'bs-industry-commerce', 'Business services are part of commerce'),
  soft('bs-communication-services', 'bs-industry-commerce', 'Communication services are part of commerce'),
  soft('bs-banking-insurance', 'bs-industry-commerce', 'Banking and insurance are commercial services'),
  soft('bs-banking-insurance', 'mt_uSUqTjOl8m', 'Business banking builds on how banks and saving work'),
  soft('bs-outsourcing', 'bs-nature-of-business', 'Outsourcing is a way of organising business work'),
  soft('bs-trade-distribution', 'bs-industry-commerce', 'Trade and distribution are the heart of commerce'),
  hard('bs-retail', 'bs-trade-distribution', 'Retail is the last step of the channel of distribution'),
  soft('bs-advertising-promotion', 'bs-trade-distribution', 'Advertising and promotion support trade'),
  soft('bs-advertising-promotion', 'mt_My0OL6fhGL', 'Advertising builds on how advertising influences spending'),
  soft('bs-consumer-protection', 'bs-retail', 'Consumer protection applies where consumers buy from retailers'),
  soft('bs-choosing-career', 'bs-nature-of-business', 'Careers include working in and running businesses'),
];

const newClusters = [
  { subject: BS, domain: 'Foundations of Business', ageRangeStart: 14, summary: 'Your teenager is learning the foundations of business — what business is and its objectives, and the two arms of industry and commerce.' },
  { subject: BS, domain: 'Forms of Business Organisation', ageRangeStart: 14, summary: 'Your teenager is learning how businesses are owned and organised — from sole proprietorships and partnerships to companies and cooperatives.' },
  { subject: BS, domain: 'Business Services', ageRangeStart: 14, summary: 'Your teenager is learning the services that support business — transport and warehousing, communication and postal services, banking and insurance, and outsourcing.' },
  { subject: BS, domain: 'Trade and Marketing', ageRangeStart: 14, summary: 'Your teenager is learning how goods reach customers — trade and channels of distribution, retail, and how advertising and promotion drive sales.' },
  { subject: BS, domain: 'Consumer Protection', ageRangeStart: 14, summary: 'Your teenager is learning about consumer rights and how consumers are protected and can seek redress when treated unfairly.' },
  { subject: BS, domain: 'Career and Enterprise', ageRangeStart: 14, summary: 'Your teenager is thinking about careers and enterprise — how to choose a career that fits their strengths, and what it takes to run a business.' },
];

integrateSubject({ subject, standards, newTopics, alignments, newEdges, newClusters });
