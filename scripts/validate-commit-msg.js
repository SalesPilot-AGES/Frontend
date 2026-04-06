#!/usr/bin/env node

/**
 * Validates commit message format according to Conventional Commits standards
 * Expected format: <type>: <short description>
 *
 * Valid types: feat, fix, refactor, style, test, build, perf, ci, revert
 */

import fs from 'fs';

const COMMIT_MSG_FILE = process.argv[2] || '.git/COMMIT_EDITMSG';
const VALID_TYPES = [
  'feat',
  'fix',
  'refactor',
  'style',
  'test',
  'build',
  'perf',
  'ci',
  'revert',
];

try {
  let commitMsg = fs.readFileSync(COMMIT_MSG_FILE, 'utf-8').trim();

  // Remove comments and empty lines
  commitMsg = commitMsg
    .split('\n')
    .filter((line) => !line.startsWith('#'))
    .join('\n')
    .trim();

  if (!commitMsg) {
    console.error('❌ Commit message is empty');
    process.exit(1);
  }

  const firstLine = commitMsg.split('\n')[0];
  const typeRegex = new RegExp(`^(${VALID_TYPES.join('|')}):\\ .+`);

  if (!typeRegex.test(firstLine)) {
    console.error('❌ Invalid commit message format\n');
    console.error('Expected format: <type>: <description>');
    console.error(`Valid types: ${VALID_TYPES.join(', ')}\n`);
    console.error(`Example: "feat: add user authentication modal"\n`);
    console.error(`Your message: "${firstLine}"\n`);
    process.exit(1);
  }

  const [, type, description] = firstLine.match(/^(\w+):\s+(.+)$/);

  if (!description || description.length === 0) {
    console.error(
      '❌ Commit message must include a description after the type'
    );
    process.exit(1);
  }

  console.log(`✅ Commit message is valid`);
  console.log(`   Type: ${type}`);
  console.log(`   Desc: ${description}`);
  process.exit(0);
} catch (error) {
  console.error('❌ Error reading commit message:', error.message);
  process.exit(1);
}
