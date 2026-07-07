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
    <div className="mx-auto max-w-5xl overflow-hidden border-y border-line bg-paper-2 py-2 text-sm">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="mx-4 text-ink-soft">
            <span className="text-green">$</span> {t}
            <span className="ml-4 text-accent">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
