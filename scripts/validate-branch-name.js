#!/usr/bin/env node

/**
 * Validates branch name format as per README.md
 * Expected format: <type>/<issue-number>/<short-description>
 *
 * Valid types: feat, fix, refactor, style, test, build, perf, ci, revert, hotfix
 * issue-number: numeric ID or 'no-ref' if not applicable
 * Protected branches: main, development, staging, release/*, hotfix/*
 *
 * Examples:
 * - feat/1234/add-user-authentication
 * - fix/5678/sidebar-alignment-issue
 * - hotfix/3456/critical-bug-fix
 * - refactor/no-ref/simplify-form-logic
 */

import { execSync } from 'child_process';

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
  'hotfix',
];
const SPECIAL_BRANCHES = ['main', 'development', 'staging'];
const PROTECTED_PATTERNS = ['release/', 'hotfix/'];

try {
  // Get current branch name
  const branchName = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();

  // Check if --strict flag is passed (used in pre-commit/pre-push hooks)
  const shouldFail = process.argv.includes('--strict');

  // Allow special branches
  if (SPECIAL_BRANCHES.includes(branchName)) {
    console.log(`✅ Branch "${branchName}" is a protected branch`);
    process.exit(0);
  }

  // Allow release/* and hotfix/* patterns
  if (PROTECTED_PATTERNS.some((pattern) => branchName.startsWith(pattern))) {
    process.exit(0);
  }

  // Validate branch name format: type/(issue-number|no-ref)/description
  const branchRegex = new RegExp(
    `^(${VALID_TYPES.join('|')})/(\\d+|no-ref)/.+$`
  );

  if (!branchRegex.test(branchName)) {
    const errorOutput = (message) => {
      if (shouldFail) {
        console.error(message);
      } else {
        console.warn(message);
      }
    };

    errorOutput('\n❌ Invalid branch name format\n');
    errorOutput('Expected format: <type>/<issue-number>/<short-description>');

    if (shouldFail) {
      errorOutput(
        '🛑 Commit/push blocked: Please rename your branch to match the pattern.\n'
      );
      errorOutput('Rename with: git branch -m <type>/<issue>/<description>\n');
      process.exit(1);
    } else {
      errorOutput(
        '⚠️  WARNING: This branch name does not follow the naming convention.\n'
      );
      errorOutput('💡 Commits will be blocked until you rename it.\n');
      errorOutput('Rename with: git branch -m <type>/<issue>/<description>\n');
      process.exit(0);
    }
  }
  process.exit(0);
} catch (error) {
  console.error('❌ Error validating branch name:', error.message);
  process.exit(1);
}
