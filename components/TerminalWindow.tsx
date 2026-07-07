import type { ReactNode } from "react";

export default function TerminalWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`term ${className ?? ""}`}>
      <div className="term-bar">
        <span className="term-dot" style={{ background: "var(--accent)" }} />
        <span className="term-dot" style={{ background: "var(--amber)" }} />
        <span className="term-dot" style={{ background: "var(--green)" }} />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
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
