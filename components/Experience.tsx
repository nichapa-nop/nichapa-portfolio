import Reveal from "./Reveal";
import TerminalWindow, { Prompt } from "./TerminalWindow";
import { experience } from "@/data/portfolio";

// pseudo commit hashes for the git-log aesthetic
const hashes = ["a1f9c2e", "7b3d081", "e4c65aa"];

export default function Experience() {
  return (
    <section id="work" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12">
      <Reveal>
        <TerminalWindow title="visitor@nichapa: ~/work">
          <Prompt command="git log" flags="--stat --author=nichapa" />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <article key={exp.company} className="text-sm">
                <p className="flex flex-wrap items-center gap-x-2">
                  <span className="text-amber">commit {hashes[i]}</span>
                  {exp.current && (
                    <span className="text-green">(HEAD → main)</span>
                  )}
                </p>
                <p className="text-muted">
                  Date:{"   "}
                  {exp.period}
                </p>
                <p className="mt-2 text-ink">
                  <span className="text-accent">▸ </span>
                  {exp.role}
                  <span className="text-muted"> @ </span>
                  <span className="text-ink-soft">{exp.company}</span>
                </p>

                {exp.summary && (
                  <p className="mt-2 max-w-2xl pl-5 text-ink-soft">
                    {exp.summary}
                  </p>
                )}

                <ul className="mt-2 space-y-1 pl-5">
                  {exp.points.map((p) => (
                    <li key={p} className="max-w-2xl text-ink-soft">
                      <span className="text-green">+ </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 pl-5 text-xs text-muted">
                  {exp.stack.map((s, si) => (
                    <span key={s}>
                      {si > 0 && <span className="text-muted"> · </span>}
                      <span className="text-amber">{s}</span>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
