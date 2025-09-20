import { Skeleton } from "@/components/ui/skeleton";

export function RessourceSkeleton() {
    return (
        <div className="max-w-full animate-pulse">
            {/* Header + Content section */}
            <div className="space-y-5 mb-10 relative border-0">
                {/* Header skeleton */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16 rounded-md" />
                        <Skeleton className="h-6 w-24 rounded-md" />
                    </div>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-3 w-1/5" />
                </div>

                {/* Content skeleton */}
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />

                    <Skeleton className="h-4 w-0" />

                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />

                    <Skeleton className="h-4 w-0" />

                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/4" />

                    <Skeleton className="h-4 w-0" />

                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/4" />
                </div>

                {/* Source skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>

            <div className="space-y-4">
                {Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                            {/* Icon + Label skeleton */}
                            <div className="flex items-center gap-2 sm:flex-col sm:items-center sm:min-w-20 sm:self-center">
                                <Skeleton className="size-5 rounded-lg sm:size-9" />
                                <Skeleton className="h-3 w-16" />
                            </div>

                            {/* Content skeleton */}
                            <div className="flex-1 space-y-3">
                                <Skeleton className="h-5 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}