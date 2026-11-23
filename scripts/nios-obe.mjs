#!/usr/bin/env node
// Rebuild the NIOS Open Basic Education sources from the official PDFs.
//   curl -sSLo level-b.pdf https://nios.ac.in/media/documents/Bleveleng.pdf
//   node scripts/nios-obe.mjs b level-b.pdf          # check against the data
//   node scripts/nios-obe.mjs b level-b.pdf --write  # then: npm run alignments:generate
// Needs `pdftotext` (Poppler). Descriptions are the source wording; only
// whitespace is normalized.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const LEVELS = {
  a: {
    file: 'Aleveleng.pdf', courses: 'A-102, A-103 and A-104',
    sha256: '4ca3178f94bb45d07cf6cbc8ce6d021d0546ef2dd40981cab480385e2f51a295',
  },
  b: {
    file: 'Bleveleng.pdf', courses: 'B-102, B-103 and B-104',
    sha256: '2786d1ab2149c4d96351fe97e59cf138e4cbc48fd4ce8e580ce0c652abbd2f3a',
  },
};
const clean = text => text.replace(/\s+/g, ' ').trim();
// Only the x-102 courses print numbered items (roman numerals in A-102 lesson 5).
const ITEM = /^\s*(?:(\d+)|(i{1,3}))\.\s+(.*)$/;
const isItemized = course => course.code.endsWith('-102');

export function parse(text, level) {
  const records = [];
  let course = null, lesson = null, item = null, inDescription = false;
  for (const line of text.replace(/\f/g, '\n').split('\n')) {
    const courseMatch = line.match(/^\s*(\S.*?)\s*\(([A-C]-\d{3})\)\s*$/);
    if (courseMatch) { course = { name: courseMatch[1], code: courseMatch[2] }; inDescription = false; lesson = item = null; continue; }
    if (/^\s*\d\.\s*Course Description/.test(line)) { inDescription = true; continue; }
    if (/^\s*\d\.\s*Scheme of stud/i.test(line)) { inDescription = false; continue; }
    if (!course || !inDescription || !line.trim()) continue;
    const lessonMatch = line.match(/^\s*Lesson\s*-\s*(\d+):\s*(.*)$/);
    if (lessonMatch) { lesson = { number: Number(lessonMatch[1]), title: clean(lessonMatch[2]) }; item = null; continue; }
    assert(lesson, `text outside a lesson: ${line}`);
    const itemMatch = isItemized(course) && line.match(ITEM);
    if (itemMatch || !item) {
      assert(itemMatch || !isItemized(course), `unnumbered ${course.code} text: ${line}`);
      const number = itemMatch ? Number(itemMatch[1] ?? itemMatch[2].length) : null;
      if (number) assert.equal(number, (item?.number ?? 0) + 1, `item out of order: ${line}`);
      const base = `${course.code.replace('-', '')}.L${lesson.number}`;
      item = {
        number, code: number ? `${base}.${number}` : base,
        data: { title: '', course: course.name, courseCode: course.code, level: level.toUpperCase(), lesson: `Lesson ${lesson.number}: ${lesson.title}`, description: itemMatch ? itemMatch[3] : line },
      };
      records.push(item);
    } else {
      item.data.description += ' ' + line;
    }
    item.data.description = clean(item.data.description);
  }
  for (const { number, data } of records) {
    // Numbered items are their own title; whole-lesson records use the heading.
    data.title = number ? data.description : data.lesson.replace(/^Lesson \d+: /, '');
  }
  return records.map(({ code, data }) => ({ key: `nios-obe-${level}:${code}`, code, data }));
}

export function source(topics, level) {
  const { file, courses } = LEVELS[level];
  return {
    slug: `nios-obe-${level}`, country: 'IN',
    name: `NIOS Open Basic Education (Adult) — Level '${level.toUpperCase()}'`,
    version: `English course curriculum PDF, file dated 12 April 2017; courses ${courses}`,
    sourceUrl: `https://nios.ac.in/media/documents/${file}`,
    textIncluded: true,
    license: 'NIOS Copyright Statement: free reproduction if accurate, not misleading, and the source is prominently acknowledged. Not relicensed under ODbL. See PROVENANCE.md.',
    topicCount: topics.length, topics,
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [level, pdf] = process.argv.slice(2);
  assert(LEVELS[level] && pdf, `usage: node scripts/nios-obe.mjs <${Object.keys(LEVELS).join('|')}> <pdf> [--write]`);
  assert.equal(createHash('sha256').update(readFileSync(pdf)).digest('hex'), LEVELS[level].sha256, 'PDF differs from the reviewed snapshot');
  const built = source(parse(execFileSync('pdftotext', ['-layout', pdf, '-'], { encoding: 'utf8' }), level), level);
  const path = fileURLToPath(new URL('../data/curriculum-standards.json', import.meta.url));
  const catalogue = JSON.parse(readFileSync(path, 'utf8'));
  const at = catalogue.curricula.findIndex(c => c.slug === built.slug);
  if (process.argv.includes('--write')) {
    if (at < 0) catalogue.curricula.push(built); else catalogue.curricula[at] = built;
    catalogue.curriculumCount = catalogue.curricula.length;
    writeFileSync(path, JSON.stringify(catalogue, null, 2) + '\n');
  } else {
    assert.deepEqual(catalogue.curricula[at], built, 'data differs from the PDF');
  }
  console.log(`${built.topicCount} records`);
}
