# SalesPilot Frontend

Welcome to the SalesPilot frontend repository! This project is built with React and TypeScript, utilizing Vite for fast development and optimized builds.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 10.33.0+ (or npm/yarn)

### Installation & Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

3. Start the development server:

```bash
pnpm dev
```

Navigate to `http://localhost:5173`

### Building & Deployment

```bash
pnpm build       # Build for production
pnpm preview     # Preview production build
```

## 🖥 IDE Setup

### VS Code Extensions

For the best development experience, install these extensions:

1. **ESLint** - [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - Lints code in real-time
   - Shows errors and warnings in the editor

2. **Prettier** - [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   - Code formatter with configuration support
   - Integrates with the project's Prettier config

3. **Vitest** - [vitest.explorer](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)
   - Run and debug tests directly in the editor
   - View test results and coverage in real-time

### Auto-Format on Save

Configure VS Code to auto-format on save:

1. Open VS Code **Settings** (`Ctrl+,` or `Cmd+,`)
2. Search for `format on save`
3. Enable **"Format On Save"** checkbox
4. (Optional) Set **Default Formatter** to `esbenp.prettier-vscode` for consistent formatting

Or add to `.vscode/settings.json` (create if it doesn't exist):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

This way, code is automatically formatted whenever you save, and you'll get instant ESLint feedback as you type.

## 📚 Documentation

### Architecture & Technology Stack

This project is built with modern frontend technologies:

- **React 19** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vitest** - Unit testing framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Material-UI (MUI)** - Component library
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Zustand** - Lightweight state management
- **Prettier** - Code formatting
- **ESLint** - Code linting

The project is organized with a clear separation of concerns: pages for routes, components for UI, services for API integration, and hooks for reusable logic.

### Component Architecture

We follow a **Smart/Dumb Components** pattern to maintain clear separation of concerns:

- **Smart Components (Containers)** - Handle logic, data fetching, state management, and business logic. Located in `pages/` and `UI/` with orchestration logic.
- **Dumb Components (Presentational)** - Focus purely on rendering UI. Receive data via props, no business logic. Located in `UI/` folder for reusable UI elements.

This pattern makes components:

- More testable and maintainable
- More reusable across pages
- Easier to refactor and debug
- Clear about responsibility boundaries

### Domain-Driven Organization

The project is organized by domain/feature rather than by type:

```
pages/
├── admin/          # Admin domain
├── manager/        # Manager domain
├── salesman/       # Salesman domain
└── Login/          # Authentication domain
```

Each domain contains its specific pages, forms, and feature-related components. Services and hooks are shared across domains when needed.

## 📜 Commit and Branch Patterns

We use **Conventional Commits** to maintain an organized and readable repository history while improving internal communication.

### Available Types

| Type       | Purpose                                     |
| ---------- | ------------------------------------------- |
| `feat`     | New functionality                           |
| `fix`      | Bug fix                                     |
| `refactor` | Code refactoring                            |
| `style`    | Style/readability changes (no logic change) |
| `test`     | Automated tests                             |
| `build`    | Build and dependencies                      |
| `perf`     | Performance improvement                     |
| `ci`       | CI/CD configuration                         |
| `revert`   | Revert a previous commit                    |
| `hotfix`   | Critical bug fix (used for hotfix branches) |

### Commit Format

- **type**: Indicates the purpose of the change
- **short description**: Must be clear, objective, written in English, and in the imperative mood (e.g., "add", "fix", "remove")
- Write commit messages in **English**
- Be clear and objective—make one commit per significant code chunk, not one commit with all changes
- Use imperative mood: "add feature" not "added feature"

Every commit must follow this format:

```
<type>: <short description>
```

### Branch Naming

- **type**: Indicates the purpose of the change
- **issue-number**: Link to a specific issue or task. If not applicable, use `no-ref` as a placeholder.
- **short description**: Must be clear, objective, written in English, and in the imperative mood (e.g., "add", "fix", "remove")

Every branch must follow this format:

```
<type>/<issue-number>/<description>
```

**Examples:**

```bash
git checkout -b feat/1234/add-user-authentication
git checkout -b fix/5678/sidebar-alignment-issue
git checkout -b hotfix/3456/critical-bug-fix
git checkout -b refactor/no-ref/simplify-form-logic
```

**Protected branches** (auto-allowed):

- `main`, `develop`, `staging`
- `release/*` - release branches
- `hotfix/*` - hotfix branches

## ✅ Quality & Testing

### Automatic Pre-Commit Checks

Code quality and tests are **automatically enforced** when you commit:

- **Prettier** - Auto-formats your code
- **ESLint** - Lints and auto-fixes issues
- **Unit Tests** - Runs all tests for modified files
- **Branch/Message Validation** - Enforces naming conventions

If any check fails, your commit is blocked until issues are fixed. See [LEFTHOOK.md](LEFTHOOK.md) for more details.

### Manual Quality Checks

To check code quality before committing:

```bash
pnpm lint              # Check code quality
pnpm lint --fix        # Auto-fix linting issues
pnpm format            # Format code with Prettier
pnpm format:check      # Verify code formatting
```

### Testing Commands

For development and debugging:

```bash
pnpm test       # Watch mode - auto-rerun on changes
pnpm test:ui    # Interactive test dashboard
pnpm test:run   # Verbose single run
pnpm test:check # Single run (same as pre-commit check)
```
