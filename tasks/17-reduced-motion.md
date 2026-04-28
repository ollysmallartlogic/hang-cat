# 17 — `useReducedMotion` hook

- **Milestone:** M4 — Cat & motion
- **Status:** done
- **Depends on:** 01
- **Spec refs:** design.md §9 (Accessibility), tech-spec.md §7 (Motion), §9 (Accessibility)

## Goal

Centralise the `prefers-reduced-motion` check so every motion-using component reads from one place.

## Deliverables

- `src/ui/hooks/useReducedMotion.ts`:
  - Returns `boolean` from `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
  - Subscribes to media-query changes and re-renders consumers when the user toggles their OS setting.
  - SSR-safe (returns `false` if `window` is undefined).
- A top-level effect in `App.tsx` (or a small `MotionProvider`) that mirrors the value onto `document.body`:
  - `<body data-reduced-motion="true">` when active.
- `src/styles/tokens.css` augmented:
  ```css
  body[data-reduced-motion="true"] {
    --t-letter-reveal: 0ms;
    --t-cat-pose: 0ms;
    --t-leaf-fall: 0ms;
    --t-cat-fall: 0ms;
  }
  ```
- `LeafFall` (task 16) reads the hook and skips mounting leaves entirely when reduced motion is active. The pulse (task 22) likewise disables itself.

## Acceptance criteria

- [ ] Toggling the OS reduced-motion setting takes effect without a page reload.
- [ ] With reduced motion on: pose changes are instant, leaves don't mount, vermilion pulse is static.
- [ ] With reduced motion on: the *meaning* of every state is still communicated (the cat still moves through poses; the underline is still drawn — just not animated).
- [ ] No reads of `matchMedia` outside this hook.

## Notes

- Don't gate state changes on this hook — only the *visual transition*. The cat still changes pose; it just changes instantly.
