"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/portfolio";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 120);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = setInterval(tick, 1000 * 30);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper-3/95 backdrop-blur transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 text-xs">
        <a href="#" className="flex items-center gap-2">
          <span className="text-accent">➜</span>
          <span className="text-green">~/nichapa</span>
          <span className="hidden text-muted sm:inline">(main)</span>
        </a>

        <ul className="hidden items-center gap-5 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-ink-soft transition-colors hover:text-ink"
              >
                ./{l.label.toLowerCase()}
              </a>
            </li>
          ))}
          <li className="text-muted">[{clock}]</li>
        </ul>

        <button
          className="text-ink-soft md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "[x] close" : "[≡] menu"}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-line bg-paper-2 px-4 py-1 text-xs md:hidden">
          {navLinks.map((l) => (
            <li key={l.href} className="border-b border-line last:border-0">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-ink-soft"
              >
                <span className="text-accent">➜</span> ./{l.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
