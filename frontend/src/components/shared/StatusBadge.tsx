type Status = "UP" | "DOWN" | "DEGRADED" | "PAUSED";

const config: Record<Status, { label: string; className: string }> = {
  UP: { label: "UP", className: "bg-green-500/10 text-green-400 border-green-500/20" },
  DOWN: { label: "DOWN", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  DEGRADED: { label: "DEGRADED", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  PAUSED: { label: "PAUSED", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
};

export function StatusBadge({ status }: { status: Status }) {
  const { label, className } = config[status];
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}