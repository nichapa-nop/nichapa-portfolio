import Reveal from "./Reveal";
import TerminalWindow, { Prompt } from "./TerminalWindow";
import { profile } from "@/data/portfolio";

export default function Contact() {
  const links = [
    { key: "email", value: profile.email, href: `mailto:${profile.email}` },
    {
      key: "phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/-/g, "")}`,
    },
    {
      key: "linkedin",
      value: profile.linkedinLabel,
      href: profile.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12">
      <Reveal>
        <TerminalWindow title="visitor@nichapa: ~/contact">
          <Prompt command="./contact.sh" flags="--hire" />

          <p className="mb-1 text-green">
            ✓ available — {profile.availability}
          </p>
          <p className="mb-6 text-muted"># reach me on any channel below</p>

          <div className="max-w-2xl space-y-1 text-sm">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-wrap items-baseline gap-x-2 py-1"
              >
                <span className="w-24 shrink-0 text-amber">{l.key}</span>
                <span className="text-muted">→</span>
                <span className="link-underline text-ink group-hover:text-accent">
                  {l.value}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <Prompt command="echo" flags='"let’s build something."' />
            <p className="text-2xl text-accent sm:text-4xl">
              let&apos;s build something.
              <span className="cursor" />
            </p>
          </div>

          <p className="mt-10 border-t border-line pt-4 text-xs text-muted">
            © {new Date().getFullYear()} {profile.name} — built with Next.js ·
            no templates, hand-coded
          </p>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
