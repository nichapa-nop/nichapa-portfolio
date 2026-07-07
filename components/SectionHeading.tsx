import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 flex items-end justify-between gap-6 border-t-2 border-ink pt-4">
        <h2 className="font-display text-4xl font-light leading-none tracking-tight sm:text-6xl">
          {title}
        </h2>
        <span className="eyebrow shrink-0 pb-2">({index})</span>
      </div>
    </Reveal>
  );
}
