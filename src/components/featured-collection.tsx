'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { getFeaturedShoes } from '@/lib/data'; // We'll still use this for types/fallback
import type { Shoe } from '@/lib/types';

export function FeaturedCollection() {
    const [featuredShoes, setFeaturedShoes] = useState<Shoe[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 1. Try to get shoes from localStorage (User's "Admin" data)
        const storedShoesRaw = localStorage.getItem('shoes');
        let shoesToDisplay: Shoe[] = [];

        if (storedShoesRaw) {
            try {
                const allShoes: Shoe[] = JSON.parse(storedShoesRaw);
                // Shuffle and pick 4
                shoesToDisplay = [...allShoes].sort(() => 0.5 - Math.random()).slice(0, 4);
            } catch (e) {
                console.error("Failed to parse stored shoes", e);
            }
        }

        // 2. Fallback to static data if no local storage or empty
        if (shoesToDisplay.length === 0) {
            shoesToDisplay = getFeaturedShoes(4);
        }

        setFeaturedShoes(shoesToDisplay);
        setIsLoaded(true);
    }, []);

    // Prevent hydration mismatch or layout shift by rendering a skeleton or null until loaded
    // Or render valid static HTML first (Server Side) and then hydrate? 
    // For simplicity and to ensure "localStorage" bias, we'll wait for mount.
    // To avoid CLS (Content Layout Shift), checking if we can serve initial static.

    if (!isLoaded) {
        return (
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
                        Featured Collection
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Skeleton Loading State */}
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-square bg-muted rounded-md animate-pulse" />
                                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                                <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
                    Featured Collection
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredShoes.map((shoe) => (
                        <ProductCard key={shoe.id} shoe={shoe} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/shop">View All Products</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
