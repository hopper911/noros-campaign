"use client";

export function ProductMock({
  compact = false,
  tone = "dark",
}: {
  compact?: boolean;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-4 md:p-5 ${
        light
          ? "border-black/15 bg-black text-neue"
          : "border-white/10 bg-zenit text-neue"
      } ${compact ? "!p-3" : ""}`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red/80" />
          <span className="h-2 w-2 rounded-full bg-warning/80" />
          <span className="h-2 w-2 rounded-full bg-green/80" />
          <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neue">
            Noros · AI Agent
          </span>
        </div>
        <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] text-mint">
          AWS · GCP · Azure
        </span>
      </div>

      <div className={`grid gap-3 ${compact ? "" : "md:grid-cols-[1.1fr_0.9fr]"}`}>
        <div className="space-y-2.5">
          <ChatBubble who="you">Why did AWS spend jump 18% this week?</ChatBubble>
          <ChatBubble who="noros">
            EC2 in us-east-1 drove +$42.6k. Top drivers: m6i.4xlarge fleet (+31%) and
            unattached EBS (+$8.2k).
          </ChatBubble>
          <ChatBubble who="you">Show me the chart and what to do.</ChatBubble>
          <ChatBubble who="noros">
            Chart ready. Recommend: rightsize 14 instances, reclaim idle volumes — est.
            $11.4k / mo.
          </ChatBubble>
        </div>

        {!compact && (
          <div className="rounded-xl border border-white/10 bg-black/50 p-3">
            <div className="flex items-center justify-between text-[11px] text-neue">
              <span>Weekly spend · AWS</span>
              <span className="text-red">+18%</span>
            </div>
            <MiniChart />
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
              <Stat label="EC2 delta" value="+$42.6k" tone="danger" />
              <Stat label="Savings est." value="$11.4k/mo" tone="success" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5">
        <span className="text-mint">✦</span>
        <span className="flex-1 text-xs text-neue/80">Ask Noros anything about cloud spend…</span>
        <span className="rounded-lg bg-mint px-2.5 py-1 text-[10px] font-medium text-black">
          Ask
        </span>
      </div>
    </div>
  );
}

function ChatBubble({
  who,
  children,
}: {
  who: "you" | "noros";
  children: React.ReactNode;
}) {
  const mine = who === "you";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[95%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
          mine
            ? "rounded-br-md bg-nebula/30 text-white"
            : "rounded-bl-md border border-white/10 bg-black/50 text-neue"
        }`}
      >
        {!mine && (
          <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-mint">
            Noros
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function MiniChart() {
  const bars = [38, 42, 40, 45, 44, 52, 61];
  return (
    <div className="mt-3 flex h-28 items-end gap-1.5">
      {bars.map((h, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-sm ${
              i === bars.length - 1 ? "bg-mint" : "bg-nebula/50"
            }`}
            style={{ height: `${h}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "danger" | "success";
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-zenit/80 px-2.5 py-2">
      <div className="text-neue/70">{label}</div>
      <div className={tone === "danger" ? "text-red" : "text-green"}>{value}</div>
    </div>
  );
}
