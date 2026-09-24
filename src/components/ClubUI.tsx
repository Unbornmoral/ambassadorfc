import { cn } from "@/lib/utils";

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-4 flex items-end gap-4">
      <div>
        <p className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-primary">
          {kicker}
        </p>
        <h3 className="mt-1 font-display text-3xl text-foreground">{title}</h3>
      </div>
      <span className="mb-2 h-0.5 flex-1 bg-foreground/80" />
    </div>
  );
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** Shirt-style squad number with player initials avatar. */
export function SquadNumber({
  number,
  name,
  size = "md",
  className,
}: {
  number: number;
  name: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const big = size === "lg";
  return (
    <div className={cn("relative shrink-0", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-secondary font-condensed font-bold text-secondary-foreground ring-2 ring-card",
          big ? "size-14 text-lg" : "size-11 text-sm",
        )}
      >
        {initials(name)}
      </div>
      <span
        className={cn(
          "absolute -bottom-1 -right-1 flex items-center justify-center rounded-md bg-pitch font-display text-pitch-foreground ring-2 ring-card",
          big ? "h-7 min-w-7 px-1 text-base" : "h-6 min-w-6 px-1 text-sm",
        )}
      >
        {number}
      </span>
    </div>
  );
}

export const POSITION_ORDER = ["Goalkeeper", "Defender", "Midfielder", "Forward"] as const;
export const POSITION_PLURAL: Record<(typeof POSITION_ORDER)[number], string> = {
  Goalkeeper: "Goalkeepers",
  Defender: "Defenders",
  Midfielder: "Midfielders",
  Forward: "Forwards",
};
