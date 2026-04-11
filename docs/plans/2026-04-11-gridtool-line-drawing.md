# Gridtool Line Drawing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** When exactly two grid cells are filled, show a "Draw line" button that renders a persistent SVG line between their centers and clears the selection for the next pair.

**Architecture:** All changes are in a single file (`src/app/gridtool/page.tsx`). A `lines` state array stores drawn lines as cell-key pairs. A `cellCenter` helper converts cell keys to pixel coordinates. An absolutely-positioned SVG overlay renders the lines on top of the CSS grid.

**Tech Stack:** React 19, Next.js 15, TypeScript, inline styles (no Tailwind in this file except for button classes)

---

### Task 1: Add `lines` state and the `cellCenter` helper

**Files:**
- Modify: `src/app/gridtool/page.tsx`

This task adds the data model and coordinate math — no visible UI change yet.

**Step 1: Add the `Line` type and `lines` state**

In `page.tsx`, the `Point` type is at line 5. Add `Line` directly below it:

```ts
type Line = { from: string; to: string };
```

Inside `GridToolPage`, after the `filled` state declaration (currently line 22), add:

```ts
const [lines, setLines] = useState<Line[]>([]);
```

**Step 2: Add the `cellCenter` helper**

Add this function inside `GridToolPage`, after the `endDrag` function (currently around line 99). It uses `labelSize`, `gap`, and `cellSize` which are already in scope:

```ts
const cellCenter = (key: string): { cx: number; cy: number } => {
  const [x, y] = key.split(",").map(Number);
  const cx = labelSize + gap + (x - 1) * (cellSize + gap) + cellSize / 2;
  const cy = labelSize + gap + (y - 1) * (cellSize + gap) + cellSize / 2;
  return { cx, cy };
};
```

**Step 3: Add `drawLine` and `clearLines` callbacks**

Add these after `cellCenter`:

```ts
const drawLine = useCallback(() => {
  const [from, to] = Array.from(filled);
  setLines((prev) => [...prev, { from, to }]);
  setFilled(new Set());
}, [filled]);

const clearLines = useCallback(() => {
  setLines([]);
}, []);
```

**Step 4: Verify TypeScript compiles**

Run: `npm run build` (or `npm run lint`)
Expected: No new TypeScript errors.

**Step 5: Commit**

```bash
git add src/app/gridtool/page.tsx
git commit -m "feat(gridtool): add lines state and cellCenter helper"
```

---

### Task 2: Add "Draw line" and "Clear lines" buttons to the controls bar

**Files:**
- Modify: `src/app/gridtool/page.tsx`

**Step 1: Locate the controls panel**

The controls bar `<div>` contains the row/col inputs, "Build grid", and "Clear" buttons. It ends around line 194. The buttons sit inside this flex container.

**Step 2: Add the two new buttons**

Add these after the existing "Clear" button (keep them inside the same flex `<div>`):

```tsx
{filled.size === 2 && (
  <button
    onClick={drawLine}
    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm font-medium transition-colors"
  >
    Draw line
  </button>
)}
{lines.length > 0 && (
  <button
    onClick={clearLines}
    className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
  >
    Clear lines
  </button>
)}
```

**Step 3: Start the dev server and verify buttons appear**

Run: `npm run dev` (server starts on port 4000)

Navigate to `http://localhost:4000/gridtool`.

- Paint exactly **two** cells → "Draw line" button should appear in the controls bar
- Paint a **third** cell → button should disappear
- Erase back to two → button reappears
- Click "Draw line" → button disappears, filled cells clear (line not yet visible — SVG comes next)
- After drawing a line, "Clear lines" button appears

**Step 4: Commit**

```bash
git add src/app/gridtool/page.tsx
git commit -m "feat(gridtool): add Draw line and Clear lines buttons"
```

---

### Task 3: Add SVG overlay to render lines on the grid

**Files:**
- Modify: `src/app/gridtool/page.tsx`

**Step 1: Locate the grid structure**

The grid section is the `<div>` with `gridColumn: 2, gridRow: 2`. It contains:
1. An outer scrollable `<div>` (has `overflow: "auto"`, `padding: 12`, background, border, borderRadius)
2. Inside it: the CSS grid `<div>` with `onPointerDown` etc.
3. After the grid div: a `<span>` with the "Tip: click + drag" message

**Step 2: Wrap the inner grid div in a relative container**

The SVG must scroll with the grid, so wrap only the inner CSS grid `<div>` (the one with `onPointerDown`) in a `position: relative` div. The `<span>` tip stays outside this wrapper.

Replace this structure:
```tsx
{/* inside the outer scrollable div */}
<div
  onPointerDown={onPointerDown}
  ...
>
  {/* grid cells */}
</div>
<span>Tip: ...</span>
```

