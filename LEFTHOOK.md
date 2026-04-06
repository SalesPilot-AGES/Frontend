# Lefthook Configuration

## Overview

Lefthook is installed and configured to enforce code quality, testing, and conventional commit standards on every commit.

## Installation & Setup

### Automatic (Recommended)

After cloning or installing dependencies, lefthook hooks are automatically installed via the `prepare` script:

```bash
pnpm install  # Automatically runs: lefthook install
```

### Manual Setup

If needed, reinstall hooks manually:

```bash
pnpm lefthook install
```

---

## Configured Hooks

### Pre-Commit Hook (`pre-commit`)

Runs automatically before each commit. All commands run **in parallel** for speed.

#### 1. **Prettier** (Code Formatting)

- **Glob:** `src/**/*.{tsx,ts,jsx,js,css,json,md}`
- **Command:** Formats all matching files
- **Auto-fixes:** Staged fixed files automatically

#### 2. **ESLint** (Linting)

- **Glob:** `src/**/*.{tsx,ts,jsx,js}`
- **Command:** Runs eslint with `--fix` flag
- **Auto-fixes:** Stages fixed files automatically

#### 3. **Unit Tests** (Testing)

- **Glob:** `src/**/*.{test,spec}.{tsx,ts}`
- **Command:** Runs all tests in single run mode
- **Skip condition:** Skipped during merge commits

---

### Post-Checkout Hook (`post-checkout`)

Validates branch name whenever you checkout or create a branch.

**Expected Format:** `<type>/<description>` or `<type>-<description>`

**Valid Types:** `feat`, `fix`, `refactor`, `style`, `test`, `build`, `perf`, `ci`, `revert`, `hotfix`

**Protected Branches** (allowed without validation):

- `main`, `develop`, `staging`

**Protected Patterns** (allowed without strict validation):

- `release/*` - release branches
- `hotfix/*` - hotfix branches

**Examples:**

```bash
git checkout -b feat/add-user-auth          # ✅ Valid
git checkout -b fix/sidebar-alignment       # ✅ Valid
git checkout -b refactor/simplify-forms     # ✅ Valid
git checkout -b my-feature                  # ❌ Invalid - missing type
```

---

### Pre-Push Hook (`pre-push`)

Runs quality checks before pushing to prevent pushing code with issues. All commands run **in parallel** for speed. If any check fails, the push is blocked.

#### 1. **Branch Name Validation**

- **Command:** Validates branch name format
- **Strict Mode:** Enforced to ensure proper naming

#### 2. **Prettier** (Code Formatting)

- **Glob:** `src/**/*.{tsx,ts,jsx,js,css,json,md}`
- **Command:** Checks if code is properly formatted
- **Behavior:** Blocks push if formatting issues are found

#### 3. **ESLint** (Linting)

- **Glob:** `src/**/*.{tsx,ts,jsx,js}`
- **Command:** Runs linting without auto-fixing
- **Behavior:** Blocks push if linting errors are found

#### 4. **Unit Tests** (Testing)

- **Glob:** `src/**/*.{test,spec}.{tsx,ts}`
- **Command:** Runs all tests in single run mode
- **Behavior:** Blocks push if any tests fail

---

### Commit Message Hook (`commit-msg`)

Validates commit message format according to Conventional Commits standard.

**Expected Format:**

```
<type>: <description>
```

**Valid Types:**

- `feat` - New functionality
- `fix` - Bug fix
- `refactor` - Code refactoring
- `style` - Style/readability changes
- `test` - Automated tests
- `build` - Build and dependencies
- `perf` - Performance improvement
- `ci` - CI/CD configuration
- `revert` - Revert a previous commit

**Examples:**

```bash
git commit -m "feat: add user authentication modal"
git commit -m "fix: resolve sidebar menu alignment issue"
git commit -m "test: add tests for LoginForm component"
```

---

## Command Reference

| Command                           | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `pnpm lefthook install`           | Install git hooks                      |
| `pnpm lefthook uninstall`         | Remove git hooks                       |
| `pnpm lefthook run pre-commit`    | Run pre-commit checks manually         |
| `pnpm lefthook run post-checkout` | Run branch name validation manually    |
| `pnpm lefthook run pre-push`      | Run branch validation before push      |
| `pnpm lefthook run commit-msg`    | Run commit message validation manually |

---

## Behavior

### On `git checkout` or branch creation:

1. Branch name is validated
2. Invalid branch names are rejected with error message

### On `git commit`:

1. Branch name is validated (post-checkout hook)
2. Prettier formats all staged files
3. ESLint lints and fixes issues
4. Tests run for modified test files
5. Commit message is validated
6. Only if all checks pass, the commit succeeds

### On `git push`:

1. Branch name is validated
2. Push is blocked if branch name is invalid

### If Any Check Fails:

- Commit is **aborted** (or push is blocked)
- Error messages are displayed with instructions
- You can fix the issues and try again

### Skip Hooks (If Absolutely Necessary)

```bash
git commit --no-verify  # Bypasses all hooks (not recommended!)
git push --no-verify    # Bypasses all hooks (not recommended!)
```

---

## Development Workflow

Typical workflow with lefthook:

```bash
# Create a feature branch (validated on checkout)
git checkout -b feat/add-new-feature  # Branch name is validated

# Make changes and stage them
git add src/components/MyComponent.tsx

# Attempt commit
git commit -m "feat: add new component"

# If prettier/eslint issues: automatically fixed and staged
# If tests fail: you need to fix them manually
# If commit message is invalid: update message and retry
# If branch name is invalid: rename branch and retry

# Re-attempt commit
git commit -m "feat: add new component"  # Should succeed now

# Push changes (branch name is validated again)
git push origin feat/add-new-feature  # Branch validation passes
```

---

---

## Troubleshooting

### Hooks Not Running

```bash
# Reinstall hooks
pnpm lefthook install

# Verify hooks are executable
ls -la .git/hooks/pre-commit .git/hooks/commit-msg
```

### Skip Hook for Specific Changes

```bash
# Bypass all hooks (use sparingly)
git commit --no-verify -m "chore: bypass hooks"
```

### Manual Validation

```bash
# Test prettier formatting
pnpm format

# Test eslint
pnpm lint --fix

# Test unit tests
pnpm test:check

# Test commit message
node scripts/validate-commit-msg.js /tmp/test-commit-msg

# Test branch naming validation
node scripts/validate-branch-name.js
```
