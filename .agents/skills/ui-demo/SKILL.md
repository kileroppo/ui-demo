```markdown
# ui-demo Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you how to contribute to the `ui-demo` repository, a React application written in TypeScript. You'll learn the project's coding conventions, commit patterns, and the main workflows for adding features, pages, hooks, tests, bug fixes, and documentation. Each workflow is documented with step-by-step instructions and code examples to help you work efficiently and consistently within the codebase.

---

## Coding Conventions

### File Naming

- **Components, Pages, Hooks, and Utils:** Use **PascalCase** for file names.
  - Example: `MyComponent.tsx`, `UserProfile.tsx`, `useCustomHook.ts`, `DataUtils.ts`

### Imports

- **Relative imports** are used throughout the codebase.
  - Example:
    ```typescript
    import { Button } from '../components/Button';
    import { useCustomHook } from '../../hooks/useCustomHook';
    ```

### Exports

- Use **named exports** for all modules.
  - Example:
    ```typescript
    // src/components/Button.tsx
    export function Button(props: ButtonProps) { ... }
    ```

### Commit Patterns

- **Conventional commits** are used, with the following prefixes:
  - `feat`: New features
  - `fix`: Bug fixes
  - `docs`: Documentation changes
  - `chore`: Maintenance tasks
- **Average commit message length:** 78 characters

---

## Workflows

### Add New Feature or Component

**Trigger:** When you want to add a new UI feature or component  
**Command:** `/new-feature`

1. Create or update files in `src/components/`, `src/pages/`, `src/hooks/`, or `src/utils/` to implement the feature.
2. Update or create corresponding test files in `src/test/components/`, `src/test/pages/`, `src/test/hooks/`, or `src/test/utils/`.
3. Update shared files (e.g., `src/index.css`, `src/App.tsx`, `src/components/Layout.tsx`) if needed for integration or styling.

**Example:**
```typescript
// src/components/Alert.tsx
export function Alert({ message }: { message: string }) {
  return <div className="alert">{message}</div>;
}

// src/test/components/Alert.test.tsx
import { render, screen } from '@testing-library/react';
import { Alert } from '../../components/Alert';

test('renders alert message', () => {
  render(<Alert message="Hello" />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

---

### Add New Page or Route

**Trigger:** When you want to add a new navigable page or route  
**Command:** `/new-page`

1. Create a new file in `src/pages/` for the page implementation.
2. Register the route in `src/App.tsx` and/or update navigation in `src/components/Layout.tsx`.
3. Create or update test files in `src/test/pages/` for the new page.
4. Optionally, update navigation items or related components.

**Example:**
```typescript
// src/pages/About.tsx
export function About() {
  return <div>About Page</div>;
}

// src/App.tsx (snippet)
import { About } from './pages/About';
// ... in your router
<Route path="/about" element={<About />} />
```

---

### Add or Update Custom Hook

**Trigger:** When you want to add or enhance reusable logic via a hook  
**Command:** `/new-hook`

1. Create or update a file in `src/hooks/` for the hook logic.
2. Create or update corresponding test file in `src/test/hooks/`.
3. Integrate the hook into components or pages as needed.

**Example:**
```typescript
// src/hooks/useCounter.ts
import { useState } from 'react';
export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  return { count, increment: () => setCount(c => c + 1) };
}

// src/test/hooks/useCounter.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../../hooks/useCounter';

test('increments count', () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

---

### Feature Development with Tests and Style

**Trigger:** When you want to deliver a feature with UI, logic, and visual polish  
**Command:** `/feature`

1. Implement or update feature in `src/components/`, `src/pages/`, or `src/hooks/`.
2. Update or create tests in `src/test/` directories.
3. Update `src/index.css` or design token files for new styles.

**Example:**
```css
/* src/index.css */
.button-primary {
  background: #0070f3;
  color: white;
}
```
```typescript
// src/components/PrimaryButton.tsx
export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return <button className="button-primary">{children}</button>;
}
```

---

### Fix Bug or Address Code Review

**Trigger:** When you need to fix a bug or respond to review feedback  
**Command:** `/fix`

1. Update implementation files in `src/components/`, `src/pages/`, `src/hooks/`, or `src/utils/` to fix the issue.
2. Update or add tests in `src/test/` to cover the fix.
3. Add comments or documentation if needed.

**Example:**
```typescript
// src/components/Counter.tsx
export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);
  // Fixed: handle negative initial values
  useEffect(() => {
    if (initial < 0) setCount(0);
  }, [initial]);
  // ...
}
```

---

### Add or Update Documentation

**Trigger:** When you want to document new features or update existing docs  
**Command:** `/docs`

1. Update or create files in `docs/` and/or `README.md`.
2. Optionally, update documentation comments in code.

**Example:**
```markdown
<!-- docs/usage.md -->
# Usage Guide

To use the Alert component:
```tsx
<Alert message="Hello!" />
```
```

---

## Testing Patterns

- **Testing Framework:** [Vitest](https://vitest.dev/)
- **Test File Pattern:** Place tests alongside code in `src/test/` directories, using the pattern `*.test.tsx` for components/pages and `*.test.ts` for hooks/utils.
- **Test Example:**
  ```typescript
  // src/test/components/Button.test.tsx
  import { render, screen } from '@testing-library/react';
  import { Button } from '../../components/Button';

  test('renders button', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  ```

---

## Commands

| Command       | Purpose                                                      |
|---------------|--------------------------------------------------------------|
| /new-feature  | Add a new UI feature or component with tests                 |
| /new-page     | Add a new page or route with navigation and tests            |
| /new-hook     | Add or update a custom React hook with tests                 |
| /feature      | Develop a feature with implementation, tests, and styles     |
| /fix          | Fix bugs or address code review feedback                     |
| /docs         | Add or update documentation                                  |
```
