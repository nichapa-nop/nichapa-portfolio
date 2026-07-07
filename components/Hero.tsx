import InteractiveTerminal from "./InteractiveTerminal";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-10 pt-24 sm:pt-28">
      <InteractiveTerminal />
      <p className="mt-3 px-1 text-xs text-muted">
        ↑ interactive — type a command, or just scroll to read on ↓
      </p>
    </section>
  );
}
