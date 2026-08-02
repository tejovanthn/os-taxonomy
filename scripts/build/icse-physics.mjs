#!/usr/bin/env node
/**
 * build/icse-physics.mjs — ICSE Physics (52), Classes IX–X (ages 14–16).
 *
 * ICSE Physics is examined as a subject of its own, but in this taxonomy the
 * 14–16 band belongs to the composite **Science** subject (the separate Physics
 * subject holds 16–18 only), so these topics land under Science. The existing
 * Science ladder is thin on physics at this level — motion, Newton's laws,
 * buoyancy, work/energy/power and echo are all it had — so this pass is
 * mint-heavy: it builds out mechanics (measurement, momentum, gravitation,
 * fluid pressure, moments, machines), optics (mirrors, lenses, refraction,
 * dispersion), waves and sound, the whole electricity-and-magnetism strand, heat
 * and calorimetry, and modern (nuclear) physics. A new Science domain
 * `Electricity & Magnetism` holds the electrical topics. Marble-authored factual
 * descriptions — no CISCE text. Idempotent.
 */

import { icse } from './cisce.mjs';
const { s, topic, integrate } = icse;
const sci = topic('Science');
const IX = [14, 15], X = [15, 16];
const EV = (a, b, c) => [a, b, c];

const standards = [
  // ---- Class IX ----
  s('PHY9.1', 'IX', 'Measurements and Experimentation', 'The SI system of units and least count; measuring length with the vernier callipers and screw gauge and time with the simple pendulum, and how a smaller least count means greater accuracy.'),
  s('PHY9.2', 'IX', 'Motion in One Dimension', 'Scalar and vector quantities; distance and displacement, speed and velocity, acceleration; distance-time and velocity-time graphs; and the equations of uniformly accelerated motion.'),
  s('PHY9.3', 'IX', 'Laws of Motion', 'Contact and non-contact forces; Newton’s three laws of motion; inertia, mass and momentum; and the universal law of gravitation with weight, mass and free fall.'),
  s('PHY9.4', 'IX', 'Fluids', 'Pressure in a liquid column (p = hρg) and its transmission by Pascal’s law; buoyancy and Archimedes’ principle; flotation and relative density.'),
  s('PHY9.5', 'IX', 'Heat and Energy', 'Heat as energy and its distinction from temperature; the anomalous expansion of water; and the greenhouse effect, global warming and energy degradation.'),
  s('PHY9.6', 'IX', 'Light', 'The laws of reflection and images in plane and parallel mirrors; concave and convex spherical mirrors, ray diagrams, the mirror formula and their uses.'),
  s('PHY9.7', 'IX', 'Sound', 'Wave motion and transverse and longitudinal waves; the propagation of sound and its need for a medium; the relation V = fλ; and infrasonic, sonic and ultrasonic frequencies.'),
  s('PHY9.8', 'IX', 'Electricity and Magnetism', 'Electric charge and current, potential difference and resistance; conductors and insulators; Ohm’s law and simple circuits; induced magnetism, magnetic field lines and the earth’s magnetic field.'),
  // ---- Class X ----
  s('PHY10.1', 'X', 'Force, Work, Power and Energy', 'The moment of a force, equilibrium and centre of gravity; work, power and energy and their relation; the conservation of energy; and machines as force multipliers with mechanical advantage, velocity ratio and efficiency.'),
  s('PHY10.2', 'X', 'Light', 'Refraction through a glass block and a prism; total internal reflection and the critical angle; converging and diverging lenses and their images; and the dispersion of white light and the electromagnetic spectrum.'),
  s('PHY10.3', 'X', 'Sound', 'The reflection of sound and echoes; natural, damped and forced vibrations and resonance; and the loudness, pitch and quality of a sound.'),
  s('PHY10.4', 'X', 'Electricity and Magnetism', 'Resistances in series and parallel; electrical power and energy; household wiring, fuses, earthing and safety; and the magnetic effect of a current and electromagnetic induction.'),
  s('PHY10.5', 'X', 'Heat', 'Calorimetry and specific heat capacity by the method of mixtures; and latent heat and the heat exchanged in a change of state.'),
  s('PHY10.6', 'X', 'Modern Physics', 'Radioactivity and changes in the nucleus, background radiation and safety; and nuclear fission and fusion.'),
];

