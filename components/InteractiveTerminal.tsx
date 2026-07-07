"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { profile, experience, skills, education } from "@/data/portfolio";

const BANNER = String.raw`
 _   _ ___ ____ _   _    _    ____   _
| \ | |_ _/ ___| | | |  / \  |  _ \ / \
|  \| || | |   | |_| | / _ \ | |_) / _ \
| |\  || | |___|  _  |/ ___ \|  __/ ___ \
|_| \_|___\____|_| |_/_/   \_\_| /_/   \_\
`;

const FILES = [
  "about.md",
  "skills.json",
  "work.log",
  "education.log",
  "contact.sh",
];

const COMMANDS = [
  "help",
  "about",
  "whoami",
  "work",
  "skills",
  "education",
  "contact",
  "social",
  "resume",
  "ls",
  "cat",
  "banner",
  "clear",
  "date",
  "pwd",
  "echo",
  "sudo",
  "hire",
];

type Entry = { cmd: string; out: ReactNode };

const Line = ({
  children,
  c,
}: {
  children: ReactNode;
  c?: string;
}) => <p className={c}>{children}</p>;

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [pastIdx, setPastIdx] = useState(-1);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // welcome banner on mount
  useEffect(() => {
    setHistory([
      {
        cmd: "",
        out: (
          <div>
            <pre
              aria-label={profile.name}
              className="overflow-x-auto text-accent"
              style={{
                fontSize: "clamp(0.4rem, 1.9vw, 0.9rem)",
                lineHeight: 1.05,
              }}
            >
              {BANNER}
            </pre>
            <Line c="mt-3 text-ink-soft">
              {profile.role} · {profile.location} ·{" "}
              <span className="text-green">available for work</span>
            </Line>
            <Line c="mt-2 text-muted">
              Welcome to my interactive portfolio. Type{" "}
              <span className="text-accent">help</span> and hit Enter to explore.
            </Line>
          </div>
        ),
      },
    ]);
  }, []);

  // keep scrolled to bottom
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  function run(raw: string): ReactNode | "CLEAR" {
    const line = raw.trim();
    if (!line) return null;
    const [cmd, ...args] = line.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        return (
          <div className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[9rem_1fr]">
            {[
              ["about", "who I am"],
              ["work", "experience — git log"],
              ["skills", "my tech stack"],
              ["education", "where I studied"],
              ["contact", "how to reach me"],
              ["social", "github / linkedin"],
              ["resume", "get my CV"],
              ["ls", "list files"],
              ["cat <file>", "print a file"],
              ["clear", "clear the screen"],
            ].map(([c, d]) => (
              <div key={c} className="contents">
                <span className="text-accent">{c}</span>
                <span className="text-muted">{d}</span>
              </div>
            ))}
            <p className="col-span-full mt-2 text-muted">
              tip: ↑/↓ history · Tab autocomplete
            </p>
          </div>
        );

      case "about":
        return <Line c="max-w-2xl text-ink-soft">{profile.about}</Line>;

      case "whoami":
        return (
          <Line c="text-ink-soft">
            <span className="text-ink">{profile.name}</span> — {profile.role}.
            also into {profile.roles.slice(1).join(", ")}.
          </Line>
        );

      case "work":
      case "experience":
        return (
          <div className="space-y-3">
            {experience.map((e) => (
              <div key={e.company}>
                <p>
                  <span className="text-accent">▸ </span>
                  <span className="text-ink">{e.role}</span>
                  <span className="text-muted"> @ </span>
                  <span className="text-ink-soft">{e.company}</span>
                  <span className="text-amber"> ({e.period})</span>
                </p>
                {e.summary && (
                  <p className="max-w-2xl pl-5 text-muted">{e.summary}</p>
                )}
              </div>
            ))}
            <p className="text-muted">
              → scroll down or run{" "}
              <span className="text-accent">cat work.log</span> for full details
            </p>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-1">
            {Object.entries(skills).map(([group, items]) => (
              <p key={group}>
                <span className="text-amber">{group}</span>
                <span className="text-muted">: </span>
                <span className="text-ink-soft">{items.join(", ")}</span>
              </p>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-1">
            {education.map((e) => (
              <p key={e.school}>
                <span className="text-amber">{e.year}</span>{" "}
                <span className="text-ink">{e.school}</span>
                <span className="text-muted"> — {e.detail}</span>
              </p>
            ))}
          </div>
        );

      case "contact":
        return (
          <div className="space-y-1">
            <Line c="text-green">✓ {profile.availability}</Line>
            {[
              ["email", profile.email, `mailto:${profile.email}`, false],
              [
                "phone",
                profile.phone,
                `tel:${profile.phone.replace(/-/g, "")}`,
                false,
              ],
              ["linkedin", profile.linkedinLabel, profile.linkedin, true],
              ["github", profile.githubLabel, profile.github, true],
              ["resume", "view my CV", profile.resume, true],
            ].map(([k, v, href, ext]) => (
              <p key={k as string}>
                <span className="inline-block w-20 text-amber">{k}</span>
                <span className="text-muted">→ </span>
                <a
                  href={href as string}
                  target={ext ? "_blank" : undefined}
                  rel="noreferrer"
                  className="link-underline text-ink hover:text-accent"
                >
                  {v}
                </a>
              </p>
            ))}
          </div>
        );

      case "social":
        return (
          <div className="space-y-1">
            <p>
              <span className="inline-block w-20 text-amber">github</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-ink hover:text-accent"
              >
                {profile.githubLabel}
              </a>
            </p>
            <p>
              <span className="inline-block w-20 text-amber">linkedin</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-ink hover:text-accent"
              >
                {profile.linkedinLabel}
              </a>
            </p>
          </div>
        );

      case "resume":
      case "cv":
        return (
          <Line c="text-ink-soft">
            📄 opening resume →{" "}
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-accent"
            >
              {profile.resume.replace(/^https?:\/\//, "")}
            </a>
          </Line>
        );

      case "ls":
        return (
          <div className="flex flex-wrap gap-x-6">
            {FILES.map((f) => (
              <span key={f} className="text-ink-soft">
                {f}
              </span>
            ))}
          </div>
        );

      case "cat": {
        if (!arg) return <Line c="text-amber">usage: cat &lt;file&gt;</Line>;
        const map: Record<string, string> = {
          "about.md": "about",
          "skills.json": "skills",
          "work.log": "work",
          "education.log": "education",
          "contact.sh": "contact",
        };
        const target = map[arg];
        if (!target)
          return (
            <Line c="text-accent">
              cat: {arg}: No such file. try{" "}
              <span className="text-amber">ls</span>
            </Line>
          );
        return run(target);
      }

      case "banner":
        return (
          <pre
            className="overflow-x-auto text-accent"
            style={{ fontSize: "clamp(0.4rem, 1.9vw, 0.9rem)", lineHeight: 1.05 }}
          >
            {BANNER}
          </pre>
        );

      case "date":
        return <Line c="text-ink-soft">{new Date().toString()}</Line>;

      case "pwd":
        return <Line c="text-ink-soft">/home/nichapa/portfolio</Line>;

      case "echo":
        return <Line c="text-ink-soft">{arg || ""}</Line>;

      case "sudo":
        return (
          <Line c="text-accent">
            🔒 nice try — this incident will be reported 😏
          </Line>
        );

      case "hire":
        return (
          <Line c="text-green">
            ✓ excellent choice! →{" "}
            <a
              href={`mailto:${profile.email}`}
              className="link-underline text-accent"
            >
              {profile.email}
            </a>
          </Line>
        );

      case "clear":
        return "CLEAR";

      default:
        return (
          <Line c="text-accent">
            command not found: {cmd} — type{" "}
            <span className="text-amber">help</span>
          </Line>
        );
    }
  }

  function submit(raw: string) {
    const out = run(raw);
    if (out === "CLEAR") {
      setHistory([]);
    } else if (raw.trim()) {
      setHistory((h) => [...h, { cmd: raw, out }]);
    }
    if (raw.trim()) {
      setPast((p) => [...p, raw]);
      setPastIdx(-1);
    }
    setInput("");
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!past.length) return;
      const idx = pastIdx < 0 ? past.length - 1 : Math.max(0, pastIdx - 1);
      setPastIdx(idx);
      setInput(past[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (pastIdx < 0) return;
      const idx = pastIdx + 1;
      if (idx >= past.length) {
        setPastIdx(-1);
        setInput("");
      } else {
        setPastIdx(idx);
        setInput(past[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  }

  const chips = ["help", "about", "work", "skills", "contact"];

  return (
    <div
      className="term cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="term-bar">
        <span className="term-dot" style={{ background: "var(--accent)" }} />
        <span className="term-dot" style={{ background: "var(--amber)" }} />
        <span className="term-dot" style={{ background: "var(--green)" }} />
        <span className="term-title">
          visitor@nichapa: ~/portfolio — zsh — interactive
        </span>
      </div>

      <div
        ref={bodyRef}
        className="term-body max-h-[62vh] min-h-[420px] overflow-y-auto"
      >
        {history.map((e, i) => (
          <div key={i} className="mb-3">
            {e.cmd !== "" && (
              <p className="mb-1">
                <span className="prompt">visitor@nichapa</span>
                <span className="comment"> ~ </span>
                <span className="text-ink">{e.cmd}</span>
              </p>
            )}
            <div>{e.out}</div>
          </div>
        ))}

        {/* live input line */}
        <div className="flex items-center">
          <span className="prompt shrink-0">visitor@nichapa</span>
          <span className="comment shrink-0"> ~ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="terminal input"
            className="caret-accent flex-1 bg-transparent text-ink outline-none"
          />
        </div>
      </div>

      {/* tap-to-run chips (mobile-friendly) */}
      <div className="flex flex-wrap gap-2 border-t border-line bg-paper-3 px-4 py-2.5">
        <span className="text-xs text-muted">try:</span>
        {chips.map((c) => (
          <button
            key={c}
            onClick={(e) => {
              e.stopPropagation();
              submit(c);
              inputRef.current?.focus();
            }}
            className="text-xs text-ink-soft transition-colors hover:text-accent"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
