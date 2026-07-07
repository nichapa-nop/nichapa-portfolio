"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setI((v) => (v + 1) % profile.roles.length),
      2400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pt-36">
      {/* Masthead meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mono flex flex-wrap items-center justify-between gap-3 border-y border-ink py-2 text-[0.7rem] uppercase tracking-widest text-ink-soft"
      >
        <span>Portfolio — {new Date().getFullYear()}</span>
        <span>{profile.location}</span>
        <span className="hidden sm:inline">Est. 1 yr in production</span>
      </motion.div>

      {/* Giant name */}
      <div className="pt-10 sm:pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-[15vw] font-light leading-[0.86] tracking-[-0.02em] sm:text-[11rem]"
        >
          Nichapa
          <br />
          <span className="italic">Nopparat</span>
          <span className="text-accent">.</span>
        </motion.h1>
      </div>

      {/* Role + intro row */}
      <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="md:col-span-5"
        >
          <p className="eyebrow">Currently</p>
          <p className="mt-2 font-display text-3xl font-light sm:text-4xl">
            {profile.role}
          </p>
          <p className="mono mt-3 text-sm text-ink-soft">
            <span className="text-accent">↳</span> also into{" "}
            <span key={i} className="inline-block font-semibold text-ink">
              {profile.roles[i]}
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="md:col-span-6 md:col-start-7"
        >
          <p className="text-lg leading-relaxed text-ink-soft">
            {profile.tagline} I work end-to-end — from React Native mobile apps
            to NestJS APIs and Next.js web — and I&apos;m building toward the AI
            engineering space.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#work"
              className="mono link-underline text-sm uppercase tracking-widest"
            >
              See the work
            </a>
            <a
              href="#contact"
              className="mono link-underline text-sm uppercase tracking-widest text-accent"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
