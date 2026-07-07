const items = [
  "Next.js",
  "NestJS",
  "React Native",
  "TypeScript",
  "PostgreSQL",
  "Python",
  "Go",
  "Claude API",
  "Gemini API",
  "Pusher",
  "Tailwind CSS",
  "REST APIs",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-4 text-paper">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display mx-6 text-2xl font-light italic sm:text-3xl"
          >
            {t}
            <span className="mx-6 not-italic text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
