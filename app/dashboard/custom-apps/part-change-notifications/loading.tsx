import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <Skeleton className="h-9 w-80 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
}
