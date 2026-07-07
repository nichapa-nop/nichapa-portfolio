"use client";

import { useEffect, useRef, useState } from "react";

type Decoy = { label: string; icon: string; x: number; y: number };

// base positions in % of the desktop, kept clear of the centre (terminal)
const DECOYS: Decoy[] = [
  { label: "Mail", icon: "✉️", x: 20, y: 28 },
  { label: "Photos", icon: "🖼️", x: 78, y: 24 },
  { label: "Notes", icon: "📝", x: 16, y: 64 },
  { label: "Music", icon: "🎵", x: 84, y: 62 },
  { label: "Settings", icon: "⚙️", x: 36, y: 82 },
  { label: "Trash", icon: "🗑️", x: 66, y: 84 },
];

const R = 150; // flee radius (px)
const PUSH = 80; // max flee distance (px)

export default function Desktop({ onOpen }: { onOpen: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState(DECOYS.map(() => ({ x: 0, y: 0 })));
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000 * 20);

    const onKey = (e: WindowEventMap["keydown"]) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") onOpen();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [onOpen]);

  function onMove(e: React.MouseEvent) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = DECOYS.map((d) => {
      const cx = rect.left + (d.x / 100) * rect.width;
      const cy = rect.top + (d.y / 100) * rect.height;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist > R) return { x: 0, y: 0 };
      const force = ((R - dist) / R) * PUSH;
      return { x: (dx / dist) * force, y: (dy / dist) * force };
    });
    setOffsets(next);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      className="os-wall relative h-full w-full overflow-hidden"
    >
      {/* menu bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-1.5 text-xs text-ink-soft backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <span className="font-semibold text-ink">nichapa.os</span>
          <span className="hidden text-muted sm:inline">File Edit View Go</span>
        </span>
        <span className="text-muted">{clock}</span>
      </div>

      {/* hint */}
      <p className="absolute inset-x-0 top-12 z-20 text-center text-sm text-ink-soft">
        there&apos;s only <span className="text-accent">one app</span> you need
        here
      </p>

      {/* decoy apps that flee the cursor */}
      {DECOYS.map((d, i) => (
        <div
          key={d.label}
          aria-hidden="true"
          className="flee-icon absolute z-10 flex select-none flex-col items-center gap-1"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: `translate(calc(-50% + ${offsets[i].x}px), calc(-50% + ${offsets[i].y}px))`,
          }}
        >
          <div className="app-tile grid h-16 w-16 place-items-center rounded-2xl text-2xl">
            {d.icon}
          </div>
          <span className="text-xs text-ink-soft/70">{d.label}</span>
        </div>
      ))}

      {/* the terminal — the only real app */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {/* circle + arrow highlight */}
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
        >
          <ellipse
            className="draw-circle"
            cx="150"
            cy="140"
            rx="86"
            ry="74"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(-8 150 140)"
          />
          <path
            className="bob-arrow"
            d="M250 250 C 220 235, 205 210, 210 192"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="bob-arrow"
            d="M210 192 l -12 10 M210 192 l 12 8"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="256"
            y="268"
            fill="var(--accent)"
            fontSize="16"
            fontFamily="var(--font-mono)"
          >
            click!
          </text>
        </svg>

        <button
          onClick={onOpen}
          onDoubleClick={onOpen}
          className="group relative flex flex-col items-center gap-2"
        >
          <span className="ping-ring" />
          <span className="term-icon relative grid h-24 w-24 place-items-center rounded-[1.4rem] text-3xl transition-transform duration-200 group-hover:scale-105">
            <span className="text-accent">{">_"}</span>
          </span>
          <span className="text-sm font-semibold text-ink">Terminal</span>
        </button>
      </div>

      {/* footer hint */}
      <p className="absolute inset-x-0 bottom-6 z-20 text-center text-xs text-muted">
        double-click Terminal to enter · the other icons run away 🏃 · or press
        Enter
      </p>
    </div>
  );
}
