import Reveal from "./Reveal";
import TerminalWindow, { Prompt } from "./TerminalWindow";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-12">
      <Reveal>
        <TerminalWindow title="visitor@nichapa: ~/skills">
          <Prompt command="cat" flags="skills.json" />

          <pre className="overflow-x-auto text-sm leading-relaxed">
            <span className="text-muted">{"{"}</span>
            {groups.map(([group, items], gi) => (
              <span key={group}>
                {"\n  "}
                <span className="text-accent">&quot;{group}&quot;</span>
                <span className="text-muted">: [</span>
                {"\n"}
                {items.map((item, ii) => (
                  <span key={item}>
                    {"    "}
                    <span className="text-ink">&quot;{item}&quot;</span>
                    {ii < items.length - 1 && (
                      <span className="text-muted">,</span>
                    )}
                    {"\n"}
                  </span>
                ))}
                <span className="text-muted">
                  {"  ]"}
                  {gi < groups.length - 1 ? "," : ""}
                </span>
              </span>
            ))}
            {"\n"}
            <span className="text-muted">{"}"}</span>
          </pre>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
