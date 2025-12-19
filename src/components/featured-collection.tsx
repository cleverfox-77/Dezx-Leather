'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { getFeaturedShoes } from '@/lib/data';
import { fetchProducts } from '@/lib/supabase';
import type { Shoe } from '@/lib/types';

export function FeaturedCollection() {
    const [featuredShoes, setFeaturedShoes] = useState<Shoe[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadShoes() {
            // 1. Try to fetch from Supabase
            const dbShoes = await fetchProducts();

            let shoesToDisplay: Shoe[] = [];

            if (dbShoes.length > 0) {
                shoesToDisplay = [...dbShoes].sort(() => 0.5 - Math.random()).slice(0, 5);
            } else {
                // 2. Fallback to static data
                shoesToDisplay = getFeaturedShoes(5);
            }

            setFeaturedShoes(shoesToDisplay);
            setIsLoaded(true);
        }

        loadShoes();
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
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {/* Skeleton Loading State */}
                        {[1, 2, 3, 4, 5].map(i => (
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
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {featuredShoes.map((shoe) => (
                        <ProductCard key={shoe.id} shoe={shoe} />
                    ))}
                    <div className="flex flex-col items-center justify-center p-6 border rounded-md bg-secondary/20 hover:bg-secondary/40 transition-colors aspect-[3/4] text-center">
                        <p className="font-semibold text-lg mb-2">Explore More</p>
                        <p className="text-sm text-muted-foreground mb-4">Discover our full collection</p>
                        <Button asChild variant="default" size="sm">
                            <Link href="/shop">View All</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
