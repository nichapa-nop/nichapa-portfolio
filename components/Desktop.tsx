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
  { icon: "🗂️", label: "Finder" },
  { icon: "🧭", label: "Safari" },
  { icon: "💬", label: "Messages" },
  { icon: "✉️", label: "Mail" },
  { icon: "🗺️", label: "Maps" },
  { icon: "🌸", label: "Photos" },
  { icon: "🎵", label: "Music" },
  { icon: "⚙️", label: "Settings" },
];

const R = 130;
const PUSH = 75;

function Folder() {
  return (
    <svg viewBox="0 0 64 50" className="w-14 drop-shadow-md" aria-hidden="true">
      <path
        d="M3 10h20l5 6h30a4 4 0 0 1 4 4v3H3z"
        fill="#3f8fd6"
      />
      <path
        d="M3 16h58a3 3 0 0 1 3 3v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V19a3 3 0 0 1 3-3z"
        fill="#5aa9e6"
      />
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

  // calendar grid for the current month
  const y = now.getFullYear();
  const m = now.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = now.getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const monthName = now
    .toLocaleDateString("en-US", { month: "long" })
    .toUpperCase();

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      className="mac-wall relative h-full w-full overflow-hidden text-white"
    >
      <div className="mac-sun" aria-hidden="true" />
      {/* mountains + horizon */}
      <svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 w-full"
        style={{ top: "38%", height: "26%" }}
        aria-hidden="true"
      >
        <polygon points="0,240 210,70 340,150 470,60 640,240" fill="#7fa6c4" opacity="0.7" />
        <polygon points="520,240 700,90 840,170 1000,80 1200,200 1200,240" fill="#6f9abb" opacity="0.7" />
        <polygon points="150,240 360,120 560,240" fill="#5c86aa" opacity="0.85" />
        <polygon points="620,240 860,120 1080,240" fill="#5c86aa" opacity="0.85" />
        {/* snow caps */}
        <polygon points="210,70 250,95 230,88 210,105 190,90" fill="#eaf4fb" opacity="0.9" />
        <polygon points="1000,80 1035,102 1015,96 1000,112 982,98" fill="#eaf4fb" opacity="0.9" />
      </svg>

      {/* ── menu bar ── */}
      <div className="mac-menubar absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-1 text-[13px]">
        <div className="flex items-center gap-4">
          <span></span>
          <span className="font-semibold">Finder</span>
          <span className="hidden gap-4 opacity-90 sm:flex">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <span>🔋</span>
          <span>📶</span>
          <span>🔍</span>
          <span className="tabular-nums">{clock}</span>
        </div>
      </div>

      {/* ── left widgets ── */}
      <div className="absolute left-4 top-12 z-10 hidden w-64 flex-col gap-4 sm:flex">
        <div className="flex gap-4">
          <div className="mac-widget flex-1 rounded-2xl p-3">
            <p className="text-[11px] font-semibold text-red-300">{monthName}</p>
            <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[10px] leading-none">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="text-white/60">
                  {d}
                </span>
              ))}
              {cells.map((c, i) => (
                <span
                  key={i}
                  className={
                    c === today
                      ? "mx-auto grid h-4 w-4 place-items-center rounded-full bg-red-500 font-semibold text-white"
                      : "text-white/90"
                  }
                >
                  {c ?? ""}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mac-widget rounded-2xl p-4">
          <p className="text-sm font-medium">Bangkok</p>
          <p className="text-4xl font-light leading-tight">29°</p>
          <p className="mt-1 text-sm">☁️ Mostly Cloudy</p>
          <p className="text-xs text-white/70">H:33° L:27°</p>
        </div>
      </div>

      {/* ── project folders (dodge) ── */}
      {FOLDERS.map((f, i) => (
        <div
          key={f.label}
          aria-hidden="true"
          className="flee-icon absolute z-10 flex w-24 select-none flex-col items-center gap-1"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            transform: `translate(calc(-50% + ${offsets[i].x}px), calc(-50% + ${offsets[i].y}px))`,
          }}
        >
          <Folder />
          <span className="text-center text-xs font-medium text-white drop-shadow">
            {f.label}
          </span>
        </div>
      ))}

      {/* hint */}
      <p className="absolute inset-x-0 top-1/2 z-10 -translate-y-24 text-center text-sm text-white/80 drop-shadow">
        the only app you need is down there ↓
      </p>

      {/* ── dock ── */}
      <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center">
        <div className="dock flex items-end gap-3 rounded-2xl px-3 py-2">
          {DOCK.map((a) => (
            <button
              key={a.label}
              title={a.label}
              className="dock-app grid h-12 w-12 cursor-pointer place-items-center rounded-xl text-2xl"
              onClick={() => openToast(a.label)}
            >
              {a.icon}
            </button>
          ))}

          <span className="mx-1 h-10 w-px self-center bg-white/30" />

          {/* Terminal — the star */}
          <div className="relative">
            <button
              onClick={onOpen}
              onDoubleClick={onOpen}
              title="Terminal"
              className="term-dock relative grid h-14 w-14 cursor-pointer place-items-center rounded-xl"
            >
              <span className="term-ring" />
              <span className="grid h-full w-full place-items-center rounded-xl bg-[#15120f] font-mono text-lg text-accent ring-1 ring-accent">
                {">_"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* footer hint */}
      <p className="absolute inset-x-0 bottom-24 z-10 text-center text-xs text-white/60">
        double-click Terminal · other icons run away 🏃 · or press Enter
      </p>

      {/* wrong-app popup */}
      {toast && (
        <div
          className="absolute inset-0 z-40 grid place-items-center bg-black/30"
          onClick={closeToast}
        >
          <div
            className="mac-alert w-72 rounded-2xl p-5 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl">🚫</div>
            <p className="mt-2 font-semibold text-white">Wrong app</p>
            <p className="mt-1 text-sm text-white/70">
              “{toast}” isn’t available here. The only app you need is{" "}
              <span className="font-semibold text-accent">Terminal</span>.
            </p>
            <button
              onClick={closeToast}
              className="mt-4 w-full rounded-lg bg-accent py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
