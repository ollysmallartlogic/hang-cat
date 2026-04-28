#!/usr/bin/env tsx
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const STANDARD_PATH = resolve(ROOT, 'src/data/words.standard.json');
const BONUS_PATH = resolve(ROOT, 'src/data/words.bonus.json');

const ENTRY_RE = /^[A-Z]{4,9}$/;

const DENYLIST = new Set<string>([
  'NAZIS',
  'RAPED',
  'RAPING',
  'SLUR',
  'SLURS',
  'PORN',
]);

interface Failure {
  list: string;
  entry: string | null;
  reason: string;
}

function loadList(path: string): unknown {
  try {
    const raw = readFileSync(path, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to read ${path}: ${(err as Error).message}`);
  }
}

function validateList(name: string, data: unknown, failures: Failure[]): string[] {
  if (!Array.isArray(data)) {
    failures.push({ list: name, entry: null, reason: 'not a JSON array' });
    return [];
  }
  const seen = new Set<string>();
  const ok: string[] = [];
  for (const entry of data) {
    if (typeof entry !== 'string') {
      failures.push({ list: name, entry: String(entry), reason: 'not a string' });
      continue;
    }
    if (!ENTRY_RE.test(entry)) {
      failures.push({ list: name, entry, reason: 'fails /^[A-Z]{4,9}$/' });
      continue;
    }
    if (seen.has(entry)) {
      failures.push({ list: name, entry, reason: 'duplicate within list' });
      continue;
    }
    if (DENYLIST.has(entry)) {
      failures.push({ list: name, entry, reason: 'on denylist' });
      continue;
    }
    seen.add(entry);
    ok.push(entry);
  }
  return ok;
}

function main(): void {
  const failures: Failure[] = [];

  const standardRaw = loadList(STANDARD_PATH);
  const bonusRaw = loadList(BONUS_PATH);

  const standard = validateList('words.standard.json', standardRaw, failures);
  const bonus = validateList('words.bonus.json', bonusRaw, failures);

  const standardSet = new Set(standard);
  for (const word of bonus) {
    if (standardSet.has(word)) {
      failures.push({
        list: 'words.bonus.json',
        entry: word,
        reason: 'overlaps words.standard.json',
      });
    }
  }

  if (failures.length > 0) {
    const first = failures[0];
    console.error(`✗ word list validation failed:`);
    console.error(`  ${first.list}: ${first.entry ?? '(file)'} — ${first.reason}`);
    if (failures.length > 1) {
      console.error(`  …and ${failures.length - 1} more issue(s):`);
      for (const f of failures.slice(1, 11)) {
        console.error(`  ${f.list}: ${f.entry ?? '(file)'} — ${f.reason}`);
      }
      if (failures.length > 11) {
        console.error(`  (${failures.length - 11} additional issues elided)`);
      }
    }
    process.exit(1);
  }

  console.log(
    `✓ word lists clean — standard: ${standard.length}, bonus: ${bonus.length}`,
  );
}

main();
