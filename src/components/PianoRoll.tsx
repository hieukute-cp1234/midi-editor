import React, { useMemo, useRef, useEffect, useState } from "react";

// PianoRollComponent.jsx
// Default export: PianoRoll component
// TailwindCSS required in the project

/**
 * Props
 * - duration: total seconds (number)
 * - tracks: array of { id, label } length 8 (or fewer) -- columns left->right
 * - notes: array of { id, trackIndex (0-based), time (seconds), color? }
 * - trackWidth: number px (default 100)
 * - rowSeconds: number (seconds per visual row, default 5)
 * - rowHeight: number px (default 50)
 */

export default function PianoRoll({
  duration = 120,
  tracks = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    label: `Track ${i + 1}`,
  })),
  notes = [],
  trackWidth = 100,
  rowSeconds = 5,
  rowHeight = 50,
}) {
  const totalRows = Math.ceil(duration / rowSeconds);
  const canvasHeight = totalRows * rowHeight;
  const rulerWidth = 72;

  // compute positions for notes
  const notesPositioned = useMemo(() => {
    return notes.map((n) => {
      const top = (n.time / rowSeconds) * rowHeight; // pixels from top
      const left = n.trackIndex * trackWidth + trackWidth / 2 - 12; // center a 24px dot
      return {
        ...n,
        top,
        left,
      };
    });
  }, [notes, rowSeconds, rowHeight, trackWidth]);

  // helper render time markers (every rowSeconds)
  const timeMarkers = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= totalRows; i++) {
      const seconds = i * rowSeconds;
      arr.push({ seconds, y: i * rowHeight });
    }
    return arr;
  }, [totalRows, rowSeconds, rowHeight]);

  // responsive track width: we allow CSS to handle overflow horizontally

  return (
    <div className="w-full h-[600px] bg-white border rounded-lg shadow-sm overflow-hidden flex text-sm">
      {/* Left: time ruler */}
      <div
        className="flex-shrink-0 bg-gray-50 border-r"
        style={{ width: rulerWidth }}
      >
        <div className="sticky top-0 z-10 bg-gray-50 p-2 border-b">
          <div className="font-medium">Timeline</div>
        </div>
        <div className="relative" style={{ height: "100%" }}>
          <div style={{ height: canvasHeight }} className="relative">
            {timeMarkers.map((m, i) => {
              const isMajor = m.seconds % 10 === 0; // major every 10s
              return (
                <div
                  key={i}
                  style={{ top: m.y - 7 }}
                  className={`absolute left-0 w-full flex items-center pl-2 ${
                    isMajor ? "text-gray-700 font-medium" : "text-gray-500"
                  }`}
                >
                  <div className="w-full">{isMajor ? `${m.seconds}s` : ""}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: tracks + grid (scrollable vertically and horizontally if needed) */}
      <div className="flex-1 overflow auto">
        {/* Track headers */}
        <div className="flex items-stretch bg-white border-b sticky top-0 z-20">
          <div style={{ width: rulerWidth }} className="flex-shrink-0" />
          <div className="flex overflow-x-auto">
            {tracks.map((t, i) => (
              <div
                key={t.id}
                className="flex-shrink-0 px-3 py-2 border-r text-center"
                style={{ width: trackWidth }}
              >
                <div className="text-xs text-gray-600">{t.label}</div>
                <div className="text-[12px] text-gray-400">#{t.id}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex">
            {/* spacer to match ruler width */}
            <div style={{ width: rulerWidth }} className="flex-shrink-0" />

            {/* grid area */}
            <div
              className="relative overflow-auto"
              style={{ width: trackWidth * tracks.length }}
            >
              <div style={{ height: canvasHeight }} className="relative">
                {/* horizontal grid lines and major lines */}
                {Array.from({ length: totalRows + 1 }).map((_, rowIndex) => {
                  const top = rowIndex * rowHeight;
                  const isMajor = rowIndex % 2 === 0; // every 10s if rowSeconds=5
                  return (
                    <div
                      key={rowIndex}
                      style={{ top }}
                      className={`absolute left-0 right-0 pointer-events-none ${
                        isMajor
                          ? "border-t border-gray-300"
                          : "border-t border-gray-200"
                      }`}
                    />
                  );
                })}

                {/* vertical track separators */}
                {tracks.map((t, i) => (
                  <div
                    key={`vsep-${i}`}
                    className="absolute top-0 bottom-0 pointer-events-none"
                    style={{ left: i * trackWidth, width: 0 }}
                  >
                    <div className="h-full border-l border-gray-200" />
                  </div>
                ))}

                {/* notes (circular dots) */}
                {notesPositioned.map((n) => (
                  <div
                    key={n.id}
                    title={`Track ${n.trackIndex + 1} • ${n.time}s`}
                    className="absolute rounded-full shadow-md flex items-center justify-center cursor-pointer"
                    style={{
                      width: 24,
                      height: 24,
                      transform: "translateY(-50%)",
                      left: n.left,
                      top: n.top,
                      background: n.color || "#10b981",
                      border: "2px solid rgba(255,255,255,0.9)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Example usage (for local dev) ----------
// import PianoRoll from './PianoRollComponent'
// const notesSample = [
//   { id: 'n1', trackIndex: 0, time: 2, color: '#ef4444' },
//   { id: 'n2', trackIndex: 1, time: 7, color: '#06b6d4' },
//   { id: 'n3', trackIndex: 3, time: 14.4 },
//   { id: 'n4', trackIndex: 7, time: 36 },
// ]
// <PianoRoll duration={120} notes={notesSample} trackWidth={100} rowSeconds={5} rowHeight={50} />
