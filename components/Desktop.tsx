"use client";

import { useEffect, useRef, useState } from "react";

/* desktop project folders — dodge the cursor */
const FOLDERS = [
  { label: "mutech", x: 60, y: 24 },
  { label: "ai-cs", x: 74, y: 22 },
  { label: "aom-project", x: 88, y: 24 },
  { label: "social-copilot", x: 88, y: 48 },
  { label: "new_project_ideas", x: 73, y: 50 },
];

const DOCK = [
  { g: "⌗", label: "Finder" },
  { g: "◎", label: "Safari" },
  { g: "✉", label: "Mail" },
  { g: "✎", label: "Notes" },
  { g: "♪", label: "Music" },
  { g: "❐", label: "Files" },
  { g: "⚙", label: "Settings" },
];

const R = 130;
const PUSH = 75;

function Folder() {
  return (
    <svg
      viewBox="0 0 48 40"
      className="w-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9h13l4 5h22a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export default function Desktop({ onOpen }: { onOpen: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState(FOLDERS.map(() => ({ x: 0, y: 0 })));
  const [now, setNow] = useState(new Date());
  const [toast, setToast] = useState<string | null>(null);
  const toastRef = useRef<string | null>(null);

  const openToast = (label: string) => {
    toastRef.current = label;
    setToast(label);
  };
  const closeToast = () => {
    toastRef.current = null;
    setToast(null);
  };

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 20);
    const onKey = (e: WindowEventMap["keydown"]) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        if (toastRef.current) closeToast();
        else onOpen();
      }
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
    setOffsets(
      FOLDERS.map((d) => {
        const cx = rect.left + (d.x / 100) * rect.width;
        const cy = rect.top + (d.y / 100) * rect.height;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist > R) return { x: 0, y: 0 };
        const force = ((R - dist) / R) * PUSH;
        return { x: (dx / dist) * force, y: (dy / dist) * force };
      }),
    );
  }

  const clock =
    now.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }) +
    "  " +
    now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      className="os-desk relative h-full w-full overflow-hidden font-mono text-ink"
    >
      {/* faint watermark */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="select-none text-[28vw] font-bold leading-none text-accent opacity-[0.045]">
          {">_"}
        </span>
      </div>

      {/* ── menu bar ── */}
      <div className="os-menubar absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-1.5 text-xs text-ink-soft">
        <div className="flex items-center gap-4">
          <span className="text-accent">➜</span>
          <span className="font-semibold text-ink">nichapa.os</span>
          <span className="hidden gap-4 text-muted sm:flex">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
          </span>
        </div>
        <span className="tabular-nums text-green">{clock}</span>
      </div>

      {/* ── project folders (dodge) ── */}
      {FOLDERS.map((f, i) => (
        <div
          key={f.label}
          aria-hidden="true"
          className="flee-icon absolute z-10 flex w-24 select-none flex-col items-center gap-1.5 text-muted"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: `translate(calc(-50% + ${offsets[i].x}px), calc(-50% + ${offsets[i].y}px))`,
          }}
        >
          <Folder />
          <span className="text-center text-xs text-ink-soft">{f.label}</span>
        </div>
      ))}

      {/* hint */}
      <p className="absolute inset-x-0 top-1/2 z-10 -translate-y-24 text-center text-sm text-muted">
        the only app you need is down there ↓
      </p>

      {/* ── dock ── */}
      <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center">
        <div className="os-dock flex items-end gap-2.5 rounded-2xl px-3 py-2">
          {DOCK.map((a) => (
            <button
              key={a.label}
              title={a.label}
              onClick={() => openToast(a.label)}
              className="dock-app grid h-12 w-12 cursor-pointer place-items-center rounded-xl border border-line bg-paper-2 text-lg text-ink-soft"
            >
              {a.g}
            </button>
          ))}

          <span className="mx-1 h-9 w-px self-center bg-line" />

          {/* Terminal — the star */}
          <button
            onClick={onOpen}
            onDoubleClick={onOpen}
            title="Terminal"
            className="term-dock relative grid h-14 w-14 cursor-pointer place-items-center rounded-xl"
          >
            <span className="term-ring" />
            <span className="grid h-full w-full place-items-center rounded-xl bg-[#0e0b09] text-lg text-accent ring-1 ring-accent">
              {">_"}
            </span>
          </button>
        </div>
      </div>

      {/* footer hint */}
      <p className="absolute inset-x-0 bottom-24 z-10 text-center text-xs text-muted">
        double-click Terminal · other icons run away 🏃 · or press Enter
      </p>

      {/* wrong-app popup */}
      {toast && (
        <div
          className="absolute inset-0 z-40 grid place-items-center bg-black/40"
          onClick={closeToast}
        >
          <div
            className="os-alert w-72 rounded-2xl p-5 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl text-accent">✗</div>
            <p className="mt-2 font-semibold text-ink">wrong app</p>
            <p className="mt-1 text-sm text-ink-soft">
              “{toast}” isn’t available here. The only app you need is{" "}
              <span className="font-semibold text-accent">Terminal</span>.
            </p>
            <button
              onClick={closeToast}
              className="mt-4 w-full rounded-lg bg-accent py-1.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
