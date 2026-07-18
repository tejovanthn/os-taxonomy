#!/usr/bin/env node
/**
 * build/ncert-sec-science.mjs — NCERT Science, Classes IX–X, at sub-theme grain
 * within the seven NCF-2005 themes (Food; Materials; The World of the Living;
 * Moving Things, People and Ideas; How Things Work; Natural Phenomena; Natural
 * Resources). Overwhelmingly alignment onto the existing science ladder; mints
 * only what the taxonomy genuinely lacked — buoyancy, the mole concept,
 * valency, echo and ultrasound, and plant tropisms. Descriptions are
 * Marble-authored factual scope summaries (no NCERT text). Idempotent.
 */

import { integrateNcertSec } from './ncert-sec.mjs';

const s = (code, klass, strand, description) => ({ code, klass, strand, title: `Class ${klass} ${strand}`, description });

const standards = [
  // ---- Class IX ----
  s('SCI.C9.FOOD', 'IX', 'Food', 'Improvement in food resources: plant and animal breeding and selection, fertilizers and manures, protection from pests and diseases, organic farming.'),
  s('SCI.C9.MAT.STATE', 'IX', 'Materials — Matter', 'Matter occupies space and has mass; solids, liquids and gases and their characteristics; change of state; cooling by evaporation.'),
  s('SCI.C9.MAT.PURE', 'IX', 'Materials — Pure Substances', 'Elements, compounds and mixtures; homogeneous and heterogeneous mixtures; colloids and suspensions; separation techniques.'),
  s('SCI.C9.MAT.ATOM', 'IX', 'Materials — Atoms and Molecules', 'Particle nature of matter; atoms and molecules as basic units; the law of constant proportions; atomic and molecular masses; the mole concept; valency and chemical formulae.'),
  s('SCI.C9.MAT.STRUCT', 'IX', 'Materials — Structure of the Atom', 'Atoms are made of electrons, protons and neutrons whose numbers vary between atoms; isotopes and isobars.'),
  s('SCI.C9.LIV.DIV', 'IX', 'The World of the Living — Diversity', 'Diversity of plants and animals; the basis of classification and the hierarchy of groups; salient features of the major plant and animal groups.'),
  s('SCI.C9.LIV.CELL', 'IX', 'The World of the Living — Cell', 'The cell as the basic unit of life; prokaryotic and eukaryotic cells; cell membrane and wall; organelles; nucleus and chromosomes.'),
  s('SCI.C9.LIV.TISS', 'IX', 'The World of the Living — Tissues', 'Structure and function of animal and plant tissues; the progression from tissues to organs, organ systems and organism.'),
  s('SCI.C9.LIV.HEALTH', 'IX', 'The World of the Living — Health', 'Health and its failure; disease and its causes; diseases caused by microbes and their prevention.'),
  s('SCI.C9.LIV.DIFF', 'IX', 'The World of the Living — Diffusion', 'Diffusion and exchange of substances between cells and their environment, and its role in nutrition, transport, excretion and gaseous exchange.'),
  s('SCI.C9.MOV.MOTION', 'IX', 'Moving Things — Motion', 'Displacement and velocity; uniform and non-uniform motion; acceleration; distance-time and velocity-time graphs; equations of motion; uniform circular motion.'),
  s('SCI.C9.MOV.FORCE', 'IX', 'Moving Things — Force', "Force and motion; Newton's laws; inertia and mass; momentum; conservation of momentum; action and reaction forces."),
  s('SCI.C9.MOV.GRAV', 'IX', 'Moving Things — Gravitation', 'Universal law of gravitation; gravity and acceleration due to gravity; mass and weight distinguished; free fall.'),
  s('SCI.C9.MOV.WEP', 'IX', 'Moving Things — Work and Energy', 'Work done by a force; energy and power; kinetic and potential energy; the law of conservation of energy.'),
  s('SCI.C9.MOV.FLOAT', 'IX', 'Moving Things — Floating Bodies', "Thrust and pressure; Archimedes' principle; buoyancy; an elementary idea of relative density."),
  s('SCI.C9.MOV.SOUND', 'IX', 'Moving Things — Sound', 'Nature and propagation of sound in different media; speed of sound; range of human hearing; ultrasound; reflection of sound, echo and sonar; the human ear.'),
  s('SCI.C9.NR', 'IX', 'Natural Resources', 'Air, water and soil as physical resources; the role of air in respiration, combustion and climate; pollution; the ozone layer; bio-geochemical cycles.'),
  // ---- Class X ----
  s('SCI.C10.MAT.ACID', 'X', 'Materials — Acids, Bases and Salts', 'General properties, examples and uses of acids, bases and salts; indicators; neutralisation.'),
  s('SCI.C10.MAT.REACT', 'X', 'Materials — Chemical Reactions', 'Types of chemical reaction: combination, decomposition, displacement, double displacement, precipitation, neutralisation, and oxidation and reduction.'),
  s('SCI.C10.MAT.METAL', 'X', 'Materials — Metals and Non-Metals', 'Properties of common metals; a brief discussion of basic metallurgical processes; an elementary idea of bonding.'),
  s('SCI.C10.MAT.CARBON', 'X', 'Materials — Carbon Compounds', 'Carbon compounds and elementary bonding; saturated hydrocarbons, alcohols and carboxylic acids by properties; soap and its cleansing action.'),
  s('SCI.C10.MAT.PERIOD', 'X', 'Materials — Classification of Elements', "Gradation in properties across elements; Mendeleev's periodic table and predicting trends from it."),
  s('SCI.C10.LIV.ENV', 'X', 'The World of the Living — Our Environment', 'Environmental problems and responses; biodegradable and non-biodegradable materials; ozone depletion; food webs.'),
  s('SCI.C10.LIV.LIFE', 'X', 'The World of the Living — Life Processes', "Defining 'living'; the basic concepts of nutrition, respiration, transport and excretion in plants and animals."),
  s('SCI.C10.LIV.CONTROL', 'X', 'The World of the Living — Control and Coordination', 'Tropic movements in plants and an introduction to plant hormones; control and coordination in animals through voluntary, involuntary and reflex action; the nervous system and animal hormones.'),
  s('SCI.C10.LIV.REPRO', 'X', 'The World of the Living — Reproduction', "Reproduction in plants and animals; the need for and methods of family planning; safe sex and HIV/AIDS; childbearing and women's health."),
  s('SCI.C10.LIV.HERED', 'X', 'The World of the Living — Heredity and Evolution', 'Heredity; a brief introduction to the origin of life; the basic concepts of evolution.'),
  s('SCI.C10.HTW.CIRCUIT', 'X', 'How Things Work — Electric Circuits', "Potential and potential difference; Ohm's law; series and parallel combinations of resistance; power dissipated and the relation between P, V, I and R."),
  s('SCI.C10.HTW.MAG', 'X', 'How Things Work — Magnetic Effects', "Magnetic field and field lines; field due to a current-carrying wire, coil and solenoid; force on a current-carrying conductor and Fleming's left-hand rule; the electric motor."),
  s('SCI.C10.HTW.INDUCT', 'X', 'How Things Work — Induction', 'Electromagnetic induction; induced potential difference and current; the electric generator; direct and alternating current; domestic electric circuits.'),
  s('SCI.C10.NP.REFLECT', 'X', 'Natural Phenomena — Reflection', 'Convergence and divergence of light; images formed by a concave mirror; centre of curvature, principal axis, optical centre, focus and focal length.'),
  s('SCI.C10.NP.REFRACT', 'X', 'Natural Phenomena — Refraction', 'Refraction and its laws; images formed by a convex lens; the lens of the human eye; defects of vision and their remedies.'),
  s('SCI.C10.NP.DISPERSE', 'X', 'Natural Phenomena — Dispersion', 'Velocity of light and refractive index; dispersion of light by a prism; scattering of light; twinkling of stars and the blue sky.'),
  s('SCI.C10.NR.CONSERVE', 'X', 'Natural Resources — Conservation', 'Management and judicious use of natural resources; forest and wildlife conservation; people’s participation and the Chipko movement; big dams and their trade-offs; water harvesting.'),
  s('SCI.C10.NR.ENERGY', 'X', 'Natural Resources — Sources of Energy', 'Different forms of energy leading to different sources for human use: fossil fuels, solar, biogas, wind, water, tidal and nuclear energy; renewable versus non-renewable sources.'),
];

