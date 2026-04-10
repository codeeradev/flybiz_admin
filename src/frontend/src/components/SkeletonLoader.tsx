interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-muted rounded-md ${className}`}
      style={{
        background:
          "linear-gradient(90deg, oklch(var(--muted)) 25%, oklch(var(--border)) 50%, oklch(var(--muted)) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Skeleton className="h-3 w-24 mb-2" />
          <Skeleton className="h-8 w-16 mt-2" />
          <Skeleton className="h-3 w-32 mt-2" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

const TABLE_ROWS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const CARD_SLOTS = [
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
  "s11",
  "s12",
];

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {TABLE_ROWS.slice(0, rows).map((id) => (
        <div key={id} className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {CARD_SLOTS.slice(0, count).map((id) => (
        <div
          key={id}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <Skeleton className="h-40 w-full rounded-none" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <Skeleton className="h-5 w-40 mb-2" />
      <Skeleton className="h-3 w-56 mb-6" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}
