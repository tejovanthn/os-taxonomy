#!/usr/bin/env node
/**
 * build/isc-computer-science.mjs — ISC Computer Science, Classes XI–XII
 * (ages 16–18). The Computing subject had no content above 16, and ISC Computer
 * Science is a genuine senior course, so this MINTS a small senior ladder in the
 * existing `Programming` domain — boolean algebra, inheritance and polymorphism,
 * recursion, data structures, algorithm complexity, and databases and SQL —
 * anchored to the 14–16 Java topics from the ICSE Computer Applications pass.
 * Marble-authored factual descriptions — no CISCE text. Idempotent.
 */
import { isc } from './cisce.mjs';
const { s, topic, integrate } = isc;
const cs = topic('Computing');
const PR = 'Programming';
const AGE = [16, 18];
const EV = (a, b, c) => [a, b, c];

const standards = [
  s('CS.C11.U1', 'XI', 'Boolean Algebra', 'Propositional logic, boolean algebra, truth tables, De Morgan’s laws, and the minimisation of logic circuits.'),
  s('CS.C11.U2', 'XI', 'Object-Oriented Programming: Inheritance and Polymorphism', 'The deeper principles of object-oriented programming — inheritance, polymorphism, abstraction and encapsulation.'),
  s('CS.C11.U3', 'XI', 'Recursion', 'Recursion and the design of recursive algorithms.'),
  s('CS.C12.U1', 'XII', 'Data Structures', 'Arrays and the linear data structures — the stack, the queue and the linked list — and their operations.'),
  s('CS.C12.U2', 'XII', 'Algorithm Analysis and Complexity', 'The efficiency of algorithms and the comparison of searching and sorting by their complexity.'),
  s('CS.C12.U3', 'XII', 'Databases and SQL', 'The relational model of data and querying a database with SQL.'),
];

const newTopics = [
  cs('isc-cs-boolean-algebra', 'Boolean Algebra and Logic', PR, AGE, 'CONCEPTUAL',
    'Understand boolean algebra as the mathematics of true and false — its operators, truth tables and laws such as De Morgan’s — and how it underlies both logic circuits and program conditions.',
    EV('Builds a truth table for a boolean expression', 'Simplifies an expression using boolean laws', 'Applies De Morgan’s laws'),
    'Ask {{name}} how a computer, which only knows true and false, can make a decision.',
    ['CS.C11.U1']),
  cs('isc-cs-inheritance', 'Inheritance and Polymorphism', PR, AGE, 'CONCEPTUAL',
    'Understand how inheritance lets one class extend another to reuse and specialise its behaviour, and how polymorphism lets the same call behave differently depending on the object.',
    EV('Defines a subclass that inherits from a superclass', 'Explains method overriding and polymorphism', 'Explains how abstraction and encapsulation support a class hierarchy'),
    'Ask {{name}} how a “vehicle” class could give a “car” and a “truck” their shared behaviour for free.',
    ['CS.C11.U2']),
  cs('isc-cs-recursion', 'Recursion', PR, AGE, 'PROCEDURAL',
    'Understand recursion as a method that solves a problem by calling itself on a smaller case, needing a base case to stop, and trace how the calls stack up and unwind.',
    EV('Writes a recursive method with a correct base case', 'Traces the calls of a recursive method', 'Rewrites a simple loop as recursion or vice versa'),
    'Ask {{name}} how a problem can be solved by a method that keeps calling itself.',
    ['CS.C11.U3']),
  cs('isc-cs-data-structures', 'Data Structures: Stacks, Queues and Linked Lists', PR, AGE, 'PROCEDURAL',
    'Understand the linear data structures — the stack’s last-in-first-out order, the queue’s first-in-first-out order, and the linked list of nodes joined by references — and when each is the right tool.',
    EV('Traces push and pop on a stack and enqueue and dequeue on a queue', 'Explains how a linked list joins nodes by references', 'Chooses a suitable data structure for a described problem'),
    'Ask {{name}} why a stack of plates and a queue at a counter are two different ways to store things.',
    ['CS.C12.U1']),
  cs('isc-cs-complexity', 'Algorithm Analysis and Complexity', PR, AGE, 'CONCEPTUAL',
    'Understand that algorithms are compared not by seconds but by how their work grows with input size, so that a binary search’s halving beats a linear scan as the data grows large.',
    EV('Compares two algorithms by how their work grows with input size', 'Explains why binary search outperforms linear search at scale', 'Distinguishes the best, average and worst case'),
    'Ask {{name}} why one way of searching a million records can be thousands of times faster than another.',
    ['CS.C12.U2']),
  cs('isc-cs-databases-sql', 'Databases and SQL', PR, AGE, 'PROCEDURAL',
    'Understand a relational database as data held in linked tables of rows and columns, and how a SQL query selects, filters and combines that data to answer a question.',
    EV('Explains the relational model of tables, rows and keys', 'Writes a SQL query to select and filter rows', 'Explains how a key links two tables'),
    'Ask {{name}} how a bank finds one person’s transactions among millions in an instant.',
    ['CS.C12.U3']),
];

const alignments = {};

const newEdges = [
  { t: 'isc-cs-boolean-algebra', p: 'mt_zRNuALNFAT', strength: 'soft', reason: 'Boolean logic underlies the conditions of a program.' },
  { t: 'isc-cs-boolean-algebra', p: 'mt_JDUB7RyyLd', strength: 'soft', reason: 'Boolean algebra minimises the logic gates of a circuit.' },
  { t: 'isc-cs-inheritance', p: 'mt_TB3DHo7JkU', strength: 'hard', reason: 'Inheritance and polymorphism are two of the OOP principles.' },
  { t: 'isc-cs-inheritance', p: 'mt_rs5SbDJZGR', strength: 'hard', reason: 'Inheritance extends the class-and-object model.' },
  { t: 'isc-cs-recursion', p: 'mt_TgzH2ATvxG', strength: 'hard', reason: 'A recursive method is a method that calls itself.' },
  { t: 'isc-cs-data-structures', p: 'mt_u4T2pG7a1s', strength: 'hard', reason: 'Data structures build on the array.' },
  { t: 'isc-cs-data-structures', p: 'isc-cs-inheritance', strength: 'soft', reason: 'Data structures are implemented as classes of objects.' },
  { t: 'isc-cs-complexity', p: 'mt_8z6iNjj1hb', strength: 'hard', reason: 'Complexity compares the searching and sorting algorithms.' },
  { t: 'isc-cs-databases-sql', p: 'mt_TsAQLrLQAA', strength: 'soft', reason: 'A database stores typed data in tables.' },
];

const newClusters = [
  { subject: 'Computing', domain: PR, ageRangeStart: 16, ageRangeEnd: 18,
    summary: 'At this level programming becomes computer science. Boolean algebra gives the logic behind every decision a machine makes; inheritance and polymorphism let object-oriented programs be built from reusable, specialised parts; and recursion offers a second way to compute, a method that calls itself. From there come the data structures — stacks, queues and linked lists — that organise information, the analysis of algorithms by how their work grows rather than by the clock, and databases with the SQL that queries them.' },
];

integrate({ subjectDoc: 'Computer Science (XI–XII)', standards, newTopics, alignments, newEdges, newClusters });
