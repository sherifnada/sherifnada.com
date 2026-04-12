"use client";

import { useState, useCallback, useRef } from "react";

type Point = { x: number; y: number };
type Line = { from: string; to: string };

function clampInt(v: string, min: number, max: number): number {
  const n = parseInt(v, 10);
  if (isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export default function GridToolPage() {
  const [rowsInput, setRowsInput] = useState("20");
  const [colsInput, setColsInput] = useState("20");
  const [cellSizeInput, setCellSizeInput] = useState("20");

  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [cellSize, setCellSize] = useState(20);
  const [filled, setFilled] = useState<Set<string>>(new Set());
  const [lines, setLines] = useState<Line[]>([]);

  const dragModeRef = useRef<"fill" | "erase" | null>(null);
  const isDownRef = useRef(false);

  const buildGrid = useCallback(() => {
    const r = clampInt(rowsInput, 1, 200);
    const c = clampInt(colsInput, 1, 200);
    const s = clampInt(cellSizeInput, 6, 60);
    setRowsInput(String(r));
    setColsInput(String(c));
    setCellSizeInput(String(s));
    setRows(r);
    setCols(c);
    setCellSize(s);
    setFilled(new Set());
    setLines([]);
  }, [rowsInput, colsInput, cellSizeInput]);

  const clear = useCallback(() => {
    setFilled(new Set());
  }, []);

  const toggleCell = useCallback((key: string) => {
    setFilled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        return next;
      }
      next.add(key);
      return next;
    });
  }, []);

  const setCell = useCallback((key: string, mode: "fill" | "erase") => {
    setFilled((prev) => {
      if (mode === "fill" && prev.has(key)) return prev;
      if (mode === "erase" && !prev.has(key)) return prev;
      const next = new Set(prev);
      if (mode === "fill") next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  const keyFromEvent = (e: React.PointerEvent): string | null => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const cell = el?.closest?.("[data-cell]") as HTMLElement | null;
    if (!cell) return null;
    return cell.dataset.cell || null;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const key = (e.target as HTMLElement).closest?.("[data-cell]")
      ? ((e.target as HTMLElement).closest("[data-cell]") as HTMLElement).dataset
          .cell || null
      : null;
    if (!key) return;
    e.preventDefault();
    isDownRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

    const wasFilled = filled.has(key);
    toggleCell(key);
    dragModeRef.current = wasFilled ? "erase" : "fill";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDownRef.current || !dragModeRef.current) return;
    e.preventDefault();
    const key = keyFromEvent(e);
    if (!key) return;
    setCell(key, dragModeRef.current);
  };

  const endDrag = () => {
    isDownRef.current = false;
    dragModeRef.current = null;
  };

  const labelSize = 26;
  const gap = 2;

  const cellCenter = (key: string): { cx: number; cy: number } => {
    const [x, y] = key.split(",").map(Number);
    const cx = labelSize + gap + (x - 1) * (cellSize + gap) + cellSize / 2;
    const cy = labelSize + gap + (y - 1) * (cellSize + gap) + cellSize / 2;
    return { cx, cy };
  };

  const drawLine = useCallback(() => {
    if (filled.size !== 2) return;
    const [from, to] = Array.from(filled);
    setLines((prev) => [...prev, { from, to }]);
    setFilled(new Set());
  }, [filled]);

  const clearLines = useCallback(() => {
    setLines([]);
  }, []);

  const selectedPoints: Point[] = Array.from(filled)
    .map((k) => {
      const [x, y] = k.split(",").map(Number);
      return { x, y };
    })
    .sort((a, b) => a.x - b.x || a.y - b.y);

  return (
    <div
      style={{
        margin: 0,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#0b0d10",
        color: "#e8eef6",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          maxWidth: "94vw",
          display: "grid",
          gridTemplateColumns: "300px auto 300px",
          gridTemplateRows: "auto 1fr",
          gap: 12,
          alignItems: "start",
        }}
      >
        {/* Controls panel — matches grid width */}
        <div
          style={{
            gridColumn: 2,
            display: "flex",
            gap: 8,
            alignItems: "center",
            padding: "12px 14px",
            background: "#11151b",
            border: "1px solid #1d2430",
            borderRadius: 12,
          }}
        >
            <input
              type="number"
              min={1}
              max={200}
              value={rowsInput}
              onChange={(e) => setRowsInput(e.target.value)}
              style={{
                width: 56,
                padding: "6px 8px",
                borderRadius: 10,
                border: "1px solid #263041",
                background: "#0c1016",
                color: "inherit",
                textAlign: "center",
              }}
            />
            <span style={{ opacity: 0.5 }}>&times;</span>
            <input
              type="number"
              min={1}
              max={200}
              value={colsInput}
              onChange={(e) => setColsInput(e.target.value)}
              style={{
                width: 56,
                padding: "6px 8px",
                borderRadius: 10,
                border: "1px solid #263041",
                background: "#0c1016",
                color: "inherit",
                textAlign: "center",
              }}
            />
            <button
              onClick={buildGrid}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
              style={{ marginLeft: "auto" }}
            >
              Build grid
            </button>
            <button
              onClick={clear}
              className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm font-medium transition-colors"
            >
              Clear
            </button>
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
        </div>

          {/* Sidebar */}
          <aside
            style={{
              gridColumn: 1,
              gridRow: 2,
              padding: "12px 14px",
              background: "#11151b",
              border: "1px solid #1d2430",
              borderRadius: 12,
              position: "sticky",
              top: 12,
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
              Highlighted dots (sorted by x, then y)
            </h3>
            <p
              style={{
                margin: "0 0 10px 0",
                fontSize: 12,
                opacity: 0.85,
              }}
            >
              {selectedPoints.length} selected
            </p>
            <ol
              style={{
                margin: 0,
                paddingLeft: 18,
                maxHeight: "60vh",
                overflow: "auto",
              }}
            >
              {selectedPoints.map((p) => (
                <li
                  key={`${p.x},${p.y}`}
                  style={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
                    fontSize: 12,
                    padding: "2px 0",
                    opacity: 0.95,
                  }}
                >
                  ({p.x}, {p.y})
                </li>
              ))}
            </ol>
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
                        key={`${line.from}->${line.to}-${i}`}
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
          </aside>

          {/* Grid */}
          <div
            style={{
              gridColumn: 2,
              gridRow: 2,
              userSelect: "none",
              touchAction: "none",
              padding: 12,
              background: "#11151b",
              border: "1px solid #1d2430",
              borderRadius: 12,
              overflow: "auto",
              width: "fit-content",
            }}
          >
            <div style={{ position: "relative", width: "fit-content" }}>
              <div
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={endDrag}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  display: "grid",
                  gap: gap,
                  justifyContent: "start",
                  gridTemplateColumns: `${labelSize}px repeat(${cols}, ${cellSize}px)`,
                  gridTemplateRows: `${labelSize}px repeat(${rows}, ${cellSize}px)`,
                }}
              >
                {/* Corner label */}
                <div
                  style={{
                    width: labelSize,
                    height: labelSize,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#d3def0",
                    background: "#0c1016",
                    border: "1px solid #1d2430",
                    borderRadius: 6,
                  }}
                >
                  x/y
                </div>

                {/* Top labels */}
                {Array.from({ length: cols }, (_, i) => (
                  <div
                    key={`top-${i}`}
                    style={{
                      width: cellSize,
                      height: labelSize,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 12,
                      color: "#b9c6d8",
                      background: "#0c1016",
                      border: "1px solid #1d2430",
                      borderRadius: 6,
                    }}
                  >
                    {i + 1}
                  </div>
                ))}

                {/* Rows */}
                {Array.from({ length: rows }, (_, rowIdx) => {
                  const y = rowIdx + 1;
                  return [
                    <div
                      key={`left-${y}`}
                      style={{
                        width: labelSize,
                        height: cellSize,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12,
                        color: "#b9c6d8",
                        background: "#0c1016",
                        border: "1px solid #1d2430",
                        borderRadius: 6,
                      }}
                    >
                      {y}
                    </div>,
                    ...Array.from({ length: cols }, (_, colIdx) => {
                      const x = colIdx + 1;
                      const key = `${x},${y}`;
                      const isFilled = filled.has(key);
                      return (
                        <div
                          key={key}
                          data-cell={key}
                          style={{
                            width: cellSize,
                            aspectRatio: "1 / 1",
                            background: isFilled ? "#3b82f6" : "#0c1016",
                            border: isFilled
                              ? "1px solid #4f93ff"
                              : "1px solid #1d2430",
                            borderRadius: 4,
                            cursor: "pointer",
                          }}
                        />
                      );
                    }),
                  ];
                })}
              </div>
              {lines.length > 0 && (
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  {lines.map((line, i) => {
                    const { cx: cx1, cy: cy1 } = cellCenter(line.from);
                    const { cx: cx2, cy: cy2 } = cellCenter(line.to);
                    return (
                      <line
                        key={`${line.from}->${line.to}-${i}`}
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
              )}
            </div>
            <span style={{ opacity: 0.5, fontSize: "0.85rem", marginTop: 8, display: "block" }}>
              Tip: click + drag to paint.
            </span>
          </div>
      </div>
    </div>
  );
}
