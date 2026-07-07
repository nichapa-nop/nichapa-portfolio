import Reveal from "./Reveal";
import TerminalWindow, { Prompt } from "./TerminalWindow";
import { profile } from "@/data/portfolio";

const facts: [string, string][] = [
  ["role", profile.role],
  ["experience", "1 year · production"],
  ["location", profile.location],
  ["focus", "Fullstack + AI"],
  ["status", "open to work"],
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12">
      <Reveal>
        <TerminalWindow title="visitor@nichapa: ~/about">
          <Prompt command="cat" flags="about.md" />
          <p className="mb-6 max-w-3xl text-ink-soft">{profile.about}</p>

          <Prompt command="whoami" flags="--stats" />
          <dl className="grid max-w-xl gap-x-6 gap-y-1 sm:grid-cols-[8rem_1fr]">
            {facts.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-amber">{k}</dt>
                <dd className="text-ink-soft">
                  <span className="text-muted">: </span>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
