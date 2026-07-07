import Reveal from "./Reveal";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/-/g, "")}`,
    },
    {
      label: "LinkedIn",
      value: profile.linkedinLabel,
      href: profile.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-16 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <p
            className="mono text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--paper-2)" }}
          >
            ({"05"}) — Contact
          </p>
          <h2 className="mt-6 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-8xl">
            Let&apos;s build
            <br />
            <span className="italic">something.</span>
          </h2>
          <p
            className="mono mt-8 max-w-md text-sm"
            style={{ color: "var(--paper-2)" }}
          >
            {profile.availability}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-px border border-line/20 sm:grid-cols-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-col gap-2 p-6 transition-colors hover:bg-white/5"
              >
                <span
                  className="mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--paper-2)" }}
                >
                  {l.label}
                </span>
                <span className="font-display text-lg font-light">
                  {l.value}
                </span>
                <span className="mono mt-1 text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  →
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div
        className="mono flex flex-wrap items-center justify-between gap-2 border-t border-line/20 px-6 py-5 text-xs uppercase tracking-widest"
        style={{ color: "var(--paper-2)" }}
      >
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js · Set in Fraunces</span>
      </div>
    </section>
  );
}