const alignments = {
  // Food and natural resources
  'mt_D3sDOaujQk': ['SCI.C9.FOOD'],                      // Agriculture in India (Social Studies)
  'mt_GjZFr0xSIz': ['SCI.C9.FOOD'],                      // How Crops Are Grown
  'mt_YB0qF5KX9C': ['SCI.C9.NR', 'SCI.C10.LIV.ENV'],     // Human impact on environments
  'mt_LKagN9GJPX': ['SCI.C9.NR'],                        // Earth's atmosphere
  'mt_fkcxpeYP85': ['SCI.C9.NR'],                        // The Atmosphere
  'mt_LsY4-T2fU7': ['SCI.C9.NR'],                        // Salt Water vs Fresh Water
  'mt_V2lNzEex_a': ['SCI.C9.NR'],                        // The Water Cycle
  'mt_Be1A88GUpu': ['SCI.C9.NR'],                        // The Carbon Cycle
  'mt_0ajzcoKAKw': ['SCI.C9.NR'],                        // Matter Cycling in Ecosystems
  'mt_mTpV-0rtkO': ['SCI.C9.NR', 'SCI.C10.LIV.ENV'],     // Earth's Atmosphere & CO2
  // Materials
  'mt_ylruY6VhOf': ['SCI.C9.MAT.STATE'],                 // Matter Is Made of Particles
  'mt_b6kZgqolEd': ['SCI.C9.MAT.STATE'],                 // The Particle Model
  'mt_CyV7crZ8hl': ['SCI.C9.MAT.STATE'],                 // How Materials Change State
  'mt_htAYR-iCFF': ['SCI.C9.MAT.STATE'],                 // Drawing Particle Diagrams
  'mt_MBTVB-E-S7': ['SCI.C9.MAT.PURE'],                  // Pure Substances & Mixtures
  'mt_U_tJvy3cbB': ['SCI.C9.MAT.PURE'],                  // Separating Mixtures
  'mt_Z_Wu_77ybI': ['SCI.C9.MAT.PURE', 'SCI.C9.MAT.ATOM'], // Atoms, Elements & Compounds
  'mt_WRmH6pd30u': ['SCI.C9.MAT.ATOM'],                  // Atoms and Molecules
  'mt_ehC1wsdmUz': ['SCI.C9.MAT.ATOM'],                  // Conservation of Mass
  'mt_Id4cr53vlQ': ['SCI.C9.MAT.ATOM'],                  // Balancing Chemical Equations
  'mt_T7ICFeChaV': ['SCI.C9.MAT.STRUCT'],                // Atomic Structure
  'mt_bHbpLW1HUg': ['SCI.C9.MAT.STRUCT'],                // Radiometric Dating (isotopes)
  'mt_rswmjlVxDp': ['SCI.C10.MAT.METAL', 'SCI.C10.MAT.CARBON'], // Chemical Bonding
  'mt_AN2kJE6I0s': ['SCI.C10.MAT.ACID'],                 // Acids, Alkalis & pH
  'mt_QKRYLwaOU8': ['SCI.C10.MAT.ACID'],                 // Acid Reactions & Salts
  'mt_v0K6GRi4ZL': ['SCI.C10.MAT.REACT'],                // Types of Chemical Reaction
  'mt_1hgck6ucII': ['SCI.C10.MAT.REACT'],                // Physical vs Chemical Changes
  'mt_UoqUPI_uNz': ['SCI.C10.MAT.REACT'],                // Reactions That Release or Absorb Heat
  'mt_Sc_SorJhXW': ['SCI.C10.MAT.METAL'],                // Metals vs Non-Metals
  'mt_zsYW61cn_q': ['SCI.C10.MAT.METAL'],                // The Reactivity Series
  'mt_w83U-_noVR': ['SCI.C10.MAT.CARBON'],               // Ceramics, Polymers & Composites
  'mt_wfEfQuHOG-': ['SCI.C10.MAT.PERIOD'],               // The Periodic Table
  'mt_0e5rZxbAeR': ['SCI.C10.LIV.ENV', 'SCI.C10.NR.CONSERVE'], // Finite Resources & Recycling
  // The world of the living
  'mt_IY3KwGLZgk': ['SCI.C9.LIV.DIV'],                   // Classifying Organisms
  'mt_B8lX8OCzGu': ['SCI.C9.LIV.DIV'],                   // Evidence-Based Classification
  'mt_rDjtmDogJr': ['SCI.C9.LIV.DIV'],                   // Classifying living things
  'mt_fqAkSv3cUE': ['SCI.C9.LIV.DIV'],                   // Grouping Species Using DNA
  'mt_NDZYiLvApW': ['SCI.C9.LIV.DIV'],                   // Biodiversity
  'mt_bABr-c2DfV': ['SCI.C9.LIV.CELL'],                  // Parts of Plant and Animal Cells
  'mt_fhqBH9scsU': ['SCI.C9.LIV.CELL'],                  // Plant Cells vs Animal Cells
  'mt_VfA4xo4kUv': ['SCI.C9.LIV.CELL'],                  // Cells Under the Microscope
  'mt_g9RcQOhU5d': ['SCI.C9.LIV.CELL'],                  // Single-Celled Organisms
  'mt_6aJUzBYGNs': ['SCI.C9.LIV.CELL', 'SCI.C10.LIV.HERED'], // Chromosomes, Genes & DNA
  'mt_7hB8s5eOP1': ['SCI.C9.LIV.TISS'],                  // Cells to Organ Systems
  'mt_K8DJzqbksM': ['SCI.C9.LIV.TISS'],                  // Organ Systems Vocabulary
  'mt_GxmukTWBAR': ['SCI.C9.LIV.HEALTH'],                // Communicable and Non-Communicable Diseases
  'mt_uQN3rX6TOX': ['SCI.C9.LIV.HEALTH'],                // How Diseases Spread
  'mt_7sxObKXO9G': ['SCI.C9.LIV.HEALTH'],                // Preventing Disease
  'mt_1VIE8FlZvL': ['SCI.C9.LIV.HEALTH'],                // Pathogens & the Immune System
  'mt_LkOMijDvL7': ['SCI.C9.LIV.HEALTH'],                // Immunity & Vaccines
  'mt_i80I-1MLP2': ['SCI.C9.LIV.DIFF'],                  // How Diffusion Works
  'mt_zM5vu31jgl': ['SCI.C10.LIV.LIFE'],                 // Photosynthesis
  'mt_0NlbulkB5P': ['SCI.C10.LIV.LIFE'],                 // Digestion & Enzymes
  'mt_mquPi2IP-J': ['SCI.C10.LIV.LIFE'],                 // Aerobic Respiration
  'mt_TKZefYXaVS': ['SCI.C10.LIV.LIFE'],                 // Anaerobic Respiration
  'mt_V9SQS9gLFw': ['SCI.C10.LIV.LIFE'],                 // Gas Exchange & Breathing
  'mt_TR2oTy9c2M': ['SCI.C10.LIV.LIFE'],                 // Heart Structure & Double Circulation
  'mt_YSyjTZfjvv': ['SCI.C10.LIV.LIFE'],                 // Nutrient Transport in Animals
  'mt_bhhWfhDRQh': ['SCI.C10.LIV.LIFE'],                 // Kidneys and Excretion
  'mt_qzbgwaUQOA': ['SCI.C10.LIV.CONTROL'],              // The Nervous System
  'mt_okUMpHsV-P': ['SCI.C10.LIV.CONTROL'],              // Neurons & Brain Structure
  'mt_FQXGRdTDhp': ['SCI.C10.LIV.CONTROL'],              // Hormones and the Endocrine System
  'mt_J40cOn7VWn': ['SCI.C10.LIV.CONTROL'],              // How the Body Stays in Balance
  'mt_tQkCzRcWG7': ['SCI.C10.LIV.REPRO'],                // Human Reproduction
  'mt_ck57CDFGet': ['SCI.C10.LIV.REPRO'],                // Plant Reproduction
  'mt_pu2mmK27UA': ['SCI.C10.LIV.REPRO'],                // Growing Up & Puberty
  'mt_0sELh0MYWb': ['SCI.C10.LIV.HERED'],                // DNA & Genes
  'mt_o7FJPDsHiW': ['SCI.C10.LIV.HERED'],                // Predicting Inherited Traits
  'mt_FuVEZ1Ac9s': ['SCI.C10.LIV.HERED'],                // How Natural Selection Works
  'mt_ohUnzoI_nx': ['SCI.C10.LIV.HERED'],                // Evidence for Evolution
  'mt_rOqo-8GeKt': ['SCI.C10.LIV.HERED'],                // Genetic Mutation
  'mt_k1HXbEwG8f': ['SCI.C10.LIV.HERED'],                // Variation in Species
  'mt_URTJbS3hhs': ['SCI.C10.LIV.ENV'],                  // Food Webs & Interdependence
  'mt_BOG5zRYtQz': ['SCI.C10.LIV.ENV'],                  // Energy Loss Between Levels
  'mt_YvCgDM0Scg': ['SCI.C10.LIV.ENV'],                  // Toxins Building Up in Food Chains
  // Moving things, people and ideas
  'mt_zqdALphaES': ['SCI.C9.MOV.MOTION'],                // Describing Motion
  'mt_q-1a86ydgU': ['SCI.C9.MOV.MOTION'],                // Speed & Distance-Time Graphs
  'mt_OUv-QXmW7_': ['SCI.C9.MOV.MOTION'],                // Reading Distance-Time Graphs
  'mt_-OndzpVsrv': ['SCI.C9.MOV.MOTION'],                // Relative Motion
  'mt_qcDIPchMJt': ['SCI.C9.MOV.FORCE'],                 // Newton's Laws of Motion
  'mt_tXxxCFl32J': ['SCI.C9.MOV.FORCE'],                 // Newton's First & Second Laws
  'mt_fbYbe3YSVj': ['SCI.C9.MOV.FORCE'],                 // Newton's Third Law
  'mt_AiWlJfvC3O': ['SCI.C9.MOV.FORCE'],                 // Resultant Forces
  'mt_k7GOtslF-x': ['SCI.C9.MOV.FORCE'],                 // Drawing Force Diagrams
  'mt_oLjz18CxDg': ['SCI.C9.MOV.GRAV'],                  // Universal Gravitation
  'mt_sUVeVXzRuq': ['SCI.C9.MOV.GRAV'],                  // Mass vs Weight
  'mt_AvrQauS_zX': ['SCI.C9.MOV.GRAV'],                  // Gravity & Falling Objects
  'mt_1WRBUMcXaO': ['SCI.C9.MOV.WEP'],                   // Work, Energy and Power
  'mt_Jvg_r4yWaY': ['SCI.C9.MOV.WEP'],                   // Energy stores and transfers
  'mt_68pIoiiG4g': ['SCI.C9.MOV.WEP'],                   // Energy can't be created or destroyed
  'mt_ckpA3oZQ44': ['SCI.C9.MOV.WEP'],                   // Power: watts and energy per second
  'mt_JyfLtl_nhw': ['SCI.C9.MOV.WEP'],                   // Efficiency, Sankey diagrams, and work done
  'mt_fkwcCB5px7': ['SCI.C9.MOV.FLOAT'],                 // Deformation & Fluid Pressure
  'mt_vuNjYx3qOy': ['SCI.C9.MOV.FLOAT'],                 // Moments, Pressure & Hooke's Law
  'mt_DQk9oDE7gr': ['SCI.C9.MOV.SOUND'],                 // How Sound Waves Travel
  'mt_LxK9OKZQZX': ['SCI.C9.MOV.SOUND'],                 // Wave Properties & Types
  'mt_kKxbPHi5Db': ['SCI.C9.MOV.SOUND'],                 // Deep-Ocean Exploration Technology (sonar)
  // How things work
  'mt_H3ZDK0EYNV': ['SCI.C10.HTW.CIRCUIT'],              // Ohm's Law: voltage, current, resistance
  'mt_loEMaQ8kFA': ['SCI.C10.HTW.CIRCUIT'],              // Series vs parallel circuits
  'mt_2bnXrfS4Iq': ['SCI.C10.HTW.CIRCUIT'],              // Current, voltage, and what they measure
  'mt_NzNLYDb9CZ': ['SCI.C10.HTW.CIRCUIT'],              // Drawing circuits with proper symbols
  'mt_-QY08-88rw': ['SCI.C10.HTW.CIRCUIT'],              // Why circuit components behave differently
  'mt_56aspHjU19': ['SCI.C10.HTW.MAG'],                  // Magnetic Fields
  'mt_2qkn8Lhc8e': ['SCI.C10.HTW.MAG'],                  // Electromagnets
  'mt__7BVYUN180': ['SCI.C10.HTW.MAG', 'SCI.C10.HTW.INDUCT'], // Motors & the Motor Effect
  // Natural phenomena
  'mt_PifbJOuXrG': ['SCI.C10.NP.REFLECT', 'SCI.C10.NP.REFRACT'], // Reflection & Refraction
  'mt_FVERuBoCD1': ['SCI.C10.NP.REFLECT'],               // Ray Diagrams & Images
  'mt_-2VNlwAR5z': ['SCI.C10.NP.REFLECT'],               // Drawing Ray Diagrams
  'mt_qZro923zvz': ['SCI.C10.NP.REFLECT'],               // Light Travels in Straight Lines
  'mt_6w2g7aoPgz': ['SCI.C10.NP.REFRACT'],               // How We See Objects
  'mt_w5HzPpOUmj': ['SCI.C10.NP.REFRACT'],               // Waves & Different Materials
  'mt_qzGADV-NGe': ['SCI.C10.NP.DISPERSE'],              // White Light & Colour
  'mt_XSp-S0wter': ['SCI.C10.NP.DISPERSE'],              // The Electromagnetic Spectrum
  'mt_ZhKuYCbXz1': ['SCI.C10.NP.DISPERSE'],              // Star Brightness & Distance
  // Natural resources — conservation and energy
  'mt_w2A8D76ymp': ['SCI.C10.NR.ENERGY'],                // Renewable vs non-renewable energy
  'mt_Wzj1RETm9A': ['SCI.C10.NR.ENERGY'],                // Net Zero & Energy Transition
  'mt_7e-lG7YOWa': ['SCI.C10.NR.CONSERVE'],              // Communities Protecting Resources
  'mt_kON8bYEHYl': ['SCI.C10.NR.CONSERVE'],              // Rainforest Conservation
  'mt_pWwV_8OgXD': ['SCI.C10.NR.CONSERVE'],              // Protecting Endangered Animals
  'mt_44HkROUnzE': ['SCI.C10.NR.CONSERVE'],              // The Biodiversity Crisis
  'mt_RFilNlLL3T': ['SCI.C10.NR.CONSERVE'],              // India's Forests and Wildlife
};

