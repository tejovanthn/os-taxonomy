#!/usr/bin/env node
/**
 * build/isc-commerce.mjs — ISC Business Studies and Accountancy, Classes XI–XII
 * (ages 16–18). Pure alignment onto the 16–18 Business Studies and Accountancy
 * ladders built by ncert-hsec. No new topics. Marble-authored unit descriptions
 * — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, integrate } = isc;

const standards = [
  // ---- Business Studies ----
  s('BST.C11.U1', 'XI', 'Nature and Purpose of Business', 'The nature and purpose of business and its forms of organisation.'),
  s('BST.C11.U2', 'XI', 'Company Formation and Business Services', 'The formation of a company and the business services and emerging modes.'),
  s('BST.C11.U3', 'XI', 'Business Finance and Small Business', 'The sources of business finance, and small business and its role.'),
  s('BST.C11.U4', 'XI', 'Internal and International Trade', 'Internal trade and international business.'),
  s('BST.C11.U5', 'XI', 'Social Responsibility and Entrepreneurship', 'Social responsibility and business ethics, and entrepreneurship development.'),
  s('BST.C12.U1', 'XII', 'Principles and Functions of Management', 'The nature and functions of management, the principles of management, and the business environment.'),
  s('BST.C12.U2', 'XII', 'The Functions of Management', 'Planning, organising, staffing, directing and controlling.'),
  s('BST.C12.U3', 'XII', 'Business Finance and Marketing', 'Financial management and markets, marketing and the marketing mix, and consumer protection.'),
  // ---- Accountancy ----
  s('ACC.C11.U1', 'XI', 'Introduction to Accounting', 'The purpose and users of accounting and its principles and standards.'),
  s('ACC.C11.U2', 'XI', 'Recording of Transactions', 'Double entry, the journal and ledger, subsidiary books and bank reconciliation, the trial balance, and bills of exchange.'),
  s('ACC.C11.U3', 'XI', 'Financial Statements of a Sole Proprietor', 'Depreciation, provisions and reserves, financial statements, and accounts from incomplete records.'),
  s('ACC.C11.U4', 'XI', 'Computers in Accounting', 'Computerised accounting systems.'),
  s('ACC.C12.U1', 'XII', 'Partnership Accounts', 'Accounting for partnership and its reconstitution and dissolution.'),
  s('ACC.C12.U2', 'XII', 'Company Accounts', 'Accounting for share and debenture capital.'),
  s('ACC.C12.U3', 'XII', 'Analysis of Financial Statements', 'The analysis of financial statements and ratios, and the cash flow statement.'),
  s('ACC.C12.U4', 'XII', 'Not-for-Profit Accounting', 'Accounting for not-for-profit organisations.'),
];

const alignments = {
  // Business Studies
  mt_yhwJMiGuyG: ['BST.C11.U1'], mt_xhrQCpOD1s: ['BST.C11.U1'],
  mt_ETIV7J0mYZ: ['BST.C11.U2'], mt_OCNhs90RTz: ['BST.C11.U2'],
  mt_K6HNJ5Ru7s: ['BST.C11.U3'], mt_l2oleqVhFm: ['BST.C11.U3'],
  mt_6kGqqDk0LX: ['BST.C11.U4'], mt_tsXSrLXJ5S: ['BST.C11.U4'],
  mt_F6e464lhkJ: ['BST.C11.U5'], mt_7R3VtB3air: ['BST.C11.U5'],
  mt_arGfAOoTeI: ['BST.C12.U1'], mt_UvxJZFhBOx: ['BST.C12.U1'], mt_awciBXTf0b: ['BST.C12.U1'],
  mt_I3GuVtgCjp: ['BST.C12.U2'], mt_nuofz6eTWq: ['BST.C12.U2'], mt_WJEYebqvSi: ['BST.C12.U2'], mt_BaERlZTotg: ['BST.C12.U2'], mt_4xC8IQQYNo: ['BST.C12.U2'],
  mt_RpqPtmY7dX: ['BST.C12.U3'], mt_TtkpxsWy0R: ['BST.C12.U3'], mt_TjESAIII6g: ['BST.C12.U3'], mt_xinSEhDpkF: ['BST.C12.U3'],
  // Accountancy
  mt_L0Msh4ITcW: ['ACC.C11.U1'], mt_6zH1lZNUsU: ['ACC.C11.U1'],
  mt_K1NOQxyzTt: ['ACC.C11.U2'], mt_5hImFLHfn7: ['ACC.C11.U2'], mt_1qwgFzvjDO: ['ACC.C11.U2'], mt_jPiOF7NcVH: ['ACC.C11.U2'],
  mt_Az7kEVzroL: ['ACC.C11.U3'], mt_p0RjkyWdSQ: ['ACC.C11.U3'], mt_tOhx5EDZXF: ['ACC.C11.U3'],
  mt_VBV1VhhJHW: ['ACC.C11.U4'],
  mt_VXOFBCSSej: ['ACC.C12.U1'], mt_J0GkRxLDu3: ['ACC.C12.U1'], mt_UuSGUtjhMN: ['ACC.C12.U1'],
  mt_oEs8CRB1hh: ['ACC.C12.U2'],
  mt_Fl59DPGF7r: ['ACC.C12.U3'], mt_Zqat28kFZR: ['ACC.C12.U3'],
  mt_aGNfVfsfPt: ['ACC.C12.U4'],
};

integrate({ subjectDoc: 'Business Studies and Accountancy (XI–XII)', standards, newTopics: [], alignments, newEdges: [], newClusters: [] });
