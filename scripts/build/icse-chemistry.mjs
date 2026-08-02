#!/usr/bin/env node
/**
 * build/icse-chemistry.mjs — ICSE Chemistry (52), Classes IX–X (ages 14–16).
 *
 * Like Physics, ICSE Chemistry (IX–X) lands under the composite **Science**
 * subject. Science already had a solid chemistry base at this level — valency
 * and formulae, balancing equations, atoms and molecules, atomic structure,
 * chemical bonding, the mole concept, periodic classification and the reactivity
 * series — so those units align. The mints are the rest of a full chemistry
 * course: reaction types and redox, the chemistry of water, gas laws, acids
 * bases and salts, analytical chemistry, stoichiometry, electrolysis,
 * metallurgy, the study of key compounds, and organic chemistry. All land in the
 * existing `Matter & Materials` Science domain. Marble-authored factual
 * descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const sci = topic('Science');
const MM = 'Matter & Materials';
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('CHE9.1', 'IX', 'The Language of Chemistry', 'Symbols, valency and the formulae of compounds; balancing chemical equations; and relative atomic and molecular masses.'),
  s('CHE9.2', 'IX', 'Chemical Changes and Reactions', 'The types of chemical change — combination, decomposition, displacement and double decomposition — and the energy absorbed or released in a reaction.'),
  s('CHE9.3', 'IX', 'Water', 'Water as a solvent; water of crystallisation, hydrated and anhydrous substances and drying agents; and hard and soft water and the removal of hardness.'),
  s('CHE9.4', 'IX', 'Atomic Structure and Chemical Bonding', 'The structure of the atom and the Rutherford and Bohr models; and electrovalent and covalent bonding through the transfer or sharing of electrons.'),
  s('CHE9.5', 'IX', 'The Periodic Table', 'The modern periodic table arranged in groups and periods, and the zero (noble gas) group.'),
  s('CHE9.6', 'IX', 'Study of Hydrogen', 'The preparation of hydrogen from water, acids and alkalis and its industrial manufacture; and oxidation and reduction as the addition or removal of oxygen or hydrogen.'),
  s('CHE9.7', 'IX', 'Study of Gas Laws', 'The behaviour of gases under changing temperature and pressure explained by molecular motion; the Kelvin scale; and standard temperature and pressure.'),
  s('CHE9.8', 'IX', 'Atmospheric and Environmental Chemistry', 'Acid rain and its causes and impact; global warming and the greenhouse gases; and the depletion of the ozone layer.'),
  // ---- Class X ----
  s('CHE10.1', 'X', 'Periodic Properties', 'The variation of physical and chemical properties — atomic size, ionisation energy, metallic and non-metallic character — across the periods and down the groups of the periodic table.'),
  s('CHE10.2', 'X', 'Chemical Bonding', 'Electrovalent, covalent and coordinate bonding and the structures of common molecules and ions.'),
  s('CHE10.3', 'X', 'Study of Acids, Bases and Salts', 'The properties of acids, bases and alkalis and the pH scale; the types of salts and their preparation by the appropriate method.'),
  s('CHE10.4', 'X', 'Analytical Chemistry', 'Identifying ions by the action of sodium hydroxide and ammonium hydroxide on salt solutions, and by the colour and solubility of precipitates.'),
  s('CHE10.5', 'X', 'Mole Concept and Stoichiometry', 'The mole, Avogadro’s number and molar volume; and calculations of mass and volume from balanced equations.'),
  s('CHE10.6', 'X', 'Electrolysis', 'Electrolytes and non-electrolytes; the electrolysis of molten and aqueous compounds; and its applications including electroplating.'),
  s('CHE10.7', 'X', 'Metallurgy', 'The occurrence of metals as ores; the extraction of a metal according to its position in the reactivity series; and the extraction of aluminium.'),
  s('CHE10.8', 'X', 'Study of Compounds', 'The laboratory preparation and properties of hydrogen chloride, ammonia, nitric acid and sulphuric acid.'),
  s('CHE10.9', 'X', 'Organic Chemistry', 'Carbon and catenation; hydrocarbons — alkanes, alkenes and alkynes; functional groups, alcohols and carboxylic acids; and IUPAC nomenclature.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  sci('icse-chem-reaction-types', 'Types of Chemical Reactions', MM, IX, 'CONCEPTUAL',
    'Understand that reactions fall into a few families — combination, decomposition, displacement and double decomposition — and that each either absorbs or releases energy as bonds break and form.',
    EV('Classifies a reaction into one of the four types', 'Distinguishes an exothermic from an endothermic reaction', 'Writes a balanced equation for a reaction of a given type'),
    'Ask {{name}} why some reactions give out heat while others need heating to keep going.',
    ['CHE9.2']),
  sci('icse-chem-water-crystallisation', 'Water of Crystallisation and Drying Agents', MM, IX, 'CONCEPTUAL',
    'Understand that some crystals lock water into their structure as water of crystallisation, that heating drives it off to leave an anhydrous solid, and that drying agents remove moisture from their surroundings.',
    EV('Distinguishes a hydrated from an anhydrous substance', 'Explains what water of crystallisation is', 'Names a drying or dehydrating agent and its use'),
    'Ask {{name}} why blue copper sulphate crystals turn white and powdery when heated.',
    ['CHE9.3']),
  sci('icse-chem-hard-water', 'Hard and Soft Water', MM, IX, 'CONCEPTUAL',
    'Understand hardness as dissolved calcium and magnesium salts that stop soap lathering, distinguish temporary from permanent hardness, and know how each is removed.',
    EV('Distinguishes hard from soft water by its effect on soap', 'Distinguishes temporary from permanent hardness', 'Explains how boiling or washing soda removes hardness'),
    'Ask {{name}} why soap lathers poorly in some water and what can be done about it.',
    ['CHE9.3']),
  sci('icse-chem-redox', 'Oxidation and Reduction', MM, IX, 'CONCEPTUAL',
    'Understand oxidation and reduction as paired opposites — gain or loss of oxygen, or loss or gain of hydrogen — that always happen together, one substance being oxidised as another is reduced.',
    EV('Identifies oxidation and reduction in a reaction', 'Explains why oxidation and reduction always occur together', 'Identifies the oxidising and reducing agent'),
    'Ask {{name}} why iron rusting and a fuel burning are, at heart, the same kind of change.',
    ['CHE9.6']),
  sci('icse-chem-hydrogen', 'The Study of Hydrogen', MM, IX, 'CONCEPTUAL',
    'Understand how hydrogen is prepared from water, dilute acids and alkalis and made industrially, and why the reactive metals aluminium, zinc and lead behave unusually with alkalis.',
    EV('Describes a laboratory preparation of hydrogen', 'Explains why hydrogen is collected by downward displacement of water', 'Names an industrial use or manufacture of hydrogen'),
    'Ask {{name}} why hydrogen is the lightest gas and how that shapes the way it is collected.',
    ['CHE9.6']),
  sci('icse-chem-gas-laws', 'The Gas Laws', MM, IX, 'PROCEDURAL',
    'Understand how a gas responds to changing temperature and pressure — Boyle’s and Charles’s laws — as consequences of molecular motion, and use the Kelvin scale and standard conditions.',
    EV('Applies Boyle’s and Charles’s laws to a gas', 'Converts between the Celsius and Kelvin scales', 'Explains gas behaviour in terms of molecular motion'),
    'Ask {{name}} why a sealed packet of chips swells up on a mountain and why a balloon shrinks in the cold.',
    ['CHE9.7']),
  sci('icse-chem-air-pollution', 'Acid Rain, Ozone Depletion and Air Pollution', MM, IX, 'CONCEPTUAL',
    'Understand how gases released into the air cause harm — sulphur and nitrogen oxides making acid rain, and chlorofluorocarbons thinning the ozone layer that shields us from ultraviolet light.',
    EV('Explains the cause and impact of acid rain', 'Explains what depletes the ozone layer and why that matters', 'Names a way to reduce a named air pollutant'),
    'Ask {{name}} how the exhaust from factories and cars can fall back to earth as acid.',
    ['CHE9.8']),
  // ---------------- Class X ----------------
  sci('icse-chem-acids-bases', 'Acids, Bases and the pH Scale', MM, X, 'CONCEPTUAL',
    'Understand acids and bases by their properties and reactions, and the pH scale as the measure of how acidic or alkaline a solution is, from strong acid to strong alkali.',
    EV('States a characteristic property of an acid and of a base', 'Places a solution on the pH scale from its behaviour', 'Explains neutralisation as an acid reacting with a base'),
    'Ask {{name}} what lemon juice and soap have in common and how they differ, chemically.',
    ['CHE10.3']),
  sci('icse-chem-salts', 'Salts and Their Preparation', MM, X, 'PROCEDURAL',
    'Understand a salt as the product of neutralising an acid, classify salts as normal, acid or basic, and choose the right method to prepare a given salt.',
    EV('Classifies a salt as normal, acid or basic', 'Chooses a suitable preparation method for a named salt', 'Writes the equation for the formation of a salt'),
    'Ask {{name}} how table salt is, chemically, the leftover of an acid meeting a base.',
    ['CHE10.3']),
  sci('icse-chem-analytical', 'Analytical Chemistry: Identifying Ions', MM, X, 'PROCEDURAL',
    'Understand how an unknown salt is identified by the colour and solubility of the precipitate it forms with sodium hydroxide or ammonium hydroxide, so a test reveals which metal ion is present.',
    EV('Predicts the precipitate a metal ion forms with an alkali', 'Identifies a metal ion from the colour of its hydroxide', 'Distinguishes two ions by their behaviour in excess alkali'),
    'Ask {{name}} how a chemist can name the metal in a solution just by adding a drop of another and watching.',
    ['CHE10.4']),
  sci('icse-chem-stoichiometry', 'Stoichiometry and Chemical Calculations', MM, X, 'PROCEDURAL',
    'Understand how a balanced equation is a recipe in moles, so that the mass or volume of one substance in a reaction can be calculated from the amount of another.',
    EV('Relates moles of reactants and products from a balanced equation', 'Calculates the mass of a product from the mass of a reactant', 'Calculates the volume of a gas at standard conditions'),
    'Ask {{name}} how a chemist knows exactly how much of one thing is needed to react with another.',
    ['CHE10.5']),
  sci('icse-chem-electrolysis', 'Electrolysis', MM, X, 'CONCEPTUAL',
    'Understand electrolysis as the use of an electric current to split a molten or dissolved compound at its electrodes, distinguish electrolytes from non-electrolytes, and see its use in electroplating.',
    EV('Distinguishes an electrolyte from a non-electrolyte', 'Identifies the products at the cathode and anode', 'Explains how electroplating deposits a metal'),
    'Ask {{name}} how a cheap metal spoon can be given a lasting coat of silver.',
    ['CHE10.6']),
  sci('icse-chem-metallurgy', 'Metallurgy: Extracting Metals', MM, X, 'CONCEPTUAL',
    'Understand that a metal’s place in the reactivity series decides how hard it is to win from its ore, so that reactive metals need electrolysis while less reactive ones can be reduced by heating.',
    EV('Relates a metal’s reactivity to its method of extraction', 'Outlines the extraction of a named metal such as aluminium or iron', 'Distinguishes an ore from a mineral'),
    'Ask {{name}} why gold is found as a nugget but aluminium never is.',
    ['CHE10.7']),
  sci('icse-chem-ammonia-nitric', 'Ammonia and Nitric Acid', MM, X, 'CONCEPTUAL',
    'Understand how ammonia and nitric acid are prepared and how they behave — ammonia as a soluble alkaline gas, nitric acid as a strong acid and powerful oxidiser.',
    EV('Describes the laboratory preparation of ammonia', 'States a characteristic property of ammonia or nitric acid', 'Explains why nitric acid acts as an oxidising agent'),
    'Ask {{name}} how the gas that gives smelling salts their sting is made in a laboratory.',
    ['CHE10.8']),
  sci('icse-chem-hcl-sulphuric', 'Hydrogen Chloride and Sulphuric Acid', MM, X, 'CONCEPTUAL',
    'Understand how hydrogen chloride and sulphuric acid are prepared and how they behave — hydrogen chloride giving hydrochloric acid in water, sulphuric acid acting as acid, dehydrating and oxidising agent.',
    EV('Describes the preparation of hydrogen chloride', 'States a property of hydrochloric or sulphuric acid', 'Explains why concentrated sulphuric acid is a drying agent'),
    'Ask {{name}} why concentrated sulphuric acid chars sugar black.',
    ['CHE10.8']),
  sci('icse-chem-organic-intro', 'Introduction to Organic Chemistry', MM, X, 'CONCEPTUAL',
    'Understand why carbon forms a whole chemistry of its own — its four bonds and its power of catenation letting it build endless chains and rings that no other element can.',
    EV('Explains catenation and the tetravalency of carbon', 'Explains why carbon forms so many compounds', 'Distinguishes an organic from an inorganic compound'),
    'Ask {{name}} why one element, carbon, has more compounds than all the others put together.',
    ['CHE10.9']),
  sci('icse-chem-hydrocarbons', 'Hydrocarbons and Functional Groups', MM, X, 'CONCEPTUAL',
    'Understand hydrocarbons as chains of carbon and hydrogen — saturated alkanes and unsaturated alkenes and alkynes — and how a functional group such as in an alcohol or acid gives a family its character.',
    EV('Distinguishes alkanes, alkenes and alkynes by their bonds', 'Identifies the functional group of an alcohol or carboxylic acid', 'Names a simple organic compound by IUPAC rules'),
    'Ask {{name}} what makes the alcohol in a thermometer chemically different from cooking gas.',
    ['CHE10.9']),
];

// Align ICSE units onto the existing 14–16 Science chemistry topics (align-first).
const alignments = {
  mt_QF7nm0CbQN: ['CHE9.1'],   // Valency and Chemical Formulae
  mt_Id4cr53vlQ: ['CHE9.1'],   // Balancing Chemical Equations
  mt_WRmH6pd30u: ['CHE9.1'],   // Atoms and Molecules
  mt_T7ICFeChaV: ['CHE9.4'],   // Atomic Structure
  mt_rswmjlVxDp: ['CHE9.4', 'CHE10.2'], // Chemical Bonding
  mt_ZUsklkTY8B: ['CHE9.5', 'CHE10.1'], // Periodic Classification and Periodic Trends
  'mt_mTpV-0rtkO': ['CHE9.8'], // Earth's Atmosphere & CO2 (the global-warming part)
  mt_ok9HgvTLM0: ['CHE10.5'],  // The Mole Concept
};

const newEdges = [
  // Class IX chemistry, anchored to the existing base.
  { t: 'icse-chem-reaction-types', p: 'mt_Id4cr53vlQ', strength: 'hard', reason: 'Classifying reactions builds on balancing their equations.' },
  { t: 'icse-chem-redox', p: 'icse-chem-reaction-types', strength: 'hard', reason: 'Redox is a way of looking at the reactions just classified.' },
  { t: 'icse-chem-hydrogen', p: 'icse-chem-redox', strength: 'soft', reason: 'Hydrogen is displaced in redox reactions.' },
  { t: 'icse-chem-water-crystallisation', p: 'mt_QF7nm0CbQN', strength: 'soft', reason: 'Hydrate formulae build on writing chemical formulae.' },
  { t: 'icse-chem-hard-water', p: 'icse-chem-water-crystallisation', strength: 'soft', reason: 'Hardness is another topic in the chemistry of water.' },
  { t: 'icse-chem-gas-laws', p: 'mt_WRmH6pd30u', strength: 'soft', reason: 'Gas behaviour is explained by the motion of molecules.' },
  { t: 'icse-chem-air-pollution', p: 'mt_mTpV-0rtkO', strength: 'hard', reason: 'Air pollution builds on the atmosphere and carbon dioxide.' },
  // Class X chemistry.
  { t: 'icse-chem-acids-bases', p: 'mt_rswmjlVxDp', strength: 'soft', reason: 'Acid and base behaviour rests on bonding and ions.' },
  { t: 'icse-chem-acids-bases', p: 'icse-chem-reaction-types', strength: 'soft', reason: 'Neutralisation is one of the reaction types.' },
  { t: 'icse-chem-salts', p: 'icse-chem-acids-bases', strength: 'hard', reason: 'A salt is what an acid and base make on neutralising.' },
  { t: 'icse-chem-analytical', p: 'icse-chem-salts', strength: 'hard', reason: 'Salt analysis identifies the ions in a salt.' },
  { t: 'icse-chem-stoichiometry', p: 'mt_ok9HgvTLM0', strength: 'hard', reason: 'Stoichiometry applies the mole concept to equations.' },
  { t: 'icse-chem-stoichiometry', p: 'mt_Id4cr53vlQ', strength: 'soft', reason: 'Calculations start from a balanced equation.' },
  { t: 'icse-chem-electrolysis', p: 'mt_rswmjlVxDp', strength: 'soft', reason: 'Electrolysis works on the ions of an ionic compound.' },
  { t: 'icse-chem-electrolysis', p: 'mt_zsYW61cn_q', strength: 'soft', reason: 'What is deposited depends on the reactivity of the ions.' },
  { t: 'icse-chem-metallurgy', p: 'mt_zsYW61cn_q', strength: 'hard', reason: 'The method of extraction follows the reactivity series.' },
  { t: 'icse-chem-metallurgy', p: 'icse-chem-electrolysis', strength: 'soft', reason: 'Reactive metals are extracted by electrolysis.' },
  { t: 'icse-chem-ammonia-nitric', p: 'icse-chem-acids-bases', strength: 'soft', reason: 'These compounds are studied as an alkali and an acid.' },
  { t: 'icse-chem-ammonia-nitric', p: 'icse-chem-hydrogen', strength: 'soft', reason: 'The study of compounds follows the study of hydrogen.' },
  { t: 'icse-chem-hcl-sulphuric', p: 'icse-chem-acids-bases', strength: 'soft', reason: 'Hydrochloric and sulphuric acid are studied as acids.' },
  { t: 'icse-chem-organic-intro', p: 'mt_rswmjlVxDp', strength: 'hard', reason: 'Organic chemistry rests on the covalent bonding of carbon.' },
  { t: 'icse-chem-organic-intro', p: 'mt_T7ICFeChaV', strength: 'soft', reason: 'Carbon’s bonding follows from its atomic structure.' },
  { t: 'icse-chem-hydrocarbons', p: 'icse-chem-organic-intro', strength: 'hard', reason: 'Hydrocarbons are the first family of organic compounds.' },
];

const newClusters = [
  { subject: 'Science', domain: 'Matter & Materials', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X chemistry becomes systematic. Building on atoms, bonding and the periodic table, your child learns how acids, bases and salts behave and how the pH scale measures them; how an unknown salt is identified by the precipitate it forms; and how a balanced equation, read in moles, lets the amount of one substance be calculated from another. From there the course reaches into industry — electrolysis and electroplating, the extraction of metals by their reactivity, the preparation of key compounds, and the vast, separate world of carbon in organic chemistry.' },
];

integrate({ subjectDoc: 'Chemistry (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