const EV = (a, b, c) => [a, b, c];

const newTopics = [
  {
    _slug: 'buoyancy-archimedes', type: 'CONCEPTUAL', subject: 'Science', domain: 'Forces & Motion',
    name: "Buoyancy and Archimedes' Principle", ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that a fluid pushes up on anything placed in it with a force equal to the weight of fluid displaced, which decides whether an object floats or sinks.',
    evidence: EV('States that the upward force equals the weight of fluid displaced', 'Predicts floating or sinking by comparing densities', 'Explains why an object feels lighter when submerged'),
    assessmentPrompt: 'Ask {{name}} why a heavy steel ship floats while a small steel nail sinks.',
    standards: ['ncert-sec:SCI.C9.MOV.FLOAT'],
  },
  {
    _slug: 'the-mole-concept', type: 'CONCEPTUAL', subject: 'Science', domain: 'Matter & Materials',
    name: 'The Mole Concept', ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that chemists count particles by weighing, using the mole as a fixed, very large number of particles that links mass to how many atoms are present.',
    evidence: EV('Explains why chemists need a counting unit for particles', 'Converts between mass and number of moles for a given substance', 'Relates moles to the number of particles present'),
    assessmentPrompt: 'Ask {{name}} how a chemist could work out the number of atoms in a spoonful of sugar without counting them.',
    standards: ['ncert-sec:SCI.C9.MAT.ATOM'],
  },
  {
    _slug: 'valency-chemical-formulae', type: 'PROCEDURAL', subject: 'Science', domain: 'Matter & Materials',
    name: 'Valency and Chemical Formulae', ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that each element has a combining capacity called its valency, and use it to work out the formula of a compound formed between two elements.',
    evidence: EV('States the valency of common elements and radicals', 'Writes the formula of a compound from the valencies of its parts', 'Explains why elements combine in fixed proportions rather than any ratio'),
    assessmentPrompt: 'Ask {{name}} why water is always H₂O and never HO or H₃O.',
    standards: ['ncert-sec:SCI.C9.MAT.ATOM'],
  },
  {
    _slug: 'echo-ultrasound-hearing', type: 'CONCEPTUAL', subject: 'Science', domain: 'Waves, Light & Sound',
    name: 'Echo, Ultrasound and the Range of Hearing', ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that sound reflects to produce echoes, that human hearing covers only a limited range of frequencies, and that sound above that range has practical uses.',
    evidence: EV('Explains an echo as reflected sound arriving later', 'States the approximate range of frequencies humans can hear', 'Describes a use of ultrasound in medicine or navigation'),
    assessmentPrompt: 'Ask {{name}} why a shout in a large empty hall comes back to them, and why a dog whistle sounds silent.',
    standards: ['ncert-sec:SCI.C9.MOV.SOUND'],
  },
  {
    _slug: 'improvement-in-food-resources', type: 'CONCEPTUAL', subject: 'Science', domain: 'Food & Agriculture',
    name: 'Improvement in Food Resources', ageRangeStart: 14, ageRangeEnd: 15,
    description: 'Understand that food output is raised by selecting and breeding better crops and livestock, replacing lost soil nutrients, and protecting yields from pests and disease.',
    evidence: EV('Explains how selection and breeding improve a crop or animal variety', 'Distinguishes a manure from a chemical fertilizer and states a trade-off', 'Describes how organic farming differs from intensive chemical farming'),
    assessmentPrompt: 'Ask {{name}} how a farmer could grow more grain on the same field, and what each method might cost in the long run.',
    standards: ['ncert-sec:SCI.C9.FOOD'],
  },
  {
    _slug: 'periodic-classification-trends', type: 'CONCEPTUAL', subject: 'Science', domain: 'Matter & Materials',
    name: 'Periodic Classification and Periodic Trends', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Understand that elements were ordered so that properties repeat at regular intervals, and that this pattern lets an element’s behaviour be predicted from its position alone.',
    evidence: EV('Explains what made Mendeleev’s ordering predictive rather than merely descriptive', 'Describes how a property changes across a period or down a group', 'Predicts a property of an element from where it sits in the table'),
    assessmentPrompt: 'Ask {{name}} how Mendeleev could describe elements nobody had discovered yet.',
    standards: ['ncert-sec:SCI.C10.MAT.PERIOD'],
  },
  {
    _slug: 'tropic-movements-plant-hormones', type: 'CONCEPTUAL', subject: 'Science', domain: 'Organisms & Life Processes',
    name: 'Tropic Movements and Plant Hormones', ageRangeStart: 15, ageRangeEnd: 16,
    description: 'Understand that plants respond to light, gravity and water by growing towards or away from them, and that chemical messengers rather than nerves control this growth.',
    evidence: EV('Names the stimulus behind phototropism, geotropism and hydrotropism', 'Predicts which way a root or shoot will bend in a described setup', 'Explains that plant responses are controlled by hormones, not nerves'),
    assessmentPrompt: 'Ask {{name}} why a plant on a windowsill leans towards the glass, and why its roots still grow downwards.',
    standards: ['ncert-sec:SCI.C10.LIV.CONTROL'],
  },
];

