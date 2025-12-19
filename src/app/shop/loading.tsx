import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <Skeleton className="h-10 w-48" /> {/* Title */}
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" /> {/* Filter/Sort */}
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square rounded-lg w-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-9 w-24" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
