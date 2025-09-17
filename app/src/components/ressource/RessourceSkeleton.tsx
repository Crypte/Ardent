import { Skeleton } from "@/components/ui/skeleton";

export function RessourceSkeleton() {
    return (
        <div className="max-w-full animate-pulse">
            <div className="space-y-6 mb-5">
                {/* Header skeleton */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-8 w-3/4" />
                </div>

                {/* Content skeleton */}
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Source skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            {/* Grid skeleton for event/anecdote/keynumber/vocabulaire */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3 p-4 border rounded-lg">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="space-y-3 p-4 border rounded-lg">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>
        </div>
    )
}