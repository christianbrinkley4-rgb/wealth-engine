const COLORS = ["#0f1f22", "#2b46f0", "#ff6a45", "#ffffff", "#c8f73c"];

/** A short burst when a quiz result lands. Decoration only, and off for reduced motion. */
export function Confetti() {
  return (
    <span className="w-confetti" aria-hidden>
      {Array.from({ length: 18 }, (_, index) => (
        <i
          key={index}
          style={{
            left: `${(index * 53) % 100}%`,
            background: COLORS[index % COLORS.length],
            animationDelay: `${(index % 6) * 0.08}s`,
            rotate: `${index * 37}deg`,
          }}
        />
      ))}
    </span>
  );
}
