# SalesPilot Frontend - Detailed Documentation

This document contains comprehensive documentation about the architecture, design patterns, and detailed implementation information for the SalesPilot Frontend application.

## 📋 Technology Stack

### Core Framework

- **[React 19](https://react.dev)** - Modern UI library with concurrent rendering and automatic batching for optimal performance
- **[TypeScript](https://www.typescriptlang.org)** - Adds static typing for safer, more maintainable code
- **[Vite](https://vitejs.dev)** - Lightning-fast build tool and dev server with Hot Module Replacement (HMR)

### Routing & Navigation

- **[@tanstack/react-router](https://tanstack.com/router/latest)** - Type-safe routing with excellent TypeScript support and nested routing capabilities

### State Management

- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight, simple state management library with minimal boilerplate

### Data Fetching & Caching

- **[@tanstack/react-query](https://tanstack.com/query/latest)** - Powerful server state management with automatic caching, synchronization, and background updates. Handles API calls to Spring Boot backend

### UI & Styling

- **[@mui/material](https://mui.com)** - Industry-standard Material Design component library with comprehensive theming support
- **[@mui/icons-material](https://mui.com/material-ui/icons)** - Icon library with 1000+ Material Design icons
- **[@emotion/react & @emotion/styled](https://emotion.sh)** - CSS-in-JS library used internally by MUI for styling

### Testing

- **[Vitest](https://vitest.dev)** - Lightning-fast unit test framework powered by Vite with excellent TypeScript support
- **[@testing-library/react](https://testing-library.com/react)** - Testing utilities for React components focused on testing behavior rather than implementation
- **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)** - Custom matchers for DOM assertions
- **[@testing-library/user-event](https://testing-library.com/user-event)** - User interaction simulation library
- **[jsdom](https://github.com/jsdom/jsdom)** - JavaScript implementation of web standards for DOM testing

### Code Quality

- **[ESLint](https://eslint.org)** - Static code analysis tool to find and fix problems in JavaScript
- **[TypeScript ESLint](https://typescript-eslint.io)** - ESLint rules specifically for TypeScript
- **[Prettier](https://prettier.io)** - Code formatter for consistent code style across the project

### Development Tools

- **[@vitest/ui](https://vitest.dev/guide/ui.html)** - Visual dashboard for test results

## 🏗️ Project Structure

```
src/
├── data/               # Page components organized by role
│   ├── enums/
│   └── mocks/
├── hooks/              # Custom React hooks
├── pages/              # Page components organized by role
│   ├── CompaniesPage/
│   ├── DashboardPage/
│   ├── Layout/
│   ├── Login/
│   ├── ManagersPage/
│   ├── MeetingsPage/
│   ├── PageNotFound/
│   ├── RootComponent/
│   └── SalesmenPage/
├── services/           # Zustand state stores
│   ├── api/
│   ├── config/         # Configuration files (e.g., queryClient)
│   ├── models/
│   └── queries/         
├── store/              # Zustand state stores
│   └── hooks/   
├── tests/              # Test files and setup
├── theme/              # MUI theme configuration and palettes
│   ├── components/
│   ├── hooks/         
│   ├── palettes/
│   └── typography/  
├── types/              # TypeScript type definitions
├── UI/                 # Reusable React components
├── utils/              # Utility functions and helpers
├── main.tsx            # Entry point
└── router.tsx          # Route definitions
```

## 🧪 Testing

The project includes comprehensive unit tests using Vitest and React Testing Library. All components are tested with a custom render function that provides necessary providers.

### Custom Render Function

A custom render function is available in [src/tests/testUtils.tsx](src/tests/testUtils.tsx) that wraps components with:

- **ThemeProvider**: Material-UI theme configuration
- **QueryClientProvider**: React Query client for API calls
- **CssBaseline**: Consistent styling

#### Usage in Tests

```tsx
import { render, screen } from '@tests/testUtils';
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Running Tests

#### Watch Mode (Development)

Auto-rerun tests on file changes:

```bash
pnpm test
```

#### Single Run (CI/CD)

Run tests once and exit. Use this for CI pipelines:

```bash
pnpm test:check
```

Alternative (verbose):

```bash
pnpm test:run
```

#### Interactive Test Dashboard

View test results in a visual UI:

```bash
pnpm test:ui
```

### Test Coverage

The following components have comprehensive test suites:

- **UI Components**: Header, PageHeader, IconBox, PageContainer, AppIcon, LayoutWrapper
- **Sidebar Components**: Sidebar, SidebarHeader, SidebarMenu, UserProfile
- **Utilities**: MenuItems

## 🎨 Code Quality

### Lint Code

Check for code quality issues:

```bash
pnpm lint
```

### Format Code

Format code with Prettier:

```bash
pnpm format
```

### Check Format

Check if code is properly formatted without changes:

```bash
pnpm format:check
```

## 🔌 API Integration

### Setup

API client is pre-configured in `src/utils/apiClient.ts`:

- Base URL: Configurable via `VITE_API_URL` environment variable
- Supports GET, POST, PUT, DELETE methods
- Automatic Bearer token injection from localStorage for authenticated requests

### Usage Example

Create custom hooks in `src/hooks/useQueries.ts`:

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../utils/apiClient';

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: () => apiClient.get('/companies'),
  });
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: (data) => apiClient.post('/companies', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};
```

Use in components:

```typescript
const { data: companies, isLoading } = useCompanies();
```

## 📚 Key Documentation Links

### Frontend Framework

- [React Documentation](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)

### Routing

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Router TypeScript Guide](https://tanstack.com/router/latest/docs/framework/react/guide/type-safety)

### State Management

- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Zustand Best Practices](https://github.com/pmndrs/zustand#guidelines)

### Data Fetching

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query API Reference](https://tanstack.com/query/latest/docs/react/overview)
- [Query & Mutation Examples](https://tanstack.com/query/latest/docs/react/guides/queries)

### UI Components

- [Material-UI Documentation](https://mui.com)
- [MUI Components API](https://mui.com/material-ui/api)
- [Material Design Icons](https://mui.com/material-ui/icons)
- [Emotion Styling](https://emotion.sh/docs/introduction)

### Build & Development

- [Vite Documentation](https://vitejs.dev)
- [Vite Config Reference](https://vitejs.dev/config)

### Testing

- [Vitest Documentation](https://vitest.dev)
- [Testing Library React Docs](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Code Quality

- [ESLint Documentation](https://eslint.org/docs/latest)
- [TypeScript ESLint](https://typescript-eslint.io)
- [Prettier Documentation](https://prettier.io/docs/en/index.html)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Backend API configuration
VITE_API_URL=http://localhost:8080/api
```

## 🏛️ Architecture Decisions

### Why React Query?

- Server state management separates from UI state
- Automatic caching and synchronization
- Built-in retry logic and error handling
- Perfect for Spring Boot API integration

### Why Zustand?

- Minimal boilerplate compared to Redux
- Easy to learn and use
- Works great alongside React Query for UI state

### Why TanStack Router?

- Type-safe routing with full TypeScript support
- Modern, composed-based routing patterns
- First-class lazy code loading

### Why Vite?

- Lightning-fast dev server with HMR
- Optimized build output with code splitting
- Native ESM support

## 🚧 Backend Integration Notes

This frontend is designed to work with a Spring Boot backend:

- API base URL: `http://localhost:8080/api` (configurable)
- Authentication: Bearer token via `Authorization` header
- Content-Type: `application/json`
- CORS: Configure in Spring Boot as needed