const newTopics = [
  // ---------------- Class IX ----------------
  sci('icse-phy-measurement', 'Measurement and Instruments', 'Scientific Inquiry', IX, 'PROCEDURAL',
    'Understand that every measurement is only as precise as the instrument’s least count, and use the vernier callipers, screw gauge and simple pendulum to measure length and time accurately.',
    EV('Finds the least count of a vernier callipers or screw gauge', 'Reads a length from a vernier or screw-gauge scale', 'Explains how a smaller least count improves accuracy'),
    'Ask {{name}} why a screw gauge can measure the thickness of a hair when an ordinary ruler cannot.',
    ['PHY9.1']),
  sci('icse-phy-equations-of-motion', 'Equations of Uniformly Accelerated Motion', 'Forces & Motion', IX, 'PROCEDURAL',
    'Understand how the three equations of motion connect displacement, velocity, acceleration and time for steady acceleration, and derive them from a velocity-time graph.',
    EV('Derives an equation of motion from a velocity-time graph', 'Selects the right equation for a given problem', 'Solves a numerical problem in uniformly accelerated motion'),
    'Ask {{name}} how far a car travels while braking steadily from a known speed to a stop.',
    ['PHY9.2']),
  sci('icse-phy-momentum', 'Momentum and Newton’s Second Law', 'Forces & Motion', IX, 'CONCEPTUAL',
    'Understand momentum as mass in motion, and that a force is what changes momentum — the second law read as force equalling the rate of change of momentum.',
    EV('Computes the momentum of a moving body', 'Relates force to the rate of change of momentum', 'Explains why a longer stopping time means a smaller force'),
    'Ask {{name}} why a cricketer draws their hands back while catching a fast ball.',
    ['PHY9.3']),
  sci('icse-phy-gravitation', 'Gravitation, Mass and Weight', 'Forces & Motion', IX, 'CONCEPTUAL',
    'Understand the universal law of gravitation as an attraction between any two masses, and distinguish mass — the amount of matter — from weight, the force of gravity on it.',
    EV('States the universal law of gravitation', 'Distinguishes mass from weight', 'Explains free fall and acceleration due to gravity'),
    'Ask {{name}} why their weight would change on the Moon but the amount of them would not.',
    ['PHY9.3']),
  sci('icse-phy-fluid-pressure', 'Fluid Pressure and Pascal’s Law', 'Forces & Motion', IX, 'CONCEPTUAL',
    'Understand that a liquid exerts a pressure that grows with depth (p = hρg) and presses equally in all directions, so that Pascal’s law lets a fluid transmit and multiply a force.',
    EV('Computes the pressure at a depth in a liquid', 'Explains why a dam is built thicker at its base', 'Explains how Pascal’s law transmits pressure in a liquid'),
    'Ask {{name}} why a dam wall is much thicker at the bottom than at the top.',
    ['PHY9.4']),
  sci('icse-phy-heat-temperature', 'Heat, Temperature and the Expansion of Water', 'Energy', IX, 'CONCEPTUAL',
    'Understand heat as energy in transit and temperature as how hot a body is, and that water is anomalous — it expands as it cools below 4°C, which lets ice float and fish survive winter.',
    EV('Distinguishes heat from temperature', 'Describes the anomalous expansion of water', 'Explains a consequence of water’s anomalous expansion'),
    'Ask {{name}} why a pond freezes at the top first, letting fish live on below the ice.',
    ['PHY9.5']),
  sci('icse-phy-reflection-mirrors', 'Reflection and Spherical Mirrors', 'Waves, Light & Sound', IX, 'CONCEPTUAL',
    'Understand the laws of reflection and how concave and convex mirrors form images, using ray diagrams and the mirror formula to locate and describe them.',
    EV('States and applies the laws of reflection', 'Draws a ray diagram to locate the image in a spherical mirror', 'Uses the mirror formula with the correct sign convention'),
    'Ask {{name}} why the side mirror of a car makes vehicles behind look smaller and further away.',
    ['PHY9.6']),
  sci('icse-phy-waves-sound', 'Waves and the Propagation of Sound', 'Waves, Light & Sound', IX, 'CONCEPTUAL',
    'Understand sound as a longitudinal wave that needs a medium to travel, related to its frequency and wavelength by V = fλ, and travelling far slower than light.',
    EV('Distinguishes transverse from longitudinal waves', 'Applies the relation V = fλ', 'Explains why thunder is heard after lightning is seen'),
    'Ask {{name}} why we see a distant firework burst before we hear it.',
    ['PHY9.7']),
  sci('icse-phy-electric-current-ohm', 'Electric Current and Ohm’s Law', 'Electricity & Magnetism', IX, 'CONCEPTUAL',
    'Understand electric current as the flow of charge driven by a potential difference and opposed by resistance, related by Ohm’s law, and distinguish conductors from insulators.',
    EV('Relates current to the rate of flow of charge', 'Applies Ohm’s law V = IR', 'Distinguishes a conductor from an insulator'),
    'Ask {{name}} what a battery actually pushes around a circuit to light a bulb.',
    ['PHY9.8']),
  sci('icse-phy-magnetism', 'Magnetism and Magnetic Fields', 'Electricity & Magnetism', IX, 'CONCEPTUAL',
    'Understand how a magnet induces magnetism in a nearby magnetic material, how magnetic field lines picture the field, and that the earth itself behaves as a great magnet.',
    EV('Explains magnetism induced by a bar magnet', 'Draws the field lines of a bar magnet and states their properties', 'Explains the evidence for the earth’s magnetic field'),
    'Ask {{name}} how a compass needle knows which way is north.',
    ['PHY9.8']),
  // ---------------- Class X ----------------
  sci('icse-phy-moments-equilibrium', 'Turning Forces: Moments and Equilibrium', 'Forces & Motion', X, 'CONCEPTUAL',
    'Understand the moment of a force as its turning effect about a point, how balanced moments hold a body in equilibrium, and how the centre of gravity governs stability.',
    EV('Computes the moment of a force', 'Applies the principle of moments to a balanced body', 'Relates the centre of gravity to stability'),
    'Ask {{name}} why a door handle is fitted far from the hinges rather than close to them.',
    ['PHY10.1']),
  sci('icse-phy-simple-machines', 'Simple Machines', 'Forces & Motion', X, 'CONCEPTUAL',
    'Understand a machine as a device that multiplies force or changes its direction, described by its mechanical advantage, velocity ratio and efficiency, with the lever and pulley as examples.',
    EV('Computes mechanical advantage and velocity ratio', 'Explains why efficiency is always below 100%', 'Analyses a lever or pulley system'),
    'Ask {{name}} how a single person can lift a car with a small jack.',
    ['PHY10.1']),
  sci('icse-phy-refraction-tir', 'Refraction and Total Internal Reflection', 'Waves, Light & Sound', X, 'CONCEPTUAL',
    'Understand refraction as the bending of light as it changes speed between media, and how beyond a critical angle it is reflected entirely — the basis of the sparkle of a diamond and of optical fibres.',
    EV('Explains refraction through a glass block or prism', 'Defines the critical angle and total internal reflection', 'Gives an application of total internal reflection'),
    'Ask {{name}} why a straw looks bent where it enters a glass of water.',
    ['PHY10.2']),
  sci('icse-phy-lenses', 'Lenses and the Images They Form', 'Waves, Light & Sound', X, 'CONCEPTUAL',
    'Understand how converging and diverging lenses bend light to form images, and use ray diagrams to find where an image forms and what it looks like.',
    EV('Distinguishes a converging from a diverging lens', 'Draws a ray diagram to locate a lens image', 'Describes the image for a given object position'),
    'Ask {{name}} how a magnifying glass makes small print look bigger.',
    ['PHY10.2']),
  sci('icse-phy-dispersion-spectrum', 'Dispersion and the Electromagnetic Spectrum', 'Waves, Light & Sound', X, 'CONCEPTUAL',
    'Understand how a prism spreads white light into its colours because each bends by a different amount, and that visible light is one small band of a much wider electromagnetic spectrum.',
    EV('Explains the dispersion of white light by a prism', 'Orders the colours of the visible spectrum', 'Names a region of the electromagnetic spectrum beyond visible light'),
    'Ask {{name}} where the colours of a rainbow come from when the light started out white.',
    ['PHY10.2']),
  sci('icse-phy-resonance', 'Vibrations and Resonance', 'Waves, Light & Sound', X, 'CONCEPTUAL',
    'Understand the difference between free, damped and forced vibrations, and resonance as the large response when a body is driven at its own natural frequency.',
    EV('Distinguishes free, damped and forced vibrations', 'Explains resonance in terms of natural frequency', 'Gives an everyday example of resonance'),
    'Ask {{name}} how a singer could, in principle, shatter a glass with their voice.',
    ['PHY10.3']),
  sci('icse-phy-sound-characteristics', 'Loudness, Pitch and Quality of Sound', 'Waves, Light & Sound', X, 'CONCEPTUAL',
    'Understand the three things we hear in a sound — loudness set by amplitude, pitch by frequency, and quality by the waveform — which together let us tell voices and instruments apart.',
    EV('Relates loudness to amplitude and pitch to frequency', 'Explains what gives a sound its quality or timbre', 'Explains why two instruments playing the same note sound different'),
    'Ask {{name}} how they can tell their friend’s voice from a stranger’s on the phone.',
    ['PHY10.3']),
  sci('icse-phy-resistance-networks', 'Resistances in Series and Parallel', 'Electricity & Magnetism', X, 'PROCEDURAL',
    'Understand how resistances combine — adding in series, but giving a smaller total in parallel — and compute the effective resistance and the currents in a simple network.',
    EV('Computes the combined resistance in series and in parallel', 'Explains why parallel resistance is less than the smallest resistor', 'Finds the current in a branch of a simple circuit'),
    'Ask {{name}} why the other bulbs stay lit when one bulb in a house fails.',
    ['PHY10.4']),
  sci('icse-phy-electrical-power-energy', 'Electrical Power and Energy', 'Electricity & Magnetism', X, 'PROCEDURAL',
    'Understand electrical power as the rate at which a device uses energy, compute it from voltage and current, and read the energy an appliance consumes in kilowatt-hours.',
    EV('Computes electrical power from voltage and current', 'Computes energy used in kilowatt-hours', 'Compares the running cost of two appliances'),
    'Ask {{name}} why an electric heater costs far more to run than a light bulb.',
    ['PHY10.4']),
  sci('icse-phy-household-electricity', 'Household Electricity and Safety', 'Electricity & Magnetism', X, 'CONCEPTUAL',
    'Understand how electricity is brought safely into a home — the live, neutral and earth wires, the fuse and the three-pin plug — and why earthing and fuses protect against shock and fire.',
    EV('Explains the role of the live, neutral and earth wires', 'Explains how a fuse protects a circuit', 'Explains why an appliance is earthed'),
    'Ask {{name}} what the third pin on a plug is for, since two seem enough to carry the current.',
    ['PHY10.4']),
  sci('icse-phy-electromagnetism', 'The Magnetic Effect of a Current and Induction', 'Electricity & Magnetism', X, 'CONCEPTUAL',
    'Understand that a current creates a magnetic field — the basis of the electromagnet and the motor — and that a changing field induces a current, the principle behind the generator.',
    EV('Explains the magnetic effect of an electric current', 'Explains the principle of the electric motor', 'Explains electromagnetic induction and the generator'),
    'Ask {{name}} how a power station turns spinning motion into the electricity in the wires.',
    ['PHY10.4']),
  sci('icse-phy-calorimetry', 'Calorimetry and Specific Heat', 'Energy', X, 'PROCEDURAL',
    'Understand specific heat capacity as the heat needed to warm a kilogram of a substance by one degree, and use the method of mixtures — heat lost equals heat gained — to measure it.',
    EV('Computes heat from mass, specific heat and temperature change', 'Applies the principle that heat lost equals heat gained', 'Explains why water’s high specific heat moderates climate'),
    'Ask {{name}} why the sea stays cool on a hot day while the sand becomes scorching.',
    ['PHY10.5']),
  sci('icse-phy-latent-heat', 'Latent Heat and Change of State', 'Energy', X, 'CONCEPTUAL',
    'Understand latent heat as the energy a substance absorbs or releases while changing state at constant temperature, as its molecules break or form the bonds of the new state.',
    EV('Explains why temperature stays constant during a change of state', 'Distinguishes the latent heat of fusion from vaporisation', 'Computes the heat for a change of state'),
    'Ask {{name}} why a burn from steam is worse than one from boiling water at the same temperature.',
    ['PHY10.5']),
  sci('icse-phy-radioactivity', 'Radioactivity', 'Matter & Materials', X, 'CONCEPTUAL',
    'Understand radioactivity as the spontaneous breakdown of an unstable nucleus emitting alpha, beta or gamma radiation, the background radiation around us, and the precautions it demands.',
    EV('Distinguishes alpha, beta and gamma radiation', 'Explains what happens to a nucleus in radioactive decay', 'States a safety precaution when handling radioactive material'),
    'Ask {{name}} what makes some atoms give off dangerous rays entirely on their own.',
    ['PHY10.6']),
  sci('icse-phy-nuclear-fission-fusion', 'Nuclear Fission and Fusion', 'Matter & Materials', X, 'CONCEPTUAL',
    'Understand nuclear fission as the splitting of a heavy nucleus and fusion as the joining of light nuclei, both releasing great energy — fission in reactors, fusion in the Sun.',
    EV('Defines nuclear fission and fusion', 'Distinguishes fission from fusion', 'Names where each reaction is put to use or occurs'),
    'Ask {{name}} what powers the Sun, and why it is so hard to copy on Earth.',
    ['PHY10.6']),
];

