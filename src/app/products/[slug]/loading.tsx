import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProductLoading() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Image Gallery Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="flex gap-4 overflow-hidden">
                        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                    </div>
                </div>

                {/* Product Details Skeleton */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" /> {/* Title */}
                        <Skeleton className="h-6 w-1/4" /> {/* Category */}
                        <Skeleton className="h-8 w-32" /> {/* Price */}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="space-y-3">
                            <Skeleton className="h-6 w-32" /> {/* Size Label */}
                            <div className="grid grid-cols-3 gap-4">
                                <Skeleton className="h-10 rounded-md" />
                                <Skeleton className="h-10 rounded-md" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <Skeleton className="h-12 w-full rounded-md" />
                            <Skeleton className="h-12 w-full rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
