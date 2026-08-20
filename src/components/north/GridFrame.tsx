import { Cross } from "@/components/north/SpriteIcons";

type Ink = "black" | "mint" | "neue";

export function GridFrame({
  children,
  className = "",
  borders = "tr",
  ink = "black",
  strength = 20,
}: {
  children: React.ReactNode;
  className?: string;
  borders?: string;
  ink?: Ink;
  strength?: number;
}) {
  const color =
    ink === "mint" ? "var(--mint)" : ink === "neue" ? "var(--neue)" : "var(--black)";
  const showL = borders.includes("l");
  const showR = borders.includes("r");
  const showB = borders.includes("b");
  // Top borders intentionally ignored — they read as grey hairlines on photo heroes.

  return (
    <div
      className={`container-content relative h-full ${className}`}
      style={
        {
          "--bc-border-default": `color-mix(in srgb, ${color} ${strength}%, transparent)`,
          "--bc-icon-default": color,
        } as React.CSSProperties
      }
    >
      {showB && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px border-b border-dotted border-[color:var(--bc-border,var(--bc-border-default))]" />
      )}
      {showR && (
        <span className="pointer-events-none absolute inset-y-0 right-0 w-px border-r border-dotted border-[color:var(--bc-border,var(--bc-border-default))]" />
      )}
      {showL && (
        <span className="pointer-events-none absolute inset-y-0 left-0 w-px border-l border-dotted border-[color:var(--bc-border,var(--bc-border-default))]" />
      )}
      {!showL && (
        <span className="fake-left pointer-events-none absolute inset-y-0 left-0 w-px bg-[color:var(--bc-border,var(--bc-border-default))]" />
      )}
      {showB && showL && (
        <Cross className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2 -rotate-90" />
      )}
      {showB && !showL && (
        <Cross className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2 -rotate-90" />
      )}
      {showB && showR && (
        <Cross className="right-0 bottom-0 translate-x-1/2 translate-y-1/2 rotate-180" />
      )}
      {children}
    </div>
  );
}
