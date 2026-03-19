# Template Mode Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add manual template switching with two distinct card layouts, `摘录` and `摘要`, while keeping the app single-file and GitHub Pages compatible.

**Architecture:** Keep `index.html` as the only runtime artifact. Add a template state and configuration layer, then branch rendering inside the existing canvas pipeline so shared setup remains in one place and only the layout decisions vary by template.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Canvas 2D, QRious, localStorage

---

## Chunk 1: Controls And State

### Task 1: Add template selection UI

**Files:**
- Modify: `index.html`

- [ ] Add a new template select field to the existing control grid
- [ ] Add styles only if the current grid needs small adjustments
- [ ] Keep mobile layout consistent with the existing controls panel

### Task 2: Persist template state

**Files:**
- Modify: `index.html`

- [ ] Add `currentTemplate` with a default value of `quote`
- [ ] Add template options data for `quote` and `summary`
- [ ] Save and restore template state through the existing localStorage flow
- [ ] Update `fillSample()` so it uses template-specific example text

## Chunk 2: Rendering

### Task 3: Extract template-aware render decisions

**Files:**
- Modify: `index.html`

- [ ] Add helper functions that describe layout values per template
- [ ] Keep shared canvas setup, background, border, and export flow unchanged
- [ ] Route `drawCard()` through the chosen template

### Task 4: Implement `摘录`

**Files:**
- Modify: `index.html`

- [ ] Preserve the current long-text reading layout as the base for `摘录`
- [ ] Keep footer QR placement close to the current behavior
- [ ] Verify truncation still works as before

### Task 5: Implement `摘要`

**Files:**
- Modify: `index.html`

- [ ] Create a tighter, more centered text block for short text
- [ ] Use a smaller, weaker QR block so the main sentence stays dominant
- [ ] Handle overflow conservatively without introducing dynamic font sizing

## Chunk 3: Verification

### Task 6: Browser checks

**Files:**
- Modify: `index.html`

- [ ] Run local browser checks for `摘录` without link
- [ ] Run local browser checks for `摘录` with QR
- [ ] Run local browser checks for `摘要` with QR
- [ ] Confirm preview dimensions, console output, and exported canvas path still work

### Task 7: Review and clean up

**Files:**
- Modify: `index.html`
- Modify: `docs/superpowers/specs/2026-03-19-template-mode-design.md`
- Modify: `docs/superpowers/plans/2026-03-19-template-mode.md`

- [ ] Remove dead branches or duplicate constants introduced during implementation
- [ ] Keep naming aligned with the rest of the file
- [ ] Summarize outcomes and any remaining edge cases
