import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
                <div className="space-y-4">
                    {/* Header-like skeleton */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-32" />
                        <div className="flex space-x-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Hero-like skeleton */}
                <div className="w-full aspect-[21/9] rounded-lg bg-muted animate-pulse" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}
