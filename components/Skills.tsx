import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionHeading index="03" title="Skills" />

      <dl className="border-t border-line">
        {groups.map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.05}>
            <div className="grid items-baseline gap-4 border-b border-line py-6 md:grid-cols-12">
              <dt className="mono text-sm uppercase tracking-widest text-accent-ink md:col-span-3">
                {group}
              </dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-9">
                {items.map((item) => (
                  <span
                    key={item}
                    className="font-display text-xl font-light sm:text-2xl"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
