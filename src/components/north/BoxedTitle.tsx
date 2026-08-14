export function BoxedTitle({
  lines,
  size = "t1",
  align = "left",
  className = "",
}: {
  lines: string[];
  size?: "t1" | "t2" | "t5";
  align?: "left" | "split";
  className?: string;
}) {
  return (
    <h2 className={`flex flex-col ${className}`}>
      {lines.map((line, i) => (
        <span
          key={line}
          className={`${size} boxed-line ${
            align === "split" && i === lines.length - 1
              ? "self-start sm:self-end sm:text-right"
              : "self-start"
          }`}
        >
          {line}
        </span>
      ))}
    </h2>
  );
}

export function BoxedH1({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <h1 className={`flex flex-col items-center ${className}`}>
      {lines.map((line) => (
        <span key={line} className="t1 boxed-line max-w-full">
          {line}
        </span>
      ))}
    </h1>
  );
}
