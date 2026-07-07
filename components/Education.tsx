import Reveal from "./Reveal";
import TerminalWindow, { Prompt } from "./TerminalWindow";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12">
      <Reveal>
        <TerminalWindow title="visitor@nichapa: ~/education">
          <Prompt command="ls -l" flags="education/" />

          <div className="space-y-4 text-sm">
            {education.map((edu) => (
              <div key={edu.school}>
                <p>
                  <span className="text-muted">drwxr-xr-x </span>
                  <span className="text-amber">{edu.year}</span>
                  <span className="text-muted"> {"  "}</span>
                  <span className="text-ink">{edu.school}</span>
                </p>
                <p className="pl-4 text-ink-soft">
                  <span className="text-accent">└─ </span>
                  {edu.detail}
                </p>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
