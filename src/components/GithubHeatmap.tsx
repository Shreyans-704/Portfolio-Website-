"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApiContributionDay {
  contributionCount?: number;
  count?: number;
  date: string;
}

interface ApiResponse {
  days?: ApiContributionDay[];
  totalContributions?: number;
  error?: string;
}

interface ContributionDay {
  date: string;       // "YYYY-MM-DD"
  count: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  text: string;
  pinnedX: number | null;
  pinnedY: number | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const cleanDate = dateStr.split("T")[0];
  const [year, month, day] = cleanDate.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getLevelColor(level: number): string {
  switch (level) {
    case 0: return "rgba(255, 255, 255, 0.06)";
    case 1: return "#0e4429";
    case 2: return "#006d32";
    case 3: return "#26a641";
    case 4: return "#39d353";
    default: return "rgba(255, 255, 255, 0.06)";
  }
}

function computeLevel(count: number, max: number): number {
  if (!count || count <= 0 || !max || max <= 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.1) return 1;
  if (ratio <= 0.3) return 2;
  if (ratio <= 0.6) return 3;
  return 4;
}

// Build a grid: array of columns, each column = 7 cells (Sun→Sat)
// We show the last ~53 weeks
function buildGrid(days: ContributionDay[]): ContributionDay[][] {
  if (!days.length) return [];

  // Sort ascending by date
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

  // Group into weeks (columns), each week starts on Sunday
  const columns: ContributionDay[][] = [];
  let col: ContributionDay[] = [];

  for (const day of sorted) {
    const cleanDate = day.date.split("T")[0];
    const [year, month, dayNum] = cleanDate.split("-").map(Number);
    // Use UTC to prevent any local timezone DST shifts
    const dow = new Date(Date.UTC(year, month - 1, dayNum)).getUTCDay(); // 0 = Sun

    if (col.length === 0 && dow !== 0) {
      // Pad first column with empties up to dow
      for (let i = 0; i < dow; i++) {
        col.push({ date: "", count: 0 });
      }
    }

    col.push({ ...day, date: cleanDate });

    if (col.length === 7) {
      columns.push(col);
      col = [];
    }
  }

  // Push remaining partial column padded to 7
  if (col.length > 0) {
    while (col.length < 7) col.push({ date: "", count: 0 });
    columns.push(col);
  }

  return columns;
}

// Compute month label positions from grid columns
function computeMonthLabels(
  columns: ContributionDay[][]
): { label: string; colIndex: number }[] {
  const labels: { label: string; colIndex: number }[] = [];
  let lastMonth = -1;

  for (let c = 0; c < columns.length; c++) {
    for (const day of columns[c]) {
      if (day.date) {
        const cleanDate = day.date.split("T")[0];
        const month = parseInt(cleanDate.split("-")[1], 10) - 1;
        if (month !== lastMonth) {
          labels.push({ label: MONTH_NAMES[month], colIndex: c });
          lastMonth = month;
        }
        break;
      }
    }
  }

  return labels;
}

const HEATMAP_STYLES = `
  :root {
    --heat-0: rgba(255,255,255,0.06);
    --heat-1: #0e4429;
    --heat-2: #006d32;
    --heat-3: #26a641;
    --heat-4: #39d353;
  }

  .github-heatmap-container {
    width: 100%;
    border-radius: 2rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    padding: 1.75rem 2rem 1.5rem;
    position: relative;
    overflow: visible;
  }

  .heatmap-header-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .heatmap-title {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin: 0;
  }

  .heatmap-total {
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
    font-weight: 400;
    letter-spacing: 0.02em;
  }

  .heatmap-scroll-area {
    width: 100%;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.1) transparent;
    padding-bottom: 0.5rem;
  }

  .heatmap-scroll-area::-webkit-scrollbar {
    height: 4px;
  }
  .heatmap-scroll-area::-webkit-scrollbar-track {
    background: transparent;
  }
  .heatmap-scroll-area::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.12);
    border-radius: 2px;
  }

  .heatmap-inner {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: max-content;
  }

  .heatmap-months-row {
    display: flex;
    padding-left: 32px;
    margin-bottom: 6px;
  }

  .heatmap-month-label {
    font-size: 10px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.04em;
    font-weight: 500;
    user-select: none;
    white-space: nowrap;
  }

  .heatmap-body {
    display: flex;
    flex-direction: row;
    gap: 0;
  }

  .heatmap-day-labels {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-right: 8px;
    width: 24px;
    flex-shrink: 0;
  }

  .heatmap-day-label {
    font-size: 9px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.04em;
    font-weight: 500;
    display: flex;
    align-items: center;
    height: 12px;
    user-select: none;
  }

  .heatmap-grid-wrap {
    display: flex;
    flex-direction: row;
    gap: 3px;
  }

  .heatmap-column {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .heatmap-cell {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s;
    flex-shrink: 0;
    outline: none;
  }

  .heatmap-cell:hover,
  .heatmap-cell:focus-visible {
    opacity: 0.85;
    transform: scale(1.25);
    outline: 1.5px solid rgba(255,255,255,0.4);
    outline-offset: 1px;
    z-index: 2;
  }

  .heatmap-cell.empty-day {
    cursor: default;
    pointer-events: none;
  }

  /* Legend */
  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: flex-end;
    margin-top: 12px;
  }

  .heatmap-legend-label {
    font-size: 10px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.04em;
    font-weight: 500;
    user-select: none;
  }

  .legend-cell {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* Tooltip */
  .heatmap-tooltip {
    position: fixed;
    pointer-events: none;
    background: rgba(13,17,23,0.95);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    white-space: nowrap;
    z-index: 9999;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    transition: opacity 0.12s;
  }

  /* Skeleton */
  .skeleton-cell {
    background: rgba(255,255,255,0.06);
    animation: skeleton-pulse 1.8s ease-in-out infinite;
  }

  .skeleton-title {
    height: 12px;
    width: 200px;
    border-radius: 6px;
    background: rgba(255,255,255,0.06);
    animation: skeleton-pulse 1.8s ease-in-out infinite;
  }

  @keyframes skeleton-pulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.8; }
  }

  /* Error state */
  .heatmap-error {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140px;
    color: rgba(255,255,255,0.35);
    font-size: 0.9rem;
    letter-spacing: 0.02em;
  }

  @media (max-width: 640px) {
    .github-heatmap-container {
      padding: 1.25rem 1rem 1rem;
      border-radius: 1.25rem;
    }
  }
`;

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function HeatmapSkeleton() {
  return (
    <div className="github-heatmap-container" aria-label="Loading contribution heatmap">
      <div className="heatmap-header-row">
        <div className="skeleton-text skeleton-title" />
      </div>
      <div className="heatmap-scroll-area">
        <div className="heatmap-grid-wrap">
          {Array.from({ length: 53 }).map((_, ci) => (
            <div key={ci} className="heatmap-column">
              {Array.from({ length: 7 }).map((__, ri) => (
                <div key={ri} className="heatmap-cell skeleton-cell" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GithubHeatmap() {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
    pinnedX: null,
    pinnedY: null,
  });

  const tooltipRef = useRef<HTMLDivElement>(null);

  // ── Fetch ──
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch("/api/github-contributions");
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json: ApiResponse = await res.json();

        if (json.error) {
          throw new Error(json.error);
        }

        const rawDays: ApiContributionDay[] = Array.isArray(json.days) ? json.days : [];
        const totalVal: number = typeof json.totalContributions === "number" ? json.totalContributions : 0;

        // Map and ensure no mismatch between contributionCount and count
        const mapped: ContributionDay[] = rawDays.map((d) => ({
          date: d.date,
          count: typeof d.contributionCount === "number"
            ? d.contributionCount
            : typeof d.count === "number"
              ? d.count
              : 0,
        }));

        if (!cancelled) {
          setDays(mapped);
          setTotal(totalVal);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError("GitHub activity is currently unavailable.");
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  // ── Computed ──
  const grid = buildGrid(days);
  const maxCount = days.reduce((m, d) => Math.max(m, d.count), 0);
  const monthLabels = computeMonthLabels(grid);

  // ── Tooltip helpers ──
  const showTooltip = useCallback(
    (e: React.MouseEvent | React.TouchEvent, day: ContributionDay) => {
      if (!day.date) return;
      const label = `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${formatDate(day.date)}`;

      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX ?? 0;
        clientY = e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY ?? 0;
      } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }

      setTooltip({ visible: true, x: clientX, y: clientY, text: label, pinnedX: null, pinnedY: null });
    },
    []
  );

  const hideTooltip = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  // ── Clamp tooltip to viewport after each show ──
  useIsomorphicLayoutEffect(() => {
    if (!tooltip.visible || !tooltipRef.current) return;

    const el = tooltipRef.current;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const MARGIN = 8;
    const CURSOR_GAP = 12;

    let top = tooltip.y - rect.height - CURSOR_GAP;
    if (top < MARGIN) {
      top = tooltip.y + CURSOR_GAP;
    }
    if (top + rect.height > vh - MARGIN) {
      top = vh - rect.height - MARGIN;
    }
    top = Math.max(MARGIN, top);

    let left = tooltip.x + CURSOR_GAP;
    if (left + rect.width > vw - MARGIN) {
      left = tooltip.x - rect.width - CURSOR_GAP;
    }
    if (left < MARGIN) {
      left = MARGIN;
    }
    left = Math.min(left, vw - rect.width - MARGIN);

    setTooltip((prev) => ({ ...prev, pinnedX: left, pinnedY: top }));
  }, [tooltip.visible, tooltip.x, tooltip.y, tooltip.text]);

  const CELL_SIZE = 12;
  const GAP = 3;
  const COL_WIDTH = CELL_SIZE + GAP;

  return (
    <>
      <style>{HEATMAP_STYLES}</style>

      {loading ? (
        <HeatmapSkeleton />
      ) : error ? (
        <div className="github-heatmap-container heatmap-error" role="alert">
          <p>{error}</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="github-heatmap-container"
        >
          {/* ── Header ── */}
          <div className="heatmap-header-row">
            <h4 className="heatmap-title">Contribution Calendar</h4>
            <span className="heatmap-total">
              {total.toLocaleString()} contributions in the last year
            </span>
          </div>

          {/* ── Separator ── */}
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.05)", marginBottom: "1.25rem" }} />

          {/* ── Scrollable heatmap ── */}
          <div className="heatmap-scroll-area">
            <div className="heatmap-inner">

              {/* Month labels */}
              <div className="heatmap-months-row">
                {monthLabels.map((ml, i) => {
                  const nextColIndex = monthLabels[i + 1]?.colIndex ?? grid.length;
                  const spanCols = nextColIndex - ml.colIndex;
                  return (
                    <span
                      key={`${ml.label}-${i}`}
                      className="heatmap-month-label"
                      style={{ width: spanCols * COL_WIDTH }}
                    >
                      {ml.label}
                    </span>
                  );
                })}
              </div>

              {/* Body: day labels + grid */}
              <div className="heatmap-body">
                {/* Day-of-week labels */}
                <div className="heatmap-day-labels">
                  {DAY_LABELS.map((label, i) => (
                    <div key={i} className="heatmap-day-label">
                      {label}
                    </div>
                  ))}
                </div>

                {/* Contribution grid */}
                <div className="heatmap-grid-wrap" role="grid" aria-label="GitHub contribution calendar">
                  {grid.map((col, ci) => (
                    <div key={ci} className="heatmap-column" role="row">
                      {col.map((day, ri) => {
                        const level = computeLevel(day.count, maxCount);
                        const isEmpty = !day.date;
                        const ariaLabel = day.date
                          ? `${formatDate(day.date)}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                          : undefined;

                        return (
                          <div
                            key={`${ci}-${ri}`}
                            role={isEmpty ? "presentation" : "gridcell"}
                            aria-label={ariaLabel}
                            aria-hidden={isEmpty ? true : undefined}
                            tabIndex={-1}
                            className={`heatmap-cell${isEmpty ? " empty-day" : ""}`}
                            style={{ background: getLevelColor(isEmpty ? 0 : level) }}
                            onMouseEnter={(e) => !isEmpty && showTooltip(e, day)}
                            onMouseLeave={hideTooltip}
                            onTouchStart={(e) => {
                              if (!isEmpty) {
                                e.preventDefault();
                                showTooltip(e, day);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Legend ── */}
          <div className="heatmap-legend" role="img" aria-label="Contribution level legend from less to more">
            <span className="heatmap-legend-label">Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className="legend-cell"
                style={{ background: getLevelColor(lvl) }}
                aria-hidden="true"
              />
            ))}
            <span className="heatmap-legend-label">More</span>
          </div>

          {/* ── Real-time badge ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: "rgba(255,255,255,0.25)" }}>
              Real-time Data
            </span>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
          </div>

          {/* ── Tooltip ── */}
          {tooltip.visible && (
            <div
              ref={tooltipRef}
              className="heatmap-tooltip"
              style={{
                left: tooltip.pinnedX ?? tooltip.x,
                top: tooltip.pinnedY ?? (tooltip.y - 36),
                visibility: tooltip.pinnedX === null ? "hidden" : "visible",
                opacity: tooltip.pinnedX === null ? 0 : 1,
              }}
              role="tooltip"
              aria-live="polite"
            >
              {tooltip.text}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
