import type { Position } from "@/lib/types";
import { POSITION_SHORT } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PositionBadge({ position, className }: { position: Position; className?: string }) {
  const tone: Record<Position, string> = {
    Goalkeeper: "bg-warning/15 text-warning-foreground border-warning/40",
    Defender: "bg-primary/10 text-primary border-primary/30",
    Midfielder: "bg-success/15 text-primary border-success/40",
    Forward: "bg-destructive/10 text-destructive border-destructive/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        tone[position],
        className,
      )}
    >
      {POSITION_SHORT[position]}
    </span>
  );
}

export function CountPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "present" | "late" | "absent" | "unmarked";
}) {
  const tones = {
    present: "bg-success/15 text-primary border-success/40",
    late: "bg-warning/20 text-warning-foreground border-warning/50",
    absent: "bg-destructive/10 text-destructive border-destructive/30",
    unmarked: "bg-muted text-muted-foreground border-border",
  } as const;
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center rounded-lg border px-2 py-2 text-center",
        tones[tone],
      )}
    >
      <span className="text-lg font-bold leading-none">{value}</span>
      <span className="mt-1 text-[11px] font-medium uppercase tracking-wide">{label}</span>
    </div>
  );
}
