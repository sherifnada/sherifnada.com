# Gridtool: Line Drawing Feature Design

**Date:** 2026-04-11
**File:** `src/app/gridtool/page.tsx`

## Overview

Add the ability to draw a straight geometric line between two selected grid cells. When exactly two cells are filled, a "Draw line" button appears. Clicking it renders an SVG line connecting the centers of the two cells and clears the selection so the user can begin selecting a new pair. Multiple lines accumulate over time.

## Data Model

Add a `lines` state array:

```ts
type Line = { from: string; to: string };
const [lines, setLines] = useState<Line[]>([]);
```

Lines are stored as cell key pairs (e.g. `"3,4"` and `"7,2"`) rather than pixel coordinates so they remain valid if the grid is rebuilt at a different `cellSize`.

## "Draw Line" Button

- Rendered in the controls bar **only when `filled.size === 2`**
- On click:
  1. Extract the two cell keys from `filled`
  2. Append `{ from, to }` to `lines`
  3. Call `setFilled(new Set())` to clear the selection
- A **"Clear lines"** button also appears in the controls bar whenever `lines.length > 0`, resetting `lines` to `[]`
- The existing **"Clear"** button continues to clear only painted cells (`filled`), not lines

## SVG Overlay

### Structure

The grid `<div>` (currently `gridColumn: 2, gridRow: 2`) is wrapped in a `position: relative` container. An `<svg>` is placed `position: absolute, inset: 0, width: 100%, height: 100%` with `pointerEvents: none` so it doesn't interfere with cell painting.

### Cell Center Calculation

Given a cell key `"x,y"` (1-based), the pixel center within the grid's inner coordinate system:

```
cx = labelSize + gap + (x - 1) * (cellSize + gap) + cellSize / 2
cy = labelSize + gap + (y - 1) * (cellSize + gap) + cellSize / 2
```

Where `labelSize = 26`, `gap = 2`, and `cellSize` comes from state. This accounts for the label row/column offset and gaps between cells.

### Rendering

Each line in `lines` renders as an SVG `<line>` element:

```tsx
<line
  x1={cx1} y1={cy1}
  x2={cx2} y2={cy2}
  stroke="#3b82f6"
  strokeWidth={2}
  strokeOpacity={0.8}
  strokeLinecap="round"
/>
```

## Sidebar

A "Lines" section is added below the existing points list, showing each drawn line as:

```
(x₁, y₁) → (x₂, y₂)
```

Count is shown above the list (e.g. "2 lines").

## What is Not Changing

- The existing paint/erase drag interaction is unchanged
- The "Clear" button continues to only clear `filled`
- No undo/redo support (out of scope)
- No individual line deletion (out of scope)
