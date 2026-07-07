import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionHeading index="04" title="Education" />

      <div className="border-t border-line">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.05}>
            <div className="grid gap-2 border-b border-line py-8 md:grid-cols-12 md:items-baseline">
              <p className="mono text-sm text-ink-soft md:col-span-3">
                {edu.year}
              </p>
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl font-light sm:text-3xl">
                  {edu.school}
                </h3>
                <p className="mono mt-1 text-sm uppercase tracking-widest text-muted">
                  {edu.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
