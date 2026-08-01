#!/usr/bin/env node
/**
 * build/icse-computer-applications.mjs — ICSE Computer Applications (86),
 * Classes IX–X (ages 14–16).
 *
 * Computing had NO programming topics — the subject topped out at 11–13 with
 * digital-literacy and AI-ethics content and no coding at all. ICSE Computer
 * Applications is a full Java object-oriented programming course, so this pass
 * is almost entirely mints in a new `Programming` domain: the OOP principles,
 * the Java toolchain, classes and objects, data types, operators, program
 * structure and input, control flow (conditionals, loops, nested loops), then
 * wrapper classes, arrays, sorting and searching, strings, constructors and
 * methods. Two topics (ethics, emerging technologies) extend the existing
 * digital-literacy and AI strands. Marble-authored factual descriptions — no
 * CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const cs = topic('Computing');
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('COMP9.1', 'IX', 'Introduction to Object Oriented Programming and Java', 'The four principles of object-oriented programming and how it differs from procedural programming; the Java toolchain — source code, byte code, the Java Virtual Machine, compilation and platform independence.'),
  s('COMP9.2', 'IX', 'Objects and Classes', 'A class as a user-defined type, blueprint and object factory; objects that encapsulate state as attributes and behaviour as methods; computation as message passing between objects.'),
  s('COMP9.3', 'IX', 'Identifiers, Literals and Data Types', 'The Java character set, ASCII and Unicode, escape sequences and tokens; primitive and non-primitive types and their sizes; implicit and explicit type conversion.'),
  s('COMP9.4', 'IX', 'Operators in Java', 'Unary, binary and ternary operators; arithmetic, relational, logical, assignment and increment operators; precedence and associativity; the new and dot operators.'),
  s('COMP9.5', 'IX', 'Structure of a Java Program', 'The structure of a class and the main method; the standard skeleton followed by every program.'),
  s('COMP9.6', 'IX', 'Data Processing and Input', 'Reading input at run time with the methods of the Scanner class; single-line and multi-line comments; syntax, run-time and logical errors.'),
  s('COMP9.7', 'IX', 'Mathematical Library Methods', 'The methods of the Math class in java.lang and their use in building Java expressions.'),
  s('COMP9.8', 'IX', 'Conditional Statements', 'Decision making with if, if-else, the if-else-if ladder and the switch-case statement; nesting, break and fall-through; menu-driven programs.'),
  s('COMP9.9', 'IX', 'Looping Statements', 'Entry-controlled loops (for, while) and the exit-controlled do-while; the break and continue jump statements; converting between loop forms.'),
  s('COMP9.10', 'IX', 'Nested Loops', 'Loops within loops used to produce number and character patterns and to compute and display series.'),
  s('COMP9.11', 'IX', 'Ethical Computing', 'Ethical issues in computing — privacy and data protection on the internet, protection against spam, software piracy and cyber ethics; responsible social media use.'),
  // ---- Class X ----
  s('COMP10.1', 'X', 'Library (Wrapper) Classes', 'Wrapper classes for the primitive types and their parsing and character-testing methods; auto-boxing and unboxing; the distinction between primitive and composite types.'),
  s('COMP10.2', 'X', 'Arrays', 'Declaration, initialisation and access of single-dimensional arrays; the length property; sorting by selection and bubble sort and searching by linear and binary search.'),
  s('COMP10.3', 'X', 'String Handling', 'The String class and its methods for extracting, comparing, searching and modifying text; arrays of strings and their alphabetical ordering.'),
  s('COMP10.4', 'X', 'Class as the Basis of Computation', 'Objects as instances of a class; member variables defining state and member methods defining behaviour; the class as an abstraction for a set of objects.'),
  s('COMP10.5', 'X', 'Constructors', 'The definition, characteristics and use of constructors; default and parameterised constructors; constructor overloading and its difference from a method.'),
  s('COMP10.6', 'X', 'Custom Methods', 'Defining, calling and overloading methods; actual and formal parameters; static and non-static, pure and impure methods; pass by value and pass by reference.'),
  s('COMP10.7', 'X', 'Disruptive Technologies', 'The definition, types and uses of emerging technologies — artificial intelligence, blockchain, the Internet of Things, robotics, 5G and cloud computing; cyber hygiene and cyber law.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  cs('icse-oop-principles', 'The Principles of Object-Oriented Programming', 'Programming', IX, 'CONCEPTUAL',
    'Understand that object-oriented programming organises a program around objects that bundle data with behaviour, resting on abstraction, encapsulation, inheritance and polymorphism, unlike procedural code organised around steps.',
    EV('Names the four principles of object-oriented programming', 'Contrasts the object-oriented with the procedural approach', 'Illustrates a principle with a real-life example'),
    'Ask {{name}} why thinking of a program as a set of interacting objects can be clearer than a list of steps.',
    ['COMP9.1']),
  cs('icse-java-toolchain', 'How Java Runs: Byte Code and the JVM', 'Programming', IX, 'CONCEPTUAL',
    'Understand how Java source code is compiled to byte code that the Java Virtual Machine runs, and how that intermediate step is what lets the same program run on any platform.',
    EV('Traces source code through byte code to execution on the JVM', 'Explains why byte code makes Java platform-independent', 'Distinguishes a Java application from an applet'),
    'Ask {{name}} how one Java program can run unchanged on a phone, a laptop and a bank server.',
    ['COMP9.1']),
  cs('icse-classes-and-objects', 'Classes and Objects', 'Programming', IX, 'CONCEPTUAL',
    'Understand a class as a user-defined type that acts as a blueprint, and an object as an instance made from it that holds its own state in attributes and acts through methods.',
    EV('Explains a class as a blueprint or object factory', 'Distinguishes an object from its class', 'Identifies the state and behaviour of a described object'),
    'Ask {{name}} how one cookie cutter (the class) can make many different cookies (the objects).',
    ['COMP9.2', 'COMP10.4']),
  cs('icse-java-data-types', 'Data Types, Literals and Type Conversion', 'Programming', IX, 'CONCEPTUAL',
    'Understand that every Java value has a type that fixes what it can hold and how much space it takes, and that converting between types may happen automatically or must be forced.',
    EV('Distinguishes primitive from non-primitive types', 'Chooses an appropriate type for a given value', 'Distinguishes implicit from explicit type conversion'),
    'Ask {{name}} why a computer needs to be told whether 5 is a whole number, a decimal or a character.',
    ['COMP9.3']),
  cs('icse-java-operators-expressions', 'Operators, Expressions and the Math Library', 'Programming', IX, 'PROCEDURAL',
    'Understand how operators combine values into expressions whose result depends on precedence and associativity, and how the Math library extends what an expression can compute.',
    EV('Evaluates an expression respecting precedence and associativity', 'Uses arithmetic, relational and logical operators correctly', 'Uses a Math class method within an expression'),
    'Ask {{name}} why 2 + 3 × 4 is 14 and not 20, to a computer as to us.',
    ['COMP9.4', 'COMP9.7']),
  cs('icse-java-program-structure-io', 'Writing and Running a Java Program', 'Programming', IX, 'PROCEDURAL',
    'Understand the standard skeleton of a Java class with its main method, how to read input at run time with the Scanner class, and how syntax, run-time and logical errors differ.',
    EV('Writes a class with a correct main method structure', 'Reads typed input using the Scanner class', 'Distinguishes syntax, run-time and logical errors'),
    'Ask {{name}} what the difference is between a program that will not start and one that runs but gives the wrong answer.',
    ['COMP9.5', 'COMP9.6']),
  cs('icse-conditional-statements', 'Conditional Statements', 'Programming', IX, 'PROCEDURAL',
    'Understand how a program chooses between paths using if, if-else, the if-else-if ladder and switch-case, so that different inputs lead to different actions.',
    EV('Writes an if-else-if ladder for a multi-way decision', 'Uses a switch-case statement with break', 'Traces which branch runs for a given input'),
    'Ask {{name}} how a program decides to print “pass” or “fail” from a single mark.',
    ['COMP9.8']),
  cs('icse-loops-iteration', 'Loops and Iteration', 'Programming', IX, 'PROCEDURAL',
    'Understand how a loop repeats a block until a condition changes, distinguishing entry-controlled for and while loops from the exit-controlled do-while, and how break and continue alter the flow.',
    EV('Writes a for and a while loop for a repeated task', 'Explains how do-while differs from while', 'Uses break and continue correctly'),
    'Ask {{name}} how a program can add up a hundred numbers without writing a hundred lines.',
    ['COMP9.9']),
  cs('icse-nested-loops-patterns', 'Nested Loops and Patterns', 'Programming', IX, 'PROCEDURAL',
    'Understand how a loop inside another loop drives two counters at once, so that the inner loop completes a full cycle for each single step of the outer one.',
    EV('Traces the counter values through a nested loop', 'Writes a nested loop to print a number or character pattern', 'Explains why the inner loop runs to completion each outer pass'),
    'Ask {{name}} how a program prints a triangle of stars row by row.',
    ['COMP9.10']),
  cs('icse-ethics-computing', 'Ethics and Safety in Computing', 'Computer Basics', IX, 'CONCEPTUAL',
    'Understand the ethical duties that come with computing — respecting privacy and data, resisting software piracy, and using social media responsibly — as choices with real consequences for others.',
    EV('Explains why software piracy is an ethical and legal wrong', 'Describes a way personal data is protected on the internet', 'Explains a principle of responsible social media use'),
    'Ask {{name}} why copying software without paying is a problem even when nobody seems to be hurt.',
    ['COMP9.11']),
  // ---------------- Class X ----------------
  cs('icse-wrapper-classes', 'Wrapper Classes and Autoboxing', 'Programming', X, 'CONCEPTUAL',
    'Understand that each primitive type has a matching wrapper class giving it object behaviour and useful methods, and that Java converts between the two automatically by boxing and unboxing.',
    EV('Matches a primitive type to its wrapper class', 'Uses a parsing or character-testing method of a wrapper class', 'Explains auto-boxing and unboxing'),
    'Ask {{name}} why a program sometimes needs to treat a plain number as though it were an object.',
    ['COMP10.1']),
  cs('icse-arrays', 'Arrays', 'Programming', X, 'PROCEDURAL',
    'Understand an array as a single named collection of same-typed values reached by index, so that many related values can be stored and processed together with a loop.',
    EV('Declares, initialises and fills a single-dimensional array', 'Accesses an element by its index', 'Uses the length property to process every element'),
    'Ask {{name}} why storing fifty marks in one array beats fifty separate variables.',
    ['COMP10.2']),
  cs('icse-sorting-searching', 'Sorting and Searching', 'Programming', X, 'PROCEDURAL',
    'Understand sorting as rearranging an array into order by repeated comparison, and searching as finding a value — linear search scanning in turn, binary search halving a sorted array each step.',
    EV('Traces selection or bubble sort on a small array', 'Traces linear and binary search for a target', 'Explains why binary search needs sorted data'),
    'Ask {{name}} why looking up a word is far faster in a sorted dictionary than in a shuffled pile of words.',
    ['COMP10.2']),
  cs('icse-string-handling', 'String Handling', 'Programming', X, 'PROCEDURAL',
    'Understand a string as a sequence of characters that the String class manipulates through methods, so text can be extracted, compared, searched and transformed.',
    EV('Uses String methods to extract or modify characters', 'Compares two strings for equality and order', 'Searches a string for a character or substring'),
    'Ask {{name}} how a program checks whether two people typed the same password.',
    ['COMP10.3']),
  cs('icse-constructors', 'Constructors', 'Programming', X, 'PROCEDURAL',
    'Understand a constructor as the special method that sets up an object when it is created, and how a default and a parameterised constructor differ, and what overloading them provides.',
    EV('Distinguishes a default from a parameterised constructor', 'Explains how a constructor differs from an ordinary method', 'Explains constructor overloading'),
    'Ask {{name}} why an object often needs its starting values set the moment it is created.',
    ['COMP10.5']),
  cs('icse-methods-overloading', 'Methods and Method Overloading', 'Programming', X, 'PROCEDURAL',
    'Understand a method as a named, reusable block that may take parameters and return a value, how pass by value differs from pass by reference, and how overloading gives one name several forms.',
    EV('Defines and calls a method with parameters and a return value', 'Distinguishes actual from formal parameters and static from non-static methods', 'Explains method overloading as a form of polymorphism'),
    'Ask {{name}} why giving several related methods the same name can make a program easier to read.',
    ['COMP10.6']),
  cs('icse-emerging-technologies', 'Emerging Computing Technologies', 'Artificial Intelligence', X, 'CONCEPTUAL',
    'Understand in outline the technologies reshaping computing — artificial intelligence, blockchain, the Internet of Things, robotics, 5G and cloud computing — and what each is for.',
    EV('Defines one emerging technology and its use', 'Distinguishes two of these technologies by purpose', 'Gives a real example of one in use'),
    'Ask {{name}} what the “cloud” actually is when a photo is said to be stored there.',
    ['COMP10.7']),
];

// Computing had no programming ladder, so there is little to align to; the two
// non-programming topics extend the existing digital-literacy and AI strands.
const alignments = {};

const newEdges = [
  // Anchor the new programming branch to the existing computing foundation.
  { t: 'icse-java-toolchain', p: 'mt_VPyvJyLQ9W', strength: 'soft', reason: 'Java runs as software on the hardware met earlier.' },
  { t: 'icse-ethics-computing', p: 'mt_95JDcZrboX', strength: 'hard', reason: 'Extends online safety and computer security.' },
  { t: 'icse-emerging-technologies', p: 'mt__LiAEHt9nk', strength: 'soft', reason: 'Extends the strand on the future of AI.' },
  { t: 'icse-emerging-technologies', p: 'mt_K6qtan847r', strength: 'soft', reason: 'Builds on machine-learning basics.' },
  // The programming ladder, in teaching order.
  { t: 'icse-classes-and-objects', p: 'icse-oop-principles', strength: 'hard', reason: 'Classes realise the object-oriented principles.' },
  { t: 'icse-classes-and-objects', p: 'icse-java-toolchain', strength: 'soft', reason: 'Writing classes presupposes a working Java setup.' },
  { t: 'icse-java-program-structure-io', p: 'icse-classes-and-objects', strength: 'hard', reason: 'A Java program is written as a class.' },
  { t: 'icse-java-data-types', p: 'icse-java-program-structure-io', strength: 'hard', reason: 'Variables are declared inside a program.' },
  { t: 'icse-java-operators-expressions', p: 'icse-java-data-types', strength: 'hard', reason: 'Operators act on typed values.' },
  { t: 'icse-conditional-statements', p: 'icse-java-operators-expressions', strength: 'hard', reason: 'Conditions are boolean expressions.' },
  { t: 'icse-loops-iteration', p: 'icse-conditional-statements', strength: 'hard', reason: 'A loop repeats while a condition holds.' },
  { t: 'icse-nested-loops-patterns', p: 'icse-loops-iteration', strength: 'hard', reason: 'Nested loops are loops within loops.' },
  { t: 'icse-arrays', p: 'icse-loops-iteration', strength: 'hard', reason: 'Arrays are processed with loops.' },
  { t: 'icse-sorting-searching', p: 'icse-arrays', strength: 'hard', reason: 'Sorting and searching operate on arrays.' },
  { t: 'icse-string-handling', p: 'icse-java-data-types', strength: 'soft', reason: 'A string is a non-primitive type.' },
  { t: 'icse-string-handling', p: 'icse-arrays', strength: 'soft', reason: 'Strings are handled much like arrays of characters.' },
  { t: 'icse-wrapper-classes', p: 'icse-java-data-types', strength: 'hard', reason: 'Wrapper classes wrap the primitive types.' },
  { t: 'icse-constructors', p: 'icse-classes-and-objects', strength: 'hard', reason: 'A constructor initialises an object of a class.' },
  { t: 'icse-methods-overloading', p: 'icse-classes-and-objects', strength: 'hard', reason: 'Methods define the behaviour of a class.' },
  { t: 'icse-methods-overloading', p: 'icse-constructors', strength: 'soft', reason: 'Method overloading parallels constructor overloading.' },
];

const newClusters = [
  { subject: 'Computing', domain: 'Programming', ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'This is where computing stops being about using software and starts being about writing it. The Class IX course teaches programming in Java from the ground up: what an object-oriented program is, how Java compiles to byte code the virtual machine runs, and then the building blocks every program needs — classes and objects, typed data, operators and expressions, reading input, and the control flow of conditionals and loops. The order matters: each idea assumes the one before it, so a learner who has skipped variables cannot understand a loop that counts with one.' },
  { subject: 'Computing', domain: 'Programming', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X builds real programs on the Class IX foundation. Arrays let one name hold many values, which makes sorting and searching worth teaching — the first genuine algorithms, where a sorted list can be searched by repeated halving instead of scanning. Strings bring text handling; wrapper classes bridge primitive values and objects; and constructors and custom methods complete the object-oriented picture, so a learner can design a class that sets its objects up correctly and gives them behaviour of their own.' },
];

integrate({ subjectDoc: 'Computer Applications (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