const newEdges = [
  { t: 'buoyancy-archimedes', p: 'mt_fkwcCB5px7', strength: 'hard', reason: 'Buoyancy builds on how fluid pressure increases with depth.' },
  { t: 'the-mole-concept', p: 'mt_WRmH6pd30u', strength: 'hard', reason: 'The mole counts the atoms and molecules introduced earlier.' },
  { t: 'valency-chemical-formulae', p: 'mt_Z_Wu_77ybI', strength: 'hard', reason: 'Formulae describe how elements combine into compounds.' },
  { t: 'valency-chemical-formulae', p: 'mt_Id4cr53vlQ', strength: 'soft', reason: 'Writing formulae underpins balancing equations.' },
  { t: 'echo-ultrasound-hearing', p: 'mt_DQk9oDE7gr', strength: 'hard', reason: 'Echoes and ultrasound depend on how sound waves travel and reflect.' },
  { t: 'tropic-movements-plant-hormones', p: 'mt_zM5vu31jgl', strength: 'soft', reason: 'Plant growth responses connect to how plants make and use food.' },
  { t: 'tropic-movements-plant-hormones', p: 'mt_FQXGRdTDhp', strength: 'soft', reason: 'Plant hormones parallel chemical coordination in animals.' },
  { t: 'improvement-in-food-resources', p: 'mt_zM5vu31jgl', strength: 'soft', reason: 'Raising crop yield builds on how plants make their food.' },
  { t: 'improvement-in-food-resources', p: 'mt_0ajzcoKAKw', strength: 'soft', reason: 'Fertilizer and manure use depends on how nutrients cycle through soil.' },
  { t: 'periodic-classification-trends', p: 'mt_wfEfQuHOG-', strength: 'hard', reason: 'Periodic trends build on knowing the structure of the periodic table.' },
  { t: 'periodic-classification-trends', p: 'mt_T7ICFeChaV', strength: 'hard', reason: 'Periodicity is explained by atomic structure.' },
];

const newClusters = [
  { subject: 'Science', domain: 'Food & Agriculture', ageRangeStart: 14, ageRangeEnd: 16,
    summary: 'Food is one of the themes NCF-2005 runs through school science, and at the secondary stage it becomes a question of how output is raised without wrecking what produces it. Learners look at how selecting and breeding crops and livestock changes what a field yields, why soil nutrients have to be put back once they are taken out, and what the trade-offs are between chemical fertilizers and organic methods. It is a good place to see science applied to a problem where the right answer depends on time horizon.' },
];

integrateNcertSec({ subjectDoc: 'Science (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
