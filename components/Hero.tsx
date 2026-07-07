"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import TerminalWindow, { Prompt } from "./TerminalWindow";

const BANNER = String.raw`
 _   _ ___ ____ _   _    _    ____   _
| \ | |_ _/ ___| | | |  / \  |  _ \ / \
|  \| || | |   | |_| | / _ \ | |_) / _ \
| |\  || | |___|  _  |/ ___ \|  __/ ___ \
|_| \_|___\____|_| |_/_/   \_\_| /_/   \_\
`;

const ease = [0.22, 1, 0.36, 1] as const;

const boot = [
  { t: "booting nichapa.dev …", c: "muted" },
  { t: "[ ok ] loaded profile", c: "green" },
  { t: "[ ok ] 1 year in production", c: "green" },
  { t: "[ ok ] ready for new roles", c: "green" },
];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % profile.roles.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 pt-24 sm:pt-28">
      <TerminalWindow title="visitor@nichapa: ~/portfolio — zsh — 80×24">
        {/* boot log */}
        <div className="mb-6 space-y-0.5 text-sm">
          {boot.map((line, idx) => (
            <motion.p
              key={line.t}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 + idx * 0.35 }}
              className={
                line.c === "green" ? "text-green" : "text-muted"
              }
            >
              {line.c === "green" && <span className="text-green">✓ </span>}
              {line.t}
            </motion.p>
          ))}
        </div>

        {/* ASCII banner */}
        <motion.pre
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease }}
          aria-label={profile.name}
          className="overflow-x-auto text-accent"
          style={{ fontSize: "clamp(0.4rem, 1.9vw, 0.95rem)", lineHeight: 1.05 }}
        >
          {BANNER}
        </motion.pre>

        {/* who am i */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="mt-6"
        >
          <Prompt command="whoami" />
          <p className="mb-6 text-ink-soft">
            <span className="text-ink">{profile.name}</span> — {profile.role},
            also into{" "}
            <span className="text-accent">{profile.roles[i]}</span>
            <span className="cursor" />
          </p>

          <Prompt command="cat" flags="intro.txt" />
          <p className="max-w-2xl text-ink-soft">{profile.tagline}</p>
          <p className="mt-2 max-w-2xl text-ink-soft">
            I work end-to-end — from React Native mobile apps to NestJS APIs and
            Next.js web — and I&apos;m building toward the{" "}
            <span className="text-amber">AI engineering</span> space.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <a href="#work" className="link-underline text-accent">
              → run ./work
            </a>
            <a href="#contact" className="link-underline text-ink-soft">
              → ./contact --hire
            </a>
          </div>
        </motion.div>
      </TerminalWindow>
    </section>
  );
}
