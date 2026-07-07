"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function Dots({
  onMinimize,
  onGreen,
  greenGlyph,
}: {
  onMinimize: () => void;
  onGreen: () => void;
  greenGlyph: string;
}) {
  return (
    <div className="group/dots flex items-center gap-2">
      {/* red — disabled */}
      <span
        className="term-dot grid place-items-center text-[8px] leading-none text-black/55"
        style={{ background: "var(--accent)" }}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      />
      {/* yellow — minimize */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        aria-label="Minimize"
        title="Minimize"
        className="term-dot grid cursor-pointer place-items-center text-[9px] leading-none text-black/55"
        style={{ background: "var(--amber)" }}
      >
        <span className="opacity-0 transition-opacity group-hover/dots:opacity-100">
          −
        </span>
      </button>
      {/* green — fullscreen */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onGreen();
        }}
        aria-label="Toggle fullscreen"
        title="Fullscreen"
        className="term-dot grid cursor-pointer place-items-center text-[8px] leading-none text-black/55"
        style={{ background: "var(--green)" }}
      >
        <span className="opacity-0 transition-opacity group-hover/dots:opacity-100">
          {greenGlyph}
        </span>
      </button>
    </div>
  );
}

export default function TerminalWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock scroll + close on Esc while fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  return (
    <>
      <div className={`term ${className ?? ""}`}>
        <div
          className="term-bar cursor-pointer select-none"
          onClick={() => setMinimized((m) => !m)}
          title={minimized ? "Click to expand" : "Click to minimize"}
        >
          <Dots
            onMinimize={() => setMinimized((m) => !m)}
            onGreen={() => setFullscreen(true)}
            greenGlyph="⤢"
          />
          <span className="term-title">{title}</span>
          <span className="mono ml-auto text-xs text-muted">
            {minimized ? "— minimized · click to open" : ""}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {!minimized && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease }}
              className="overflow-hidden"
            >
              <div className="term-body">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* fullscreen reader — portalled to <body> so `fixed` is viewport-based */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {fullscreen && (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setFullscreen(false)}
              >
                <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  aria-hidden="true"
                />
                <motion.div
                  className="term relative flex max-h-full w-full max-w-4xl flex-col"
                  initial={{ scale: 0.96, y: 8 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.96, y: 8 }}
                  transition={{ duration: 0.24, ease }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="term-bar shrink-0">
                    <Dots
                      onMinimize={() => {
                        setFullscreen(false);
                        setMinimized(true);
                      }}
                      onGreen={() => setFullscreen(false)}
                      greenGlyph="⤡"
                    />
                    <span className="term-title">{title}</span>
                    <span className="mono ml-auto text-xs text-muted">
                      esc to close
                    </span>
                  </div>
                  <div className="term-body overflow-y-auto">{children}</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

/** A `➜ user@nichapa ~ command` prompt line. */
export function Prompt({
  command,
  flags,
}: {
  command: string;
  flags?: string;
}) {
  return (
    <p className="mb-3">
      <span className="prompt">visitor@nichapa</span>
      <span className="comment"> ~ </span>
      <span className="cmd">{command}</span>
      {flags && <span className="flag"> {flags}</span>}
    </p>
  );
}