// Align ICSE units onto the existing 14–16 Science ladder (align-first).
const alignments = {
  mt_zqdALphaES: ['PHY9.2'],   // Describing Motion
  mt_qcDIPchMJt: ['PHY9.3'],   // Newton's Laws of Motion
  mt_GUrpl1wyPZ: ['PHY9.4'],   // Buoyancy and Archimedes' Principle
  'mt_mTpV-0rtkO': ['PHY9.5'],   // Earth's Atmosphere & CO2 (the greenhouse-effect part)
  mt_90lfoEG1D3: ['PHY9.7', 'PHY10.3'], // Echo, Ultrasound and the Range of Hearing
  mt_1WRBUMcXaO: ['PHY10.1'],  // Work, Energy and Power
};

const newEdges = [
  // Mechanics chain.
  { t: 'icse-phy-equations-of-motion', p: 'mt_zqdALphaES', strength: 'hard', reason: 'The equations formalise the description of motion.' },
  { t: 'icse-phy-momentum', p: 'mt_qcDIPchMJt', strength: 'hard', reason: 'Momentum restates Newton’s second law.' },
  { t: 'icse-phy-gravitation', p: 'mt_qcDIPchMJt', strength: 'soft', reason: 'Gravitation is a force obeying the laws of motion.' },
  { t: 'icse-phy-fluid-pressure', p: 'mt_GUrpl1wyPZ', strength: 'soft', reason: 'Pressure and buoyancy are the two sides of fluid statics.' },
  { t: 'icse-phy-moments-equilibrium', p: 'mt_qcDIPchMJt', strength: 'hard', reason: 'Turning effects build on force and the laws of motion.' },
  { t: 'icse-phy-simple-machines', p: 'icse-phy-moments-equilibrium', strength: 'hard', reason: 'The lever works by the principle of moments.' },
  { t: 'icse-phy-simple-machines', p: 'mt_1WRBUMcXaO', strength: 'soft', reason: 'Efficiency compares work output with work input.' },
  { t: 'icse-phy-measurement', p: 'mt_ThTbUuNb3p', strength: 'soft', reason: 'Measurement underpins recording and reporting in science.' },
  // Heat chain.
  { t: 'icse-phy-calorimetry', p: 'icse-phy-heat-temperature', strength: 'hard', reason: 'Calorimetry measures the heat first met as energy.' },
  { t: 'icse-phy-latent-heat', p: 'icse-phy-calorimetry', strength: 'hard', reason: 'Latent heat extends heat exchange to a change of state.' },
  { t: 'icse-phy-heat-temperature', p: 'mt_1WRBUMcXaO', strength: 'soft', reason: 'Heat is a form of energy.' },
  // Optics chain.
  { t: 'icse-phy-refraction-tir', p: 'icse-phy-reflection-mirrors', strength: 'soft', reason: 'Refraction follows reflection in the study of light.' },
  { t: 'icse-phy-lenses', p: 'icse-phy-refraction-tir', strength: 'hard', reason: 'A lens forms images by refraction.' },
  { t: 'icse-phy-dispersion-spectrum', p: 'icse-phy-refraction-tir', strength: 'hard', reason: 'Dispersion is refraction that separates the colours.' },
  // Optics and sound roots anchored into the connected graph (light/sound carry
  // energy; the existing Echo topic builds on wave propagation).
  { t: 'icse-phy-reflection-mirrors', p: 'mt_1WRBUMcXaO', strength: 'soft', reason: 'Light is a form of energy, reflected and focused by mirrors.' },
  { t: 'mt_90lfoEG1D3', p: 'icse-phy-waves-sound', strength: 'hard', reason: 'An echo is reflected sound, building on the propagation of sound waves.' },
  // Waves and sound chain.
  { t: 'icse-phy-resonance', p: 'icse-phy-waves-sound', strength: 'hard', reason: 'Resonance is a property of the vibrations that make sound.' },
  { t: 'icse-phy-sound-characteristics', p: 'icse-phy-waves-sound', strength: 'hard', reason: 'Loudness, pitch and quality are features of the sound wave.' },
  // Electricity and magnetism chain.
  { t: 'icse-phy-resistance-networks', p: 'icse-phy-electric-current-ohm', strength: 'hard', reason: 'Networks combine the resistance met in Ohm’s law.' },
  { t: 'icse-phy-electrical-power-energy', p: 'icse-phy-electric-current-ohm', strength: 'hard', reason: 'Power is computed from current and voltage.' },
  { t: 'icse-phy-household-electricity', p: 'icse-phy-electrical-power-energy', strength: 'soft', reason: 'Household wiring carries electrical power safely.' },
  { t: 'icse-phy-electromagnetism', p: 'icse-phy-magnetism', strength: 'hard', reason: 'The magnetic effect of a current builds on magnetism.' },
  { t: 'icse-phy-electromagnetism', p: 'icse-phy-electric-current-ohm', strength: 'hard', reason: 'A current is what produces the magnetic effect.' },
  { t: 'icse-phy-electromagnetism', p: 'mt__7BVYUN180', strength: 'soft', reason: 'Extends the motor effect met earlier.' },
  // Modern physics.
  { t: 'icse-phy-radioactivity', p: 'mt_T7ICFeChaV', strength: 'hard', reason: 'Radioactivity concerns the nucleus of the atom.' },
  { t: 'icse-phy-nuclear-fission-fusion', p: 'icse-phy-radioactivity', strength: 'hard', reason: 'Fission and fusion are nuclear changes like radioactive decay.' },
];

const newClusters = [
  { subject: 'Science', domain: 'Electricity & Magnetism', ageRangeStart: 14, ageRangeEnd: 15,
    summary: 'Electricity begins here as the flow of charge. Your child learns that a battery drives a current of charge around a circuit, that resistance opposes it, and that the three are tied together by Ohm’s law. Alongside it comes magnetism — how a magnet induces magnetism in iron, how field lines picture the invisible field, and the discovery that the earth itself acts as a giant magnet steering every compass needle.' },
  { subject: 'Science', domain: 'Electricity & Magnetism', ageRangeStart: 15, ageRangeEnd: 16,
    summary: 'Class X turns electricity into something useful and something to respect. Resistances combine in series and parallel; electrical power and energy explain the bills a household pays; and wiring, fuses and earthing show how the same current that lights a home can be made safe. The strand closes by joining electricity to magnetism: a current makes a magnetic field that turns a motor, and a changing field makes a current, which is how every power station generates its electricity.' },
];

integrate({ subjectDoc: 'Physics (IX–X)', standards, newTopics, alignments, newEdges, newClusters });
