#!/usr/bin/env node
/**
 * build/icse-biology.mjs — ICSE Biology (52), Classes IX–X (ages 14–16).
 *
 * Like Physics and Chemistry, ICSE Biology (IX–X) lands under the composite
 * **Science** subject. Science had many biology basics already — respiration,
 * gas exchange, circulation, reproduction, the immune system, diffusion,
 * inheritance, the endocrine system and plant hormones — but pitched at 12–14,
 * so those units align. The mints fill the senior specifics the taxonomy lacked,
 * most notably **photosynthesis** (absent entirely), plus cell structure and
 * organelles, tissues, cell division, seeds and germination, transpiration and
 * water absorption, the digestive, excretory and nervous systems, Mendelian
 * genetics and human population. Marble-authored factual descriptions — no CISCE
 * text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const sci = topic('Science');
const OLP = 'Organisms & Life Processes', HB = 'The Human Body', ECO = 'Ecosystems & Habitats';
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('BIO9.1', 'IX', 'Basic Biology', 'The cell as the unit of life, prokaryotic and eukaryotic cells and their organelles; and the types of plant and animal tissues.'),
  s('BIO9.2', 'IX', 'Flowering Plants', 'The structure of a bisexual flower and the functions of its parts; pollination; and fertilisation.'),
  s('BIO9.3', 'IX', 'Plant Physiology', 'The structure of dicot and monocot seeds and the types and conditions of germination; and respiration in plants and its gaseous exchange.'),
  s('BIO9.4', 'IX', 'Diversity in the Animal Kingdom', 'The classification of the animal kingdom and the distinguishing features of its major groups.'),
  s('BIO9.5', 'IX', 'Economic Importance of Bacteria and Fungi', 'The useful and harmful roles of bacteria and the economic importance of fungi.'),
  s('BIO9.6', 'IX', 'Human Anatomy and Physiology', 'Human nutrition and the digestive system; the skeleton, movement and locomotion; and the structure and functions of the skin.'),
  s('BIO9.7', 'IX', 'Health and Hygiene', 'Bacterial, viral, protozoan and helminthic diseases, how they spread and how they are prevented.'),
  // ---- Class X ----
  s('BIO10.1', 'X', 'Cell Division', 'Chromosomes and the cell cycle; mitosis and meiosis and their significance.'),
  s('BIO10.2', 'X', 'Plant Physiology', 'The absorption of water by roots through diffusion and osmosis; transpiration and its significance; photosynthesis and its importance; and chemical coordination through plant hormones and tropic movements.'),
  s('BIO10.3', 'X', 'Human Anatomy and Physiology', 'The respiratory, circulatory, excretory, nervous, endocrine and reproductive systems — their organs, structure and working.'),
  s('BIO10.4', 'X', 'Genetics', 'Mendel’s laws and monohybrid and dihybrid crosses; the terms of inheritance; sex determination in humans; and sex-linked inheritance.'),
  s('BIO10.5', 'X', 'Population', 'The reasons for the rise in human population; demography and its terms; the problems of population explosion; and methods of population control.'),
  s('BIO10.6', 'X', 'Environmental Concerns and Pollution', 'The types and sources of pollution, its major environmental concerns, and their control.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  sci('icse-bio-cell-structure', 'Cell Structure and Organelles', OLP, IX, 'CONCEPTUAL',
    'Understand the cell as the smallest unit of life, distinguish the simple prokaryotic cell from the eukaryotic cell, and know the organelles — nucleus, mitochondria, chloroplasts and the rest — and what each does.',
    EV('Distinguishes a prokaryotic from a eukaryotic cell', 'Names an organelle and its function', 'Distinguishes a plant from an animal cell'),
    'Ask {{name}} how something too small to see can be alive and doing dozens of jobs at once.',
    ['BIO9.1']),
  sci('icse-bio-tissues', 'Plant and Animal Tissues', OLP, IX, 'CONCEPTUAL',
    'Understand a tissue as a group of similar cells doing one job, and how plant tissues and animal tissues are each specialised — from the epidermis of a leaf to the muscle and nerve of an animal.',
    EV('Defines a tissue and gives a plant and an animal example', 'Matches a tissue to the job it performs', 'Explains why multicellular life needs specialised tissues'),
    'Ask {{name}} why the cells of a muscle and the cells of the skin are built so differently.',
    ['BIO9.1']),
  sci('icse-bio-seeds-germination', 'Seeds and Germination', OLP, IX, 'CONCEPTUAL',
    'Understand the structure of a seed and how, given water, air and warmth, it germinates — the radicle and plumule emerging — to grow into a new plant.',
    EV('Labels the parts of a dicot or monocot seed', 'States the conditions needed for germination', 'Distinguishes the germination of a bean from a maize grain'),
    'Ask {{name}} what a dry seed needs before it will burst into life.',
    ['BIO9.3']),
  sci('icse-bio-animal-diversity', 'Diversity of the Animal Kingdom', OLP, IX, 'CONCEPTUAL',
    'Understand how the animal kingdom is classified into major groups by shared features, from simple invertebrates to the vertebrates, so that the vast variety of animals falls into an order.',
    EV('Distinguishes vertebrates from invertebrates', 'Names a feature that defines a major animal group', 'Classifies a given animal into its group'),
    'Ask {{name}} what a jellyfish, an insect and a fish have that lets scientists sort them into groups.',
    ['BIO9.4']),
  sci('icse-bio-microbes-economic', 'The Economic Importance of Microbes', OLP, IX, 'CONCEPTUAL',
    'Understand that bacteria and fungi are both useful and harmful — fixing nitrogen, fermenting food and making medicines, but also spoiling food and causing disease.',
    EV('Names a useful role of bacteria or fungi', 'Names a harmful role of bacteria or fungi', 'Explains how a microbe is put to use in food or medicine'),
    'Ask {{name}} how the same kind of tiny living thing can both make bread rise and make food rot.',
    ['BIO9.5']),
  sci('icse-bio-nutrition-digestion', 'Human Nutrition and Digestion', HB, IX, 'CONCEPTUAL',
    'Understand how the digestive system breaks food down into absorbable nutrients — through the mouth, stomach and intestines, aided by enzymes — so the body can use what it eats.',
    EV('Traces food through the parts of the digestive system', 'Explains the role of an enzyme in digestion', 'Explains where and how nutrients are absorbed'),
    'Ask {{name}} what happens to a mouthful of food on its journey through the body.',
    ['BIO9.6']),
  sci('icse-bio-skeleton-movement', 'The Skeleton, Movement and Locomotion', HB, IX, 'CONCEPTUAL',
    'Understand how the skeleton supports and protects the body and, working with muscles at its joints, produces movement and locomotion.',
    EV('States the functions of the skeleton', 'Explains how muscles and bones produce movement at a joint', 'Names a type of joint and where it is found'),
    'Ask {{name}} how bones that cannot move on their own let the body run and jump.',
    ['BIO9.6']),
  sci('icse-bio-skin', 'The Skin: Structure and Function', HB, IX, 'CONCEPTUAL',
    'Understand the skin as an organ that protects the body, senses its surroundings and helps regulate temperature through its layers, sweat glands and blood vessels.',
    EV('Names the layers of the skin', 'Explains how the skin helps control body temperature', 'States a protective or sensory function of the skin'),
    'Ask {{name}} how sweating on a hot day helps keep the body from overheating.',
    ['BIO9.6']),
  // ---------------- Class X ----------------
  sci('icse-bio-cell-division', 'Cell Division: Mitosis and Meiosis', OLP, X, 'CONCEPTUAL',
    'Understand that cells divide to grow and reproduce — mitosis making two identical cells for growth and repair, meiosis halving the chromosomes to make gametes for reproduction.',
    EV('Distinguishes mitosis from meiosis by their outcome', 'Explains why growth needs mitosis and reproduction needs meiosis', 'States the significance of halving chromosomes in meiosis'),
    'Ask {{name}} why the cells that make a baby must carry half the chromosomes of ordinary cells.',
    ['BIO10.1']),
  sci('icse-bio-osmosis-absorption', 'Osmosis and Water Absorption in Plants', OLP, X, 'CONCEPTUAL',
    'Understand osmosis as the movement of water across a membrane toward the more concentrated side, and how a root uses it to draw water and minerals from the soil.',
    EV('Explains osmosis and distinguishes it from diffusion', 'Explains how a root absorbs water by osmosis', 'Predicts whether a cell will gain or lose water in a solution'),
    'Ask {{name}} how a plant drinks water from the soil without any pump.',
    ['BIO10.2']),
  sci('icse-bio-transpiration', 'Transpiration', OLP, X, 'CONCEPTUAL',
    'Understand transpiration as the loss of water vapour from a plant’s leaves, the pull that draws water up from the roots, and the factors that speed it up or slow it down.',
    EV('Explains the process and significance of transpiration', 'Names a factor affecting the rate of transpiration', 'Links transpiration to the rise of water up the stem'),
    'Ask {{name}} how water gets from the roots of a tall tree all the way up to its highest leaves.',
    ['BIO10.2']),
  sci('icse-bio-photosynthesis', 'Photosynthesis', OLP, X, 'CONCEPTUAL',
    'Understand photosynthesis as the process by which green plants use light, water and carbon dioxide to make their own food and release oxygen — the source, in the end, of nearly all food and oxygen on Earth.',
    EV('States the raw materials, products and conditions of photosynthesis', 'Explains the role of chlorophyll and light', 'Explains why almost all life depends on photosynthesis'),
    'Ask {{name}} how a plant makes its own food out of nothing but light, air and water.',
    ['BIO10.2']),
  sci('icse-bio-excretory-system', 'The Excretory System', HB, X, 'CONCEPTUAL',
    'Understand how the body removes its wastes — the kidneys filtering the blood to form urine through filtration, reabsorption and secretion, keeping the blood’s composition steady.',
    EV('Names the parts of the urinary system and their roles', 'Explains how a kidney filters the blood', 'Distinguishes filtration, reabsorption and secretion'),
    'Ask {{name}} how the body gets rid of the wastes that build up in the blood.',
    ['BIO10.3']),
  sci('icse-bio-nervous-system', 'The Nervous System', HB, X, 'CONCEPTUAL',
    'Understand how the nervous system carries and processes signals — the neuron as its unit, the brain and spinal cord as its centre — so the body senses, decides and responds, including the reflex.',
    EV('Describes the structure of a neuron', 'Distinguishes the central, peripheral and autonomic nervous systems', 'Explains a reflex action'),
    'Ask {{name}} why a hand jerks off a hot pan before they even feel the pain.',
    ['BIO10.3']),
  sci('icse-bio-mendelian-genetics', 'Mendelian Genetics', OLP, X, 'CONCEPTUAL',
    'Understand how Mendel’s laws explain inheritance through dominant and recessive alleles, and use a monohybrid and dihybrid cross to predict the offspring of a mating.',
    EV('States Mendel’s laws of inheritance', 'Works a monohybrid cross and gives the ratio', 'Distinguishes genotype from phenotype'),
    'Ask {{name}} why two brown-eyed parents can have a blue-eyed child.',
    ['BIO10.4']),
  sci('icse-bio-sex-linkage', 'Sex Determination and Sex-Linked Inheritance', OLP, X, 'CONCEPTUAL',
    'Understand how the X and Y chromosomes determine sex in humans, and why sex-linked conditions such as haemophilia and colour blindness appear far more often in males.',
    EV('Explains how sex is determined by the chromosomes', 'Explains why a sex-linked disease is commoner in males', 'Traces a sex-linked trait through a cross'),
    'Ask {{name}} why colour blindness runs in families and affects far more boys than girls.',
    ['BIO10.4']),
  sci('icse-bio-population', 'Human Population and Its Control', ECO, X, 'CONCEPTUAL',
    'Understand why the human population has risen so sharply, the demographic terms that describe it, the strain it puts on resources, and the methods used to control its growth.',
    EV('Explains a reason for the rise in human population', 'Defines a demographic term such as birth rate or growth rate', 'Explains a problem caused by population explosion'),
    'Ask {{name}} why the number of people on Earth has grown so fast in the last century.',
    ['BIO10.5']),
];

// Align ICSE units onto the existing 12–16 Science biology topics (align-first).
const alignments = {
  mt_ck57CDFGet: ['BIO9.2'],   // Plant Reproduction
  'mt_mquPi2IP-J': ['BIO9.3'], // Aerobic Respiration (plant respiration)
  mt_1VIE8FlZvL: ['BIO9.7'],   // Pathogens & the Immune System
  'mt_i80I-1MLP2': ['BIO10.2'], // How Diffusion Works
  mt_ngfFzPmRSF: ['BIO10.2'],  // Tropic Movements and Plant Hormones
  mt_V9SQS9gLFw: ['BIO10.3'],  // Gas Exchange & Breathing
  mt_TR2oTy9c2M: ['BIO10.3'],  // Heart Structure & Double Circulation
  mt_FQXGRdTDhp: ['BIO10.3'],  // Hormones and the Endocrine System
  mt_tQkCzRcWG7: ['BIO10.3'],  // Human Reproduction
  mt_o7FJPDsHiW: ['BIO10.4'],  // Predicting Inherited Traits
  mt_0sELh0MYWb: ['BIO10.4'],  // DNA & Genes
  mt_MqjZhvyWVa: ['BIO10.6'],  // Waste and Its Management
  mt_0e5rZxbAeR: ['BIO10.6'],  // Finite Resources & Recycling
};

const newEdges = [
  // Cell biology chain, anchored to existing life-processes topics.
  { t: 'icse-bio-cell-structure', p: 'mt_mquPi2IP-J', strength: 'soft', reason: 'Respiration takes place inside cell organelles.' },
  { t: 'icse-bio-tissues', p: 'icse-bio-cell-structure', strength: 'hard', reason: 'A tissue is a group of similar cells.' },
  { t: 'icse-bio-cell-division', p: 'icse-bio-cell-structure', strength: 'hard', reason: 'Cell division makes new cells.' },
  { t: 'icse-bio-cell-division', p: 'mt_6aJUzBYGNs', strength: 'soft', reason: 'Division distributes the chromosomes.' },
  // Plant physiology chain.
  { t: 'icse-bio-seeds-germination', p: 'mt_ck57CDFGet', strength: 'hard', reason: 'A seed is the product of plant reproduction.' },
  { t: 'icse-bio-photosynthesis', p: 'icse-bio-cell-structure', strength: 'hard', reason: 'Photosynthesis happens in the chloroplast, a cell organelle.' },
  { t: 'icse-bio-osmosis-absorption', p: 'mt_i80I-1MLP2', strength: 'hard', reason: 'Osmosis is a special case of diffusion.' },
  { t: 'icse-bio-transpiration', p: 'icse-bio-osmosis-absorption', strength: 'hard', reason: 'Transpiration draws up the water the roots absorb.' },
  { t: 'icse-bio-transpiration', p: 'icse-bio-tissues', strength: 'soft', reason: 'Water travels through the xylem tissue.' },
  // Human body chain.
  { t: 'icse-bio-nutrition-digestion', p: 'mt_fCvmdI6xGO', strength: 'soft', reason: 'Digestion builds on the role of the gut and its microbes.' },
  { t: 'icse-bio-skeleton-movement', p: 'icse-bio-tissues', strength: 'soft', reason: 'Bone and muscle are animal tissues.' },
  { t: 'icse-bio-skin', p: 'mt_zaXr5wcJD2', strength: 'hard', reason: 'The skin is central to regulating body temperature.' },
  { t: 'icse-bio-excretory-system', p: 'mt_TR2oTy9c2M', strength: 'soft', reason: 'The kidneys filter the blood the heart circulates.' },
  { t: 'icse-bio-excretory-system', p: 'mt_i80I-1MLP2', strength: 'soft', reason: 'Reabsorption in the kidney works by diffusion and osmosis.' },
  { t: 'icse-bio-nervous-system', p: 'mt_FQXGRdTDhp', strength: 'soft', reason: 'Nervous and hormonal coordination work side by side.' },
  { t: 'icse-bio-nervous-system', p: 'icse-bio-tissues', strength: 'soft', reason: 'Nerve tissue is a specialised animal tissue.' },
  // Genetics chain.
  { t: 'icse-bio-mendelian-genetics', p: 'mt_o7FJPDsHiW', strength: 'hard', reason: 'Mendel’s laws formalise the prediction of inherited traits.' },
  { t: 'icse-bio-mendelian-genetics', p: 'icse-bio-cell-division', strength: 'soft', reason: 'Meiosis separates the alleles Mendel’s laws describe.' },
  { t: 'icse-bio-sex-linkage', p: 'icse-bio-mendelian-genetics', strength: 'hard', reason: 'Sex linkage is inheritance carried on a sex chromosome.' },
  { t: 'icse-bio-sex-linkage', p: 'mt_0sELh0MYWb', strength: 'soft', reason: 'Sex-linked genes are stretches of DNA on a chromosome.' },
  // Diversity, microbes and population.
  { t: 'icse-bio-animal-diversity', p: 'icse-bio-cell-structure', strength: 'soft', reason: 'Classification rests on the cellular organisation of animals.' },
  { t: 'icse-bio-microbes-economic', p: 'mt_1VIE8FlZvL', strength: 'soft', reason: 'The harmful role of microbes builds on pathogens and disease.' },
  { t: 'icse-bio-population', p: 'mt_tQkCzRcWG7', strength: 'soft', reason: 'Population growth builds on human reproduction.' },
];

const newClusters = [
  { subject: 'Science', domain: 'Organisms & Life Processes', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X biology goes inside the living machine. It starts with the cell dividing — mitosis for growth, meiosis for the halved cells of reproduction — then turns to how plants live: drawing water up by osmosis and transpiration, and above all photosynthesis, the making of food from light, water and air that feeds nearly everything else. It closes with genetics: Mendel’s laws, the crosses that predict inheritance, and why some conditions follow sex.' },
  { subject: 'Science', domain: 'The Human Body', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'The human-body strand builds a working picture of the systems that keep a person alive. The excretory system filters the blood and holds its composition steady; the nervous system carries signals that let the body sense, decide and react in an instant. Studied alongside the circulatory, respiratory, endocrine and reproductive systems met earlier, they show the body not as separate parts but as systems that depend on one another.' },
];

integrate({ subjectDoc: 'Biology (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
