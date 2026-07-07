import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { profile } from "@/data/portfolio";

const facts = [
  ["Experience", "1 year, in production"],
  ["Base", profile.location],
  ["Focus", "Fullstack + AI"],
  ["Status", "Open to work"],
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <SectionHeading index="01" title="About" />

      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="font-display text-2xl font-light leading-snug sm:text-[2rem] sm:leading-[1.3]">
            {profile.about}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-4 md:col-start-9">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between py-3">
                <dt className="eyebrow">{k}</dt>
                <dd className="mono text-right text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
