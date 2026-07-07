import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionHeading index="02" title="Work" />

      <div className="border-t border-line">
        {experience.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.05}>
            <article className="group grid gap-6 border-b border-line py-10 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="mono flex items-center gap-2 text-sm text-ink-soft">
                  {exp.current && (
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  )}
                  {exp.period}
                </p>
              </div>

              <div className="md:col-span-9">
                <h3 className="font-display text-3xl font-light leading-tight">
                  {exp.role}
                </h3>
                <p className="mono mt-1 text-sm uppercase tracking-widest text-accent-ink">
                  {exp.company}
                </p>

                {exp.summary && (
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                    {exp.summary}
                  </p>
                )}

                <ul className="mt-4 max-w-2xl space-y-2">
                  {exp.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1 select-none text-accent">—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="mono text-xs uppercase tracking-wider text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
