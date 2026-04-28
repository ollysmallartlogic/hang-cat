# 01 — Vite + TypeScript scaffold

- **Milestone:** M1 — Skeleton
- **Status:** done
- **Depends on:** —
- **Spec refs:** tech-spec.md §2 (Stack), §3 (Architecture)

## Goal

Stand up an empty React + TypeScript app with the folder layout from §3, ready for every later task to drop into.

## Deliverables

- `package.json` with React 18, Vite, TypeScript (strict), ESLint (typescript-eslint, react-hooks), Prettier, Vitest, `@testing-library/react`, Playwright.
- `tsconfig.json` with `"strict": true`, `"jsx": "react-jsx"`.
- `vite.config.ts` sharing config with Vitest.
- Empty directories matching §3: `src/game/`, `src/ui/screens/`, `src/ui/components/`, `src/ui/hooks/`, `src/audio/`, `src/styles/`, `src/data/`.
- `src/main.tsx` mounting `<App />`, `src/ui/App.tsx` rendering a placeholder.
- `index.html` with `<title>Hang Cat</title>`.
- ESLint + Prettier config files. `pnpm lint`, `pnpm test`, `pnpm dev`, `pnpm build` all run cleanly.

## Acceptance criteria

- [ ] `pnpm install` succeeds with no peer-dep warnings worth fixing.
- [ ] `pnpm dev` boots and renders a blank page (or a single placeholder).
- [ ] `pnpm test` runs Vitest and reports zero tests, no errors.
- [ ] `pnpm lint` passes on the scaffold.
- [ ] `pnpm build` produces `dist/` with no warnings.
- [ ] Node ≥ 20, package manager is `pnpm`.

## Notes

- Use `pnpm create vite@latest hang-cat --template react-ts` as a starting point, then add the listed extras.
- Don't add Tailwind. The spec calls for CSS Modules + custom properties.
- Don't pre-install Howler — that's task 24.