With:
```tsx
<div style={{ position: "relative", width: "fit-content" }}>
  <div
    onPointerDown={onPointerDown}
    ...
  >
    {/* grid cells — unchanged */}
  </div>
  <svg
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      overflow: "visible",
    }}
  >
    {lines.map((line, i) => {
      const { cx: cx1, cy: cy1 } = cellCenter(line.from);
      const { cx: cx2, cy: cy2 } = cellCenter(line.to);
      return (
        <line
          key={i}
          x1={cx1}
          y1={cy1}
          x2={cx2}
          y2={cy2}
          stroke="#3b82f6"
          strokeWidth={2}
          strokeOpacity={0.8}
          strokeLinecap="round"
        />
      );
    })}
  </svg>
</div>
<span style={{ opacity: 0.5, fontSize: "0.85rem", marginTop: 8, display: "block" }}>
  Tip: click + drag to paint.
</span>
```

**Step 3: Verify lines render correctly**

With the dev server running at `http://localhost:4000/gridtool`:

1. Paint two cells in different positions (e.g. (2,2) and (8,8))
2. Click "Draw line" — a blue line should appear connecting their centers
3. Paint another two cells, click "Draw line" again — a second line accumulates
4. Click "Clear lines" — all SVG lines disappear, cells remain painted
5. Try cells in the same row, same column, and diagonal — all should draw correctly
6. Build a new grid (different `cellSize`) — draw a line, check it hits the cell centers

Take a Playwright screenshot to verify alignment looks correct.

**Step 4: Commit**

```bash
git add src/app/gridtool/page.tsx
git commit -m "feat(gridtool): add SVG overlay to render lines between cells"
```

---

### Task 4: Add "Lines" section to the sidebar

**Files:**
- Modify: `src/app/gridtool/page.tsx`

**Step 1: Locate the sidebar `<aside>`**

The `<aside>` (gridColumn: 1, gridRow: 2) currently shows "Highlighted dots" with a count and ordered list. It ends around line 251.

**Step 2: Append a "Lines" section inside the `<aside>`**

Add this after the closing `</ol>` of the points list, still inside `<aside>`:

```tsx
{lines.length > 0 && (
  <div
    style={{
      marginTop: 16,
      borderTop: "1px solid #1d2430",
      paddingTop: 12,
    }}
  >
    <h3
      style={{
        margin: "0 0 8px 0",
        fontSize: 14,
        letterSpacing: "0.2px",
        color: "#dbe6f6",
      }}
    >
      Lines
    </h3>
    <p style={{ margin: "0 0 10px 0", fontSize: 12, opacity: 0.85 }}>
      {lines.length} line{lines.length !== 1 ? "s" : ""}
    </p>
    <ol
      style={{
        margin: 0,
        paddingLeft: 18,
        maxHeight: "30vh",
        overflow: "auto",
      }}
    >
      {lines.map((line, i) => {
        const [fx, fy] = line.from.split(",");
        const [tx, ty] = line.to.split(",");
        return (
          <li
            key={i}
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
              fontSize: 12,
              padding: "2px 0",
              opacity: 0.95,
            }}
          >
            ({fx}, {fy}) → ({tx}, {ty})
          </li>
        );
      })}
    </ol>
  </div>
)}
```

**Step 3: Verify sidebar updates**

With the dev server running:

1. Draw two lines between different cell pairs
2. Sidebar should show "Lines" section with "2 lines" and both entries formatted as `(x₁, y₁) → (x₂, y₂)`
3. Click "Clear lines" — sidebar "Lines" section disappears

Take a Playwright screenshot of the sidebar with lines listed.

**Step 4: Commit**

```bash
git add src/app/gridtool/page.tsx
git commit -m "feat(gridtool): add lines list to sidebar"
```

---

### Task 5: Final polish and verification

**Files:**
- Modify: `src/app/gridtool/page.tsx` (if needed)

**Step 1: Update the tip text**

The current tip reads "Tip: click + drag to paint." Update it to mention the line drawing:

```tsx
<span style={{ opacity: 0.5, fontSize: "0.85rem", marginTop: 8, display: "block" }}>
  Tip: click + drag to paint · select 2 cells to draw a line
</span>
```

**Step 2: Full end-to-end Playwright verification**

Use the Playwright MCP to:
1. Navigate to `http://localhost:4000/gridtool`
2. Screenshot initial state — controls show only "Build grid" and "Clear"
3. Click one cell — "Draw line" does not appear
4. Click a second cell — "Draw line" appears
5. Click "Draw line" — line appears on grid, cells clear, "Clear lines" appears in controls, sidebar shows "Lines" section
6. Draw a second line — sidebar shows "2 lines"
7. Click "Clear lines" — SVG lines gone, sidebar section gone
8. Screenshot final state

**Step 3: Run lint**

```bash
npm run lint
```
Expected: No errors.

**Step 4: Final commit**

```bash
git add src/app/gridtool/page.tsx
git commit -m "feat(gridtool): update tip text for line drawing"
```
